import os
import sys
import transaction

from pyramid.paster import (
    get_appsettings,
    setup_logging,
)

from pyramid.scripts.common import parse_vars

from ..models.meta import Base
from ..models import (
    get_engine,
    get_session_factory,
    get_tm_session,
)
from ..models.matakuliah import Matakuliah


def usage(argv):
    cmd = os.path.basename(argv[0])
    print('usage: %s <config_uri> [var=value]\n'
          '(example: "%s development.ini")' % (cmd, cmd))
    sys.exit(1)


def main(argv=sys.argv):
    if len(argv) < 2:
        usage(argv)
    config_uri = argv[1]
    options = parse_vars(argv[2:])
    setup_logging(config_uri)
    settings = get_appsettings(config_uri, options=options)

    engine = get_engine(settings)
    Base.metadata.create_all(engine)

    session_factory = get_session_factory(engine)

    with transaction.manager:
        dbsession = get_tm_session(session_factory, transaction.manager)

        # Add sample data
        matakuliah1 = Matakuliah(
            kode_mk='IF123',
            nama_mk='Algoritma dan Pemrograman',
            sks=3,
            semester=1
        )
        
        matakuliah2 = Matakuliah(
            kode_mk='IF234',
            nama_mk='Basis Data',
            sks=4,
            semester=3
        )
        
        matakuliah3 = Matakuliah(
            kode_mk='IF345',
            nama_mk='Pemrograman Web',
            sks=3,
            semester=5
        )
        
        dbsession.add_all([matakuliah1, matakuliah2, matakuliah3])

if __name__ == '__main__':
    main()
