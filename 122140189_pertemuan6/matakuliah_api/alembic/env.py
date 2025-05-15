"""Alembic environment for database migrations

This allows you to run alembic commands to manage your database schema migrations.
"""

from alembic import context
from sqlalchemy import engine_from_config, pool

from pyramid.paster import bootstrap, setup_logging
from pyramid.scripts.common import parse_vars

from matakuliah_api.models.meta import Base

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
setup_logging(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
target_metadata = Base.metadata


def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    settings = config.get_section(config.config_ini_section)
    context.configure(url=settings['sqlalchemy.url'])

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode."""
    settings = config.get_section(config.config_ini_section)
    
    with bootstrap(config.config_file_name) as env:
        engine = env['registry'].dbsession_factory.kw['bind']

        with engine.connect() as connection:
            context.configure(
                connection=connection,
                target_metadata=target_metadata
            )

            with context.begin_transaction():
                context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
