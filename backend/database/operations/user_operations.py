from database.schema.models import *
from sqlalchemy import desc


def userExist(id: str):
    exist = db.select(
        User
    ).where(
        User.id == id
    )
    result = db.session.scalars(exist).all()
    return len(result) != 0

def get_user_by_id(user_id):
    user = db.select(
        User
    ).where(
        User.id == user_id
    )
    return db.session.scalar(user)

def get_instrument_by_user(user_id):
    query = db.select(
        User_Instrument.c.instrument_id
    ).where(
        User_Instrument.c.user_id == user_id
    )

    return db.session.scalars(query).all()

def get_region_by_user(user_id):
    query = db.select(
        User_Region.c.region_id
    ).where(
        User_Region.c.user_id == user_id
    )

    return db.session.scalars(query).all()

def get_style_by_user(user_id):
    query = db.select(
        User_Style.c.style_id
    ).where(
        User_Style.c.user_id == user_id
    )

    return db.session.scalars(query).all()

def queryUserByString(search):
    query = db.select(
        User.id,
        User.name,
        User.photo
    ).where(
        User.name.contains(search)
    )
    return db.session.scalars(query).all()


def updateUserInstruments(user_id ,new_ids):
    if len(new_ids) == 0:
        return
    cur_ids = get_instrument_by_user(user_id)
    
    for i in cur_ids:
        if i not in new_ids:
            del_stmt = db.delete(
                User_Instrument
            ).where(
                User_Instrument.c.user_id == user_id
            ).where(
                User_Instrument.c.instrument_id == i
            )
            db.session.execute(del_stmt)

    for i in new_ids:
        if i not in cur_ids:
            ins_stmt = db.insert(
                User_Instrument
            ).values(
                user_id = user_id,
                instrument_id = i
            )
            db.session.execute(ins_stmt)
    db.session.commit()
    return

    

def updateUserRegions(user_id ,new_ids):
    if len(new_ids) == 0:
        return
    cur_ids = get_region_by_user(user_id)

    for i in cur_ids:
        if i not in new_ids:
            del_stmt = db.delete(
                User_Region
            ).where(
                User_Region.c.user_id == user_id
            ).where(
                User_Region.c.region_id == i
            )
            db.session.execute(del_stmt)

    for i in new_ids:
        if i not in cur_ids:
            ins_stmt = db.insert(
                User_Region
            ).values(
                user_id = user_id,
                region_id = i
            )
            db.session.execute(ins_stmt)
    db.session.commit()
    return



def updateUserStyles(user_id ,new_ids):
    if len(new_ids) == 0:
        return
    cur_ids = get_style_by_user(user_id)

    for i in cur_ids:
        if i not in new_ids:
            del_stmt = db.delete(
                User_Style
            ).where(
                User_Style.c.user_id == user_id
            ).where(
                User_Style.c.style_id == i
            )
            db.session.execute(del_stmt)

    for i in new_ids:
        if i not in cur_ids:
            ins_stmt = db.insert(
                User_Style
            ).values(
                user_id = user_id,
                style_id = i
            )
            db.session.execute(ins_stmt)
    db.session.commit()
    return


def updateUser(user_id, bio, prefered_time, ig, fb, photo):
    stmt = db.update(
        User
    ).where(
        User.id == user_id
    ).values(
        bio = bio,
        prefered_time = prefered_time,
        ig = ig,
        fb = fb,
        photo = photo
    )
    
    db.session.execute(stmt)
    db.session.commit()
    return


def queryCompatibleMusician(instruments, regions, styles):

    instruments = [int(i) for i in instruments]
    regions = [int(i) for i in regions]
    styles = [int(i) for i in styles]

    instrument_count = db.select(
        User_Instrument.c.user_id,
        db.func.count(User_Instrument.c.instrument_id).label('count')
    ).where(
        User_Instrument.c.instrument_id.in_(instruments)
    ).group_by(
        User_Instrument.c.user_id
    ).cte()

    region_count = db.select(
        User_Region.c.user_id,
        db.func.count(User_Region.c.region_id).label('count')
    ).where(
        User_Region.c.region_id.in_(regions)
    ).group_by(
        User_Region.c.user_id
    ).cte()

    style_count = db.select(
        User_Style.c.user_id,
        db.func.count(User_Style.c.style_id).label('count')
    ).where(
        User_Style.c.style_id.in_(styles)
    ).group_by(
        User_Style.c.user_id
    ).cte()

    subq = db.select(
        User.id.label('user_id'),
        User.name.label('name'),
        instrument_count.c.count.label('instrument_count'),
        region_count.c.count.label('region_count'),
        style_count.c.count.label('style_count')
        # (instrument_count.c.count + region_count.c.count + style_count.c.count).label('compatibility')
    ).where(
        User.id == instrument_count.c.user_id
    ).where(
        instrument_count.c.user_id == region_count.c.user_id
    ).where(
        instrument_count.c.user_id == style_count.c.user_id
    )
    # .subquery()

    # query = db.select(
    #     subq.c.user_id,
    #     subq.c.name,
    #     subq.c.compatibility
    # ).order_by(
    #     desc(subq.c.compatibility)
    # ).distinct()
    
    result = db.session.execute(subq).all()
    return [row._asdict() for row in result]



    
                            




