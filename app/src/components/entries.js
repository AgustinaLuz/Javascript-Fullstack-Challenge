import React, { useState, useEffect } from "react";
import "./entries.css";
import Axios from "axios";

function Entries() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await Axios.get("http://localhost:4000/api/operations");
    const products = data;
    setProducts(products);
    console.log(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <p key={product._id}>
          {product.concept} - {product.amount} - {product.date} -{" "}
          {product.category} - {product.type}
        </p>
      ))}
    </div>
  );
}

export default Entries;
