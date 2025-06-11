import React, { useState } from "react";
import dinoImage from "../assets/images/Dino.svg";
import asteroidImage from "../assets/images/asteroidWCookie.svg";
import ohShitImage from "../assets/images/ohShit.svg";
import fistImage from "../assets/images/HandFist.svg";
import PeekingManifesto from "./PeekingManifesto";
import FullManifesto from "./FullManifesto";

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({
  onAccept,
  onDecline,
}) => {
  const [showFullManifesto, setShowFullManifesto] = useState(false);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-top pt-16 px-4 relative z-10">
        <div className="max-w-md text-center text-white">
          <h2 className="text-5xl gilroy-bold mb-4">Cookies please.</h2>
          <p className="text-l mb-12 gilroy-regular">
            so we don't show you the same websites again.
          </p>
          <div className="flex flex-col gap-4 items-center">
            <button
              onClick={onAccept}
              style={{
                background:
                  "linear-gradient(91deg, #F4958E -6.19%, #FFAAF7 8.73%, #9193FC 37.19%, #B4F6FE 64.62%, #B0FFC0 80.65%, #FEFF9D 94.63%, #F3D9A0 109.66%)",
                boxShadow: "1px 2px 0px 0px #FFF",
                borderRadius: "36px",
              }}
              className="w-[464px] h-20 p-6 text-black gilroy-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <img src={fistImage} alt="Hand" className="w-8 h-8" />
              Hand us the cookies
            </button>

            <button
              onClick={onDecline}
              className="w-[464px] h-15 py-6 px-4 bg-[#323232] rounded-[16px] text-gray-400  transition-colors gilroy-regular"
            >
              Naaah I'm good
            </button>
          </div>
        </div>
      </div>

      {/* Dino sitting on circle */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: "calc(-195% + 1516px - 6px)", // Circle bottom position + circle height - half dino height
          zIndex: 2,
        }}
      >
        <img src={dinoImage} alt="Dino" className="w-19 h-19" />
      </div>

      {/* Asteroid with cookie */}
      <div
        className="absolute left-[35%] -translate-x-1/3"
        style={{
          bottom: "calc(-195% + 1516px + 60px)", // Circle bottom position + circle height + some height
          zIndex: 2,
        }}
      >
        <img src={asteroidImage} alt="Asteroid" className="w-31 h-31" />
      </div>

      {/* Oh Shit */}
      <div
        className="absolute right-[30%] -translate-x-1/3"
        style={{
          bottom: "calc(-195% + 1516px + 60px)", // Circle bottom position + circle height + some height
          zIndex: 2,
        }}
      >
        <img src={ohShitImage} alt="Oh Shit" className="w-45 h-18" />
      </div>

      {/* Semi-circle with glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: "-195%" }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            width: "1516px",
            height: "1516px",
            borderRadius: "50%",
            background: "#FFF",
            filter: "blur(30px)",
            opacity: "0.8",
          }}
        />
        {/* Solid circle */}
        <div
          style={{
            position: "relative",
            width: "1516px",
            height: "1516px",
            borderRadius: "50%",
            background: "#FFF",
            zIndex: 1,
          }}
        />
      </div>

      {/* Text overlay */}
      <div className="relative z-10 text-center py-4">
        <p className="text-black gilroy-bold">
          We don't make money with your data.
        </p>
        <p className="text-black gilroy-regular">
          Or any money at all actually.
        </p>
      </div>
      {!showFullManifesto && (
        <PeekingManifesto onClick={() => setShowFullManifesto(true)} />
      )}
      {showFullManifesto && (
        <FullManifesto onClose={() => setShowFullManifesto(false)} />
      )}
    </div>
  );
};

export default CookieConsent;
