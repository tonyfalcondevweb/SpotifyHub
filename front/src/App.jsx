import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSpotify from "./Components/Forms/LoginSpotify";
import { SpotifyProvider } from "./Contexts/SpotifyContext";
import SpotifyAccessRoutes from "./Routes/SpotifyAccesRoutes";
import Result from "./Components/Result";
import PublicRoutes from "./Routes/PublicRoutes";
import NotFound from "./Components/NotFound";

function App() {
  return (
    <SpotifyProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>

            <Route path="/top10" element={<Result />} />


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
