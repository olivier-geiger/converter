import React from 'react';
import PropTypes from 'prop-types';

import './amount.scss';

const Amount = ({ amount, currency, doShow }) => { 
  return (
    <header className="amount">
      <p className="amount__amount">{amount}</p>
      <p className="amount__currency">{currency}</p>
    </header>
  );
}

Amount.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export default Amount;
