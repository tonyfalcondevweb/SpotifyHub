import spotifyRoutes from "./Routes/SpotifyRoutes.js";
import express from "express";

const app = express();

// Middleware JSON
app.use(express.json());

// Route principale
app.get("/", (req, res) => {
  res.send("Bienvenue sur mon API Express déployée sur Vercel!");
});

app.get("/home", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});

app.use("/spotify", spotifyRoutes);

export default app;
