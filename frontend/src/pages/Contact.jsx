// export default function Contact() {
//     return (
//       <main className="flex-1 p-8 md:p-12 text-center">
//         <h2 className="text-5xl font-artist mb-12 border-b border-neutral-200 pb-4">
//           Contact
//         </h2>
  
//         <div className="max-w-2xl mx-auto text-gray-700 text-3xl leading-relaxed space-y-8">
//           <p>
//             I’d love to hear from you — whether you’re interested in a piece, an exhibition,
//             or just want to connect!
//           </p>
  
//           <div className="space-y-4">
//             <p>
//               <strong>Email:</strong>{" "}
//               <a
//                 href="mailto:raina@example.com"
//                 className="text-red-700 hover:text-red-500 transition-colors"
//               >
//                 raina@example.com
//               </a>
//             </p>
  
//             <p>
//               <strong>Facebook:</strong>{" "}
//               <a
//                 href="https://facebook.com/rainastoimirovaart"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-red-700 hover:text-red-500 transition-colors"
//               >
//                 facebook.com/rainastoimirovaart
//               </a>
//             </p>
  
//             <p>
//               <strong>Instagram:</strong>{" "}
//               <a
//                 href="https://instagram.com/rainastoimirovaart"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-red-700 hover:text-red-500 transition-colors"
//               >
//                 @rainastoimirovaart
//               </a>
//             </p>
//           </div>
//         </div>
//       </main>
//     );
//   }

import { useTranslation } from "react-i18next";


export default function Contact() {
  const { t, i18n } = useTranslation();

  return (
    <main className="flex-1 p-8 md:p-12 text-center">
      <h2 className="text-5xl font-artist mb-12 border-b border-neutral-200 pb-4">
        {t("sidebar.contact")}
      </h2>

      <div className="max-w-2xl mx-auto text-gray-700 text-lg md:text-3xl leading-relaxed space-y-8">
        <p>{t("context.contact_me")}</p>
        <div className="space-y-4">
          <p>
            <strong>{t("email")}:</strong>{" "}
            <a href="mailto:raina@example.com" className="text-red-700 hover:text-red-500">
              raina@example.com
            </a>
          </p>
          <p>
            <strong>{t("facebook")}:</strong>{" "}
            <a href="https://facebook.com/rainastoimirovaart" className="text-red-700 hover:text-red-500">
              facebook.com/rainastoimirovaart
            </a>
          </p>
          <p>
            <strong>{t("instagram")}:</strong>{" "}
            <a href="https://instagram.com/rainastoimirovaart" className="text-red-700 hover:text-red-500">
              @rainastoimirovaart
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

  