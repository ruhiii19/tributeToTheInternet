import React, { useState } from "react";

interface PeekingManifestoProps {
  onClick: () => void;
}

const PeekingManifesto: React.FC<PeekingManifestoProps> = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {/* Fixed invisible hover trigger strip on the right edge — never moves */}
      <div
        className="fixed top-0 right-0 z-50 cursor-pointer"
        style={{ width: "180px", height: "100vh" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
      />
      {/* Animated manifesto card */}
      <div
        className="fixed top-1/2 z-50 cursor-pointer transition-all duration-300 ease-in-out pointer-events-none"
        style={{
          right: hovered ? "20px" : "-200px",
          transform: `translateY(-60%) rotate(${hovered ? "0deg" : "-12deg"})`,
        }}
        onClick={onClick}
      >
        <div className="bg-white p-6 shadow-lg w-[350px] h-[530px] gilroy-medium flex flex-col">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-6 relative">
          <h1 className="uppercase gilroy-medium text-[#9A9C9C]">
            Our better internet manifesto
          </h1>
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
            Correct your posture. <br /> Don't forget to blink.Stay hydrated.
          </li>
          <li>Never share your OTP.</li>
          <li>Don't Zuck up the internet.</li>
        </ol>
      </div>
    </div>
    </div>
    </>
  );
};

export default PeekingManifesto;
