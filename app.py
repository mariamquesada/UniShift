from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
import bcrypt

app = Flask(__name__)
CORS(app)

# Load configuration
app.config.from_object('config.Config')

db = SQLAlchemy(app)
jwt = JWTManager(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    user_type = db.Column(db.String(20), nullable=False)  # 'employer' or 'employee'
    name = db.Column(db.String(120), nullable=False)
    average_rating = db.Column(db.Float, default=0.0)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(200), nullable=False)
    expertise_required = db.Column(db.String(200), nullable=False)
    company_name = db.Column(db.String(200), nullable=False)

class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, accepted, rejected
    availability = db.Column(db.Text, nullable=False)

# Routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if not all(k in data for k in ['email', 'password', 'user_type', 'name']):
        return jsonify({'message': 'Missing required fields'}), 400
        
    # Check if user already exists
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'message': 'Email already registered'}), 400
        
    if data['user_type'] not in ['employer', 'employee']:
        return jsonify({'message': 'Invalid user type'}), 400
    
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    
    user = User(
        email=data['email'],
        password=hashed_password,
        user_type=data['user_type'],
        name=data['name']
    )
    
    try:
        db.session.add(user)
        db.session.commit()
        
        # Create access token
        access_token = create_access_token(identity={'id': user.id, 'user_type': user.user_type})
        return jsonify({
            'message': 'User registered successfully',
            'token': access_token,
            'user_type': user.user_type
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Registration failed'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    
    if user and bcrypt.checkpw(data['password'].encode('utf-8'), user.password):
        access_token = create_access_token(identity={'id': user.id, 'user_type': user.user_type})
        return jsonify({'token': access_token, 'user_type': user.user_type}), 200
    
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([{
        'id': event.id,
        'name': event.name,
        'description': event.description,
        'date': event.date.isoformat(),
        'location': event.location,
        'expertise_required': event.expertise_required,
        'company_name': event.company_name
    } for event in events]), 200

@app.route('/api/events', methods=['POST'])
@jwt_required()
def create_event():
    current_user = get_jwt_identity()
    if current_user['user_type'] != 'employer':
        return jsonify({'message': 'Unauthorized'}), 403
    
    data = request.json
    event = Event(
        employer_id=current_user['id'],
        name=data['name'],
        description=data['description'],
        date=datetime.fromisoformat(data['date']),
        location=data['location'],
        expertise_required=data['expertise_required'],
        company_name=data['company_name']
    )
    
    db.session.add(event)
    db.session.commit()
    
    return jsonify({'message': 'Event created successfully'}), 201

@app.route('/api/events/<int:event_id>/apply', methods=['POST'])
@jwt_required()
def apply_for_event(event_id):
    current_user = get_jwt_identity()
    if current_user['user_type'] != 'employee':
        return jsonify({'message': 'Unauthorized'}), 403
    
    data = request.json
    application = Application(
        event_id=event_id,
        employee_id=current_user['id'],
        availability=data['availability']
    )
    
    db.session.add(application)
    db.session.commit()
    
    return jsonify({'message': 'Application submitted successfully'}), 201

@app.route('/api/events/<int:event_id>/applications', methods=['GET'])
@jwt_required()
def get_applications(event_id):
    current_user = get_jwt_identity()
    if current_user['user_type'] != 'employer':
        return jsonify({'message': 'Unauthorized'}), 403
    
    applications = Application.query.filter_by(event_id=event_id).all()
    return jsonify([{
        'id': app.id,
        'employee_id': app.employee_id,
        'status': app.status,
        'availability': app.availability
    } for app in applications]), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5001)
