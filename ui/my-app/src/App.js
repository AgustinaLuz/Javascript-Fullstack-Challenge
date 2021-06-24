import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await Axios.get(
      "http://localhost:4000/api/operations"
    );
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
        <p key={product._id}>{product.concept}</p>
      ))}
    </div>
  );
}

export default App;
