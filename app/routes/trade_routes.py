from flask import Blueprint, render_template, request
from flask_login import current_user, login_required
from app import db
from datetime import datetime
from app.models import Trade
from app.forms import NewTradeForm, UpdateTradeForm

trade_routes = Blueprint('trades', __name__)


@trade_routes.route('/', methods=['GET'])
@login_required
def get_trades():
    trades = Trade.query.filter(Trade.recipient_id == current_user.id).all()
    return {'trades': [trade.format_dict() for trade in trades]}


@trade_routes.route('/', methods=['POST'])
@login_required
def create_trade(recipient_id):
    form = NewTradeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        trade = Trade(
            requester_id=current_user.id,
            recipient_id=form.data['recipient_id'],
            rec_game_id=form.data['rec_game_id'],
            status='Pending',
            req_returned=False,
            rec_returned=False,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(trade)
        db.session.commit()
        return trade.format_dict()


@trade_routes.route('/', methods=['PUT'])
@login_required
def finish_trade_request():
    form = UpdateTradeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        trade = Trade.query.filter(Trade.recipient_id == current_user.id).first()
        trade.req_game_id = form.data['req_game_id']
        trade.status = 'Accepted'
        trade.updated_at = datetime.now()
        db.session.commit()
        return trade.format_dict()

@trade_routes.route('/<int:trade_id', methods=['PUT'])
@login_required
def update_trade(trade_id):
    pass


@trade_routes.route('/<int:trade_id', methods=['DELETE'])
@login_required
def delete_trade(trade_id):
    trade = Trade.query.get(trade_id)
    db.session.delete(trade)
    db.session.commit()
    return {'message': 'Trade Deleted'}
