from app import db
from app.models import Trade

def add_trade_seeds():
    trade1 = Trade(
        requester_id=1,
        recipient_id=2,
        req_game_id=1,
        rec_game_id=2,
        status='Accepted',
        req_returned=False,
        rec_returned=False
    )
    trade2 = Trade(
        requester_id=3,
        recipient_id=4,
        rec_game_id=4,
        status='Pending',
        req_returned=False,
        rec_returned=False
    )
    db.session.add(trade1)
    db.session.add(trade2)
    db.session.commit()



def remove_trade_seeds():
    db.session.execute('TRUNCATE trades RESTART IDENTITY CASCADE;')
    db.session.commit()
