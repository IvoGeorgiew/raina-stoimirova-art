import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function AdminDashboard() {
  // const API_URL = import.meta.env.VITE_API_URL;
  const API_URL = ""

  const { t, i18n } = useTranslation();

  const [showExhibitionForm, setShowExhibitionForm] = useState(false);
  const [showArtworkForm, setShowArtworkForm] = useState(false);

  const [exhibitions, setExhibitions] = useState([]);

  // Exhibition form fields
  const [exhibitionNameEn, setExhibitionNameEn] = useState("");
  const [exhibitionNameBg, setExhibitionNameBg] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [placeEn, setPlaceEn] = useState("");
  const [placeBg, setPlaceBg] = useState("");

  const [artTitleEn, setArtTitleEn] = useState("");
  const [artTitleBg, setArtTitleBg] = useState("");
  const [artExhibition, setArtExhibition] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [file, setFile] = useState(null);

  // Success states
  const [exhibitionSuccess, setExhibitionSuccess] = useState(false);
  const [artworkSuccess, setArtworkSuccess] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch exhibitions to populate dropdown
    axios
      .get(`${API_URL}/api/exhibitions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setExhibitions(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  const months = [
    "Януари", "Февруари", "Март", "Април", "Май", "Юни",
    "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"
  ];
  const years = Array.from({ length: 30 }, (_, i) => 2000 + i);

  const submitExhibition = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/api/exhibitions`,
        {
          name_en: exhibitionNameEn,
          name_bg: exhibitionNameBg,
          date_month: parseInt(month),
          date_year: parseInt(year),
          place_en: placeEn,
          place_bg: placeBg,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Show success message and highlight button
      setExhibitionSuccess(true);
      setTimeout(() => setExhibitionSuccess(false), 3000);
  
      // Reset form
      setExhibitionNameEn("");
      setExhibitionNameBg("");
      setMonth("");
      setYear("");
      setPlaceEn("");
      setPlaceBg("");
    } catch (err) {
      console.error(err);
      alert("Грешка при добавяне на изложбата.");
    }
  };
  

  const submitArtwork = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title_en", artTitleEn);
      formData.append("title_bg", artTitleBg);
      formData.append("exhibition", artExhibition);
      formData.append("width", width);
      formData.append("height", height);
      if (file) formData.append("file", file);

      await axios.post(`${API_URL}/api/artworks`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setArtworkSuccess(true);
      setTimeout(() => setArtworkSuccess(false), 3000);

      setArtTitleEn("");
      setArtTitleBg("");
    //   setArtExhibition("");
      setWidth("");
      setHeight("");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Грешка при добавяне на произведение!");
    }
  };

  return (
    <div className="p-8 md:p-16">
      {/* Exhibition form toggle */}
      <button
        onClick={() => setShowExhibitionForm(!showExhibitionForm)}
        className={`mb-4 px-6 py-3 rounded font-semibold text-white ${
          exhibitionSuccess ? "bg-green-600" : "bg-blue-600"
        }`}
      >
        Добави изложба
      </button>
      {exhibitionSuccess && (
        <div className="mb-4 text-green-700 font-bold">
          Изложбата е добавена успешно!
        </div>
      )}
      {showExhibitionForm && (
        <form
          onSubmit={submitExhibition}
          className="mb-8 p-6 border rounded shadow-sm bg-gray-50 space-y-4"
        >
          <input
            value={exhibitionNameEn}
            onChange={(e) => setExhibitionNameEn(e.target.value)}
            placeholder="Име на изложба (EN)"
            required
            className="w-full p-2 border rounded"
          />
          <input
            value={exhibitionNameBg}
            onChange={(e) => setExhibitionNameBg(e.target.value)}
            placeholder="Име на изложба (BG)"
            required
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-2">
          <select
                value={month}
                onChange={(e) => setMonth(parseInt(e.target.value))} // convert to number
                required
                className="flex-1 p-2 border rounded"
                >
                <option value="">Месец</option>
                {months.map((m, index) => (
                    <option key={m} value={index + 1}>{m}</option> // 1-12
                ))}
            </select>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              className="flex-1 p-2 border rounded"
            >
              <option value="">Година</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <input
            value={placeEn}
            onChange={(e) => setPlaceEn(e.target.value)}
            placeholder="Място (EN)"
            required
            className="w-full p-2 border rounded"
          />
          <input
            value={placeBg}
            onChange={(e) => setPlaceBg(e.target.value)}
            placeholder="Място (BG)"
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className={`px-6 py-2 rounded font-semibold text-white ${
              exhibitionSuccess ? "bg-green-600" : "bg-blue-600"
            }`}
          >
            Добави
          </button>
        </form>
      )}

      {/* Artwork form toggle */}
      <button
        onClick={() => setShowArtworkForm(!showArtworkForm)}
        className={`mb-4 px-6 py-3 rounded font-semibold text-white ${
          artworkSuccess ? "bg-green-600" : "bg-purple-600"
        }`}
      >
        Добави произведение
      </button>
      {artworkSuccess && (
        <div className="mb-4 text-green-700 font-bold">
          Произведението е добавено успешно!
        </div>
      )}
      {showArtworkForm && (
        <form
          onSubmit={submitArtwork}
          className="p-6 border rounded shadow-sm bg-gray-50 space-y-4"
        >
          <input
            value={artTitleEn}
            onChange={(e) => setArtTitleEn(e.target.value)}
            placeholder="Заглавие (EN)"
            required
            className="w-full p-2 border rounded"
          />
          <input
            value={artTitleBg}
            onChange={(e) => setArtTitleBg(e.target.value)}
            placeholder="Заглавие (BG)"
            required
            className="w-full p-2 border rounded"
          />
            <select
                value={artExhibition}
                onChange={(e) => setArtExhibition(e.target.value)}
                required
                className="w-full p-2 border rounded"
                >
                <option value="">Изберете изложба</option>
                {exhibitions.map((expo) => (
                    <option key={expo.id} value={expo.id}>
                    {expo.name.bg}
                    </option>
                ))}
            </select>
          <div className="flex gap-2">
            <input
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="Ширина (cm)"
              required
              className="flex-1 p-2 border rounded"
            />
            <input
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Височина (cm)"
              required
              className="flex-1 p-2 border rounded"
            />
          </div>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className={`px-6 py-2 rounded font-semibold text-white ${
              artworkSuccess ? "bg-green-600" : "bg-purple-600"
            }`}
          >
            Добави
          </button>
        </form>
      )}
    </div>
  );
}
