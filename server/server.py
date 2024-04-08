from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from config import MONGO_URI


app = Flask(__name__)
CORS(app)

# Connect to MongoDB



client = MongoClient(MONGO_URI)
db = client.flask_database

# Route to handle POST requests for user registration


@app.route("/api/register", methods=["POST"])
def register():
    login_details = db['login_details']
    try:
        # Extract username and password from form data
        rollno = request.form.get('rollno')
        password = request.form.get('password')

        # Check if username and password are not None or empty strings
        if rollno is not None and password is not None and rollno.strip() and password.strip():
            # Insert user data into the database

            data = db.login_details.find_one(
                {"RollNo": rollno, "Password": password})
            print(data)
            if (data):
                return jsonify({"message": "Login Successful"})
            else:
                return jsonify({"message": "Incorrect Username or Password"})
        else:
            return jsonify({"message": "Invalid username or password"}), 400
    except Exception as e:
        return jsonify({"message": "An error occurred while processing the request", "error": str(e)}), 500


@app.route("/api/register1", methods=["POST"])
def register1():
    login_details = db['login_details']
    Student = db['student']
    try:
        # Extract username and password from form data
        username = request.form.get('username')
        password = request.form.get('password')
        fname = request.form.get('fname')
        mname = request.form.get('mname')
        lname = request.form.get('lname')
        email = request.form.get('email')
        phone = request.form.get('phone_no')
        rollno = request.form.get("roll_no")

        data = db.student.find_one({"RollNo": rollno})
        print(data)
        if (data):
            return jsonify({"message": "Roll Number already exists", "user_id": str(user_id)})

        # Check if username and password are not None or empty strings
        if (username is not None and username.strip() and
            password is not None and password.strip() and
            fname is not None and fname.strip() and
            lname is not None and lname.strip() and
            email is not None and email.strip() and
            phone is not None and phone.strip() and
                rollno is not None and rollno.strip()):
            # Insert user data into the database
            user_id = login_details.insert_one(
                {
                    "RollNo": rollno,
                    "Password": password
                }
            ).inserted_id

            user_id = Student.insert_one(
                {
                    "RollNo": rollno,
                    "FirstName": fname,
                    "MiddleName": mname,
                    "LastName": lname,
                    "Email": email,
                    "PhoneNo": phone
                }
            ).inserted_id

            return jsonify({"message": "User registered successfully", "user_id": str(user_id)})
        else:
            return jsonify({"message": "Invalid username or password"}), 400
    except Exception as e:
        return jsonify({"message": "An error occurred while processing the request", "error": str(e)}), 500


@app.route("/api/register2", methods=["POST"])
def register2():
    LostItems = db['lost_items']
    try:
        # Extract username and password from form data
        email = request.form.get('email')
        phone = request.form.get('phone_no')
        rollno = request.form.get("roll_no")
        location = request.form.get("location")
        ldate = request.form.get("ldate")
        itemtype = request.form.get("itemtype")
        itemdescription = request.form.get("itemdescription")
        image_data=request.form.get("image")


        if (email is not None and email.strip() and
            phone is not None and phone.strip() and
            rollno is not None and rollno.strip() and
            location is not None and location.strip() and
            ldate is not None and ldate.strip() and
            itemtype is not None and itemtype.strip() and
            itemdescription is not None and itemdescription.strip()):

            lost_item_id = LostItems.insert_one(
                {
                    "Email": email,
                    "PhoneNo": phone,
                    "RollNo": rollno,
                    "Location": location,
                    "DateLost": ldate,
                    "ItemType": itemtype,
                    "ItemDescription": itemdescription,
                    "Image": image_data
                }
            ).inserted_id

            return jsonify({"message": "Lost Item registered successfully", "user_id": str(lost_item_id)})
        else:
            return jsonify({"message": "Invalid registration"}), 400
    except Exception as e:
        return jsonify({"message": "An error occurred while processing the request", "error": str(e)}), 500


@app.route("/api/register3", methods=["POST"])
def register3():
    FoundItems = db['found_items']
    try:
        # Extract username and password from form data
        email = request.form.get('email')
        phone = request.form.get('phone_no')
        rollno = request.form.get("roll_no")
        location = request.form.get("location")
        ldate = request.form.get("ldate")
        itemtype = request.form.get("itemtype")
        itemdescription = request.form.get("itemdescription")
        image_data=request.form.get("image")


        if (email is not None and email.strip() and
            phone is not None and phone.strip() and
            rollno is not None and rollno.strip() and
            location is not None and location.strip() and
            ldate is not None and ldate.strip() and
            itemtype is not None and itemtype.strip() and
            itemdescription is not None and itemdescription.strip()):

            found_item_id = FoundItems.insert_one(
                {
                    "Email": email,
                    "PhoneNo": phone,
                    "RollNo": rollno,
                    "Location": location,
                    "DateLost": ldate,
                    "ItemType": itemtype,
                    "ItemDescription": itemdescription,
                    "Image": image_data
                }
            ).inserted_id

            return jsonify({"message": "Found Item registered successfully", "user_id": str(found_item_id)})
        else:
            return jsonify({"message": "Invalid registration"}), 400
    except Exception as e:
        return jsonify({"message": "An error occurred while processing the request", "error": str(e)}), 500


@app.route("/api/lost_items", methods=["GET"])
def get_lost_items():
    LostItems = db["lost_items"]
    try:
        lost_item = list(LostItems.find({},{'_id' : 0}))
        return jsonify({"lost_item": lost_item}), 200
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
# if _name_ == "_main_":
#     app.run(debug=True, port=8080)