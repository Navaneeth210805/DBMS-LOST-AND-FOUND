from flask import Flask, request, jsonify, url_for, redirect
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()
from functools import wraps


app = Flask(__name__)
CORS(app)

# Connect to MongoDB

mongo_uri = os.getenv("MONGO_URI")

client = MongoClient(mongo_uri)
db = client.flask_database

current_state=False

def login_required(f):
    @wraps(f)
    
    def decorated_function(*args, **kwargs):
        sessions=db['Session_State']
        session = sessions.find()
        if 'roll_no' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

@app.route("/api/register", methods=["POST"])
def register():
    global current_state
    login_details = db['login_details']
    session_state=db['Session_State']
    try:
        rollno = request.form.get('rollno')
        password = request.form.get('password')

        if rollno is not None and password is not None and rollno.strip() and password.strip():

            data = db.login_details.find_one(
                {"RollNo": rollno, "Password": password})
            print(data)
            if (data):
                x=session_state.insert_one(
                    {"Logged_in_IDS" : rollno}
                ).inserted_id
                current_state=True
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
        if (username is not None and username.strip() and
            password is not None and password.strip() and
            fname is not None and fname.strip() and
            lname is not None and lname.strip() and
            email is not None and email.strip() and
            phone is not None and phone.strip() and
            rollno is not None and rollno.strip()):
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
@login_required
def register2():
    LostItems = db['lost_items']
    try:
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
@login_required
def register3():
    FoundItems = db['found_items']
    try:
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
            itemdescription is not None and itemdescription.strip() and
            image_data is not None and  image_data.strip()):

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


@app.route("/api/state", methods=["GET"])
def states():
    global current_state
    return  jsonify(current_state)

@app.route("/api/logout_state" , method=["POST"])
def states1():
    global current_state
    current_state=False
    return  jsonify("Logged out")

if __name__ == "__main__":
    app.run(debug=True, port=8080)