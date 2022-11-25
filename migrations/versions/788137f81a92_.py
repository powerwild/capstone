"""empty message

Revision ID: 788137f81a92
Revises:
Create Date: 2022-03-15 10:26:25.457848

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '788137f81a92'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('hashed_password', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('games',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('image_url', sa.String(), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('genre', sa.String(), nullable=False),
    sa.Column('console', sa.String(), nullable=False),
    sa.Column('copies', sa.Integer(), nullable=False),
    sa.Column('copies_avail', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('trades',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('requester_id', sa.Integer(), nullable=False),
    sa.Column('recipient_id', sa.Integer(), nullable=True),
    sa.Column('req_game_id', sa.Integer(), nullable=True),
    sa.Column('rec_game_id', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(), nullable=False),
    sa.Column('req_returned', sa.Boolean(), nullable=True),
    sa.Column('rec_returned', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['rec_game_id'], ['games.id'], ),
    sa.ForeignKeyConstraint(['recipient_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['req_game_id'], ['games.id'], ),
    sa.ForeignKeyConstraint(['requester_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE games SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE trades SET SCHEMA {SCHEMA};")



def downgrade():
    op.drop_table('trades')
    op.drop_table('games')
    op.drop_table('users')
