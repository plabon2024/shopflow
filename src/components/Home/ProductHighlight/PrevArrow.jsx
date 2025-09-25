import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="w-14 h-14  rounded-full text-primary/50 hover:text-primary
         bg-background/50 hover:bg-background duration-300 
         cursor-pointer flex justify-center items-center absolute transform -translate-y-1/2
          z-10 top-1/2 left-0"
      onClick={onClick}
    >
      <span>
        <FaLongArrowAltLeft />
      </span>
    </div>
  );
};

export default PrevArrow;
