from app import db
from app.models import Review

reviews_list = ['I have borrowed many games from this gamer and have not had a bad experience', 'I borrowed a game from this gamer and the disc was beyond readable.', "This gamer was very cooperative when their disc didn't work.", 'This gamer ruined my game disc!!!']
gamers_review_list = [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 1]]

def add_review_seeds():
    for review in reviews_list:
        for gamers in gamers_review_list:
            rev = Review(
                user_id=gamers[0],
                gamer_id=gamers[1],
                review=review
            )
            db.session.add(rev)
            db.session.commit()


def remove_review_seeds():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
