from faker import Faker
from random import randint, choice

from app import app
from models import *

fake = Faker()


def create_users():
    users = []
    usernames = []

    u1 = User()
    u1.email = "breellejordyn@gmail.com"
    u1.username = "BreElle Wells"
    u1.password_hash = "asdfjkl;"

    db.session.add(u1)

    users = [u1]

    for _ in range(20):
        username = fake.name()

        while username in usernames or len(username) < 6 or len(username) > 20:
            username = fake.name()

        usernames.append(username)

        email = (
            f'{username.split(" ")[0].lower()}'
            + username.split(" ")[1][0].lower()
            + str(randint(1, 100))
            + "@gmail.com"
        )

        u = User()
        u.username = username
        u.email = email

        u.password_hash = u.username + "password"

        users.append(u)

    return users


def create_games():
    games = []  ## this is in place of the api_id, for now

    for _ in range(100):
        game = fake.company()

        while game in games:
            game = fake.company()

        g = Game(
            api_id=game,
        )

        games.append(g)

    return games


def create_reviews():
    reviews = []
    platforms = [
        "PlayStation 5",
        "Xbox Series X/S",
        "Nintendo Switch",
        "PlayStation 4",
        "Xbox One",
        "PlayStation 3",
        "Xbox 360",
        "PC",
    ]
    ratings = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]

    for _ in range(70):
        r = Review(
            user_id=choice([user.id for user in users]),
            game_id=choice([game.id for game in games]),
            platform=choice([platform for platform in platforms]),
            rating=choice([rating for rating in ratings]),
            review=fake.paragraph(nb_sentences=10),
        )

        reviews.append(r)

    return reviews


def create_gamelists():
    gamelists = []

    for _ in range(40):
        gl = GameList(
            user_id=choice([user.id for user in users]),
            name=fake.company(),
        )

        gamelists.append(gl)

    return gamelists


def create_gamelist_items():
    gamelist_items = []

    for _ in range(200):
        i = GameListItem(
            gamelist_id=choice([gamelist.id for gamelist in gamelists]),
            game_id=choice([game.id for game in games]),
            played=fake.pybool(),
            finished=fake.pybool(),
            currently_playing=fake.pybool(),
            date_started=choice(["01/01/2020", "06/17/2017", "07/31/2011"]),
            date_finished=choice(["01/01/2023", "06/17/2023", None]),
            endless=fake.pybool(),
        )

        gamelist_items.append(i)

    return gamelist_items


if __name__ == "__main__":
    with app.app_context():
        print("Clearing database...")
        db.drop_all()

        print("Creating tables...")
        db.create_all()

        print("Starting seed...")

        print("Seeding users...")
        users = create_users()
        db.session.add_all(users)
        db.session.commit()

        print("Seeding games...")
        games = create_games()
        db.session.add_all(games)
        db.session.commit()

        print("Seeding reviews...")
        reviews = create_reviews()
        db.session.add_all(reviews)
        db.session.commit()

        print("Seeding gamelists...")
        gamelists = create_gamelists()
        db.session.add_all(gamelists)
        db.session.commit()

        print("Seeding gamelist items...")
        gamelist_items = create_gamelist_items()
        db.session.add_all(gamelist_items)
        db.session.commit()

        print("Seeding complete!!")
