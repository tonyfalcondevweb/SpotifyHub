import express from "express";
import spotifyRoutes from "./Routes/SpotifyRoutes.js";
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 5000;


app.use(express.json());
app.use(cookieParser());


// Route principale
app.get("/", (req, res) => {
  res.send("Bienvenue sur mon API Express déployée sur Vercel!");
});

app.get("/home", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});

app.use("/spotify", spotifyRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Une erreur est survenue !');
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
  });
}
export default app;
