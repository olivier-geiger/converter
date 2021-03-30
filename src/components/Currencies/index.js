import React from 'react';
import PropTypes from 'prop-types';


import Currency from './Currency';

import './currencies.scss';

const Currencies = ({ currencies, doShow }) => { 
  return(
    <main className="currencies">
      <div className="currencies__title">Currencies</div>
      <ul className="currencies__list"  onClick=    { () => doShow(currencies.name)}>
        {
          // on va générer une portion d'UI pour chacun
          // des éléments de notre tableau currencies
          // on utilise notre sous-composant pour rendre la partie d'UI
          // on lui déverse les propriétés de currency en tant que props
          currencies.map((currency) => (<Currency key={currency.name} {...currency} />))
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
};

export default Currencies;
