import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card"
import { getMeAllProducts } from "./helper/coreapicalls";


const Home = () => {
  // console.log("API is", API);

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const showAllproducts = () => {
    getMeAllProducts().then(data => {
      if (data.error) {
        setError(true);
      } else {
        setProducts(data);
      }
    })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    showAllproducts()
  }, [])

  return (
    <Base title="Home page" description='Welcome to the Tshirt store'>
      <div className="row">
        {products && products.map((product, index) => {
          return (
            <div key={index} className="col-4">
              <Card product={product} />
            </div>
          )
        })}
      </div>
    </Base>
  );
};

export default Home;
