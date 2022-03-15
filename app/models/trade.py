from app import db
from datetime import datetime


class Trade(db.Model):
    __tablename__ = 'trades'

    id = db.Column(db.Integer, primary_key=True)
    requester_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    req_game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    rec_game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    status = db.Column(db.String, nullable=False)
    req_returned = db.Column(db.Boolean, default=False)
    rec_returned = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime(), nullable=False)
    updated_at = db.Column(db.DateTime(), nullable=False)


    def format_dict(self):
        return {
            'id': self.id,
            'requester_id': self.requester_id,
            'recipient_id': self.recipient_id,
            'status': self.status,
            'req_game_id': self.req_game_id,
            'rec_game_id': self.rec_game_id,
            'req_returned': self.req_returned,
            'rec_returned': self.rec_returned,
        }
