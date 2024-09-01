"use client"; // เพิ่มบรรทัดนี้

import React, { useEffect, useState } from 'react';

const PokedexPage = () => {
    const [pokemonList, setPokemonList] = useState<any[]>([]);
    const [offset, setOffset] = useState(0);
    const limit = 8;

    const loadPokemon = async (offset: number, limit: number) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            const data = await response.json();
            const newPokemonList = await Promise.all(data.results.map(async (element: any, index: number) => {
                const id = offset + index + 1;
                const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const pokemonData = await pokemonResponse.json();

                return {
                    id,
                    name: element.name.charAt(0).toUpperCase() + element.name.slice(1),
                    imgURL: pokemonData.sprites.other['official-artwork'].front_default, 
                };
            }));
            if (offset === 0) {
                setPokemonList(newPokemonList);
            } else {
                setPokemonList((prev) => [...prev, ...newPokemonList]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadPokemon(offset, limit);
    }, [offset]);

    return (
        <div data-theme='' className="container bg-black mx-auto mt-5">
            <h1 className="text-4xl font-bold mb-5 text-white">All Pokemon</h1>

            <div id="name" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {pokemonList.map((pokemon) => (
                    <div key={pokemon.id} className="card bg-neutral-content shadow-xl">
                        <figure className="px-10 pt-10">
                            <img src={pokemon.imgURL} alt={pokemon.name} className="w-48 h-48 lg:w-64 lg:h-64 rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-black">{pokemon.name}</h2>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-5">
                <button id="show-more" className="btn btn-primary" onClick={() => setOffset(offset + limit)}>Show More</button>
            </div>
        </div>
    );
};

export default PokedexPage;
