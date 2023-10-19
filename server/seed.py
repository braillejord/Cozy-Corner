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


def create_reviews():
    reviews = []
    platforms = [
        "PlayStation 5",
        "Xbox Series S/X",
        "Nintendo Switch",
        "PlayStation 4",
        "Xbox One",
        "PlayStation 3",
        "Xbox 360",
        "PC",
    ]
    ratings = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]

    for _ in range(70):
        num_paragraphs = 5
        paragraphs = []

        for _ in range(num_paragraphs):
            num_sentences = fake.random_int(min=6, max=20)
            sentences = [fake.sentence() for _ in range(num_sentences)]
            p = " ".join(sentences)
            paragraphs.append(p)

        text_with_paras = "\n\n".join(paragraphs)

        r = Review(
            user_id=choice([user.id for user in users]),
            api_id=randint(1, 5000),
            platform=choice([platform for platform in platforms]),
            rating=choice([rating for rating in ratings]),
            review=text_with_paras,
            game_name=fake.company(),
        )

        reviews.append(r)

    return reviews


def create_gamelists():
    gamelists = []

    gl1 = GameList(
        user_id=1,
        name="Owned",
    )

    gl2 = GameList(
        user_id=1,
        name="Backlog",
    )

    gl3 = GameList(
        user_id=1,
        name="Wishlist",
    )

    gamelists = [gl1, gl2, gl3]

    # for _ in range(40):
    #     gl = GameList(
    #         user_id=choice([user.id for user in users]),
    #         name=fake.company(),
    #     )

    #     gamelists.append(gl)

    return gamelists


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

        # print("Seeding games...")
        # games = create_games()
        # db.session.add_all(games)
        # db.session.commit()

        print("Seeding reviews...")
        reviews = create_reviews()
        db.session.add_all(reviews)
        db.session.commit()

        print("Seeding gamelists...")
        gamelists = create_gamelists()
        db.session.add_all(gamelists)
        db.session.commit()

        print("Seeding complete!!")
