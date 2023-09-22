import React from "react";

const Gelato = ({ nome, img, descrizione, prezzo, categoria }) => {
  return (
    < article className="gelato" >
      <img src={img} alt={nome} />
      <div className="gelato-footer">
        <h4>{nome}</h4>
        <h4 className="price">{prezzo}€</h4>
      </div>
      <p className="item-text">{descrizione}</p>
    </article >

  )
};

export default Gelato;
