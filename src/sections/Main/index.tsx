"use client";
import React, { useEffect } from "react";
import cn from "classnames";
import { useRouter } from "next/router";

import styles from "./Main.module.scss";
import { mainContent } from "./content";
import CrossIcon from "./icon/cross.svg";
import PlusIcon from "./icon/plus.svg";

const Main = () => {
  const { locale } = useRouter();

  useEffect(() => {
    const scriptElem = document.createElement("script");
    scriptElem.type = "text/javascript";
    scriptElem.src = "https://assets.calendly.com/assets/external/widget.js";
    scriptElem.async = true;
    document.head.append(scriptElem);
  }, []);

  return (
    <>
      <section className={styles.Main}>
        <div className={styles.BigCircle}></div>

        <div className={cn("container", styles.Container)}>
          <div className={styles.SmallCircle}></div>

          <div dir={locale === "heb" ? "rtl" : "ltr"} className={styles.Content}>
            <h1 className={cn(styles.Title, { [styles.AlignRight]: locale === "heb" })}>
              <span className={styles.Blue}>{mainContent[locale]["Struggling"]}</span>{" "}
              {mainContent[locale]["to Fill Gaps in Your Tech Team? Here's the"]}{" "}
              <span className={styles.Green}>{mainContent[locale]["Solution!"]}</span>
            </h1>

            <p className={styles.Text}>
              {
                mainContent[locale][
                  "When tech talent is on the move, many companies are left understaffed. Need a fast, affordable fix? Nearshore remote developers are your answer."
                ]
              }
              <span>
                {" "}
                {mainContent[locale]["But should you go with freelancers or dedicated teams?"]}
              </span>
            </p>

            <ul className={styles.List}>
              <li className={styles.ListItem}>
                <CrossIcon className={styles.ListIcon} />
                <p className={styles.ListText}>
                  <span>{mainContent[locale]["Freelancers"]} </span>
                  {mainContent[locale]["juggle multiple projects, focus on the highest bidder."]}
                </p>
              </li>
              <li className={styles.ListItem}>
                <PlusIcon className={styles.ListIcon} />
                <p className={styles.ListText}>
                  <span>{mainContent[locale]["Dedicated teams"]} </span>
                  {
                    mainContent[locale][
                      "work exclusively on your project. Their priority is your success, ensuring long-term value."
                    ]
                  }
                </p>
              </li>
            </ul>

            <p className={styles.Text}>
              {
                mainContent[locale][
                  `If you're looking to get started quickly, this is your most efficient, cost-effective
              way to secure top-tier talent.`
                ]
              }
            </p>

            <p className={cn(styles.Text, styles.SemiBold)}>
              {mainContent[locale]["Book a free demo today and enjoy 10% off your first month!"]}
            </p>
          </div>

          <div className={styles.FormWrapper}>
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/rinat-globalteams/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=54c5f8"
              style={{
                padding: 16,
                minWidth: "320px",
                height: "100%",
                width: "100%",
              }}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
