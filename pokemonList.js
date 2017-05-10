'use strict'; 

var Pokemon = require('./pokemon');

class PokemonList extends Array {
	add (name, level) {
		let newPokemon = new Pokemon (name, level);
		this.push(newPokemon);
	}
}

module.exports = PokemonList;
