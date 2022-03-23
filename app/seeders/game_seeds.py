from app import db
from app.models import Game

game_names = [['Assasins Creed', 'https://game-traderz.s3.us-east-2.amazonaws.com/assassins-creed-origins-gold-edition-ps4-smartcdkeys-cheap-cd-key-cover.webp', 'Ancient Egypt, a land of majesty and intrigue, is disappearing in a ruthless fight for power. Unveil dark secrets and forgotten myths as you go back to the one founding moment: The Origins of the Assassins Brotherhood.', 'Adventure', 'Playstation 4'],
             ['Call of Duty', 'https://game-traderz.s3.us-east-2.amazonaws.com/COD.jpg', "CoD Black Ops Cold War will drop fans into the depths of the Cold War’s volatile geopolitical battle of the early 1980s. Nothing is ever as it seems in a gripping single-player Campaign, where players will come face-to-face with historical figures and hard truths, as they battle around the globe through iconic locales like East Berlin, Vietnam, Turkey, Soviet KGB headquarters and more.", 'First Person Shooter', 'Xbox 1'],
             ['Mario Kart', 'https://game-traderz.s3.us-east-2.amazonaws.com/Mario+Kart.jpg', 'Hit the road with the definitive version of Mario Kart 8 and play anytime, anywhere! Race your friends or battle them in a revised battle mode on new and returning battle courses.', 'Adventure', 'Switch'],
             ['Legend of Zelda', 'https://game-traderz.s3.us-east-2.amazonaws.com/LOZ.jpg', "Explore the wilds of Hyrule any way you like - Climb up towers and mountain peaks in search of new destinations, then set your own path to get there and plunge into the wilderness. Along the way, you'll battle towering enemies, hunt wild beasts and gather ingredients for the food and elixirs you'll need to sustain you on your journey.", 'Adventure', 'Wii U'],
             ['The Witcher', 'https://game-traderz.s3.us-east-2.amazonaws.com/TheWitcher3-WildHunt-5c0fc7754cedfd00012de2d4.jpg', 'Become a witcher, one of the last monster slayers for hire. Track down the child of prophecy, a living weapon capable of untold destruction. Journey through war-torn kingdoms and slay legendary creatures. Explore towns rife with corruption and sail to untamed islands. In a world descending into turmoil, your actions shape history.', 'Role-Playing', 'PC']]
gamer_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
