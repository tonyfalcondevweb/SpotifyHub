import spotifyLogo from "/Primary_Logo_White_RGB.svg";
import Container from "../Commons/Container";
import { flexCenterFull } from "../../Utils/Const";

const LoginSpotify = () => {

  const apiUrlLogin = import.meta.env.VITE_BACKEND_URL_LOGIN

  return (
    <Container className={flexCenterFull}>
      <div className="px-10 py-6 pb-10 space-y-16 flex flex-col items-center bg-slate-800 text-white border-2 border-slate-500 rounded-lg">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
          Connectez-vous avec Spotify
        </h1>
        <div>
          <a
            href={apiUrlLogin}
            className="h-16 border-2 border-slate-200 flex flex-row justify-center items-center space-x-4 px-4 pe-6 text-white transition-transform duration-200 ease-in-out transform rounded-full bg-green-700 hover:bg-green-600 hover:scale-110"
            aria-label="Connectez-vous avec Spotify"
          >
            <img
              className="h-10 transition-transform duration-200 transform hover:scale-110"
              src={spotifyLogo}
              alt="logo spotify"
            />
            <span className="h-full flex items-center justify-center text-lg font-medium transition-transform duration-200 transform hover:scale-105">
              Se connecter
            </span>
          </a>
        </div>
      </div>
    </Container>
  );
};

export default LoginSpotify;
