import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ArtworkCard({ id, img, title }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const { i18n } = useTranslation();
  return (
    <Link to={`/artwork/${id}`}>
      <div className="break-inside-avoid mb-6 overflow-hidden  relative group cursor-pointer">
        <img
          src={`${API_URL}/api/artworks/${id}`}
          alt={title}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex items-center justify-center">
          <h3 className="opacity-0 group-hover:opacity-100 text-white text-5xl font-artist transition-opacity duration-500">
            {title[i18n.language]}
          </h3>
        </div>
      </div>
    </Link>
  );
}