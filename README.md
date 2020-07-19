# server-pizza-ordering
> A backend for the Pizza Ordering App. Track Orders

Live https://express-pizza-ordering-system.herokuapp.com/

## Install Dependencies
Install dependencies on project directory, run:

```
npm install
```

## Usage
Create .env file on project directory, and add:  
MONGO_USER=YOUR MONGO USER GOES HERE  
MONGO_PASSWORD=YOUR MONGO PASSWORD GOES HERE  
MONGO_DB=YOUR DB NAME GOES HERE  
SECRET_KEY=A KEY FOR JSONWEBTOKEN  

## Demo
To run the project, on the project directory run:
```
npm run server
```

A backend for the pizza ordering system that tracks orders

ADMIN ROLE
- Can add new pizza to menu
- Can remove a pizza from menu
- Can view all orders

USER ROLE
- Can make orders, and can see all of their previous orders

GUEST ROLE
- Can make orders as a guest. No history of orders