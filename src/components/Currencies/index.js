import React from 'react';
import PropTypes from 'prop-types';

import Currency from './Currency';

import './currencies.scss';

// Ici, on peut récupérer une référence à setCurrency du composant converter
// dans notre prop changeCurrency
// On récupère la valeur de currencySearch depuis les props
// On récupère la référence à la fonction setCurrencySearch de
// Converter dans la props changeCurrencySearch
const Currencies = ({ 
  currencies,
  changeCurrency,
  currencySearch,
  changeCurrencySearch
}) => {
  function handleChange(event) {
    // console.log(event.target.value);

    // on appelle la fonction passée dans la prop changeCurrencySearch
    // (c'est à dire la fonction setCurrencySearch de Converter)
    // à chaque modification de notre champ texte
    // on obtient ainsi un champ controllé :
    // son rendu est en permanence synchro avec une propriété du state
    changeCurrencySearch(event.target.value);
  }

  return (
    <main className="currencies">
      <input type="text" className="currencies__search" placeholder="Rechercher" value={currencySearch} onChange={handleChange} />
      <ul className="currencies__list">
        {
          // on va générer une portion d'UI pour chacun
          // des éléments de notre tableau currencies
          // on utilise notre sous-composant pour rendre la partie d'UI
          // on lui déverse les propriétés de currency en tant que props
          //
          // encore une fois, on transmet la référence à la méthode
          // setCurrency de Converter (puisqu'on l'a reçue dans notre prop
          // changeCurrency), par l'intermédiaire d'une prop hangeCurrency
          currencies.map((currency) => (
            <Currency
              changeCurrency={changeCurrency}
              key={currency.name}
              {...currency}
            />
          ))
        }
      </ul>
    </main>
  );
};

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
  currencySearch: PropTypes.string.isRequired,
  // on valide notre prop changeCurrencySearch : c'est une fonction
  changeCurrencySearch: PropTypes.func.isRequired,
};

export default Currencies;
