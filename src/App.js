import React, { useEffect , useState } from "react";
import "./App.css";
import axios from "axios";
import pokedex from "./pokedex.png";

const App = () => {
  const [pokemon, setPokemon] = useState("1");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    pegarPokemon();
  };
  const pegarPokemon = async () => {
    const lista = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      lista.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(lista);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(pokemonData);
  
  useEffect(() => {
    pegarPokemon();
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          <input className="pesquisa"
            type="text"
            onChange={handleChange}
            placeholder="Digite o nome ou nº do pokemon"
          />
        </label>
      </form>

      {pokemonData.map((data, key) => {    
        return ( 
          <div className="container" key={key}>
            <img className="pokedex" src={pokedex}/>
            <div>
              <img className="pokemon-img" src={data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']} />
              <div className="nome">{data.name}</div>
              <div className="tipo">Tipo: {pokemonType}</div>
              <div className="altura">Altura: {data.height}</div>
              <div className="peso">Peso: {data.weight}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
