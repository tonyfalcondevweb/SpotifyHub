import { Router } from "express";
import {
  callback,
  getTopTracks,
  login,
  verifyToken,
} from "../Middlewares/SpotifyMiddleware.js";

const router = Router();

router.get("/login", login, (req, res) => {
  res.redirect(req.authUrl);
});

router.post("/logout", (req, res) => {
  res.clearCookie("spotifyAccessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  res.send("Cookie supprimé");
});

router.get("/callback", callback, (req, res) => {
  res.cookie("spotifyAccessToken", req.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600 * 1000,
  });

  res.redirect(process.env.REDIRECT_FRONT + "/top10");
});

router.get("/verify-token", verifyToken, (req, res) => {
  res.json({
    isValid: true,
    user: req.user,
  });
});

router.get("/top-tracks", getTopTracks, (req, res) => {
  res.json({
    topTracks: req.topTracks,
    recommendations: req.recommendations,
  });
});

export default router;
