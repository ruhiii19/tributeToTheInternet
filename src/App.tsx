import React, { useState, useEffect } from "react";
import background from "./assets/images/background.svg";
import buttonImage from "./assets/images/button.svg";
import dinoImage from "./assets/images/Dino.svg";
import asteroidImage from "./assets/images/asteroidWCookie.svg";
import ohShitImage from "./assets/images/ohShit.svg";
import fistImage from "./assets/images/HandFist.svg";

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
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-top pt-16 px-4 relative z-10">
        <div className="max-w-md text-center text-white">
          <h2 className="text-5xl font-bold mb-4">Cookies please.</h2>
          <p className="text-l mb-12">
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
              className="w-[464px] h-20 p-6 text-black font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <img src={fistImage} alt="Hand" className="w-8 h-8" />
              Hand us the cookies
            </button>

            <button
              onClick={onDecline}
              className="w-[464px] h-15 py-6 px-4 bg-[#323232] rounded-[16px] text-gray-400  transition-colors"
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
      <div className="relative z-10 text-center py-8">
        <p className="text-black text-sm font-medium">
          We don't make money with your data.
        </p>
        <p className="text-black text-xs">Or any money at all actually.</p>
      </div>
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
          <h3 className="text-sm text-black">Last visited</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="space-y-1 mb-4">
          <div className="text-xs font-medium text-gray-900">
            {website.title}
          </div>
          <div className="flex items-center gap-2">
            <a
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline block flex-1"
              title={website.url}
            >
              {truncateUrl(website.url)}
            </a>
            <button
              onClick={handleCopy}
              className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100"
              title="Copy URL"
            >
              📋
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <button className="text-white bg-black px-4 py-2 rounded-md">
            Tell others
          </button>
          <button className="text-black bg-white px-4 py-2 rounded-md underline">
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-4 border border-black">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold">Submit a Link</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Nickname
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
              placeholder="Your nickname"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter URL of website
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
              placeholder="https://example.com"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && (
            <div className="text-green-500 text-sm">
              Submitted successfully!
            </div>
          )}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-black rounded-md text-black hover:bg-gray-100"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
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
    if (websites.length === 0) return;

    setIsAnimating(true);
    // Reset animation after it completes
    setTimeout(() => setIsAnimating(false), 1000);

    // Filter websites based on NSFW and Useful Stuff settings
    const filteredWebsites = websites.filter((website) => {
      if (website.isNsfw && !nsfwEnabled) return false;
      if (website.isUseful && !usefulStuffEnabled) return false;
      return true;
    });

    if (filteredWebsites.length === 0) {
      // If no websites match the current filters, show all websites
      const randomSite = websites[Math.floor(Math.random() * websites.length)];
      setLastVisitedSite(randomSite);
      setShowLastVisited(true);
      window.open(randomSite.url, "_blank");
      return;
    }

    const randomSite =
      filteredWebsites[Math.floor(Math.random() * filteredWebsites.length)];

    // Update the last visited site and show popup
    setLastVisitedSite(randomSite);
    setShowLastVisited(true);

    window.open(randomSite.url, "_blank");
  };

  const handleCookieConsent = (accepted: boolean) => {
    setCookieConsent(accepted);
    setShowCookieConsent(false);
  };

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
          onClose={() => setShowLastVisited(false)}
        />
      )}
      {showSubmitLinkPopUp && (
        <SubmitLinkPopUp onClose={() => setShowSubmitLinkPopUp(false)} />
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
      </div>

      {/* Content */}
      <div className="relative z-30 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center pt-8">
          <p className="text-gray-400 text-sm">Curated by</p>
          <p className="text-gray-400">Bored humans</p>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-stretch h-[calc(100vh-80px)]">
          <div className="w-full grid grid-cols-3 gap-4">
            {/* Left Column */}
            <div className="flex flex-col justify-center -translate-y-8 text-black h-full relative z-30">
              <div className="pl-24 flex flex-row items-center gap-24">
                <div>
                  <h2 className="mb-2 font-medium">Creators:</h2>
                  <div className="space-y-1">
                    <div>Arun Koushik</div>
                    <div>Ruhi Panjwani</div>
                  </div>
                </div>
                <div>
                  <h2 className="mb-2 font-medium">Share</h2>
                  <button className="px-4 py-1 text-sm border border-black rounded-full hover:bg-black hover:text-white transition-colors">
                    Tweet about us
                  </button>
                </div>
              </div>
            </div>

            {/* Center Column */}
            <div className="flex flex-col items-center h-full relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h1 className="text-white text-4xl font-bold text-center whitespace-nowrap">
                  Press the
                  <br />
                  button
                </h1>
              </div>
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <button
                  onClick={handleButtonClick}
                  className={`w-60 h-60 focus:outline-none transition-transform ${
                    isAnimating ? "animate-bounce" : ""
                  }`}
                  disabled={isAnimating}
                >
                  <img
                    src={buttonImage}
                    alt="Interactive button"
                    className="w-full h-full object-contain"
                  />
                </button>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col justify-center -translate-y-8 text-black h-full relative z-30">
              <div className="pr-24 flex flex-row items-center gap-24">
                <div>
                  <h2 className="mb-2 font-medium">Include</h2>
                  <div className="flex flex-row items-center gap-3">
                    <button
                      onClick={() => setUsefulStuffEnabled(!usefulStuffEnabled)}
                      className={`px-3 py-0.5 text-xs border border-black rounded-md transition-colors whitespace-nowrap ${
                        usefulStuffEnabled
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {usefulStuffEnabled ? "✓ Useful Stuff" : "✕ Useful Stuff"}
                    </button>
                    <button
                      onClick={() => setNsfwEnabled(!nsfwEnabled)}
                      className={`px-3 py-0.5 text-xs border border-black rounded-md transition-colors whitespace-nowrap ${
                        nsfwEnabled
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {nsfwEnabled ? "✓ NSFW" : "✕ NSFW"}
                    </button>
                  </div>
                </div>
                <div>
                  <div className="space-y-2 whitespace-nowrap text-right">
                    <div
                      className="block text-black hover:opacity-70"
                      onClick={() => setShowSubmitLinkPopUp(true)}
                    >
                      Submit link
                    </div>
                    <a href="#" className="block text-black hover:opacity-70">
                      Buy us a donut
                    </a>
                    <a href="#" className="block text-black hover:opacity-70">
                      Our internet manifesto
                    </a>
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
