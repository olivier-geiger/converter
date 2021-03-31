import React from 'react';
import PropTypes from 'prop-types';


import Currency from './Currency';

import './currencies.scss';

// ici, on peut récupérer une référence à setCurrency du composant converter
// dans notre prop changeCurrency
const Currencies = ({ currencies, changeCurrency }) => { 
  return(
    <main className="currencies">
      <div className="currencies__title">Currencies</div>
      <ul className="currencies__list">
        {
          // on va générer une portion d'UI pour chacun
          // des éléments de notre tableau currencies
          // on utilise notre sous-composant pour rendre la partie d'UI
          // on lui déverse les propriétés de currency en tant que props
          currencies.map((currency) => (<Currency 
              // encore une fois, on transmet la référence à la méthode
              // setCurrency de Converter (puisqu'on l'a reçue dans notre prop
              // changeCurrency), par l'intermédiaire d'une prop changeCurrency
            changeCurrency={changeCurrency} 
            key={currency.name} 
            {...currency} />))
        } 
      </ul>
    </main>
  );
}

// on indique que pour notre composant Currencies
// il doit posséder une prop currencies
// qui doit être un tableau d'objets possédant
// une propriété name qui est une chaine de caractère.
Currencies.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.shape(
      {
        name: PropTypes.string.isRequired,
      },
    ).isRequired,
  ).isRequired,
  // on définit que notre prop changeCurrency
  // est une fonction
  changeCurrency: PropTypes.func.isRequired,
};

export default Currencies;
