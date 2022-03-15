from flask import Blueprint, render_template, request
from flask_login import current_user, login_required
from app import db
from datetime import datetime
from

gamer_routes = Blueprint('gamers', __name__)


@gamer_routes.route('/', methods=['GET', 'POST'])
@login_required
def get_or_make_games():
    pass


@gamer_routes.route('/<int:game_id>', methods=['PUT'])
@login_required
def update_games(game_id):
    pass


@gamer_routes.route('/<int:game_id>', methods=['DELETE'])
@login_required
def delete_games(game_id):
    pass
