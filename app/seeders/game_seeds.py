from app import db
from app.models import Game


def add_game_seeds():
    game1 = Game(
        user_id=1,
        title='Assassins Creed Origin',
        image_url='https://smartcdkeys.com/image/data/products/assassins-creed-origins-gold-edition-xbox-one/cover/assassins-creed-origins-gold-edition-ps4-smartcdkeys-cheap-cd-key-cover.jpg',
        description="Ancient Egypt, a land of majesty and intrigue, is disappearing in a ruthless fight for power. Unveil dark secrets and forgotten myths as you go back to the one founding moment: The Origins of the Assassins Brotherhood.",
        genre='Adventure',
        console='Playstation 4',
        copies=1,
        copies_avail=1
    )
    game2 = Game(
        user_id=2,
        title="COD Cold War",
        image_url="https://cdn.pricespy.co.nz/product/standard/280/5501727.jpg",
        description="CoD Black Ops Cold War will drop fans into the depths of the Cold War’s volatile geopolitical battle of the early 1980s. Nothing is ever as it seems in a gripping single-player Campaign, where players will come face-to-face with historical figures and hard truths, as they battle around the globe through iconic locales like East Berlin, Vietnam, Turkey, Soviet KGB headquarters and more.",
        genre="First Person Shooter",
        console="Xbox 1",
        copies=1,
        copies_avail=1
    )
    game3 = Game(
        user_id=3,
        title="Mario Kart Deluxe",
        image_url="https://m.media-amazon.com/images/I/51uY0eZg+IS.jpg",
        description="Hit the road with the definitive version of Mario Kart 8 and play anytime, anywhere! Race your friends or battle them in a revised battle mode on new and returning battle courses.",
        genre="Adventure",
        console="Switch",
        copies=1,
        copies_avail=1
    )
    game4 = Game(
        user_id=4,
        title="LOZ Breath of the Wild",
        image_url="https://m.media-amazon.com/images/I/71B5c+Emz6L._SX342_.jpg",
        description="Explore the wilds of Hyrule any way you like - Climb up towers and mountain peaks in search of new destinations, then set your own path to get there and plunge into the wilderness. Along the way, you'll battle towering enemies, hunt wild beasts and gather ingredients for the food and elixirs you'll need to sustain you on your journey.",
        genre="Adventure",
        console="Wii U",
        copies=1,
        copies_avail=1
    )
    game5 = Game(
        user_id=5,
        title="The Witcher 3 Wild Hunt",
        image_url="https://www.lifewire.com/thmb/vwr6AG-TckO-7YUUkJWRUxlAG9g=/fit-in/1076x1500/filters:no_upscale():max_bytes(150000):strip_icc()/TheWitcher3-WildHunt-5c0fc7754cedfd00012de2d4.jpg",
        description="Become a witcher, one of the last monster slayers for hire. Track down the child of prophecy, a living weapon capable of untold destruction. Journey through war-torn kingdoms and slay legendary creatures. Explore towns rife with corruption and sail to untamed islands. In a world descending into turmoil, your actions shape history.",
        genre="Role-Playing",
        console="PC",
        copies=1,
        copies_avail=1
    )
    db.session.add(game1)
    db.session.add(game2)
    db.session.add(game3)
    db.session.add(game4)
    db.session.add(game5)
    db.session.commit()


def remove_game_seeds():
    db.session.execute('TRUNCATE games RESTART IDENTITY CASCADE;')
    db.session.commit()
