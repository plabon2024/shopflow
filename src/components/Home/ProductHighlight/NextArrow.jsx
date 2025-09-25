import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="w-14 h-14  rounded-full text-primary/50 hover:text-primary
         bg-background/50 hover:bg-background duration-300 
         cursor-pointer flex justify-center items-center absolute transform -translate-y-1/2
          z-10 top-1/2 right-0"
      onClick={onClick}
    >
      <span className="text-xl ">
        <FaLongArrowAltRight />
      </span>
    </div>
  );
};

export default NextArrow;
