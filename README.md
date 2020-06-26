# Evendo Backend

## 1. Welcome
to our Evendo Backend git repository.

## 2. Installation
If you want to use our app, you don't have to install the backend yourself. But if you want: nothing is impossible.

### 2.1 Requirements
MySQL and NodeJS installed, minimum of 200MB free RAM

### 2.2 Installation
You have to take the .sql file out of this git repository and import it into your MySQL database. 
Afterwards you can simply clone the code to your computer and run ```npm install```.
Now you have to create a folder "config" in the root directory of the project and create a file called "nitradoSQL.json".
In this file you have to insert the following format for connecting your backend to your database:
```
{
    "host": "host",
    "user": "username",
    "password": "password",
    "database": "database"
}
```
Important notice: Our project uses bcrypt node module. This module is known for it's os dependency. Because of that the login process might not work. To get this up and running simple use ```npm install bcrypt```.
Afterwards you should be able to start the backend server. If you want to use your backend server in our Android application, you have to clone our Evendo Repository and change all url's in source code.

### 2.3 Troubleshooting
If you have further questions please feel free to ask us.

## 3. License
This project is released under MIT License.
