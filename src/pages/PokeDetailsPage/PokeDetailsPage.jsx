import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './PokeDetailsPage.css';

function PokeDetailsPage() {
  const [pokemon, setPokemon] = useState(null);
  const { name } = useParams();

  const capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  const fetchData = async () => {
    try {
      let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      let pokemon = response.data;
      setPokemon(pokemon);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Link to="/"> {'<- Back'}</Link>
      {pokemon && (
        <>
          <h1>{capitalize(pokemon.name)}</h1>
          <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />

          <div className="info">
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <ul>
              <h5>Types:</h5>
              {pokemon.types.map((type) => (
                <li>{capitalize(type.type.name)}</li>
              ))}
            </ul>
          </div>
          <div className="abilities">
            <h5>Abilities:</h5>
            {pokemon.abilities.map((ability) => (
              <>
                <p>{ability.ability.name}</p>
              </>
            ))}
          </div>
          <div className="stats">
            <h4>Base Stats</h4>
            {pokemon.stats.map((stat) => (
              <div className="stat-container">
                <p>
                  <b>{stat.stat.name}</b>
                </p>
                <p>: {stat.base_stat}</p>
              </div>
            ))}
          </div>
          <div className="moves">
            <h4>Moves</h4>
            <div className="moves-container">
              {pokemon.moves.map((move) => (
                <>
                  <div className="single-move">
                    <p>{move.move.name}</p>
                  </div>
                </>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PokeDetailsPage;
