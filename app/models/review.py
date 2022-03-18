from app import db

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    gamer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    review = db.Column(db.Text, nullable=False)


    def format_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'gamer_id': self.gamer_id,
            'review': self.review
        }
