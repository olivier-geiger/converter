import React from 'react';
import PropTypes from 'prop-types';


const Currency = ({ name }) => {
  return (
    <li className="currencies__list__item" >
      {name}
    </li>
);
  }

Currency.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Currency;
