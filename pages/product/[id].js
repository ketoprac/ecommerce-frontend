import React from "react";
import Layout from "@common/components/Layout"
import Container from "@material-ui/core/Container"

import ProductDetailCard from "@mobile/components/ProductDetailCard"

const ProductDetail = ({ product }) => {
  const {
    img,
    name,
    price,
    rating,
    sold,
    description,
    quantity,
    condition,
    weight,
    promo
  } = product

  return (
   <Layout>
     <Container maxWidth="sm">
      <ProductDetailCard
        img={img}
        title={name}
        price={price}
        rating={rating}
        sold={sold}
        description={description}
        quantity={quantity}
        condition={condition}
        weight={weight}
        promo={promo}
      />
     </Container>
   </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`https://sayur-app.vercel.app/api/products`,
  {
    method: "GET",
    headers: {
      // update with your user-agent
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36", 
      Accept: "application/json; charset=UTF-8",
    },
  });
  const products = await res.json();

  const paths = products.list.map((prod) => `/product/${prod.id}`,
  {
    method: "GET",
    headers: {
      // update with your user-agent
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36", 
      Accept: "application/json; charset=UTF-8",
    },
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://sayur-app.vercel.app/api/product/${params.id}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
}

export default ProductDetail;
