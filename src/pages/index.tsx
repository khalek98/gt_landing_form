import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Main from "@/sections/Main";

const HomePage: React.FC = (_props) => {
  return (
    <>
      <Head>
        <title>Global Teams</title>
        <link rel="shortcut icon" href="/favicons/favicon.svg" type="image/svg+xml" />
      </Head>

      <>
        <Header />

        <main>
          <Main />
        </main>
      </>
    </>
  );
};

export default HomePage;
