from app import db
from app.models import Game
# from PIL import Image
from app.s3_help_funcs import get_unique_filename, upload_file_to_s3
import requests
# import json
# from flask import send_from_directory
import io


game_names = [['Assasins Creed', 'http://game-traderz.s3.amazonaws.com/b0c46e6ae4d1409ea18e7483d3808480.jpg', 'Ancient Egypt, a land of majesty and intrigue, is disappearing in a ruthless fight for power. Unveil dark secrets and forgotten myths as you go back to the one founding moment: The Origins of the Assassins Brotherhood.', 'Adventure', 'Playstation 4'],
             ['Call of Duty', 'http://game-traderz.s3.amazonaws.com/862093c9982f4dd89d00d9680b833fe1.jpg', "CoD Black Ops Cold War will drop fans into the depths of the Cold War’s volatile geopolitical battle of the early 1980s. Nothing is ever as it seems in a gripping single-player Campaign, where players will come face-to-face with historical figures and hard truths, as they battle around the globe through iconic locales like East Berlin, Vietnam, Turkey, Soviet KGB headquarters and more.", 'First Person Shooter', 'Xbox 1'],
             ['Mario Kart', 'http://game-traderz.s3.amazonaws.com/8615396097f249698fa69e426ac663b2.jpg', 'Hit the road with the definitive version of Mario Kart 8 and play anytime, anywhere! Race your friends or battle them in a revised battle mode on new and returning battle courses.', 'Adventure', 'Switch'],
             ['Legend of Zelda', 'http://game-traderz.s3.amazonaws.com/3c509093d7fd44a09e7eaee709749914.jpg', "Explore the wilds of Hyrule any way you like - Climb up towers and mountain peaks in search of new destinations, then set your own path to get there and plunge into the wilderness. Along the way, you'll battle towering enemies, hunt wild beasts and gather ingredients for the food and elixirs you'll need to sustain you on your journey.", 'Adventure', 'Wii U'],
             ['The Witcher', 'http://game-traderz.s3.amazonaws.com/ffbbf19f3a3d498083e09c4141226cee.jpg', 'Become a witcher, one of the last monster slayers for hire. Track down the child of prophecy, a living weapon capable of untold destruction. Journey through war-torn kingdoms and slay legendary creatures. Explore towns rife with corruption and sail to untamed islands. In a world descending into turmoil, your actions shape history.', 'Role-Playing', 'PC']]

gamer_ids = [1, 2, 3, 4, 6, 7, 8, 9, 10]

def add_game_seeds():
    for gamer in gamer_ids:
        for game in game_names:
                g = Game(
                    user_id=gamer,
                    title=game[0],
                    image_url=game[1],
                    description=game[2],
                    genre=game[3],
                    console=game[4],
                    copies=1,
                    copies_avail=1
                )
                db.session.add(g)
                db.session.commit()


def remove_game_seeds():
    db.session.execute('TRUNCATE games RESTART IDENTITY CASCADE;')
    db.session.commit()
