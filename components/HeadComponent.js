import Head from "next/head";

export const Headcomponent = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

