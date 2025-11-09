import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ArtworkCard from "../components/ArtworkCard";

export default function Artworks() {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const [artworksData, setArtworksData] = useState([]);
  const [exhibitionsData, setExhibitionsData] = useState([]);
  const [selectedExpo, setSelectedExpo] = useState("All");
  const [showAllExpos, setShowAllExpos] = useState(false);

  // Fetch artworks and exhibitions from API
  useEffect(() => {
    // Fetch exhibitions
    fetch("http://localhost:8000/api/exhibitions")
      .then(res => res.json())
      .then(data => setExhibitionsData(data))
      .catch(err => console.error("Error fetching exhibitions:", err));

    // Fetch artworks
    fetch("http://localhost:8000/api/artworks")
      .then(res => res.json())
      .then(data => setArtworksData(data))
      .catch(err => console.error("Error fetching artworks:", err));
  }, []);

  // Check URL for exhibition filter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const expoFromURL = params.get("exhibition");
    if (expoFromURL) setSelectedExpo(parseInt(expoFromURL)); // convert to number
  }, [location.search]);

  // Filter artworks by selected exhibition
  const filteredArtworks =
    selectedExpo === "All"
      ? artworksData
      : artworksData.filter((art) => art.exhibition === selectedExpo);

  // Limit exhibition buttons display
  const visibleExpos = showAllExpos ? exhibitionsData : exhibitionsData.slice(0, 5);

  return (
    <main className="flex-1 p-8 md:p-12">
      <h2 className="text-5xl font-artist mb-8 border-b border-neutral-200 pb-4 text-center">
        {t(`sidebar.artworks`)}
      </h2>

      {/* Exposition filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {/* All button */}
        <button
          onClick={() => setSelectedExpo("All")}
          className={`px-4 py-2 rounded-full font-semibold text-lg transition ${
            selectedExpo === "All"
              ? "bg-red-700 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {t(`context.all`)}
        </button>

        {/* Exhibition buttons */}
        {visibleExpos.map((expo) => (
          <button
            key={expo.id}
            onClick={() => setSelectedExpo(expo.id)}
            className={`px-4 py-2 rounded-full font-semibold text-lg transition ${
              selectedExpo === expo.id
                ? "bg-red-700 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-red-100 hover:text-red-700"
            }`}
          >
            {expo.name[i18n.language] || expo.name.en}
          </button>
        ))}

        {/* Show more / show less button */}
        {exhibitionsData.length > 5 && (
          <button
            onClick={() => setShowAllExpos(!showAllExpos)}
            className="px-4 py-2 rounded-full font-semibold text-lg bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700"
          >
            {showAllExpos
              ? t(`context.show_less`)
              : `+${exhibitionsData.length - 5} ${t(`context.show_more`)}`}
          </button>
        )}
      </div>

      {/* Masonry layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredArtworks.map((art, i) => (
          <ArtworkCard key={i} {...art} />
        ))}
      </div>
    </main>
  );
}
