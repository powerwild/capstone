from app import db, environment, SCHEMA, add_prefix_for_prod



class Trade(db.Model):
    __tablename__ = 'trades'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    requester_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    req_game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')))
    rec_game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')), nullable=False)
    status = db.Column(db.String, nullable=False)
    req_returned = db.Column(db.Boolean, default=False)
    rec_returned = db.Column(db.Boolean, default=False)



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
