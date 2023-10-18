#!/usr/bin/env python3

from flask import request, session, jsonify
from flask_restful import Resource, reqparse
import requests

from config import app, db, api, API_KEY

from models import *

from howlongtobeatpy import HowLongToBeat

import re


class ListById(Resource):
    def get(self, id):
        list = GameList.find_by_id(id)

        if list:
            return list.to_dict(only=("id", "name", "user_id", "card_color", "gamelist_items"))
        else:
            return {"message": "List not found"}, 404

    def patch(self, id):
        list = GameList.find_by_id(id)
        req = request.get_json()

        print(list)
        print(req)

        if list:
            try:
                for attr in req:
                    setattr(list, attr, req.get(attr))
                db.session.commit()

                return (
                    list.to_dict(only=("id", "name", "user_id", "card_color", "gamelist_items")),
                    202,
                )

            except ValueError:
                return {"message": "Unprocessable entity"}, 422

        else:
            return {"message": "List not found"}, 404

    def delete(self, id):
        list = GameList.find_by_id(id)

        if list:
            db.session.delete(list)
            db.session.commit()
            return {"message": "List deleted"}, 204
        else:
            return {"message": "List not found"}, 404


class CreateList(Resource):
    def post(self):
        req = request.get_json()

        try:
            gl = GameList(name=req.get("list_name"), user_id=req.get("user_id"))

            db.session.add(gl)
            db.session.commit()
            return (gl.to_dict(only=("id", "name", "user_id")), 200)

        except ValueError:
            return {"message": "Unprocessable entity"}, 422


class MyLists(Resource):
    def get(self):
        user = User.find_by_id(session["user_id"])

        if user:
            response = [
                list.to_dict(
                    only=("id", "user_id", "name", "card_color", "created_at", "updated_at")
                )
                for list in user.gamelists
            ]
            return response, 200

        else:
            return {"message": "User not found"}, 404


class SingleReview(Resource):
    def get(self, id):
        review = Review.find_by_id(id)

        if review:
            user = User.query.filter(User.id == review.user_id).first()

            if user:
                return (
                    {
                        "review": review.to_dict(
                            only=(
                                "id",
                                "platform",
                                "rating",
                                "review",
                                "game_name",
                                "created_at",
                                "user_id",
                            )
                        ),
                        "username": user.to_dict(only=("username",)),
                    },
                    200,
                )
        else:
            return {"message": "Review not found"}, 404

    def patch(self, id):
        r = Review.find_by_id(id)
        req = request.get_json()

        if r:
            try:
                for attr in req:
                    setattr(r, attr, req.get(attr))
                db.session.commit()
                return (
                    r.to_dict(
                        only=(
                            "id",
                            "platform",
                            "rating",
                            "review",
                            "game_name",
                            "created_at",
                            "user_id",
                        )
                    ),
                    202,
                )
            except ValueError:
                return {"message": "Unprocessable entity"}, 422
        else:
            return {"message": "Review not found"}, 404

    def delete(self, id):
        review = Review.find_by_id(id)

        if review:
            db.session.delete(review)
            db.session.commit()
            return {"message": "Review deleted"}, 204


class MyReviews(Resource):
    def get(self):
        user = User.find_by_id(session["user_id"])

        if user:
            response = [
                review.to_dict(
                    only=("id", "platform", "rating", "review", "game_name", "created_at")
                )
                for review in user.reviews
            ]

            return response, 200
        else:
            return {"message": "User not found"}, 404


class AllGames(Resource):
    def get(self, page):
        def make_api_request():
            url = f"https://api.rawg.io/api/games?key={API_KEY}&page={page}"

            response = requests.get(url)

            return response.json()

        return make_api_request()


class SearchGames(Resource):
    def get(self, search):
        def make_api_request():
            url = f"https://api.rawg.io/api/games?key={API_KEY}&search={search}"

            response = requests.get(url)

            return response.json()

        return make_api_request()


class AllReviews(Resource):
    def get(self):
        reviews = [
            review.to_dict(
                only=("id", "platform", "rating", "review", "game_name", "api_id", "user_id")
            )
            for review in Review.query.all()
        ]

        if reviews:
            return reviews, 200
        else:
            return {"message": "Reviews not found"}, 404


class Game(Resource):
    def get(self, api_id):
        def make_api_request():
            url = f"https://api.rawg.io/api/games/{api_id}?key={API_KEY}"

            response = requests.get(url)

            return response.json()

        return make_api_request()

    def delete(self, api_id):
        game = GameListItem.query.filter(GameListItem.api_id == api_id).first()

        db.session.delete(game)
        db.session.commit()

        return {}, 204


class Howlongtobeat(Resource):
    def get(self, game):
        string_without_paren = re.sub(r"\([^()]*\)", "", game)

        title_cased_string = " ".join(word.capitalize() for word in string_without_paren.split())

        results_list = HowLongToBeat().search(title_cased_string)

        if results_list is not None and len(results_list) > 0:
            best_element = max(results_list, key=lambda element: element.similarity)

            return best_element.json_content, 200

        return [], 200


class Platforms(Resource):
    def get(self):
        def make_api_request():
            url = f"https://api.rawg.io/api/platforms?key={API_KEY}"

            response = requests.get(url)

            return response.json()

        return make_api_request()


class CreateGameListItem(Resource):
    def post(self):
        req = request.get_json()

        list_id = req.get("list_id")
        user_id = req.get("user_id")
        api_id = req.get("api_id")

        list = GameList.query.filter(GameList.id == list_id, GameList.user_id == user_id).first()

        if list:
            existing_item = GameListItem.query.filter(
                GameListItem.api_id == api_id, GameListItem.gamelist_id == list.id
            ).first()

            if existing_item:
                return {"message": "This game is already in your list!"}, 400

            try:
                gli = GameListItem(
                    api_id=req.get("api_id"),
                    name=req.get("name"),
                    background_image=req.get("image"),
                    gamelist_id=list.id,
                )

                db.session.add(gli)
                db.session.commit()
                return {"message": "Game added to list"}, 200

            except ValueError:
                return {"message": "Unprocessable entity"}, 422

        else:
            return {"message": "List not found"}, 404


class DeleteGameListItem(Resource):
    def delete(self, api_id):
        gli = GameListItem.query.filter(GameListItem.api_id == api_id).first()

        if gli:
            db.session.delete(gli)
            db.session.commit()
            return {"message": "List item deleted"}, 204
        else:
            return {"message": "List item not found"}, 404


class WriteReview(Resource):
    def post(self):
        req = request.get_json()

        try:
            r = Review(
                platform=req.get("platform"),
                rating=req.get("rating"),
                review=req.get("review"),
                game_name=req.get("game_name"),
                user_id=req.get("user_id"),
                api_id=req.get("game_id"),
            )
            db.session.add(r)
            db.session.commit()
            print(f"This is the review id: {r.id}")
            return r.id, 200

        except ValueError:
            return {"message": "Unprocessable entity"}, 422


class Signup(Resource):
    def post(self):
        req = request.get_json()
        password = req.get("password")

        try:
            new_user = User(
                email=req.get("email"),
                username=req.get("username"),
            )

            new_user.password_hash = password

            db.session.add(new_user)
            db.session.commit()
            session["user_id"] = new_user.id

            return (
                new_user.to_dict(
                    only=(
                        "id",
                        "email",
                        "username",
                    )
                ),
                200,
            )
        except ValueError:
            return {
                "message": "* Username must be minimum of 6 characters. Password must be minimum of 8 characters"
            }, 422


class Login(Resource):
    def post(self):
        req = request.get_json()

        email = req.get("email")
        password = req.get("password")

        user = User.query.filter(User.email == email).first()

        if user:
            if user.authenticate(password):
                session["user_id"] = user.id
                return (
                    user.to_dict(
                        only=(
                            "id",
                            "email",
                            "username",
                        )
                    ),
                    200,
                )
            else:
                return {"message": "* Incorrect email or password"}, 401
        else:
            return {"message": "* Account not found"}, 404


class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            session["user_id"] = None
            return {}, 204
        else:
            return {"message": "401 Unauthorized"}, 401


class CheckSession(Resource):
    def get(self):
        if session.get("user_id"):
            user = User.query.filter(User.id == session["user_id"]).first()

            return user.to_dict(only=("id", "username")), 200
        else:
            return {"message": "401 Unauthorized"}, 401


class UserName(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()

        if user:
            return user.username, 200
        else:
            return {"message": "User not found"}, 404


class UserLists(Resource):
    def get(self, id):
        user_gamelists = [
            gamelist.to_dict(only=("id", "name"))
            for gamelist in GameList.query.filter(GameList.user_id == id)
        ]

        return user_gamelists, 200


class EditListItem(Resource):
    def patch(self, api_id):
        gli = GameListItem.query.filter(GameListItem.api_id == api_id).first()
        req = request.get_json()

        print(f"Print ")

        if gli:
            try:
                for attr in req:
                    setattr(gli, attr, req.get(attr))
                db.session.commit()

                return {}, 202

            except ValueError:
                return {"message": "Unprocessable entity"}, 422

        else:
            return {"message": "GameListItem not found"}, 404


api.add_resource(ListById, "/lists/<int:id>")
api.add_resource(CreateList, "/create-list")
api.add_resource(MyLists, "/lists")
api.add_resource(MyReviews, "/reviews")
api.add_resource(SingleReview, "/reviews/<int:id>")
api.add_resource(AllGames, "/games/page=<int:page>")
api.add_resource(SearchGames, "/games/search=<string:search>")
api.add_resource(AllReviews, "/all-reviews")
api.add_resource(Game, "/games/<int:api_id>")
api.add_resource(Howlongtobeat, "/hltb/<string:game>")
api.add_resource(Platforms, "/platforms")
api.add_resource(CreateGameListItem, "/create-gamelist-item")
api.add_resource(DeleteGameListItem, "/delete-gamelist-item/<int:api_id>")
api.add_resource(WriteReview, "/write-review")
api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(CheckSession, "/check-session")
api.add_resource(UserName, "/user/<int:id>")
api.add_resource(UserLists, "/user-lists/<int:id>")
api.add_resource(EditListItem, "/edit-item/<int:api_id>")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
