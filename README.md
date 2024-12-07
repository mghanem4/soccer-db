# Soccer Database Project - COMP 3005 Final Project (Dec. 6th, 2024)

This project aims to create a soccer database designed to track player performance, team achievements, and manager success within various leagues. Soccer teams and analysts need a reliable and flexible way to analyze historical and real-time data on players, teams, and managers. This database will help clubs and fans to understand soccer metrics at a deeper level, allowing for advanced performance analysis and decision-making. The motivation behind this project comes from the complexity of soccer statistics and my passion for my Spanish soccer club (FC Barcelona). With players moving between teams, managers coaching multiple teams over their careers, and clubs participating in multiple leagues, tracking these relationships and statistics over time becomes cumbersome. This database will solve this problem by allowing users to easily access and analyze detailed soccer statistics.

# Youtube Link for the video demonstration

https://youtu.be/0Hq3vAK5Rsc

This project consists of two parts:  
1. **Client**: A React-based frontend with Material-UI (helps with responsivity of the website).  
2. **Server**: A Node.js backend with SQLite3, using Express for routing.

## Step 1: Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (version 16 or higher recommended)
- **npm** (comes with Node.js)

## Setup Instructions

Follow these steps to set up and run the project:


### Step 2: Install dependencies

Navigate to the project directories and run the following command to install all dependencies:

1. **Client**: Navigate to the client directory to install all dependencies
```bash
cd client
npm install
```
(2.1) Start the client
Start the client by running the following command
```bash
npm start
```

2. **Server**: Navigate to the server directory to install all dependencies
```bash
cd ../server 
npm install
```
(2.1) Start the server
Start the server by running the following command
```bash
npm run dev
```



### Step 3: Configure Environment Variables
If not present (should be there), create a `.env` file in the root directory of the project to store environment variables.
```MAKEFILE
PORT=5000
DATABASE_FILE=./soccer.db
```

### Step 4: SQLite3 Database.
The server uses SQLite3 for database operations. The database file is will NOT be created automatically when the app starts, you need to manually run the .sql files.
The SQL files are present in the server/database directory
Please navigate to:
```bash
cd server/database
```
You will find the file soccer.db there with the sqlite3 initializer.

Additionally, you may choose to run the data given with this folder. You have a python script that runs SQL command to insert data from csv or excel files. To do so, navigate to:

```bash
cd server/database/read_data_py
python3 insertData.py
```
This will insert the data from the csv or excel files into the database.

This app was done using React, some code was directly extracted from the React website.

The server was done using Node.js and Express.js.
The database was done using SQLite3. 
This project uses the dependency sqlite3 to use SQL queries.



# Below is information regarding using React:

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
