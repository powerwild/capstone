from app import db
from app.models import User


def add_user_seeds():
    old_gamer = User(
        username='OldGamer',
        email='old@gamer.io',
        password='password'
    )
    young_gamer = User(
        username='YoungGamer',
        email='young@gamer.io',
        password='password'
    )
    new_gamer = User(
        username='NewGamer',
        email='new@gamer.io',
        password='password'
    )
    bad_gamer = User(
        username='BadGamer',
        email='bad@gamer.io',
        password='password'
    )
    good_gamer = User(
        username='GoodGamer',
        email='good@gamer.io',
        password='password'
    )
    db.session.add(old_gamer)
    db.session.add(young_gamer)
    db.session.add(new_gamer)
    db.session.add(bad_gamer)
    db.session.add(good_gamer)
    db.session.commit()


def remove_user_seeds():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
