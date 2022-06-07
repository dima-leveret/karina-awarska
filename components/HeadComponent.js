import Head from "next/head";

const Headcomponent = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default Headcomponent;
