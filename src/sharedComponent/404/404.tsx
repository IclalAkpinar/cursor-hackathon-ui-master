import Lottie from "react-lottie";
import black from "../../assests/lotties/404-black.json";
import white from "../../assests/lotties/404-white.json";

export const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-y-10 p-4">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData:  black,
        }}
        height={200}
        width={200}
      />
      <span className="flex flex-col items-center gap-y-4">
        <h1 className="text-[45px] font-bold">BÖYLE BİR SAYFA BULAMADIK !</h1>
      </span>
    </div>
  );
};
