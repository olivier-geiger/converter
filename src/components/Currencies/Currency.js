import React from 'react';
import PropTypes from 'prop-types';

// on récupère dans changeCurrency
// une référence à setCurrency du composant Converter
//
// on peut enfin s'en servir pour réagir au click sur le li :
//
// pas besoin d'accéder à l'event puis au li puis au textContent
// pour accèder au nom de la devise, celle ci est directement présente dans notre prop
// notre prop name
const Currency = ({ name, changeCurrency}) => (
  <li className="currencies__list__item" onClick={() => changeCurrency(name)}>
    {name}
  </li>
);

Currency.propTypes = {
  name: PropTypes.string.isRequired,
  changeCurrency: PropTypes.func.isRequired,
};

export default Currency;
