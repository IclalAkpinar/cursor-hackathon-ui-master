import { Kapsul } from "../assests/icons";

export const Loading = () => {
  return (
    <div className="h-[100vh] w-[100vw] fixed  inset-0 bg-ktp_white flex items-center justify-center z-[1000]">
      <Kapsul className="w-12 h-12 fill-black animate-pulse" />
    </div>
  );
};
