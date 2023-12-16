from sqlalchemy.orm import mapped_column, Mapped
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy as sa

db = SQLAlchemy()

class users(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(db.String, nullable=False)
    prefered_time: Mapped[str] = mapped_column(db.String)
    bio: Mapped[str] = mapped_column(db.Text)
    photo: Mapped[str] = mapped_column(db.String)
    ig: Mapped[str] = mapped_column(db.String)
    fb: Mapped[str] = mapped_column(db.String)
    email: Mapped[str] = mapped_column(db.String)

    def __repr__(self) -> str:
        return (
            f'name: {self.name}'
            f'prefered time: {self.prefered_time}'
            f'bio: {self.bio}'
            f'photo URL: {self.photo}'
            f'ig: {self.ig}'
            f'fb: {self.fb}'
            f'email: {self.email}'
        )
    
class bands(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(db.String, nullable=False)
    practice_time: Mapped[str] = mapped_column(db.String)
    bio: Mapped[str] = mapped_column(db.Text)
    photo: Mapped[str] = mapped_column(db.String)
    ig: Mapped[str] = mapped_column(db.String)
    fb: Mapped[str] = mapped_column(db.String)
    contact_window: Mapped[str] = mapped_column(db.String)

    def __repr__(self) -> str:
        return (
            f'name: {self.name}'
            f'bio: {self.bio}'
            f'photo URL: {self.photo}'
            f'ig: {self.ig}'
            f'fb: {self.fb}'
            f'contact window: {self.contact_window}'
        )

class Instruments(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(db.String, nullable=False)

    def __repr__(self) -> str:
        return f'Instrument: {self.name}'
    
class region(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(db.String, nullable=False)

    def __repr__(self) -> str:
        return f' Region: {self.name}'

class style(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(db.String, nullable=False)
    def __repr__(self) -> str:
        return f' Style: {self.name}'

user_instrument = db.Table(
    'user_instrument',
    db.Column("user_id", sa.ForeignKey(users.id), primary_key=True),
    db.Column("instrument_id", sa.ForeignKey(Instruments.id), primary_key=True)
)

user_region = db.Table(
    'user_region',
    db.Column("user_id", sa.ForeignKey(users.id), primary_key=True),
    db.Column("region_id", sa.ForeignKey(region.id), primary_key=True)
)

user_style = db.Table(
    'user_style',
    db.Column("user_id", sa.ForeignKey(users.id), primary_key=True),
    db.Column("style_id", sa.ForeignKey(style.id), primary_key=True)
)

user_band = db.Table(
    'user_band',
    db.Column("user_id", sa.ForeignKey(users.id), primary_key=True),
    db.Column("band_id", sa.ForeignKey(bands.id), primary_key=True)
)

band_style = db.Table(
    'band_style',
    db.Column("band_id",sa.ForeignKey(bands.id), primary_key=True ),
    db.Column("style_id", sa.ForeignKey(style.id), primary_key=True)
)

