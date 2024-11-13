import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSpotify from "./Components/Forms/LoginSpotify";
import Result from "./Components/Result";
import NotFound from "./Components/NotFound";
import SpotifyAccessRoutes from "./Routes/SpotifyAccesRoutes";
import { SpotifyProvider } from "./Contexts/SpotifyContext";
import PublicRoutes from "./Routes/PublicRoutes";


function App() {
  return (
    <SpotifyProvider>
      <Router>
        <Routes>
          <Route element={<SpotifyAccessRoutes />}>
            <Route path="/top10" element={<Result />} />
          </Route>
          
          <Route element={<PublicRoutes />}>
          <Route path="/" element={<LoginSpotify />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </SpotifyProvider>
  );
}

export default App;
