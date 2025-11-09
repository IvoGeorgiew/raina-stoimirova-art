import profilePic from "../assets/profile.jpg";
import { useTranslation } from "react-i18next";


export default function About() {
  const { t, i18n } = useTranslation();
  return (
    <main className="flex-1 p-8 md:p-12">
      <h2 className="text-5xl font-artist mb-12 border-b border-neutral-200 pb-4 text-center">
      {t(`sidebar.about`)}
      </h2>

      <div className="flex flex-col items-center gap-8">
        <div className="w-[70%] max-w-xl flex-shrink-0">
          <img
            src={profilePic}
            alt="Artist Portrait"
            className="shadow-lg w-full object-cover"
          />
        </div>

        <div className="flex-1 text-lg md:text-3xl text-gray-700 leading-relaxed text-center md:text-left">
          {t("context.about")
            .split("\n\n")
            .map((paragraph, index) => (
              <p key={index} className="mb-6">
                {paragraph}
              </p>
            ))}
        </div>
      </div>
    </main>
  );
}
