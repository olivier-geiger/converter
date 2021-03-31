# Réagir à un évènement pour modifier le state

## Dans le composant hébergeant le state

### prévoir une méthode permettant de le modifier

 ```js
 setOpen = (newOpenValue) => {
   this.setState(
     {
       open: newOpenValue,
     }
   );
 }
 ```

 ### transmettre une référence à la méthode setOpen au composant qui en a besoin

 Note : Ce mécanisme de transmission peut éventuellement se faire sur plusieurs niveau.

 Dans ce cas, on récupèrera la référence dans une des props du composant et on la transmettra à nouveau à son descendant par le mécanisme ci-dessous.

dans la méthode _render_ de notre composant :

```jsx
<LeComposantQuiABesoinDAppelerSetOpen changeOpen={this.setOpen} />
```

### dans le composant enfant

On récupère la référence à la fonction setOpen par l'intermédiaire de
la prop changeOpen et on s'en sert

```js
const LeComposantQuiABesoinDAppelerSetOpen = ({ changeOpen }) => (
  <div className="container">
    <button onClick={() => changeOpen(true)}>ouvrir</button>
    <button onClick={() => changeOpen(false)}>fermer</button>
  </div>
);
```
