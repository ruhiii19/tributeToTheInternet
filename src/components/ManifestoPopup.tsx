import React from "react";
import { useSpring, animated } from "@react-spring/web";
import CloseIcon from "@mui/icons-material/Close";

interface ManifestoPopupProps {
  onClose: () => void;
}

const ManifestoPopup: React.FC<ManifestoPopupProps> = ({ onClose }) => {
  const spring = useSpring({
    from: {
      transform: "translateX(100vw) rotate(25deg) scale(0.6)",
      opacity: 0,
    },
    to: {
      transform: "translateX(0) rotate(-8deg) scale(1)",
      opacity: 1,
    },
    config: { duration: 800 },
  });

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end p-4"
      onClick={onClose}
    >
      <animated.div
        style={spring}
        className="bg-white p-6 shadow-lg w-[350px] h-[530px] gilroy-medium flex flex-col mr-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-6 relative">
            <h1 className="uppercase gilroy-medium text-[#9A9C9C]">
              Our better internet manifesto
            </h1>
            <CloseIcon
              sx={{ fontSize: 24 }}
              onClick={onClose}
              className="text-black border border-black rounded-full p-1 absolute right-0 cursor-pointer"
            />
          </div>

          <ol className="text-black gilroy-regular space-y-2 list-decimal pl-4">
            <li>
              Contribute to the internet <br /> / Collaborate when possible.
            </li>
            <li>Share love, knowledge and opinions.</li>
            <li>
              Always give feedback / Report <br />
              broken things.
            </li>
            <li>Take NSFW tags seriously.</li>
            <li>Be political.</li>
            <li>
              Share cat/dog memes. Afterall <br /> internet was made for it.
            </li>
            <li>
              Be mindful before pressing any <br />
              button that says "Allow".
            </li>
            <li>
              Correct your posture. <br /> Don't forget to blink. Stay hydrated.
            </li>
            <li>Never share your OTP.</li>
            <li>Don't Zuck up the internet.</li>
          </ol>
        </div>
      </animated.div>
    </div>
  );
};

export default ManifestoPopup;
