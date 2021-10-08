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

  const formatDate = (date) => {
    let formattedDate = date.slice(0, 10);
    return formattedDate;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <div className="product">{product.concept} </div>
          <div className="amount">{product.amount} </div>
          {formatDate(product.date)}
          {product.category} - {product.type}
        </div>
      ))}
    </div>
  );
}

export default Entries;
