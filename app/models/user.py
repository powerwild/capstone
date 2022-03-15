from app import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    hashed_password = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)

    games = db.relationship('Game')

    @property
    def password(self):
        return self.hashed_password


    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)


    def validate_password(self, password):
        return check_password_hash(self.password, password)


    def format_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }
