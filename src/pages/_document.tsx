import { Html, Head, Main, NextScript, DocumentProps } from "next/document";

export default function Document(props: DocumentProps) {
  const { locale } = props;

  return (
    <Html lang={locale || "en"}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export async function getServerSideProps({ locale }) {
  const supportedLocales = ["en", "heb"];

  if (!supportedLocales.includes(locale)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}
