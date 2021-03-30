/* eslint-disable react/prefer-stateless-function */
// == Import npm
import React from 'react';

// == Import locaux
import currenciesData from 'src/data/currencies';

import Header from '../Header';
import Currencies from '../Currencies';
import Amount from '../Amount';
import Toggler from '../Toggler';

import './converter.scss';

// Nous avons tranformé notre composant fonctionnel
// en composant classe pour pouvoir lui ajouter un état interne (state)
// -> https://fr.reactjs.org/docs/state-and-lifecycle.html#converting-a-function-to-a-class
class Converter extends React.Component {
  // grâce à syntaxe alternative des propriétés / méthodes
  // (nécessite @babel/plugin-proposal-class-properties)
  // on peut s'affranchir de constructeur
  // pour initialiser le state :
  state = {
    open: true,
    baseAmount: 1,
    currency: 'Brazilian Real',
    // eslint-disable-next-line react/no-unused-state
    neSeraPasModifieeParLeSetStateDeToggle: 'oh que non !',
  };

  // permet de calculer le montant converti
  // cette méthode s'appuie sur le montant à convertir
  // et la devise cible stockés dans le state
  getConvertedAmount() {
    const { baseAmount, currency } = this.state;

    // on fait un find sur la currency pour trouver le rate
    const currencyObject = currenciesData.find(
      (currencyData) => currencyData.name === currency,
    );

    // on récupère le taux associé
    const { rate } = currencyObject;

    // on multiplie le rate avec le baseAmount
    const amount = rate * baseAmount;

    // on retourne la valeur arrondie au centième
    return Math.round(amount * 100) / 100;
  }

  // on n'a également plus à lier le this à la méthode
  // toggle
  toggle = () => {
    console.log('exécution de toggle');
    console.log(this);

    // il ne faut pas modifier directement
    // l'état de notre composant
    // Sinon, comment React peut il se rendre compte qu'un changement a eu lieu ?
    // On doit passer par la méthode setState pour cela
    /*
    à ne pas faire du coup :
    this.state = {
      open: !this.state.open,
    };
    */

    // on donne à la fonction setState un objet
    // qui sera fusionné avec le state courant
    const { open: oldOpenValue } = this.state;
    this.setState({
      open: !oldOpenValue,
    });
  }

  show = (currencies) => {
    console.log(currencies.name);
    console.log(this);

    const { currency, baseAmount} =this.state;
    this.setState({
      currency: currency,
      baseAmount: baseAmount,
      
    })
  }

  render() {
    // ici, on déclare une variable open
    // qui va conditionner l'affichage de notre
    // composant Currencies
    // on se base sur le fait que pour évaluer une condition du type :
    // - true && 'autre condition', on a besoin d'aller évaluer 'autre condition'
    // - false && 'autre condition', on N'a  PAS besoin d'aller évaluer 'autre condition'

    // on effectue une affectation par décomposition
    // ici on récupère la valeur de la propriété open
    // de notre state (this.state) dans une constante open
    const { open, baseAmount, currency } = this.state;

    const convertedAmount = this.getConvertedAmount();

    // on se base ainsi sur notre state (état interne du composant)
    // pour déterminer si oui ou non on affiche le composant Currencies
    return (
      <div className="converter">
        <Header baseAmount={baseAmount} />
        <Toggler open={open} doToggle={this.toggle} />
        {
          // on conditionne l'affichage de notre composant Currencies
          // à la valeur de la variable open.
          // La vairable a été initialisée avec la valeur de la propriété
          // open du state.
          // ici, on pourrait traduire la ligne suivante par :
          // si open est vrai, on affiche currencies
          open && <Currencies currencies={currenciesData} doShow={this.show} />
        }
        <Amount amount={convertedAmount} currency={currency} />
      </div>
    );
  }
}

// == Export
export default Converter;
