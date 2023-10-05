from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    reviews = db.relationship("Review", backref="user", cascade="all, delete-orphan")
    gamelists = db.Relationship("GameList", backref="user", cascade="all, delete-orphan")

    serialize_rules = ("-reviews.user",)


class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    platform = db.Column(db.String, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    review = db.Column(db.String, nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    game_id = db.Column(db.Integer, db.ForeignKey("games.id"))

    serialize_rules = (
        "-user.reviews",
        "-game.reviews",
    )


class Game(db.Model, SerializerMixin):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    api_id = db.Column(db.Integer, nullable=False)

    reviews = db.relationship("Review", backref="game", cascade="all, delete-orphan")
    gamelist_items = db.relationship("GameListItem", backref="game", cascade="all, delete-orphan")

    serialize_rules = (
        "-reviews.game",
        "-gamelist_items.game",
    )


class GameList(db.Model, SerializerMixin):
    __tablename__ = "gamelists"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    gamelist_items = db.relationship(
        "GameListItem", backref="gamelist", cascade="all, delete-orphan"
    )

    serialize_rules = ("-gamelist_items.gamelist",)


class GameListItem(db.Model, SerializerMixin):
    __tablename__ = "gamelist_items"

    id = db.Column(db.Integer, primary_key=True)
    played = db.Column(db.Boolean)
    finished = db.Column(db.Boolean)
    currently_playing = db.Column(db.Boolean)
    date_started = db.Column(db.String)
    date_finished = db.Column(db.String)
    endless = db.Column(db.Boolean)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    game_id = db.Column(db.Integer, db.ForeignKey("games.id"))
    gamelist_id = db.Column(db.Integer, db.ForeignKey("gamelists.id"))

    serialize_rules = (
        "-game.gamelist_items",
        "-gamelist.gamelist_items",
    )
