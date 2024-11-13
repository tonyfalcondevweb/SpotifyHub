import axios from "axios";

export const urlVerifyToken = "/verify-token"
export const urlGetTopSongs = "/top-tracks"
export const urlLogout = "/logout"



export const verifyTokenSpotify = () => {
    return axios.get(urlVerifyToken, { withCredentials: true });
}

export const getTopSongs = () => {
    return axios.get(urlGetTopSongs, { withCredentials: true });
}

export const logout = () => {
    return axios.post(urlLogout);
}