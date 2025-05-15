from pyramid.config import Configurator
from pyramid.renderers import JSON

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    with Configurator(settings=settings) as config:
        config.include('pyramid_tm')
        config.include('.models')
        config.include('.routes')
        
        # Add JSON renderer
        json_renderer = JSON()
        config.add_renderer('json', json_renderer)
        
        config.scan('.views')  # Explicitly scan the views directory
    return config.make_wsgi_app()
