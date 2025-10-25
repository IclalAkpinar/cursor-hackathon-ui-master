import * as Icon from "../assests/icons";
import { Logo } from "./Logo";

export const Footer = () => {
  let iconClass =
    "hover:text-black dark:hover:text-white *:hover:scale-[1.05] *:duration-300 *:size-5 ";
  return (
    <div className="w-full   flex flex-col items-center justify-center border-t-[1px]">
      <div className="*:px-[5vw] pt-4 w-full flex flex-col gap-y-2 items-center text-black/90 dark:text-white/90">
        <div className="w-full flex flex-col gap-y-8 pb-2 sm:flex-row justify-between items-center">
         

          
        </div>
      </div>
      <h6 className=" font-light text-[10px] text-center pb-1">
        © 2025 - CURSOR HACKATHON 
      </h6>
    </div>
  );
};
