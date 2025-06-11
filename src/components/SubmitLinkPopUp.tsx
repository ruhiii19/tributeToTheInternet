import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import LinkIcon from "@mui/icons-material/Link";
import PersonIcon from "@mui/icons-material/Person";

interface SubmitLinkPopUpProps {
  onClose: () => void;
}

const SubmitLinkPopUp: React.FC<SubmitLinkPopUpProps> = ({ onClose }) => {
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

export default SubmitLinkPopUp;
