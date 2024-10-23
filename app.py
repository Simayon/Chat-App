from flask import Flask, request, jsonify, render_template
from models import User

app = Flask(__name__)

# In-memory message storage (replace with a database for production)
messages = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    messages.append(data['message'])
    return jsonify({'success': True})

@app.route('/get_messages', methods=['GET'])
def get_messages():
    return jsonify(messages)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
