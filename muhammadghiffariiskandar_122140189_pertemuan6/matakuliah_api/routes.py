def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    
    # API routes for matakuliah
    config.add_route('matakuliah_collection', '/api/matakuliah')
    config.add_route('matakuliah_item', '/api/matakuliah/{id}')
