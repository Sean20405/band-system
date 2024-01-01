from models import *
from sqlalchemy import select, delete, insert, update


def bandExist(id: str):
    exist = db.select(
        Band
    ).where(
        Band.id == id
    )
    result = db.session.scalars(exist).all()
    return len(result) != 0

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

def updateBand(band_id, bio, practice_time, ig, fb, photo):
    stmt = db.update(
        Band
    ).where(
        Band.id == band_id
    ).values(
        bio = bio,
        practice_time = practice_time,
        ig = ig,
        fb = fb,
        photo = photo
    )
    
    db.session.execute(stmt)
    db.session.commit()
    return

def queryCompatibleBand(styles):
    query = db.select( 
        Band.id,
        Band.name,
        Band.photo 
    ).join(
        Band_Style,
        Band.id == Band_Style.c.Band_id
    ).where(
        Band_Style.c.style_id.in_(styles)
    )
    return db.session.scalars(query).all()