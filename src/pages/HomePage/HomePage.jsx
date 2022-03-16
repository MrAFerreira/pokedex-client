import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PokeCard from '../../components/PokeCard/PokeCard';
import axios from 'axios';
import './HomePage.css';
import SignupPage from '../SignupPage/SignupPage';

function HomePage() {
  const [pokemon, setPokemon] = useState([]);

  const fetchData = async () => {
    try {
      let response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=898`);
      let pokemon = response.data.results;
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
      <h1>Pokemon List</h1>
      <div className="container">
        {pokemon &&
          pokemon.map((el, index) => (
            <Link to={`/pokemon/${el.name}`}>
              <PokeCard key={el.name} pokemon={el} index={index + 1} />
            </Link>
          ))}
      </div>
    </div>
  );
}

export default HomePage;
