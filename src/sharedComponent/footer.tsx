import * as Icon from "../assests/icons";
import { Logo } from "./Logo";

export const Footer = () => {
  let iconClass =
    "hover:text-black dark:hover:text-white *:hover:scale-[1.05] *:duration-300 *:size-5 ";
  return (
    <div className="w-full   flex flex-col items-center justify-center border-t-[1px]">
      <div className="*:px-[5vw] pt-4 w-full flex flex-col gap-y-2 items-center text-black/90 dark:text-white/90">
        <div className="w-full flex flex-col gap-y-8 pb-2 sm:flex-row justify-between items-center">
          <div className="flex sm:flex-col flex-row justify-between sm:justify-start w-full sm:w-fit items-center gap-y-3">
            <Logo className="fill-black dark:fill-white size-8" />
            <a
              href="https://www.konya.bel.tr/"
              target="_blank"
              className="flex gap-x-2"
            >
              <Icon.Konya className="fill-black dark:fill-white  size-8" />
              <Icon.Altay className="fill-black dark:fill-white size-8" />
              <Icon.MyCity className="fill-black dark:fill-white size-8" />
            </a>
          </div>

          <div className="flex flex-col items-center gap-y-0.5">
            <div>Sorularınız için (10:00 - 20:00) : </div>
            <a className="flex items-center gap-x-2" href="tel:+903322053965">
              <Icon.Phone className="size-4" /> +90 (332) 205 3965
            </a>
            <a
              className="flex items-center gap-x-2"
              href="mailto:info@kapsulteknoloji.org"
            >
              <Icon.Mail className="size-4" /> info@kapsulteknoloji.org
            </a>
            <div className="w-full   text-[20px] flex items-center justify-evenly  pt-1.5 ">
              <a
                target="_blank"
                className={iconClass}
                href="https://www.instagram.com/kapsulteknoloji"
              >
                <Icon.Instagram className="" />
              </a>
              <a
                target="_blank"
                className={iconClass}
                href="https://twitter.com/kapsulteknoloji"
              >
                <Icon.XTwitter />
              </a>
              <a
                target="_blank"
                className={iconClass}
                href="https://www.linkedin.com/company/kapsul-teknoloji-platformu/"
              >
                <Icon.Linkedin />
              </a>
              <a
                target="_blank"
                className={iconClass}
                href="https://www.threads.net/@kapsulteknoloji"
              >
                <Icon.Threads />
              </a>
              <a
                target="_blank"
                className={iconClass}
                href="https://www.facebook.com/KapsulTeknoloji"
              >
                <Icon.Facebook />
              </a>
              <a
                className={iconClass}
                target="_blank"
                href="https://www.youtube.com/channel/UCyT6skpXh6W09oADZwHXvLg"
              >
                <Icon.Youtube />
              </a>
            </div>
          </div>
        </div>
      </div>
      <h6 className=" font-light text-[10px] text-center pb-1">
        © 2024 - Kapsül Teknoloji Platformu - Tüm hakları saklıdır.
      </h6>
    </div>
  );
};
