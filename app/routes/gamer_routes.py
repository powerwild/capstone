from flask import Blueprint, render_template, request
from flask_login import current_user, login_required
from app import db
from app.models import User
from app.models import Game
from app.forms import GameForm

gamer_routes = Blueprint('gamers', __name__)


@gamer_routes.route('/', methods=['GET'])
@login_required
def get_gamers():
    gamers = User.query.all()
    return {'gamers': [gamer.format_dict() for gamer in gamers]}


@gamer_routes.route('/', methods=['POST'])
@login_required
def create_games():
    form = GameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        game = Game(
            user_id=current_user.id,
            title=form.data['title'],
            image_url=form.data['image_url'],
            description=form.data['description'],
            genre=form.data['genre'],
            console=form.data['console'],
            copies=form.data['copies'],
            copies_avail=form.data['copies']
        )
        db.session.add(game)
        db.session.commit()
        print(game.format_dict())
        return game.format_dict()
    if form.errors:
        print(form.errors)
        return {'errors': form.errors}


@gamer_routes.route('/<int:game_id>', methods=['PUT'])
@login_required
def update_games(game_id):
    form = GameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        game = Game.query.get(game_id)
        game.title = form.data['title'],
        game.image_url = form.data['image_url'],
        game.description = form.data['description'],
        game.genre = form.data['genre'],
        game.console = form.data['console'],
        game.copies = form.data['copies'],
        game.copies_avail = form.data['copies']
        db.session.commit()
        return game.format_dict()
    if form.errors:
        return {'errors': form.errors}

@gamer_routes.route('/<int:game_id>', methods=['DELETE'])
@login_required
def delete_games(game_id):
    game = Game.query.get(game_id)
    db.session.delete(game)
    db.session.commit()
    return {'message': 'Game deleted'}
