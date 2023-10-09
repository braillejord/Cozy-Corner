#!/usr/bin/env python3

from app import app

from models import *

if __name__ == "__main__":
    with app.app_context():
        import ipdb

        u1 = User.query.first()

        ipdb.set_trace()
