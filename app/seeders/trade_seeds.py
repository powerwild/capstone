from app import db
from app.models import Trade
from app.seeders.game_seeds import gamer_ids


def add_trade_seeds():
    t1 = Trade(
                requester_id=1,
                recipient_id=2,
                rec_game_id=1,
                status='Pending',
                req_returned=False,
                rec_returned=False
            )
    t2 = Trade(
                requester_id=2,
                recipient_id=3,
                rec_game_id=2,
                status='Pending',
                req_returned=False,
                rec_returned=False
            )
    t3 = Trade(
                requester_id=3,
                recipient_id=4,
                rec_game_id=3,
                status='Pending',
                req_returned=False,
                rec_returned=False
            )
    t4 = Trade(
                requester_id=4,
                recipient_id=6,
                rec_game_id=4,
                status='Pending',
                req_returned=False,
                rec_returned=False
            )
    t5 = Trade(
                requester_id=6,
                recipient_id=7,
                rec_game_id=1,
                status='Pending',
                req_returned=False,
                rec_returned=False
            )
    t6 = Trade(
                requester_id=7,
                recipient_id=8,
                rec_game_id=2,
                status='Pending',
                req_returned=False,
                rec_returned=False
            )
    t7 = Trade(
                requester_id=8,
                recipient_id=9,
                rec_game_id=3,
                status='Pending',
                req_returned=False,
                rec_returned=False
            )
    t8 = Trade(
                requester_id=9,
                recipient_id=10,
                rec_game_id=1,
                status='Pending',
                req_returned=False,
                rec_returned=False
            )
    t9 = Trade(
                requester_id=10,
                recipient_id=1,
                rec_game_id=3,
                status='Pending',
                req_returned=False,
                rec_returned=False
            )
    db.session.add(t1)
    db.session.add(t2)
    db.session.add(t3)
    db.session.add(t4)
    db.session.add(t5)
    db.session.add(t6)
    db.session.add(t7)
    db.session.add(t8)
    db.session.add(t9)
    db.session.commit()


def remove_trade_seeds():
    db.session.execute('TRUNCATE trades RESTART IDENTITY CASCADE;')
    db.session.commit()
