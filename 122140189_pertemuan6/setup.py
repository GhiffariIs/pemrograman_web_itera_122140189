from setuptools import setup

requires = [
    'pyramid',
    'pyramid_tm',
    'SQLAlchemy',
    'transaction',
    'zope.sqlalchemy',
    'waitress',
]

setup(
    name='matakuliah_api',
    install_requires=requires,
    entry_points={
        'paste.app_factory': [
            'main = matakuliah_api:main',
        ],
        'console_scripts': [
            'initialize_matakuliah_api_db = matakuliah_api.scripts.initialize_db:main',
        ],
    },
)
