from models import *
from sqlalchemy import select

def queryCompatibleMusician(instruments, regions, styles):
    query = db.select( 
        User.id,
        User.name,
        User.photo 
    ).select_from(
        User
    ).join(
        User_Instrument,
        User.id == User_Instrument.columns.user_id
    ).join(
        User_Region,
        User.id == User_Region.columns.user_id
    ).join(
        User_Style,
        User.id == User_Style.columns.user_id
    ).filter(
        User_Instrument.columns.instrument_id.in_(instruments)
    ).filter(
        User_Region.columns.region_id.in_(regions)
    ).filter(
        User_Style.columns.style_id.in_(styles)
    )
    return db.session.execute(query)


def queryUserByString(search):
    query = db.select(
        User.id,
        User.name,
        User.photo
    ).select_from(
        User
    ).filter(
        User.name.contains(search)
    )
    return db.session.execute(query)



