import React from "react";
import cn from "classnames";

import { useRouter } from "next/router";

import styles from "./Header.module.scss";
import LogoSVG from "@/assets/icons/logo.svg";
import USFlag from "@/assets/icons/flags/us.svg";
import ILFlag from "@/assets/icons/flags/il.svg";
import ArrowIcon from "./icons/arrow.svg";

type LangType = {
  id: string;
  name: string;
  icon: JSX.Element;
};

const langs: LangType[] = [
  {
    id: "en",
    name: "EN",
    icon: <USFlag className={styles.LangFlag} />,
  },
  {
    id: "heb",
    name: "HEB",
    icon: <ILFlag className={styles.LangFlag} />,
  },
];

const Header = () => {
  const router = useRouter();

  const [activeLang, setActiveLang] = React.useState(router.locale || "en");
  const [isOpenLang, setIsOpenLang] = React.useState(false);

  const toggleLang = () => {
    setIsOpenLang(!isOpenLang);
  };

  const switchLanguage = (locale: string) => {
    setActiveLang(locale);
    const path = router.asPath;
    router.push(path, path, { locale });
  };

  return (
    <header className={styles.Header}>
      <div className={cn("container", styles.Container)}>
        <a href="http://www.globalteams.ltd">
          <LogoSVG className={styles.Logo} />
        </a>

        <div className={cn(styles.LangWrapper, { [styles.Active]: isOpenLang })}>
          <ul className={styles.LangList}>
            {langs.map((lang) => (
              <li
                key={lang.id}
                className={cn(styles.LangItem, {
                  [styles.Active]: lang.id === activeLang || isOpenLang,
                })}
                onClick={() => {
                  switchLanguage(lang.id);
                  toggleLang();
                }}
              >
                {lang.icon}
                <p className={styles.LangText}>{lang.name}</p>
              </li>
            ))}
          </ul>

          <ArrowIcon
            className={cn(styles.LangArrow, { [styles.Active]: isOpenLang })}
            onClick={toggleLang}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
