import { Kapsul } from "../assests/icons/Kapsul";


export const Logo = ({ className }: { className: string }) => {
 return (
  <a rel="Ansayfaya dön" href="/">
   <Kapsul
    className={`${className} cursor-pointer`}
    alt="cnauts"
   />
  </a>
 );
};
