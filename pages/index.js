import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Layout from "@common/components/Layout";

import ProductCard from "@common/components/ProductCard";

const HomePage = ({ products }) => {
  const { list } = products;
  return (
    <Layout>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          {list.map((list) => {
            return (
              <Grid key={list.id} item xs={6} sm={6}>
                <ProductCard
                  productID={list.id}
                  img={list.img}
                  title={list.name}
                  promoLabel={list.promo}
                  price={list.price}
                  rating={list.rating}
                  sold={list.sold}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  // const res = await fetch(`http://localhost:3000/api/products`); for local
  const res = await fetch(`https://sayur-app.vercel.app/api/products`,
  {
    method: "GET",
    headers: {
      // update with your user-agent
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36", 
      Accept: "application/json; charset=UTF-8",
    },
  });
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
}

export default HomePage;
