'use strict'; 

var Pokemon = require('./pokemon');

class PokemonList extends Array {
	add (name, level) {
		let newPokemon = new Pokemon (name, level);
		this.push(newPokemon);
	}
	
	show(){
		for (let pokemon of this) {
			pokemon.show();
		}
	}
}

module.exports = PokemonList;
