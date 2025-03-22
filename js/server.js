require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;

app.get("/get-image", async (req, res) => {
    try {
        const response = await axios.get("https://api.unsplash.com/photos/random", {
            headers: { Authorization: `Client-ID ${UNSPLASH_API_KEY}` },
            params: { query: "meme", orientation: "landscape" }
        });

        res.json({ imageUrl: response.data.urls.regular });
    } catch (error) {
        console.error("Error fetching image:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch image from Unsplash API" });
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
