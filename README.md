# MyReads Project

This project created for Udacity's React Fundamentals course. 
this code created from scratch and bootstraped by [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) You can find more information on how to perform common tasks [here](https://github.com/facebook/create-react-app/blob/main/packages/cra-template/template/README.md).

## Project requirements:

- you need ro install `git` then open cmd and run `git clone https://github.com/MahmoudY3c/nd0191-c1-myreads.git`
- after cloning open the project folder `cd nd0191-c1-myreads`
- install all project dependencies with `npm install`
- start the development server with `npm start`

## Project Structure

```bash
├── README.md.
├── package.json
├── public
│   ├── favicon.ico 
│   └── index.html 
└── src
    ├── components
    │   ├── book-item.js #A component to diplay book item
    │   └── section.js #A component to create a new section
    │── lib
    │   └── font-awesome
    │       └── 5.15.3
    │           │── css
    │           │   └── all.min.css
    │           └── webfonts > "font-awesome fonts"
    ├── API
    │   ├── BooksAPI # A JavaScript API for the provided Udacity backend for info about usage check https://github.com/udacity/nd0191-c1-myreads#backend-server
    │   └── Methods #A fIle includes all required methods to update, get book from Udacity API by BooksAPI
    ├── Screenshots #some screens for project
    ├── App.css #Page Style
    ├── App.js # Main Page Component
    ├── search.js # Search Page Component.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```


## Screenshoots

  While Connection error occure display error message
  ==========
 
 ![Screenshot](./src/screenshots/1.PNG)
 
 While Provided keyword isn't match display Sorry `{userQuery}` isn't exist try something like React
 ==========
 
 ![Screenshot](./src/screenshots/4.PNG)
 
 Main page 
 ==========
 
![Screenshot](./src/screenshots/2.PNG)

 While change book shelf display please wait message 
 ==========
 
![Screenshot](./src/screenshots/3.PNG)

 Search page
 ==========
 
 ![Screenshot](./src/screenshots/5.PNG)

