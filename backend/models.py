from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    # _tablename_ = 'user'
    username = db.Column(db.String(80), unique=True, nullable=False)
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    reviews = db.relationship("Reviews", backref="user", lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "reviews": [review.serialize() for review in self.reviews]
            # do not serialize the password, its a security breach
        }

class Reviews(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    review=db.Column(db.Text,nullable=False)
    movie_id=db.Column(db.Integer,nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "movie_id": self.movie_id,
            "user_id": self.user_id,
        }

