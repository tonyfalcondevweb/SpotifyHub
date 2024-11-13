import React from "react";

const TopSong = ({ topSongs }) => {
  const handleLink = (url) => {
    window.open(url.spotify, "_blank");
  };

  return (
    <div className="bg-slate-800 h-full p-4 shadow-lg rounded-lg">
      <h2 className="text-xl py-3 font-semibold mb-3 text-center text-white">
        Top 10
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-600">
          <thead>
            <tr>
              <th className="text-left text-gray-200">#</th>
              <th className="text-left text-gray-200">Couverture</th>
              <th className="text-left text-gray-200">Titre</th>
              <th className="text-left text-gray-200">Artiste(s)</th>
              <th className="text-left text-gray-200">Popularité</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-600">
            {topSongs.slice(0, 10).map((song, index) => (
              <tr
                key={song.id}
                onClick={() => handleLink(song.external_urls)}
                className="hover:bg-slate-600 hover:cursor-pointer"
              >
                <td className="p-3 text-gray-400 text-lg font-semibold">
                  {index + 1}
                </td>
                <td className="p-3">
                  <img
                    src={song.album.images[0].url}
                    alt={`${song.name} cover`}
                    className="w-12 h-12 rounded-md"
                  />
                </td>
                <td className="p-3 text-gray-200 font-medium w-32 truncate">
                  {song.name}
                </td>
                <td className="p-3 text-gray-400 text-sm w-32 truncate">
                  {song.artists.map((artist) => artist.name).join(", ")}
                </td>
                <td className="p-3">
                  <div className="w-16 h-4 bg-gray-600 border-2 border-slate-500 rounded-full relative">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: `${song.popularity}%` }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-white">
                        {song.popularity}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSong;
