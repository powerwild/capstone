from app import db
from app.models import Review


def add_review_seeds():
    review1 = Review(
        user_id=1,
        gamer_id=2,
        review='I loved this game!'
    )
    review2 = Review(
        user_id=2,
        gamer_id=3,
        review='I loved this game!'
    )
    review3 = Review(
        user_id=3,
        gamer_id=4,
        review='I loved this game!'
    )
    review4 = Review(
        user_id=4,
        gamer_id=5,
        review='I loved this game!'
    )
    review5 = Review(
        user_id=5,
        gamer_id=1,
        review='I loved this game!'
    )
    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.commit()


def remove_review_seeds():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
