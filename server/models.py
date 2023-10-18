from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    reviews = db.relationship("Review", backref="user", cascade="all, delete-orphan")
    gamelists = db.Relationship("GameList", backref="user", cascade="all, delete-orphan")

    serialize_rules = ("-reviews.user",)

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter(cls.id == id).first()

    @validates("email")
    def validate_email(self, db_column, email):
        if "@" not in email:
            raise ValueError("Email must contain @.")
        elif User.query.filter(User.email == email).first():
            raise ValueError("A user with this email address already exists.")
        return email

    @validates("username")
    def validate_username(self, db_column, username):
        if not 6 <= len(username):
            raise ValueError("Username must contain 6 or more characters.")
        elif User.query.filter(User.username == username).first():
            raise ValueError("A user with this username already exists.")
        else:
            return username

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")

    @password_hash.setter
    def password_hash(self, password):
        if not len(password) >= 8:
            raise ValueError("Password must contain 8 or more characters.")

        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))


class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    platform = db.Column(db.String, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    review = db.Column(db.String)
    game_name = db.Column(db.String, nullable=False)
    api_id = db.Column(db.Integer, nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    serialize_rules = ("-user.reviews",)

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter(cls.id == id).first()


class GameList(db.Model, SerializerMixin):
    __tablename__ = "gamelists"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    card_color = db.Column(db.String, default="bg-primary h-24 rounded-t-2xl")

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    gamelist_items = db.relationship(
        "GameListItem", backref="gamelist", cascade="all, delete-orphan"
    )

    serialize_rules = ("-gamelist_items.gamelist",)

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter(cls.id == id).first()

    @validates("name")
    def validate_name(self, db_column, name):
        if not len(name) >= 1:
            raise ValueError("List name must be at least 1 character long.")
        return name


class GameListItem(db.Model, SerializerMixin):
    __tablename__ = "gamelist_items"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    api_id = db.Column(db.Integer)
    background_image = db.Column(db.String)
    currently_playing = db.Column(db.Boolean, default=False)
    played = db.Column(db.Boolean, default=False)
    finished = db.Column(db.Boolean, default=False)
    date_started = db.Column(db.String)
    date_finished = db.Column(db.String)
    endless = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    gamelist_id = db.Column(db.Integer, db.ForeignKey("gamelists.id"))

    serialize_rules = ("-gamelist.gamelist_items",)

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter(cls.id == id).first()
