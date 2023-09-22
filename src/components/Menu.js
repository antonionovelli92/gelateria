import React, { useState, useEffect } from "react";
import Gelato from "./Gelato";
import axios from "axios";
// import data from "../fakeData";

const url = "https://react--course-api.herokuapp.com/api/v1/data/gelateria";


const Menu = () => {
  // setto il loading iniziale
  const [loading, setLoading] = useState(true);
  // setto l'errore
  const [error, setError] = useState(false);
  // setto i prodotti filtrati
  const [prodotti, setProdotti] = useState();


  return (
    <div className="container">
      <h5>MENU</h5>

      <Gelato />
    </div>

  )

};

export default Menu;
