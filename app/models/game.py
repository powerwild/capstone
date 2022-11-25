from app import db, environment, SCHEMA, add_prefix_for_prod


class Game(db.Model):
    __tablename__ = 'games'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    genre = db.Column(db.String, nullable=False)
    console = db.Column(db.String, nullable=False)
    copies = db.Column(db.Integer, nullable=False)
    copies_avail = db.Column(db.Integer, nullable=False)



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
