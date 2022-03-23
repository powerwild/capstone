from app import db
from app.models import User

user_names = ['Old', 'Young', 'New', 'Fresh', 'Good', 'Bad', 'Hip', 'Modern', 'Archaic', 'Innovative']

def add_user_seeds():
    for name in user_names:
        gamer = User(
            username=f'{name}Gamer',
            email=f'{name.lower()}@gamer.com',
            password='password'
        )
        db.session.add(gamer)
        db.session.commit()


def remove_user_seeds():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
