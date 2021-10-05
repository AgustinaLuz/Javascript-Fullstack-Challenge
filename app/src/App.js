import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Entries from "./components/entries";
import Amount from "./components/amount";

function App() {
  return (
    <div>
      <Entries />
      <Amount />
    </div>
  );
}
export default App;
