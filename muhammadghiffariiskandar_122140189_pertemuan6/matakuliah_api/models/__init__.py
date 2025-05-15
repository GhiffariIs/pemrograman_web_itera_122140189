from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import configure_mappers
import zope.sqlalchemy

# Import or define all models here to ensure they are attached to the
# Base.metadata prior to any initialization routines
from .matakuliah import Matakuliah  # noqa

# Run configure_mappers after defining all of the models to ensure
# all relationships can be setup
configure_mappers()


def get_engine(settings, prefix='sqlalchemy.'):
    return engine_from_config(settings, prefix)


def get_session_factory(engine):
    factory = sessionmaker()
    factory.configure(bind=engine)
    return factory


def get_tm_session(session_factory, transaction_manager):
    """
    Get a ``sqlalchemy.orm.Session`` instance backed by a transaction.

    This function will hook the session to the transaction manager which
    will take care of committing any changes.
    """
    dbsession = session_factory()
    zope.sqlalchemy.register(
        dbsession, transaction_manager=transaction_manager)
    return dbsession


def includeme(config):
    """
    Initialize the model for a Pyramid app.

    Activate this setup using ``config.include('matakuliah_api.models')``.
    """
    settings = config.get_settings()
    settings['tm.manager_hook'] = 'pyramid_tm.explicit_manager'    # Use SQLite database for simplicity
    settings['sqlalchemy.url'] = 'sqlite:///D:/Aa/Kuliah/Semester 6/Pemrograman Web RB/Githubs/pemrograman_web_itera_122140189/122140189_pertemuan6/matakuliah_api.sqlite'# Create database engine
    config.add_directive('get_engine', get_engine)
    config.add_directive('get_session_factory', get_session_factory)
    config.add_directive('get_tm_session', get_tm_session)
    
    # Create engine and session factory
    engine = get_engine(settings)
    session_factory = get_session_factory(engine)
    
    # Add to registry
    config.registry['dbsession_factory'] = session_factory

    # make request.dbsession available for use in Pyramid
    def add_db_session_to_request(request):
        # hook the dbsession to the transaction manager
        session_factory = request.registry['dbsession_factory']
        return get_tm_session(session_factory, request.tm)

    config.add_request_method(
        add_db_session_to_request, 'dbsession', reify=True
    )
