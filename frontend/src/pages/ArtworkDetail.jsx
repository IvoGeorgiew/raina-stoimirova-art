import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function ArtworkDetail() {
  // const API_URL = import.meta.env.VITE_API_URL;
  const API_URL = ""

  const [artworksData, setArtworksData] = useState([]);
  const [exhibitionsData, setExhibitionsData] = useState([]);
  const { t, i18n } = useTranslation();
  const { id } = useParams();

  useEffect(() => {
    // Fetch exhibitions
    fetch(`${API_URL}/api/exhibitions`)
      .then(res => res.json())
      .then(data => setExhibitionsData(data))
      .catch(err => console.error("Error fetching exhibitions:", err));

    // Fetch artworks
    fetch(`${API_URL}/api/artworks`)
      .then(res => res.json())
      .then(data => setArtworksData(data))
      .catch(err => console.error("Error fetching artworks:", err));
  }, []);

  const artwork = artworksData.find((a) => a.id === parseInt(id));
  const exhibition = artwork ? exhibitionsData.find((e) => e.id === artwork.exhibition) : null;

  if (!artwork) return <div className="p-12 text-center">Artwork not found</div>;

  return (
    <div className="flex flex-col items-center min-h-screen p-8 md:p-16">
      {/* Image */}
      <div className="w-full md:w-5/6 lg:w-4/5 flex justify-center mb-8">
        <img
          src={artwork.img || `https://picsum.photos/600/400?random=${artwork.id}`}
          alt={artwork.title[i18n.language] || artwork.title.en}
          className="w-full h-auto max-h-[90vh] shadow-lg object-contain"
        />
      </div>

      {/* Title and Description */}
      <div className="w-full md:w-4/5 lg:w-3/4 flex flex-col items-center text-center">
        <h1 className="text-7xl font-artist mb-6">
          {artwork.title[i18n.language] || artwork.title.en}
        </h1>
        {exhibition && (
          <p className="text-4xl text-gray-700 mb-8">
            {exhibition.name[i18n.language] || exhibition.name.en}
          </p>
        )}
        <p className="text-4xl text-gray-700 mb-8">{artwork.size}</p>

        <Link
          to="/"
          className="text-red-700 hover:text-red-600 font-semibold text-2xl"
        >
          ← {t(`context.back_to_gallery`)}
        </Link>
      </div>
    </div>
  );
}
