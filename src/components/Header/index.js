import React from 'react';
import PropTypes from 'prop-types';

import './header.scss';

const Header = ({ baseAmount }) => (
  <header className="header">
    <h1 className="header__title">Converter</h1>
    <form>
      <input type="number" className="header__input"/>
    </form>
    <p className="header__text">{baseAmount} {baseAmount > 1 ? 'euros' : 'euro'}</p>
  </header>
);

// WARNING : utiliser la notation camelCase ici
Header.propTypes = {
  baseAmount: PropTypes.number.isRequired,
};

export default Header;

