from flask import Blueprint, render_template, request
from flask_login import current_user, login_required
from app import db
from app.models import User
from app.models import Game
from app.forms import GameForm
from app.s3_help_funcs import allowed_file, get_unique_filename, upload_file_to_s3, delete_file_from_s3
gamer_routes = Blueprint('gamers', __name__)



def format_form_errors(errors):
    formatted_errors = []
    for field in errors:
        for error in errors[field]:
            if field == 'confirm_password':
                formatted_errors.append(f'Confirm Password {" ".join(str.split(error)[1:])}')
            elif field == 'email':
                formatted_errors.append(f'{field.title()} {error.lower()}')
            elif field == 'gamer_id':
                pass
            elif error == 'Invalid URL.':
                formatted_errors.append(error)
            elif field == 'image_url':
                formatted_errors.append(f'Image URL {" ".join(str.split(error)[1:])}')
            else:
                formatted_errors.append(f'{field.title()} {" ".join(str.split(error)[1:])}')
    return formatted_errors

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

    url = 'https://s3.console.aws.amazon.com/s3/object/game-traderz?region=us-east-2&prefix=video-game-control-line-and-fill-style-icon-free-vector.jpg'
    if type(form.data['image_url']) is not str:

        image = form.data['image_url']
        if not image:
            return {'errors': ['No image given']}

        if not image.filename:
            return {"errors": "file type not permitted"}
        if image.filename:
            if not allowed_file(image.filename):
                return {"errors": "file type not permitted"}

        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            url = 'https://s3.console.aws.amazon.com/s3/object/game-traderz?region=us-east-2&prefix=video-game-control-line-and-fill-style-icon-free-vector.jpg'
        #   return upload, 400
        else:
            url = upload['url']


    if form.validate_on_submit():
        game = Game(
            user_id=current_user.id,
            title=form.data['title'],
            image_url=url,
            description=form.data['description'],
            genre=form.data['genre'],
            console=form.data['console'],
            copies=form.data['copies'],
            copies_avail=form.data['copies']
        )
        db.session.add(game)
        db.session.commit()
        user = User.query.get(current_user.id)
        return user.format_dict()
    if form.errors:
        if not url == 'https://s3.console.aws.amazon.com/s3/object/game-traderz?region=us-east-2&prefix=video-game-control-line-and-fill-style-icon-free-vector.jpg':
            delete_file_from_s3(url[37:].lower())
        return {'errors': format_form_errors(form.errors)}


@gamer_routes.route('/<int:game_id>', methods=['PUT'])
@login_required
def update_games(game_id):
    form = GameForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    url = ''
    if form.data.get('image_url') and type(form.data['image_url']) is not str:
        image = form.data['image_url']

        if not allowed_file(image.filename):
            url = 'https://s3.console.aws.amazon.com/s3/object/game-traderz?region=us-east-2&prefix=video-game-control-line-and-fill-style-icon-free-vector.jpg'
        #   return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            url = 'https://s3.console.aws.amazon.com/s3/object/game-traderz?region=us-east-2&prefix=video-game-control-line-and-fill-style-icon-free-vector.jpg'
        #   return upload, 400
        else:
            url = upload["url"]

    if form.validate_on_submit():
        game = Game.query.get(game_id)
        game.title = form.data['title']
        game.image_url = url if url else game.image_url
        game.description = form.data['description']
        game.genre = form.data['genre']
        game.console = form.data['console']
        if game.copies == game.copies_avail:
            game.copies_avail = form.data['copies']
        else:
            game.copies_avail = form.data['copies'] - (game.copies - game.copies_avail)
        game.copies = form.data['copies']

        db.session.commit()
        user = User.query.get(current_user.id)
        return user.format_dict()
    if form.errors:
        return {'errors': format_form_errors(form.errors)}

@gamer_routes.route('/<int:game_id>', methods=['DELETE'])
@login_required
def delete_games(game_id):
    game = Game.query.get(game_id)
    delete_file_from_s3(game.image_url[37:].lower())
    db.session.delete(game)
    db.session.commit()
    user = User.query.get(current_user.id)
    return user.format_dict()
