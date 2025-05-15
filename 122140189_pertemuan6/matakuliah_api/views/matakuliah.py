import json
from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import (
    HTTPCreated,
    HTTPBadRequest,
    HTTPNotFound,
    HTTPNoContent
)
from sqlalchemy.exc import SQLAlchemyError

from ..models.matakuliah import Matakuliah

def parse_request_body(request):
    try:
        return request.json_body
    except json.JSONDecodeError:
        raise HTTPBadRequest(json_body={
            'status': 'error',
            'message': 'Invalid JSON body'
        })

class MatakuliahViews:
    def __init__(self, request):
        self.request = request
        self.dbsession = request.dbsession
    
    # GET /api/matakuliah - Get all courses
    @view_config(route_name='matakuliah_collection', request_method='GET', renderer='json')
    def get_all(self):
        try:
            matakuliah_list = self.dbsession.query(Matakuliah).all()
            return {'data': [mk.to_dict() for mk in matakuliah_list]}
        except SQLAlchemyError as e:
            return Response(
                json={"error": str(e)},
                status=500
            )
    
    # POST /api/matakuliah - Create a new course
    @view_config(route_name='matakuliah_collection', request_method='POST', renderer='json')
    def create(self):
        try:
            data = parse_request_body(self.request)
            
            # Validate required fields
            required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
            missing_fields = [field for field in required_fields if field not in data]
            if missing_fields:
                return HTTPBadRequest(json_body={
                    'status': 'error', 
                    'message': f'Missing required fields: {", ".join(missing_fields)}'
                })
            
            matakuliah = Matakuliah(
                kode_mk=data['kode_mk'],
                nama_mk=data['nama_mk'],
                sks=data['sks'],
                semester=data['semester']
            )
            
            self.dbsession.add(matakuliah)
            self.dbsession.flush()  # Get the ID without committing
            
            return HTTPCreated(json_body={
                'status': 'success',
                'data': matakuliah.to_dict()
            })
        except SQLAlchemyError as e:
            return Response(
                json={"error": str(e)},
                status=500
            )
    
    # GET /api/matakuliah/{id} - Get a course by ID
    @view_config(route_name='matakuliah_item', request_method='GET', renderer='json')
    def get_one(self):
        try:
            id = int(self.request.matchdict['id'])
            matakuliah = self.dbsession.query(Matakuliah).filter(Matakuliah.id == id).first()
            
            if not matakuliah:
                return HTTPNotFound(json_body={
                    'status': 'error',
                    'message': f'Matakuliah with id {id} not found'
                })
            
            return {'data': matakuliah.to_dict()}
        except SQLAlchemyError as e:
            return Response(
                json={"error": str(e)},
                status=500
            )
    
    # PUT /api/matakuliah/{id} - Update a course by ID
    @view_config(route_name='matakuliah_item', request_method='PUT', renderer='json')
    def update(self):
        try:
            id = int(self.request.matchdict['id'])
            matakuliah = self.dbsession.query(Matakuliah).filter(Matakuliah.id == id).first()
            
            if not matakuliah:
                return HTTPNotFound(json_body={
                    'status': 'error',
                    'message': f'Matakuliah with id {id} not found'
                })
            
            data = parse_request_body(self.request)
            
            # Update attributes if they exist in the request
            if 'kode_mk' in data:
                matakuliah.kode_mk = data['kode_mk']
            if 'nama_mk' in data:
                matakuliah.nama_mk = data['nama_mk']
            if 'sks' in data:
                matakuliah.sks = data['sks']
            if 'semester' in data:
                matakuliah.semester = data['semester']
            
            return {'status': 'success', 'data': matakuliah.to_dict()}
        except SQLAlchemyError as e:
            return Response(
                json={"error": str(e)},
                status=500
            )
    
    # DELETE /api/matakuliah/{id} - Delete a course by ID
    @view_config(route_name='matakuliah_item', request_method='DELETE', renderer='json')
    def delete(self):
        try:
            id = int(self.request.matchdict['id'])
            matakuliah = self.dbsession.query(Matakuliah).filter(Matakuliah.id == id).first()
            
            if not matakuliah:
                return HTTPNotFound(json_body={
                    'status': 'error',
                    'message': f'Matakuliah with id {id} not found'
                })
            
            self.dbsession.delete(matakuliah)
            
            return HTTPNoContent()
        except SQLAlchemyError as e:
            return Response(
                json={"error": str(e)},
                status=500
            )
