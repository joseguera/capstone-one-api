# NomNoms App
NomNoms allows users to create recipes and modifications to foods based on their dietary choice.



### 1. Working Prototype
You can access a working prototype of the React app here: https://nomnoms-app.vercel.app/ and Node app here: https://nomnoms-app.herokuapp.com/



### 2. User Stories
This app is for two types of users: a visitor and a logged-in user

###### Landing/Home Page
* As a visitor
* I want to understand what I can do with this app (or sign up, or log in) so I can decide if I want to use it

###### Login Page
* As a returning register user
* I want to enter my password and username to use this app, so I can have access to my account.

###### Sign Up/Registration Page
* As a visitor
* I want to register to use this app so I can create a personal account.

###### My Noms Page
* As a logged-in user,
* I want to be able to view the "My Noms" page of the app, so I can decide if I want to create my own "noms" or edit and delete existing ones.



### 3. Functionality
The app's functionality includes:
* Every User has the ability to create an account
* Every User has the ability to view the noms in the "My Noms" page
* Every User has the ability to "Add" a nom
* Every User has the ability to "Edit" a nom
* Every User has the ability to "Delete" a nom



### 4. Technology
* Front-End: HTML5, CSS3, JavaScript ES6, React
* Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, PostgreSQL 
* Development Environment: Vercel, Heroku, DBeaver



### 5. Wireframes
Landing/Home Page
:-------------------------:
![Landing/Home Page](/github-images/wireframes/landing-home-page.jpg)
Login Page
![Login Page](/github-images/wireframes/sign-in-page.jpg)
Sign Up/Registration Page
![Sign Up/Registration Page](/github-images/wireframes/sign-up-registration-page.jpg)
My Noms Page
![My Noms Page](/github-images/wireframes/your-noms-page.jpg)

#### Graybox Wireframes
Landing/Home Page
:-------------------------:
![Landing/Home Page](/github-images/graybox-wireframes/home-page.png)
Login Page
![Login Page](/github-images/graybox-wireframes/login-page.png)
Sign Up/Registration Page
![Sign Up/Registration Page](/github-images/graybox-wireframes/sign-up-form.png)
My Noms Page
![My Noms Page](/github-images/graybox-wireframes/your-noms-page.png)



### 6. Front-end Structure - React Components Map
* __Index.js__ (stateless)
    * __App.js__ (stateful)
        * __Header.js__ (stateless)
            * __LoginPage.js__ (stateless) -
                * __LoginForm.js__ (stateful) - gets the _"error"_ from the __App.js__
            * __RegistrationPage.js__ (stateless) -
                * __RegistrationForm.js__ (stateful) - gets the _"error"_ from the __App.js__
        * __Navigation.js__ (stateless)
            * __Home.js__ (stateless)
                * __NotFoundPage.js__ (stateless)
                * __AddNom.js__ (stateful) - gets the _"error"_ from the __App.js__
                * __NomList.js__ (stateful) gets the _"noms"_ from the __App.js__
                    * __NomPage.js__ (stateful) context consumer from __App.js__
                    * __NomItem.js__ (stateful) - context consumer from __App.js__
                        * __EditNom.js__ (stateful) - context consumer from __App.js__



### 7. Back-end Structure - Business Objects
* nom_users (database table)
    * id (auto-generated)
    * full name (user-generated)
    * username (user-generated)
    * password (at least one number, one lowercase and one uppercase letter at least eight characters that are letters, numbers or the underscore)
    * date_created (auto-generated)

* noms (database table)
    * id (auto-generated)
    * nom_name (user-generated)
    * sub (user-generated)
    * url (user-generated)
    * description (user-generated)
    * author (foreign key - nom_users id)
    * date_created (auto-generated)
    * style (user-selects from two options: "Nom" or "Recipe")



### 8. API Documentation (to do later)
API Documentation details:
* GET All Noms
    * `https://nomnoms-app.herokuapp.com/api/noms/`

* GET One Nom
    * `https://nomnoms-app.herokuapp.com/api/noms/12`

* POST Nom
    * `https://nomnoms-app.herokuapp.com/api/noms/`
        * JSON body
        *   { "nom_name": "Nature's Own 100% Whole Wheat Hot Dog Buns", "sub": "bread", "url": `"https://www.naturesownbread.com/natures-own/100-whole-wheat-hot-dog-buns"`, "description": "Each soft bun contains a whopping 22 grams of whole grains and 3 grams of fiber. They’re the perfect complement to your favorite hot dog or sausage.", "author": 1, "style": "Recipe"
            }

* POST User
    * `https://nomnoms-app.herokuapp.com/api/users`
        * JSON body
        *   { "fullname": "Hello Day", "username": "hello-day", "password": "Nico0809!" }

* PATCH One Nom
    * `https://nomnoms-app.herokuapp.com/api/noms/12`
        * JSON body
        *   { "nom_name": "Nature's Own 100% Whole Wheat Hot Dog Buns", "sub": "bread", "url": `"https://www.naturesownbread.com/natures-own/100-whole-wheat-hot-dog-buns"`, "description": "New bread.", "author": 1, "style": "Nom" }

* DELETE One Nom
    * `https://nomnoms-app.herokuapp.com/api/noms/12`



### 9. Screenshots
Landing/Home Page
:-------------------------:
![Landing/Home Page](/github-images/screenshots/home-page-screen.png)
Login Page
![Login Page](/github-images/screenshots/login-screen.png)
Sign Up/Registration Page
![Sign Up/Registration Page](/github-images/screenshots/register-screen.png)
My Noms Page
![My Noms Page](/github-images/screenshots/my-noms-screen.png)



### 10. Development Roadmap
This is v1.0 of the app, but future enhancements are expected to include:
* Rate my Nom
* Date when "Nom" or "Recipe" was last updated
* Sort/Filter Nom:
  * Alphabetically
  * By "Nom" or "Recipe"
  * By rating
  * By date
* Ability to upload an image to "Nom" or "Recipe"
* Ability to export a "Nom" or "Recipe" into a PDF or printer  



### 11. How to run it
Use command line to navigate into the project folder and run the following in terminal

##### Local React scripts
* To install the react project ===> npm install
* To run react (on port 3000) ===> npm start
* To run tests ===> npm run test

##### Local Node scripts
* To install the node project ===> npm install
* To migrate the database ===> npm run migrate -- 1
* To run Node server (on port 8000) ===> npm run dev
* To run tests ===> npm run test
