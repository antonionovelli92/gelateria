import React, { useState, useEffect } from "react";
import Gelato from "./Gelato";
import axios from "axios";
// import data from "../fakeData";

const url = "https://react--course-api.herokuapp.com/api/v1/data/gelateria";


const Menu = () => {

  // todo ************** useSTATE **************
  // setto il loading iniziale
  const [isLoading, setIsLoading] = useState(true);
  // setto l'errore
  const [isError, setIsError] = useState(false);
  // tutti i prodotti che ottengo dalla chiamata
  const [prodotti, setProdotti] = useState();
  // tutti i prodotti filtrati
  const [prodottiFiltrati, setProdottiFiltrati] = useState();
  // il primo valore di categoria sarà "tutti"
  const [selected, setSelected] = useState(0);
  //Categorie di prodotti che potrò offire
  const [categorie, setCategorie] = useState([]);
  // todo ************** useSTATE **************



  //Filtro prodotti e modifico valore di selected
  const filtraProdotti = ((categoria, index) => {
    setSelected(index);
    //Se indico all ripristino allo stato iniziale
    if (categoria === "all") {
      setProdottiFiltrati(prodotti);
      return;
    } else {
      //Filtro i prodotti in base alla categoria
      const prodottiFiltrati = prodotti.filter((prodotto) => prodotto.categoria === categoria);
      setProdottiFiltrati(prodottiFiltrati);
    }
  })




  // ! creo un ***getData*** asincrono per ottenere i dati(maggior pulizia anche se non necessario)
  const getData = (async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axios.get(url);
      setProdotti(response.data.data);
      setProdottiFiltrati(response.data.data);


      //Ottengo Array di elementi non ripetibili
      const nuoveCategorie = Array.from(
        new Set(response.data.data.map((el) => el.categoria))
      );

      //Aggiungo all'inizio termine all
      nuoveCategorie.unshift("all");
      setCategorie(nuoveCategorie);

      //Termino Caricamento
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }

  })

  // todo **************USEEFFECT**************
  useEffect(() => {
    getData();
  }, []);



  return (
    <div className="container">
      <h4 className="text-center text-uppercase">Le Nostre Scelte</h4>
      {!isLoading && !isError ? (
        <>
          <div className="lista-categorie">
            {categorie.map((categoria, index) => (
              <button
                className={`btn btn-selector ${selected === index ? "active" : ""}`}
                key={index}
                // data-categoria={categoria}
                onClick={() => filtraProdotti(categoria, index)}
              >
                {categoria}
              </button>
            ))}
          </div>
          <hr />
          <div className="vetrina">
            {prodottiFiltrati.map((el) => (
              <Gelato key={el.id} {...el} />
            ))}
          </div>
        </>
      ) : (
        <h4 className="text-center" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          {isLoading ? "Loading..." : "Errore..."}
        </h4>
      )}
    </div>


  )

};

export default Menu;
