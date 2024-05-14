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
                return jsonify({"message": "Login Successful"}, {"rollno":rollno})
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
def register3():
    FoundItems = db['found_items']
    try:
        email = request.form.get('email')
        phone = request.form.get('phone_no')
        rollno = request.form.get("roll_no")
        location = request.form.get("location")
        fdate = request.form.get("fdate")
        itemtype = request.form.get("itemtype")
        itemdescription = request.form.get("itemdescription")
        image_data=request.form.get("image")


        if (email is not None and email.strip() and
            phone is not None and phone.strip() and
            rollno is not None and rollno.strip() and
            location is not None and location.strip() and
            fdate is not None and fdate.strip() and
            itemtype is not None and itemtype.strip() and
            itemdescription is not None and itemdescription.strip() and
            image_data is not None and  image_data.strip()):

            found_item_id = FoundItems.insert_one(
                {
                    "Email": email,
                    "PhoneNo": phone,
                    "RollNo": rollno,
                    "Location": location,
                    "DateFound": fdate,
                    "ItemDescription" : itemdescription,
                    "ItemType": itemtype,
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
    

@app.route("/api/found_items", methods=["GET"])
def get_found_items():
    FoundItems = db["found_items"]
    try:
        found_item = list(FoundItems.find({},{'_id' : 0}))
        return jsonify({"found_item": found_item}), 200
    except Exception as e:
        return jsonify({"message": "An error occurred while processing the request", "error": str(e)}), 500



@app.route("/api/state", methods=["GET"])
def states():
    global current_state
    return  jsonify(current_state)

@app.route("/api/logout_state" , methods=["POST"])
def states1():
    global current_state
    current_state=False
    return  jsonify("Logged out")


@app.route("/api/update", methods=["POST"])
def update():
    History = db["Lost_History"]
    Items = db["lost_items"]
    email = request.form.get('email')
    phone = request.form.get('phone_no')
    rollno = request.form.get("roll_no")
    location = request.form.get("location")
    ldate = request.form.get("ldate")
    itemtype = request.form.get("itemtype")
    itemdescription = request.form.get("itemdescription")
    image =  request.form.get("image")
    print(email,phone,rollno,location,ldate,itemtype,itemdescription)
    try:
        delete_query = {
            "Email": email,
            "PhoneNo": phone,
            "RollNo": rollno,
            "Location": location,
            "DateLost": ldate,
            "ItemType": itemtype,
            "ItemDescription": itemdescription
        }

        result = Items.delete_one(delete_query)

        History.insert_one({
            "Email": email,
            "PhoneNo": phone,
            "RollNo": rollno,
            "Location": location,
            "DateLost": ldate,
            "ItemType": itemtype,
            "ItemDescription": itemdescription,
            "Image" : image
        })

        if result.deleted_count == 1:
            print("Document deleted successfully")
            return jsonify({"message": "Document deleted successfully"}), 200
        else:
            print("Document not found for deletion")
            return jsonify({"message": "Document not found for deletion"}), 404
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/update_from_found",methods=["POST"])
def update_fron_found():
    History = db["Found_History"]
    Items = db["found_items"]
    email = request.form.get('email')
    phone = request.form.get('phone_no')
    rollno = request.form.get("roll_no")
    location = request.form.get("location")
    ldate = request.form.get("ldate")
    itemtype = request.form.get("itemtype")
    itemdescription = request.form.get("itemdescription")
    image =  request.form.get("image")
    print(email,phone,rollno,location,ldate,itemtype,itemdescription)
    try:
        delete_query = {
            "Email": email,
            "PhoneNo": phone,
            "RollNo": rollno,
            "Location": location,
            "DateLost": ldate,
            "ItemType": itemtype,
            "ItemDescription": itemdescription
        }

        result = Items.delete_one(delete_query)

        History.insert_one({
            "Email": email,
            "PhoneNo": phone,
            "RollNo": rollno,
            "Location": location,
            "DateLost": ldate,
            "ItemType": itemtype,
            "ItemDescription": itemdescription,
            "Image" : image
        })

        if result.deleted_count == 1:
            print("Document deleted successfully")
            return jsonify({"message": "Document deleted successfully"}), 200
        else:
            print("Document not found for deletion")
            return jsonify({"message": "Document not found for deletion"}), 404
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
    
@app.route("/api/check_role", methods=["GET"])
def check_role():
    sessions = db['Session_State']
    try:
        session = sessions.find_one({"Logged_in_IDS": request.headers.get("Roll-No")})
        if session:
            role = session.get("role")
            return jsonify({"role": role}), 200
        else:
            return jsonify({"role": None}), 200
    except Exception as e:
        return jsonify({"message": "An error occurred while processing the request", "error": str(e)}), 500



@app.route("/api/found_history", methods=["GET"])
def get_found_items_history():
    FoundHistory = db["Found_History"]
    try:
        found_history = list(FoundHistory.find({},{'_id' : 0}))
        return jsonify({"found_history": found_history}), 200
    except Exception as e:
        return jsonify({"message": "An error occurred while processing the request", "error": str(e)}), 500

@app.route("/api/lost_history", methods=["GET"])
def get_found_items_history():
    LostHistory = db["Lost_History"]
    try:
        lost_history = list(LostHistory.find({},{'_id' : 0}))
        return jsonify({"found_history": lost_history}), 200
    except Exception as e:
        return jsonify({"message": "An error occurred while processing the request", "error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=8080)