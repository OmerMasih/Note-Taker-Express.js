// Npm packages that we will use to give our server useful functionality

const express = require("express");
const routeApi = require("./router/routeApi.js");
const routeHtml = require("./router/routeHtml.js");

// Creating an "express" server
const app = express();

// Setting an initial port to be used in our listner.
const PORT = process.env.PORT || 3001;

// Setting up the Express app to handle data parsing

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./Develop/public"));

// Sitting the routes to give our server a "map" of how to respond when users visit or request data from various URLs.

app.use("/api", routeApi);
app.use("/", routeHtml);

// LISTENER
app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));
