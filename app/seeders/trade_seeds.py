from app import db
from app.models import Trade
from app.seeders.game_seeds import gamer_ids


def add_trade_seeds():
    for x in gamer_ids:
        if not x == gamer_ids[-1]:
            y = x + 1
            if x == 4:
                y = 6
            t = Trade(
                requester_id=x,
                recipient_id=y,
                rec_game_id=1,
                status='Pending',
                req_returned=False,
                rec_returned=False
            )
            db.session.add(t)
            db.session.commit()
        else:
            t = Trade(
                requester_id=x,
                recipient_id=1,
                rec_game_id=1,
                status='Pending',
                req_returned=False,
                rec_returned=False
            )
            db.session.add(t)
            db.session.commit()



def remove_trade_seeds():
    db.session.execute('TRUNCATE trades RESTART IDENTITY CASCADE;')
    db.session.commit()
