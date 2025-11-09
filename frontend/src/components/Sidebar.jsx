import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const menuLinks = [
    { key: "artworks", path: "/artworks" },
    { key: "about", path: "/about" },
    { key: "exhibitions", path: "/exhibitions" },
    { key: "contact", path: "/contact" },
  ];

  // Toggle between English and Bulgarian
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "bg" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-84 bg-white shadow-md p-6 sticky top-0 h-screen justify-between">
        <div>
          <h1 className="text-7xl font-artist mb-8 tracking-tight">Raina Stoimirova Art</h1>
          <nav className="flex flex-col space-y-4">
            {menuLinks.map((link) => (
              <NavLink
                key={link.key}
                to={link.path}
                className={({ isActive }) =>
                  `transition-all duration-300 ${
                    isActive
                      ? "font-semibold text-4xl text-red-700"
                      : "text-3xl font-normal text-gray-800 hover:text-red-600"
                  }`
                }
              >
                {t(`sidebar.${link.key}`)}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Language Toggle Button */}
        <button
          onClick={toggleLanguage}
          className="mt-8 px-4 py-2 rounded-full border border-gray-300 hover:border-red-500 text-lg font-semibold hover:text-red-700 transition-all"
        >
          {i18n.language === "en" ? "🇧🇬 BG" : "🇬🇧 EN"}
        </button>
      </aside>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {open && (
        <motion.nav
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          className="fixed top-0 left-0 bg-white w-64 h-full p-6 z-40 shadow-lg flex flex-col justify-between"
        >
          <div>
            <h1 className="text-3xl font-artist mb-8 tracking-tight">Raina Stoimirova Art</h1>
            {menuLinks.map((link) => (
              <NavLink
                key={link.key}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block mb-3 transition-all duration-300 ${
                    isActive
                      ? "font-semibold text-lg text-red-700"
                      : "text-gray-800 hover:text-red-600"
                  }`
                }
              >
                {t(`sidebar.${link.key}`)}
              </NavLink>
            ))}
          </div>

          {/* Language Toggle for Mobile */}
          <button
            onClick={() => {
              toggleLanguage();
              setOpen(false);
            }}
            className="mt-4 px-4 py-2 rounded-full border border-gray-300 hover:border-red-500 text-lg font-semibold hover:text-red-700 transition-all"
          >
            {i18n.language === "en" ? "🇧🇬 BG" : "🇬🇧 EN"}
          </button>
        </motion.nav>
      )}
    </>
  );
}
