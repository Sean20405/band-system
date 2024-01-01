from models import *
from sqlalchemy import select, delete, insert, update

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
        User_Instrument.c.user_id == user_id
    )

    return db.session.scalars(query).all()

def get_style_by_user(user_id):
    query = db.select(
        User_Region.c.style_id
    ).where(
        User_Instrument.c.user_id == user_id
    )

    return db.session.scalars(query).all()

def queryCompatibleMusician(instruments, regions, styles):
    query = db.select( 
        User.id,
        User.name,
        User.photo 
    ).join(
        User_Instrument,
        User.id == User_Instrument.c.user_id
    ).join(
        User_Region,
        User.id == User_Region.c.user_id
    ).join(
        User_Style,
        User.id == User_Style.c.user_id
    ).where(
        User_Instrument.c.instrument_id.in_(instruments)
    ).where(
        User_Region.c.region_id.in_(regions)
    ).where(
        User_Style.c.style_id.in_(styles)
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


def updateInstruments(user_id ,new_ids):
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

    

def updateRegions(user_id ,new_ids):
    cur = get_region_by_user(user_id)
    cur_ids = [i.c.region_id for i in cur]

    for i in cur_ids:
        if i not in new_ids:
            del_stmt = db.delete(
                User_Region
            ).where(
                User_Region.user_id == user_id
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


def updateStyles(user_id ,new_ids):
    cur = get_style_by_user(user_id)
    cur_ids = [i.c.style_id for i in cur]

    for i in cur_ids:
        if i not in new_ids:
            del_stmt = db.delete(
                User_Style
            ).where(
                User_Style.user_id == user_id
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




