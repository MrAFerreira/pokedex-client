import React from 'react';
import './PokeCard.css';

function PokeCard(props) {
  const { pokemon, index } = props;

  const capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };
  return (
    <div className="card">
      <h3>
        {index}. {capitalize(pokemon.name)}
      </h3>
    </div>
  );
}

export default PokeCard;
