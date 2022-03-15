from app import db
from datetime import datetime

class Game(db.Model):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    genre = db.Column(db.String, nullable=False)
    console = db.Column(db.String, nullable=False)
    copies = db.Column(db.Integer, nullable=False)
    copies_avail = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)
    updated_at = db.Column(db.DateTime(), nullable=False)


    def format_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'image_url': self.image_url,
            'description': self.description,
            'genre': self.genre,
            'console': self.console,
            'copies': self.copies,
            'copies_avail': self.copies_avail
        }
