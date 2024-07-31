from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

TMDB_API_KEY = 'your_tmdb_api_key'

def get_streaming_providers(movie_id):
    url = f'https://api.themoviedb.org/3/movie/{movie_id}/watch/providers'
    headers = {
        'Authorization': f'Bearer {TMDB_API_KEY}',
    }
    response = requests.get(url, headers=headers)
    return response.json()

@app.route('/api/personal-queue', methods=['GET'])
def get_personal_queue():
    # Replace with actual data fetching logic
    personal_queue = [
        {'id': 550, 'title': 'Fight Club'},
        {'id': 299536, 'title': 'Avengers: Infinity War'},
    ]
    return jsonify(personal_queue)

@app.route('/api/movie/<int:movie_id>/streaming', methods=['GET'])
def get_movie_streaming(movie_id):
    providers = get_streaming_providers(movie_id)
    return jsonify(providers)

if __name__ == '__main__':
    app.run(debug=True)