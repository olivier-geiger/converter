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
    // on a bien une propriété du state qui permet de définir
    // la devise courante, check
    currency: 'United States Dollar',
    // on prévoit dans le state une propriété pour stocker la devise à rechercher
    currencySearch: '',
    // eslint-disable-next-line react/no-unused-state
    neSeraPasModifieeParLeSetStateDeToggle: 'oh que non !',
  };

  // on définit notre fonction setCurrency dans le composant
  // Converter puisque c'est ici que réside la donnée à modifier
  // (la propriété currency de this.state)
  // eslint-disable-next-line class-methods-use-this
  setCurrency = (newCurrencyValue) => {
    console.log('set currency définie dans Converter');
    // on peut donner à la propriété currency du state
    // une nouvelle valeur
    // grâce à la méthode this.setState
    // rappel l'objet passé en argument à setState sera fusionné avec le
    // state courant.
    this.setState({
      currency: newCurrencyValue,
    });
  }

  // on prévoit une fonction qui permet de changer
  // la valeur de la propriété currencySearch du state
  setCurrencySearch = (newCurrencySearch) => {
    this.setState(
      {
        currencySearch: newCurrencySearch,
      },
    );
  }

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

  // on prévoit une fonction effectuant une projection
  // depuis le state et des données immuables.
  // Cette fonction retourne un tableau des devises à afficher dans l'interface
  getFilteredCurrencies() {
    // on récupère la devise à rechercher depuis le state
    const { currencySearch } = this.state;

    // on passe la chaine à rechercher en minuscule
    const currencySearchInLowerCase = currencySearch.toLowerCase();

    // on filtre le tableau complet des devises
    // pour ne garder que les devises dont le nom contient
    // la valeur présente dans le champ de recherche
    // (et donc stockée dans la propriété currencySearch du state)
    const filteredCurrencies = currenciesData.filter(
      (currencyData) => currencyData.name.toLowerCase().includes(currencySearchInLowerCase),
    );

    // une fois le tableau filtré, on le renvoit
    return filteredCurrencies;
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
    //
    // on récupère le currencySearch depuis le state
    //
    // on transmet au composant Currencies une référence à la méthode
    // setCurrencySearch par l'intermédiaire des props
    const {
      open, baseAmount, currency, currencySearch,
    } = this.state;

    const convertedAmount = this.getConvertedAmount();

    // Ici, on obtient dans filteredeCurrencies
    // un tableau de devise filtré par le champ de recherche
    const filteredeCurrencies = this.getFilteredCurrencies();

    // on se base ainsi sur notre state (état interne du composant)
    // pour déterminer si oui ou non on affiche le composant Currencies
    return (
      <div className="converter">
        <Header baseAmount={baseAmount} />
        <Toggler open={open} doToggle={this.toggle} />
        {
          // on coditionne l'affichage de notre composant Currencies
          // à la valeur de la variable open.
          // La vairable a été initialisée avec la valeur de la propriété
          // open du state.
          // ici, on pourrait traduire la ligne suivante par :
          // si open est vrai, on affiche currencies
          //
          // On transmet au composant Currency
          // une référence à la méthode setCurrency de l'objet courant
          // par l'intermédiaire d'une prop : changeCurrency
          // Il nous reste maintenant à transmettre le tableau 
          // filtré au composant currencies
          // Peut lui import que ce tableau contienne 1, 10 ou 100 devises
          // il sait les afficher.
          open && (
          <Currencies
            currencySearch={currencySearch}
            changeCurrencySearch={this.setCurrencySearch}
            currencies={filteredeCurrencies}
            changeCurrency={this.setCurrency}
          />
          )
        }
        {
          // on transmets bien la valeur de la devise courante
          // à notre composant Amount pour qu'il l'affiche, check.

        }
        <Amount amount={convertedAmount} currency={currency} />
      </div>
    );
  }
}

// == Export
export default Converter;
