import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import CloseIcon from "@mui/icons-material/Close";
import LinkIcon from "@mui/icons-material/Link";
import PersonIcon from "@mui/icons-material/Person";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import background from "./assets/images/background.svg";
import buttonImage from "./assets/images/button.svg";
import dinoImage from "./assets/images/Dino.svg";
import asteroidImage from "./assets/images/asteroidWCookie.svg";
import ohShitImage from "./assets/images/ohShit.svg";
import fistImage from "./assets/images/HandFist.svg";
import bounceArrow from "./assets/images/bounceArrow.svg";
import bonVoyageArrow from "./assets/images/bonVoyageArrow.svg";
import arunsDucky from "./assets/images/arunsDucky.svg";
import ruhisPanda from "./assets/images/ruhisPanda.svg";
import MegaphoneSimple from "./assets/images/MegaphoneSimple.svg";
import boredHumans from "./assets/images/boredHumans.svg";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT4s0r3GV_9ZySl_exblzb6O4OgGvtRTncht4Kb6dYLg_cNR_cFx4onC1eXeOMaNUTgSrksFNSZMV3B/pub?output=csv";

// Fallback websites in case Google Sheets fetch fails
const FALLBACK_WEBSITES = [
  "https://www.are.na",
  "https://www.thispersondoesnotexist.com",
  "https://www.radio.garden",
  "https://www.internetlivestats.com",
  "https://www.howmanypeopleareinspacerightnow.com",
  "https://www.thewikigame.com",
  "https://www.radiooooo.com",
  "https://www.earth.fm",
  "https://www.zoomquilt.org",
];

// Cookie management functions
const getVisitedSites = (): string[] => {
  const visitedSitesCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("visitedSites="));
  if (visitedSitesCookie) {
    return JSON.parse(decodeURIComponent(visitedSitesCookie.split("=")[1]));
  }
  return [];
};

const addVisitedSite = (site: string) => {
  const visitedSites = getVisitedSites();
  visitedSites.push(site);
  // Store for 30 days
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30);
  document.cookie = `visitedSites=${encodeURIComponent(
    JSON.stringify(visitedSites)
  )}; expires=${expiryDate.toUTCString()}; path=/`;
};

const hasCookieConsent = (): boolean => {
  return document.cookie.includes("cookieConsent=true");
};

const setCookieConsent = (consent: boolean) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 365); // Store consent for 1 year
  document.cookie = `cookieConsent=${consent}; expires=${expiryDate.toUTCString()}; path=/`;
};

const CookieConsent: React.FC<{
  onAccept: () => void;
  onDecline: () => void;
}> = ({ onAccept, onDecline }) => {
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

interface Website {
  url: string;
  isNsfw: boolean;
  isUseful: boolean;
  title: string;
}

const LastVisitedPopup: React.FC<{ website: Website; onClose: () => void }> = ({
  website,
  onClose,
}) => {
  // Function to truncate URL if it's too long
  const truncateUrl = (url: string) => {
    const maxLength = 35; // Adjust this value based on your needs
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(website.url);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs border border-black">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm text-black gilroy-regular">Last visited</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="space-y-1 mb-4">
          <div className="gilroy-bold text-black">{website.title}</div>
          <div className="flex items-center gap-2">
            <a
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs gilroy-regular text-black underline block flex-1"
              title={website.url}
            >
              {truncateUrl(website.url)}
            </a>
            <button
              onClick={handleCopy}
              className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100"
              title="Copy URL"
            >
              <ContentCopyIcon sx={{ fontSize: 20 }} />
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <button className="text-white bg-black px-4 py-2 rounded-md gilroy-regular">
            Tell others
          </button>
          <button className="text-black bg-white px-4 py-2 rounded-md underline gilroy-regular underline">
            Report Website
          </button>
        </div>
      </div>
    </div>
  );
};

const SubmitLinkPopUp: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [nickname, setNickname] = useState("");
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbwtugJxQbZ95XRHtBKnmb2knvaGJkdTllWfEPMP05N6AW_qrfJ-97xjZXIHFTfjm2RV/exec";

      // Use no-cors mode and different content type
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          nickname,
          url,
          timestamp: new Date().toISOString(),
        }),
        headers: {
          "Content-Type": "text/plain", // Changed from application/json
        },
      });

      // Since no-cors mode doesn't give us response details,
      // we'll assume success if we get here
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end ">
      <div
        className="bg-white p-6 rounded-2xl shadow-lg w-[320px] h-[446px] gilroy-medium"
        style={{
          border: "4px solid transparent",
          backgroundImage:
            "linear-gradient(white, white), linear-gradient(to top,#F3D9A0,#FEFF9D,#B0FFC0, #B4F6FE,#9193FC, #FFAAF7,#F4958E )",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          transform: "rotate(-8deg)",
        }}
      >
        {success && (
          <div className="h-full flex items-center justify-center">
            <div className="text-black gilroy-bold text-center text-xl">
              Thanks for your <br />
              contribution.
            </div>
          </div>
        )}
        {!success && (
          <div>
            <div className="flex justify-between items-start h-full pb-6">
              <div className="text-xl text-black mb-2 gilroy-bold">
                Contribute a link
                <br />
                to the collective, Nerd.
              </div>
              <button
                onClick={onClose}
                className="text-black rounded-full h-[24px] w-[24px] flex items-center justify-center border border-black"
              >
                <CloseIcon sx={{ fontSize: 16 }} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2 gilroy-medium">
                  Website
                </label>
                <div className="relative">
                  <textarea
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black py-3 pl-9 pr-4 h-[96px] resize-none"
                    placeholder="Cool as fuck link here"
                    required
                  />
                  <LinkIcon
                    className="absolute left-3 top-4 text-gray-400"
                    sx={{ fontSize: 20, transform: "rotate(-45deg)" }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Nickname
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 pl-9 pr-4 focus:outline-none focus:ring-2 focus:ring-black text-black"
                    placeholder="Cooler nickname here"
                  />
                  <PersonIcon
                    className="absolute top-3 left-3 text-gray-400"
                    sx={{ fontSize: 20 }}
                  />
                </div>
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}

              <div className="flex justify-center gap-4 mt-8 items-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Hit it"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const ManifestoPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end p-4">
      <div
        className="bg-white p-6 shadow-lg w-[489px] h-[415px] gilroy-medium"
        style={{
          backgroundClip: "padding-box, border-box",
          transform: "rotate(-8deg)",
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-6 relative">
            <h1 className="uppercase gilroy-medium text-[#9A9C9C]">
              Our better internet manifesto
            </h1>
            <CloseIcon
              sx={{ fontSize: 24 }}
              onClick={onClose}
              className="text-black border border-black rounded-full p-1 absolute right-0"
            />
          </div>

          <ol className="text-black gilroy-regular space-y-1 list-decimal pl-4">
            <li>Contribute to the internet / Collaborate when possible.</li>
            <li>Share love, knowledge and opinions.</li>
            <li>Always give feedback / Report broken things.</li>
            <li>Take NSFW tags seriously.</li>
            <li>Be political.</li>
            <li>Share cat/dog memes. Afterall internet was made for it.</li>
            <li>Be mindful before pressing any button that says "Allow".</li>
            <li>Correct your posture.</li>
            <li>Don't forget to blink.</li>
            <li>Stay hydrated.</li>
            <li>Never share your OTP.</li>
            <li>Don't Zuck up the internet.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

const PeekingManifesto: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div
    className="fixed top-1/2 right-[-340px] z-50 cursor-pointer"
    style={{ transform: "translateY(-60%) rotate(-12deg)" }}
    onClick={onClick}
  >
    <div className="bg-white p-6 shadow-lg w-[489px] h-[415px] gilroy-medium flex">
      <h1 className="uppercase gilroy-medium text-[#9A9C9C] text-sm">
        Our better internet
        <br /> manifesto.
      </h1>
    </div>
  </div>
);

const FullManifesto: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const spring = useSpring({
    from: {
      transform: "translateX(100vw) rotate(25deg) scale(0.6)",
      opacity: 0,
    },
    to: {
      transform: "translateX(30vw) rotate(0deg) scale(1)",
      opacity: 1,
    },
    config: { duration: 1000 },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <animated.div
        style={spring}
        className="bg-white shadow-lg w-[489px] h-[415px] gilroy-medium relative flex flex-col p-6"
      >
        <div className="flex justify-between items-center mb-6 relative">
          <h1 className="uppercase gilroy-medium text-[#9A9C9C]">
            Our better internet manifesto
          </h1>
          <CloseIcon
            sx={{ fontSize: 24 }}
            onClick={onClose}
            className="text-black border border-black rounded-full p-1 absolute right-0"
          />
        </div>

        <ol className="text-black gilroy-regular space-y-1 list-decimal pl-4">
          <li>Contribute to the internet / Collaborate when possible.</li>
          <li>Share love, knowledge and opinions.</li>
          <li>Always give feedback / Report broken things.</li>
          <li>Take NSFW tags seriously.</li>
          <li>Be political.</li>
          <li>Share cat/dog memes. Afterall internet was made for it.</li>
          <li>Be mindful before pressing any button that says "Allow".</li>
          <li>Correct your posture.</li>
          <li>Don't forget to blink.</li>
          <li>Stay hydrated.</li>
          <li>Never share your OTP.</li>
          <li>Don't Zuck up the internet.</li>
        </ol>
      </animated.div>
    </div>
  );
};

const App: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [usefulStuffEnabled, setUsefulStuffEnabled] = useState(false);
  const [nsfwEnabled, setNsfwEnabled] = useState(false);
  const [showLastVisited, setShowLastVisited] = useState(false);
  const [showSubmitLinkPopUp, setShowSubmitLinkPopUp] = useState(false);
  const [lastVisitedSite, setLastVisitedSite] = useState<Website | null>(null);
  const [animationPhase, setAnimationPhase] = useState<
    "idle" | "bouncing" | "pathway"
  >("idle");
  const [showRainbowGlow, setShowRainbowGlow] = useState(false);
  const [showManifestoPopup, setShowManifestoPopup] = useState(false);
  const [showFullManifesto, setShowFullManifesto] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  // Button bounce animation (2 bounces)
  const [buttonBounceProps, buttonBounceApi] = useSpring(() => ({
    scale: 1,
    config: { tension: 700, friction: 18 }, // fast and snappy
  }));

  // Button white glow
  const [buttonGlowProps, buttonGlowApi] = useSpring(() => ({
    opacity: 0,
    config: { tension: 300, friction: 20 },
  }));

  // Pathway animation with mask
  const [pathwayProps, pathwayApi] = useSpring(() => ({
    opacity: 0,
    maskPosition: 100, // 100 = hidden, 0 = fully revealed
  }));

  const [pathwayTextProps, pathwayTextApi] = useSpring(() => ({
    opacity: 0,
    y: 40,
  }));

  const resetAnimations = () => {
    buttonGlowApi.start({ opacity: 0 });
    buttonBounceApi.start({ scale: 1 });
    pathwayApi.start({ opacity: 0, maskPosition: 100 });
    pathwayTextApi.start({ opacity: 0, y: 40 });
  };

  useEffect(() => {
    // Check if user has already given cookie consent
    setShowCookieConsent(!hasCookieConsent());
  }, []);

  useEffect(() => {
    // Handle tab visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && lastVisitedSite) {
        setShowLastVisited(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [lastVisitedSite]);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch from Google Sheets");
        }
        const csvText = await response.text();

        // Parse CSV and extract active websites with their properties
        const websiteList = csvText
          .split("\n")
          .slice(1) // Skip header row
          .map((line) => {
            const columns = line.split(",");
            // Check if site is active (column 1) and get the link (column 2)
            if (columns[0]?.toLowerCase().includes("yes")) {
              const url = columns[1]?.replace(/["']/g, "").trim();
              if (url && url.startsWith("http")) {
                return {
                  url,
                  isNsfw: columns[3]?.toLowerCase().includes("yes") || false,
                  isUseful: columns[4]?.toLowerCase().includes("yes") || false,
                  title:
                    columns[6]?.trim() ||
                    "Hope you liked visting this site! :)",
                };
              }
            }
            return null;
          })
          .filter((website): website is Website => website !== null);

        // Only update if we got valid websites from the sheet
        if (websiteList.length > 0) {
          setWebsites(websiteList);
        }
      } catch (error) {
        console.error("Error fetching websites:", error);
        // Convert fallback websites to the new format
        setWebsites(
          FALLBACK_WEBSITES.map((url) => ({
            url,
            isNsfw: false,
            isUseful: false,
            title: url,
          }))
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchWebsites();
  }, []);

  const handleButtonClick = () => {
    if (websites.length === 0 || animationPhase !== "idle") return;
    setAnimationPhase("bouncing");
    // Start first bounce
    buttonGlowApi.start({ opacity: 1 });
    buttonBounceApi.start({
      scale: 1.08,
      onRest: () => {
        buttonBounceApi.start({
          scale: 1,
          onRest: () => {
            // Start second bounce
            setShowRainbowGlow(true);
            buttonBounceApi.start({
              scale: 1.08,
              onRest: () => {
                buttonBounceApi.start({
                  scale: 1,
                  onRest: () => {
                    buttonGlowApi.start({ opacity: 0 });
                    setShowRainbowGlow(false);
                    setAnimationPhase("pathway");
                    pathwayTextApi.start({ opacity: 1, y: 0 });
                    // Start pathway animation
                    pathwayApi.start({
                      opacity: 1,
                      maskPosition: 0,
                      onRest: () => {
                        // After pathway animation completes, proceed with site navigation
                        const filteredWebsites = websites.filter((website) => {
                          if (website.isNsfw && !nsfwEnabled) return false;
                          if (website.isUseful && !usefulStuffEnabled)
                            return false;
                          return true;
                        });
                        const randomSite =
                          filteredWebsites.length === 0
                            ? websites[
                                Math.floor(Math.random() * websites.length)
                              ]
                            : filteredWebsites[
                                Math.floor(
                                  Math.random() * filteredWebsites.length
                                )
                              ];
                        setLastVisitedSite(randomSite);
                        setShowLastVisited(true);
                        addVisitedSite(randomSite.url);
                        window.open(randomSite.url, "_blank");
                        setTimeout(() => setAnimationPhase("idle"), 1000);
                      },
                    });
                  },
                });
              },
            });
          },
        });
      },
    });
  };

  const handleCookieConsent = (accepted: boolean) => {
    setCookieConsent(accepted);
    setShowCookieConsent(false);
  };

  const handleLastVisitedClose = () => {
    setShowLastVisited(false);
    resetAnimations();
  };

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        resetAnimations();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {showCookieConsent && (
        <CookieConsent
          onAccept={() => handleCookieConsent(true)}
          onDecline={() => handleCookieConsent(false)}
        />
      )}
      {showLastVisited && lastVisitedSite && (
        <LastVisitedPopup
          website={lastVisitedSite}
          onClose={handleLastVisitedClose}
        />
      )}
      {showSubmitLinkPopUp && (
        <SubmitLinkPopUp onClose={() => setShowSubmitLinkPopUp(false)} />
      )}
      {showManifestoPopup && (
        <ManifestoPopup onClose={() => setShowManifestoPopup(false)} />
      )}
      {showFullManifesto && (
        <FullManifesto onClose={() => setShowFullManifesto(false)} />
      )}
      {showSharePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg mb-4 gilroy-bold">Share this site</h2>
            <div className="flex gap-4 mb-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  "Check out this awesome site! " + window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Twitter
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  "https://tribute-to-the-internet.vercel.app https://pudding.cool/2018/06/music-map/?date=202106  Highway to Hell yeah! Visit the Coolest places on the internet and yes we have big red button you can push! Ps: Don't open before important deadlines."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                WhatsApp
              </a>
            </div>
            <button
              onClick={() => setShowSharePopup(false)}
              className="text-black border border-black rounded px-4 py-1"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Triangles */}
      <div className="absolute inset-0 z-10">
        {/* Left Side Triangles */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-white"
          style={{ clipPath: "polygon(0 30%, 50% 50%, 0 70%)" }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            clipPath: "polygon(0 7%, 50% 50%, 0 27%)",
            backgroundColor: "#767676",
          }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            clipPath: "polygon(0 73%, 50% 50%, 0 93%)",
            backgroundColor: "#CCCCCB",
          }}
        ></div>

        {/* Right Side Triangles */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-white"
          style={{ clipPath: "polygon(100% 30%, 50% 50%, 100% 70%)" }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            clipPath: "polygon(100% 7%, 50% 50%, 100% 27%)",
            backgroundColor: "#767676",
          }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            clipPath: "polygon(100% 73%, 50% 50%, 100% 93%)",
            backgroundColor: "#CCCCCB",
          }}
        ></div>
      </div>

      {/* Spotlight Effect */}
      <div className="absolute inset-0 z-20">
        {/* Left diagonal line */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-black"
            style={{ clipPath: "polygon(0 0, 0 100%, 45% 100%, 0 0)" }}
          ></div>
        </div>

        {/* Right diagonal line */}
        <div className="absolute top-0 right-0 w-full h-full">
          <div
            className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-transparent via-transparent to-black"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 55% 100%, 100% 0)" }}
          ></div>
        </div>

        {/* Center spotlight area */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* White border (slightly larger) */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-white"
            style={{
              clipPath: "polygon(44.9% 0, 55.1% 0, 70.1% 100%, 29.9% 100%)",
            }}
          ></div>

          {/* Black center (slightly smaller) */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-black"
            style={{ clipPath: "polygon(45% 0, 55% 0, 70% 100%, 30% 100%)" }}
          ></div>
        </div>

        {/* Rainbow Pathway Overlay - covers the entire spotlight area, z-10 so button is above */}
        <animated.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
          style={{
            clipPath: "polygon(45% 0, 55% 0, 70% 100%, 30% 100%)",
            WebkitClipPath: "polygon(45% 0, 55% 0, 70% 100%, 30% 100%)",
            background: `linear-gradient(to top, #F4958E, #FFAAF7, #9193FC, #B4F6FE, #B0FFC0, #FEFF9D, #F3D9A0)`,
            opacity: pathwayProps.opacity,
            filter: "blur(24px)",
            maskImage: pathwayProps.maskPosition.to(
              (pos) =>
                `linear-gradient(to top, black 0%, black ${
                  100 - pos
                }%, transparent ${100 - pos}%, transparent 100%)`
            ),
            WebkitMaskImage: pathwayProps.maskPosition.to(
              (pos) =>
                `linear-gradient(to top, black 0%, black ${
                  100 - pos
                }%, transparent ${100 - pos}%, transparent 100%)`
            ),
            transition: "opacity 0.2s",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-30 min-h-screen flex flex-col">
        {/* Header */}
        {animationPhase !== "pathway" && (
          <img
            src={boredHumans}
            alt="Bored Humans"
            className="absolute top-8 left-1/2 transform -translate-x-1/2 w-[180px] h-[108px]"
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex items-stretch h-[calc(100vh-80px)]">
          <div className="w-full grid grid-cols-3 gap-4">
            {/* Left Column */}
            <div className="flex flex-col justify-center -translate-y-8 text-black h-full relative z-30">
              <div className="pl-24 flex flex-row items-center gap-24 gilroy-medium">
                <div>
                  <h2 className="mb-2 mt-12">Creators:</h2>
                  <div className="space-y-1">
                    <div className="flex flex-row text-nowrap items-center gap-2">
                      <img
                        src={arunsDucky}
                        alt="Arun Koushik"
                        className="w-10 h-10"
                      />
                      Arun Koushik
                    </div>
                    <div className="flex flex-row text-nowrap items-center gap-2">
                      <img
                        src={ruhisPanda}
                        alt="Ruhi Panjwani"
                        className="w-10 h-10"
                      />
                      Ruhi Panjwani
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="mb-2 mt-12 gilroy-bold text-[24px] text-right">
                    Share
                  </h2>
                  <button
                    className="py-1 text-sm border border-black rounded-md hover:bg-black hover:text-white transition-colors gilroy-regular flex items-center text-nowrap px-2 group"
                    onClick={() => setShowSharePopup(true)}
                  >
                    <div className="flex flex-row items-center">
                      <img
                        src={MegaphoneSimple}
                        alt="Megaphone Simple"
                        className="group-hover:brightness-0 group-hover:invert"
                      />
                      <div className="ml-2 mr-4 text-[12px]">
                        Blow your friend's mind
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Center Column */}
            <div className="flex flex-col items-center h-full relative gilroy-black">
              {animationPhase === "pathway" ? (
                <animated.div
                  className="absolute w-full text-center"
                  style={{
                    top: "40%",
                    left: 0,
                    opacity: pathwayTextProps.opacity,
                    transform: pathwayTextProps.y.to(
                      (y) => `translateY(${y}px)`
                    ),
                    pointerEvents: "none",
                  }}
                >
                  <div className="text-black gilroy-bold flex flex-col items-center gap-2">
                    <img
                      src={bonVoyageArrow}
                      alt="Bon Voyage Arrow"
                      className="w-25 h-22 items-center justify-center"
                    />
                    BON VOYAGE
                  </div>
                  <div className="text-black gilroy-black text-3xl font-extrabold leading-tight">
                    ADVENTURER
                  </div>
                </animated.div>
              ) : (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <h1 className="text-white gilroy-black text-5xl text-center whitespace-nowrap">
                    {animationPhase === "idle" ? (
                      <div className="flex flex-col items-center gap-2">
                        Press the
                        <br />
                        button
                        <img
                          src={bounceArrow}
                          alt=""
                          className="w-15 h-20 items-center justify-center"
                        />
                      </div>
                    ) : (
                      <>
                        Initiating <br />
                        dial-up..
                      </>
                    )}
                  </h1>
                </div>
              )}

              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 z-20">
                <animated.button
                  onClick={handleButtonClick}
                  className="w-60 h-60 focus:outline-none relative"
                  style={{
                    transform: buttonBounceProps.scale.to(
                      (scale) => `scale(${scale})`
                    ),
                  }}
                  disabled={animationPhase !== "idle"}
                >
                  {/* White Glow Effect (during both bounces) */}
                  <animated.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      opacity: buttonGlowProps.opacity,
                      background:
                        "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
                      filter: "blur(10px)",
                      zIndex: 1,
                    }}
                  />
                  {/* Rainbow Glow Effect (full circle, behind the button image, only on second bounce) */}
                  {showRainbowGlow && (
                    <div
                      className="absolute left-1/2 top-1/2"
                      style={{
                        width: "340px",
                        height: "340px",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "50%",
                        background:
                          "conic-gradient(from 0deg at 50% 50%, #F4958E, #FFAAF7, #9193FC, #B4F6FE, #B0FFC0, #FEFF9D, #F3D9A0, #F4958E)",
                        opacity: 0.2,
                        filter: "blur(240px)",
                        zIndex: 2,
                        pointerEvents: "none",
                      }}
                    />
                  )}
                  <img
                    src={buttonImage}
                    alt="Interactive button"
                    className="w-full h-full object-contain relative z-10"
                  />
                </animated.button>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col justify-center -translate-y-8 text-black h-full relative z-30">
              <div className="pr-24 flex flex-row items-center gap-24">
                <div>
                  <h2 className="mb-2 mt-12 gilroy-bold text-[24px]">
                    Include
                  </h2>
                  <div className="flex flex-row items-center gap-3">
                    <button
                      onClick={() => setUsefulStuffEnabled(!usefulStuffEnabled)}
                      className={`px-3 py-0.5 border border-black rounded-md transition-colors whitespace-nowrap gilroy-regular text-[12px] ${
                        usefulStuffEnabled
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {usefulStuffEnabled ? "✓ Useful Stuff" : "✕ Useful Stuff"}
                    </button>
                    <button
                      onClick={() => setNsfwEnabled(!nsfwEnabled)}
                      className={`px-3 py-0.5 border border-black rounded-md transition-colors whitespace-nowrap gilroy-regular text-[12px] ${
                        nsfwEnabled
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {nsfwEnabled ? "✓ NSFW" : "✕ NSFW"}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end mt-12">
                  <div className="space-y-2 whitespace-nowrap text-right gilroy-medium">
                    <div
                      className="block text-black hover:opacity-70"
                      onClick={() => setShowSubmitLinkPopUp(true)}
                    >
                      Submit link
                    </div>
                    <a href="#" className="block text-black hover:opacity-70">
                      Buy us a donut
                    </a>
                    <div
                      className="block text-black hover:opacity-70"
                      onClick={() => setShowManifestoPopup(true)}
                    >
                      Our internet manifesto
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
