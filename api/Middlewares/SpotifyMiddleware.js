import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

export const login = (req, res, next) => {
  const scopes = "user-top-read user-read-email";
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}`;

  req.authUrl = authUrl;
  next();
};

export const callback = async (req, res, next) => {
  const code = req.query.code;
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const data = new URLSearchParams({
    code: code,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
    client_id: clientId,
    client_secret: clientSecret,
  });

  try {
    const response = await axios.post(tokenUrl, data.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    req.accessToken = response.data.access_token;

    next();
  } catch (error) {
    console.error("Erreur lors de l'authentification:", error);
    res.status(500).send("Erreur lors de l'authentification.");
  }
};

export const verifyToken = async (req, res, next) => {
  const accessToken = req.cookies.spotifyAccessToken;

  if (!accessToken) {
    return res.status(401).json({ isValid: false });
  }

  try {
    const userResponse = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    req.user = {
      id: userResponse.data.id,
      displayName: userResponse.data.display_name,
      email: userResponse.data.email,
    };

    next();
  } catch (error) {
    console.error("Erreur lors de la vérification du token:", error);
    return res.status(401).json({ isValid: false });
  }
};

export const getTopTracks = async (req, res, next) => {
  const accessToken = req.cookies.spotifyAccessToken;

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Non authentifié. Token manquant." });
  }

  try {
    // Requête top 10
    const topTracksResponse = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: 10,
          time_range: "medium_term",
        },
      }
    );

    const topTracks = topTracksResponse.data.items;

    // Extrait les IDs du top10 en pprenant 5 song a partir de 0
    const seedTracks = topTracks.slice(0, 5).map((track) => track.id);

    // Requête recommandations
    const recommendationsResponse = await axios.get(
      "https://api.spotify.com/v1/recommendations",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          seed_tracks: seedTracks.join(","), // id séparés par des virgules
          limit: 5,
        },
      }
    );

    const recommendations = recommendationsResponse.data.tracks;

    req.topTracks = topTracks;
    req.recommendations = recommendations;

    next();
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du top 10 ou des recommandations :",
      error
    );
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des données." });
  }
};
