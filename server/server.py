from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient('localhost', 27017)
db = client['flask_database']
users = db['users']

# Route to handle POST requests for user registration


@app.route("/api/register", methods=["POST"])
def register():
    try:
        # Extract username and password from form data
        username = request.form.get('username')
        password = request.form.get('password')

        # Check if username and password are not None or empty strings
        if username is not None and password is not None and username.strip() and password.strip():
            # Insert user data into the database
            user_id = users.insert_one(
                {'username': username, 'password': password}).inserted_id
            return jsonify({"message": "User registered successfully", "user_id": str(user_id)})
        else:
            return jsonify({"message": "Invalid username or password"}), 400
    except Exception as e:
        return jsonify({"message": "An error occurred while processing the request", "error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=8080)


# @app.route("/api/login", methods=["POST"])
# def userlogin():
#     if request.method == "POST":
#         form = request.get_json()
#         roll_no = form.get('roll_no')
#         email = form.get('email')
#         db.users.insert_one({  # Assuming you have a collection named 'users'
#             "roll_no": roll_no,
#             "email": email
#         })
#         return jsonify({"message": "Form data saved successfully"})
#     else:
#         return jsonify({"message": "Invalid request method"})
# if __name__ == "__main__":
#     app.run(debug=True, port=8080)
