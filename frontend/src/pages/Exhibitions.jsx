import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function Exhibitions() {
  const API_URL = import.meta.env.VITE_API_URL;

  const { t, i18n } = useTranslation();
  const [exhibitions, setExhibitions] = useState([]);
  const token = localStorage.getItem("token"); // optional if your endpoint needs auth

  useEffect(() => {
    axios
      .get(`${API_URL}/api/exhibitions`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((res) => setExhibitions(res.data))
      .catch((err) => console.error("Failed to fetch exhibitions:", err));
  }, [token]);

  return (
    <main className="flex-1 p-8 md:p-12">
      <h2 className="text-5xl font-artist mb-8 border-b border-neutral-200 pb-4 text-center">
        {t(`sidebar.exhibitions`)}
      </h2>

      <div className="max-w-3xl mx-auto space-y-6">
        {exhibitions.map((expo, i) => (
          <Link
            key={i}
            to={`/artworks?exhibition=${expo.id}`}
          >
            <div className="p-6 mb-4 rounded-2xl shadow-sm bg-white border border-gray-100 hover:shadow-md hover:bg-red-50 transition text-center cursor-pointer">
              <h3 className="text-4xl font-semibold text-red-700 mb-2">
                {expo.name[i18n.language] || expo.name_en}
              </h3>
              <p className="text-gray-700 text-3xl">
                <span className="font-medium">{t(`context.date`)}:</span>{" "}
                {i18n.language === "bg" ? expo.date_bg : expo.date_en}
              </p>
              <p className="text-gray-700 text-3xl">
                <span className="font-medium">{t(`context.place`)}:</span>{" "}
                {expo.place[i18n.language] || expo.place_en}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
