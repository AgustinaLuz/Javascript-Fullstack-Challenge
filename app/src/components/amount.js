import React, { useState, useEffect } from "react";
import Axios from "axios";

function Amount() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await Axios.get("http://localhost:4000/api/operations");
    const products = data;
    setProducts(products);
  };

  const totalAmount = () => {
    let totalAmount = 0;
    products.map((product) => {
      if (product.type == "ingreso") {
        totalAmount += parseInt(product.amount);
      } else {
        totalAmount -= parseInt(product.amount);
      }
    });
    return totalAmount;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>SALDO TOTAL:</h1>
      <p>{totalAmount()}</p>
    </div>
  );
}
export default Amount;
