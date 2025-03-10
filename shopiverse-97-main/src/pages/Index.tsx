
import { Helmet } from "react-helmet";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Shopiverse | Premium Tech Products</title>
        <meta name="description" content="Discover our collection of premium tech products designed to elevate your daily life." />
      </Helmet>
      
      <Layout>
        <Hero />
        <FeaturedProducts />
      </Layout>
    </>
  );
};

export default Index;
