from app import app

# from models import
# ^^^ you can import everything "*" or specific models

if __name__ == "__main__":
    with app.app_context():
        import ipdb

        ipdb.set_trace()
