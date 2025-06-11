import React from "react";
import { useSpring, animated } from "@react-spring/web";
import CloseIcon from "@mui/icons-material/Close";

interface FullManifestoProps {
  onClose: () => void;
}

const FullManifesto: React.FC<FullManifestoProps> = ({ onClose }) => {
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

export default FullManifesto;
