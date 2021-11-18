## CookBook Web App

**Create and save your or your family's recipes, and share them with the world!**

CookBook is the final project for the advanced program focused on Web Programming for Holberton School and was the opportunity to abstract and put in action the interoperability of the main concepts learned these last months, train the ability to estimate, design, develop and deliver a feature set, and to understand what it means when a piece of software is in production!

With this in mind, I decided to build a simple, straightforward, and easy-to-use web application where users can create/read/update/delete recipes and check/save others, with a fullscreen recipe version to use while cooking or in the supermarket. Also, users can create and save grocery lists.

#### Technologies and third-party services used:

- **API/Server:** NodeJS, ExpressJS
- **Auth:** JWT, PassportJS
- **Assets manager:** Cloudinary
- **Databases:** MongoDB Atlas, Mongoose
- **FrontEnd:** NextJS, React
- **CSS:** Bootstrap, CSS Modules, Downshift library

---

#### To use:

- `$ git clone https://github.com/tatsOre/cookbook.git`
- Terminal 1: cd to /server and `npm run dev`
- Terminal 2: cd to /client and `npm run dev`

---

### Mockups: [Link](https://balsamiq.cloud/svyqg1u/p83jzmk/rAD9C)

---

### Screenshots:

#### Index and Login pages:

![index-page](https://github.com/tatsOre/cookbook/blob/master/client/public/readme_assets/02_Save_Favs.jpg "Index Page") ![login-page](https://github.com/tatsOre/cookbook/blob/master/client/public/readme_assets/05_Login_Page.jpg "Login Page")

#### Search recipes and Recipe View:

![search-feature](https://github.com/tatsOre/cookbook/blob/master/client/public/readme_assets/10_Search_Bar.jpg "Search Recipes") ![recipe-post](https://github.com/tatsOre/cookbook/blob/master/client/public/readme_assets/03_Recipe_Post.jpg "Recipe Post Page")

#### Cooking Mode (Fullscreen view) and User Menu:

![cook-mode](https://github.com/tatsOre/cookbook/blob/master/client/public/readme_assets/04_Cook_Mode.jpg "Cook Mode") ![user-menu](https://github.com/tatsOre/cookbook/blob/master/client/public/readme_assets/06_Menu_Mobile.jpg "User Menu")

#### Save Grocery Lists and User Dashboard (Recipes, Favorites and Shopping Lists with contextual search):

![save-lists](https://github.com/tatsOre/cookbook/blob/master/client/public/readme_assets/12_Create_ShopLists.jpg "Save Shopping Lists") ![user-dashboard](https://github.com/tatsOre/cookbook/blob/master/client/public/readme_assets/09_User_Dashboard_ShopLists.jpg "User Dashboard")

#### Create Recipes. Step One and Step Two:

## ![create-step-1](https://github.com/tatsOre/cookbook/blob/master/client/public/readme_assets/08_Create_Recipe_Ing.jpg "Create Step One") ![create-step-2](https://github.com/tatsOre/cookbook/blob/master/client/public/readme_assets/08_Create_Recipe_Steps.jpg "Create Step Two")

### Known bugs:

- Google Auth is partially implemented.
- Due to the cookie implementation, the app doesn't work properly on iPhones.

---

### What to improve in the future?

- Auth strategies and cookies implementation.
- Implement update/maintain states for shopping lists.
- Implement reset password flow.
- UI and UX
- Routing and feedback messages for the users.
- Testing

### About me:

[LinkedIn](https://www.linkedin.com/in/tatiana-orejuela-zapata/) | [Github](https://github.com/tatsOre)

##### Advanced Program - Web Stack programming ― Final Project

##### October, 2021.
