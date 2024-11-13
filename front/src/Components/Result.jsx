import React, { useState, useEffect } from "react";
import Container from "./Commons/Container";
import Loading from "./Commons/Loading";
import { getTopSongs, logout } from "../Api/Api";
import TopSong from "./TopSong";
import Recommendation from "./Recommendation";
import Button from "./Commons/Button";

const Result = () => {
  const [loading, setLoading] = useState(true);
  const [topSongs, setTopSongs] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      getTopSongs()
        .then((response) => {
          setTopSongs(response.data.topTracks);
          setRecommendations(response.data.recommendations);
          setDataFetched(true);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des chansons :", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dataFetched]);

  const handleLogout = () => {
    logout()
      .then((response) => {
        console.log(response.data);
        const logoutWindow = window.open(
          "https://accounts.spotify.com/logout",
          "_blank",
          "width=700,height=500"
        );

        // Ferme la fenêtre après quelques secondes
        setTimeout(() => {
          logoutWindow.close();
          window.location.href = "/";
        }, 300);
      })
      .catch((error) => {
        console.error("Erreur :", error);
      })
      .finally(() => {});
  };

  if (loading) return <Loading />;

  return (
    <Container className={"lg:flex lg:justify-evenly"}>
      <Recommendation recommendations={recommendations} />
      <TopSong topSongs={topSongs} />
      <Button
        classAdd="w-fit h-fit bg-slate-600 hover:bg-slate-700 transition-transform duration-200 ease-in-out transform hover:scale-110"
        onClick={handleLogout}
      >
        <i class="fa-regular p-2 fa-circle-xmark"></i>
      </Button>
    </Container>
  );
};

export default Result;
