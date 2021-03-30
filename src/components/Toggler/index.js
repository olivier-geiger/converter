import React from 'react';
import PropTypes from 'prop-types';

import './toggler.scss';

const Toggler = ({ open, doToggle }) => {
  // en fontion de la props open, on va générer la classe css
  // à appliquer sur notre bouton
  const className = open ? 'toggler toggler--open' : 'toggler';

  return (
    <button type="button" className={className} onClick={doToggle}>=</button>
  );
};

Toggler.propTypes = {
  open: PropTypes.bool.isRequired,
  doToggle: PropTypes.func.isRequired,
};

export default Toggler;
