from database.schema.models import *
from sqlalchemy import select, delete, insert, update


def bandExist(id: str):
    exist = db.select(
        Band
    ).where(
        Band.id == id
    )
    result = db.session.scalars(exist).all()
    return len(result) != 0

def get_band_password(band_id):
    password = db.select(
        Band.password
    ).where(
        Band.id == band_id
    )
    return db.session.scalar(password)

def get_band_by_id(id):
    basic_info_q = db.select(
        Band
    ).where(
        Band.id == id
    )
    basic_info = db.session.scalar(basic_info_q)

    member_q = db.select(
        User_Band.c.user_id
    ).where(
        User_Band.c.band_id == id
    )

    members = db.session.scalars(member_q)

    region_q = db.select(
        Band_Region.c.region_id
    ).where(
        Band_Region.c.band_id == id
    )

    region = db.session.scalars(region_q)

    style_q = db.select(
        Band_Style.c.style_id
    ).where(
        Band_Style.c.band_id == id
    )

    style = db.session.scalars(style_q)

    return basic_info, members, region, style


def get_style_by_band(band_id):
    query = db.select(
        Band_Style.c.style_id
    ).where(
        Band_Style.c.band_id == band_id
    )

    return db.session.scalars(query).all()


def updateBandStyles(band_id ,new_ids):
    if len(new_ids) == 0:
        return
    cur_ids = get_style_by_band(band_id)

    for i in cur_ids:
        if i not in new_ids:
            del_stmt = db.delete(
                Band_Style
            ).where(
                Band_Style.c.band_id == band_id
            ).where(
                Band_Style.c.style_id == i
            )
            db.session.execute(del_stmt)

    for i in new_ids:
        if i not in cur_ids:
            ins_stmt = db.insert(
                Band_Style
            ).values(
                band_id = band_id,
                style_id = i
            )
            db.session.execute(ins_stmt)
    db.session.commit()
    return

def updateBandMembers(new_ids, band_id):
    if len(new_ids) == 0:
        return
    cur_ids = get_style_by_band(band_id)

    for i in cur_ids:
        if i not in new_ids:
            del_stmt = db.delete(
                User_Band
            ).where(
                User_Band.c.band_id == band_id
            ).where(
                User_Band.c.user_id == i
            )
            db.session.execute(del_stmt)

    for i in new_ids:
        if i not in cur_ids:
            ins_stmt = db.insert(
                User_Band
            ).values(
                band_id = band_id,
                user_id = i
            )
            db.session.execute(ins_stmt)
    db.session.commit()
    return

def updateBand(band_id, bio, practice_time, ig, fb, photo, contact_window):
    stmt = db.update(
        Band
    ).where(
        Band.id == band_id
    ).values(
        bio = bio,
        practice_time = practice_time,
        ig = ig,
        fb = fb,
        photo = photo,
        contact_window = contact_window
    )
    
    db.session.execute(stmt)
    db.session.commit()
    return

def queryCompatibleBand(styles):
    regions = [int(i) for i in regions]
    styles = [int(i) for i in styles]

    region_count = db.select(
        Band_Region.c.band_id,
        db.func.count(Band_Region.c.region_id).label('count')
    ).where(
        Band_Region.c.region_id.in_(regions)
    ).group_by(
        Band_Region.c.band_id
    ).cte()

    style_count = db.select(
        Band_Style.c.band_id,
        db.func.count(Band_Style.c.style_id).label('count')
    ).where(
        Band_Style.c.style_id.in_(styles)
    ).group_by(
        Band_Style.c.band_id
    ).cte()

    subq = db.select(
        Band.id.label('band_id'),
        Band.name.label('name'),
        db.func.coalesce(region_count.c.count, 0).label('region_count'),
        db.func.coalesce(style_count.c.count, 0).label('style_count'),
        
    ).join(
        region_count,
        Band.id == region_count.c.user_id,
        full = True
    ).join(
        style_count,
        Band.id == style_count.c.user_id,
        full = True
    ).where(
       (db.func.coalesce(region_count.c.count, 0) + db.func.coalesce(style_count.c.count, 0)) > 0
    )

    
    result = db.session.execute(subq).all()
    return [row._asdict() for row in result]



    
                            



