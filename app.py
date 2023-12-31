from flask import Flask, request, jsonify, render_template, session
from werkzeug.utils import secure_filename
import os
from image_merger.merge_images import process_merge
import uuid

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key' #Chat Gpt says add secret key idk why 
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'bmp', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Define the index route
@app.route('/')
def index():
    return render_template('index.html')

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/merge', methods=['POST'])
def merge_images():
    if 'layer1' not in request.files or 'layer2' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    # Ensure the session has a unique ID
    if 'uid' not in session:
        session['uid'] = str(uuid.uuid4())


    file1 = request.files['layer1']
    file2 = request.files['layer2']

    if file1.filename == '' or file2.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file1 and allowed_file(file1.filename) and file2 and allowed_file(file2.filename):
        filename1 = secure_filename(file1.filename)
        filename2 = secure_filename(file2.filename)

        uid_path = os.path.join(app.config['UPLOAD_FOLDER'], session['uid'])
        if not os.path.exists(uid_path):
            os.makedirs(uid_path)

        file1_path = os.path.join(uid_path, filename1)
        file2_path = os.path.join(uid_path, filename2)

        file1.save(file1_path)
        file2.save(file2_path)

        
        output_dir = os.path.join(uid_path, 'merged')
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        process_merge([file1_path, file2_path], output_dir)
        return jsonify({"message": "Images merged successfully"}), 200

    return jsonify({"error": "Invalid file type"}), 400

if __name__ == '__main__':
    app.run(debug=True)
