'use strict'; 

var Pokemon = require('./pokemon');

class PokemonList extends Array {
	constructor (...pokemons) {
		return super(...pokemons);
	}

	add (name, level) {
		let newPokemon = new Pokemon (name, level);
		this.push(newPokemon);
	}

    show(){
		for (let pokemon of this) {
			console.log(pokemon.getName + ' ' + pokemon.getLevel);
		}
		console.log("Общее количество: " + this.length);
	}
}

module.exports = PokemonList;