from app import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    gamer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    review = db.Column(db.Text, nullable=False)


    def format_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'gamer_id': self.gamer_id,
            'review': self.review
        }
