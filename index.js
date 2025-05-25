const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "ejs"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/play", async (req, res) => {
    try {
        const response = await axios.get("https://random-word-api.herokuapp.com/word?number=1&length=5");
        const word = response.data[0].toUpperCase(); // Ensure uppercase for uniform comparison
        res.render("play", { word });
    } catch (error) {
        console.error("Error fetching word:", error);
        res.status(500).send("Failed to fetch word.");
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
