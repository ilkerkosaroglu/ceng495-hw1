# ceng495-hw1
You can find the public URL here: https://ecom-ceng495-ilker.onrender.com

## Frontend stack:
React (Frontend framework)
React router (routing)
zustand (State management)
Blueprintjs (ui components)
Typescript
Axios

## Backend Stack:
Node
Express
Typescript


# How you can use this site:

### Login: 
Click the login button on top right.

### Admin credentials:
username: admin
password: test

## Creating users (admin):
If you are an admin you can create users in the login page accessible after logging in, through the dashboard.
Dashboard is reachable from the button on the top right.

## Deleting users (admin):
You can delete users from the dashboard page.

## Creating products (admin):
Create products by following the link in the dashboard.
You can fill the form and submit it, and the new product will be created.

## Deleting products (admin):
You can delete a product by clicking on the trash button inside the product card.

## Review & Rate:
You can review & rate products by clicking on the product by browsing the categories from the main page.


Design decisions:

Database has two collections, users and products.
Users have their reviews field, that holds the reviews created by this user.

All the queries are done in one operation, with the exception of editing the reviews, since upsert didn't work on that one due to reviews being an embedded array.

Average ratings of users are calculated on the spot when requested.

Average ratings of products are calculated on the spot as well.