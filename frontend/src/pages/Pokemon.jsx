import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Pokemon() {
  const { pokemonName, id } = useParams();

  const [pokemon, setPokemon] = useState([]);

  const getPokemon = async () => {
    const url = await fetch('https://pokeapi.co/api/v2/pokemon/');
    const res = await url.json();

    if(pokemon.length == 0) {
      res.results.map(async (p) => {
        if(p.name === pokemonName) {
          const urlAttributes = await fetch(p.url);
          const resAttributes = await urlAttributes.json();
  
          setPokemon(array => [...array, 
            { 
              pokemonName: p.name,
              abilities: resAttributes.abilities,
              image: resAttributes.sprites.front_default  
            }
          ]);
        }
      });
    }
  }

  useEffect(() => {
    getPokemon();
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
        {
          pokemon.map(p => {
            return (
              <div className="grid grid-rows-[40px_1fr]" key={id}>
                <div>
                  <Link className="bg-slate-700 p-2 mb-4 text-center text-lg text-violet-600 font-bold rounded-md col-start-1 col-end-3" to="/allpokemons">Go back</Link>  
                </div>
                <div className="bg-slate-900 p-10 border-2 border-violet-600 flex justify-between rounded-lg">
                  <div className="pr-16">
                    <h1 className="pb-10 text-violet-600 text-3xl font-bold">{p.pokemonName}</h1>
                    <h2 className="text-violet-600 font-bold">Abilities</h2>
                    {
                      p.abilities.map(a => (
                        <p className="text-slate-500">{a.ability.name}</p>
                      ))
                    }
                  </div>
                  <img className="w-40" src={p.image} />
                </div>
              </div>
            )
          })
        }
    </div>
  )
}
