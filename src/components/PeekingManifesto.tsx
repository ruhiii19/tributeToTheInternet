import React from "react";

interface PeekingManifestoProps {
  onClick: () => void;
}

const PeekingManifesto: React.FC<PeekingManifestoProps> = ({ onClick }) => (
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

export default PeekingManifesto;
