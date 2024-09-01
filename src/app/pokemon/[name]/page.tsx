"use client";

import React, { useEffect, useState } from "react";

interface PokemonProps {
  params: {
    name: string;
  };
}

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string; // รูปภาพ shiny
    other: {
        "official-artwork": {
          front_default: string; // รูปภาพ official artwork
        };
      };
  };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string } }[];
  height: number; // ความสูง
  weight: number; // น้ำหนัก
}

export default function PokemonPage({ params }: PokemonProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const pokemonName = params.name;

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data: Pokemon = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemonData();
  }, [pokemonName]);

  if (!pokemon) {
    return (
        <div className="flex justify-center items-center h-screen">
          <img 
            src="https://media.tenor.com/tQCbROIO5cQAAAAj/pikachu-pokemon.gif" // URL ของภาพ GIF ที่ต้องการใช้
            alt="Loading..."
            className="mx-auto w-56 h-56" // ปรับขนาดตามต้องการ
          />
        </div>
      );
  }

  return (
    <div className="container mx-auto p-5 flex flex-col items-center">
      {/* ชื่อ Pokémon */}
      <h2 className="text-5xl font-bold mb-5 text-center">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>

      <div className="flex justify-center items-center">
        {/* รูปภาพ */}
        <img 
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name} 
          className="w-64 h-64 lg:w-96 lg:h-96 mr-5" // ขยายขนาดรูปภาพ
        />
        
        {/* ข้อมูล Pokémon */}
        <div className="flex flex-col justify-center">
          <div className="mt-4">
            <h2 className="text-base font-semibold">Types</h2>
            <ul className="text-light text-2xl">
              {pokemon.types.map((typeInfo) => (
                <li key={typeInfo.type.name} className="text-light">{typeInfo.type.name}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h2 className="text-base font-semibold">Stats</h2>
            <ul className="text-light text-2xl">
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name} className="text-light">
                  {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h2 className="text-base font-semibold">Abilities</h2>
            <ul className="text-light text-2xl">
              {pokemon.abilities.map((abilityInfo) => (
                <li key={abilityInfo.ability.name} className="text-light">{abilityInfo.ability.name}</li>
              ))}
            </ul>
          </div>

          {/* ข้อมูลเพิ่มเติม */}
          <div className="mt-4">
            <h2 className="text-base font-semibold">Height</h2>
            <p className="text-light text-2xl">{pokemon.height / 10} m</p>
          </div>

          <div className="mt-4">
            <h2 className="text-base font-semibold">Weight</h2>
            <p className="text-light text-2xl">{pokemon.weight / 10} kg</p>
          </div>
        </div>
      </div>
    </div>
  );
}
