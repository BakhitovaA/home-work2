'use strict'; 
const fs = require('fs'); 
const conf = { encoding: 'utf8' }; 

const Pokemon = require('./pokemon'); 
const PokemonList = require('./pokemonList'); 

const random = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	max = Math.floor(Math.random() * (max - min + 1));
	return max + min;
};

const preparePokemonListBeforeHiding = (PokemonList) => {
   	//Берем случайное число покемонов: Не более 3. И не более чем передано. 
	var randomNumberOfPokemons = random(1, 3); 
	PokemonList.sort(() => Math.random());
	PokemonList.splice(randomNumberOfPokemons, PokemonList.length - randomNumberOfPokemons); 
	
    	return PokemonList;
}

/* Функция hide принимает в качестве аргументов путь и PokemonList. Функция прячет в папке, указанной в первом аргументе, 
случайное число покемонов из списка во втором аргументе.
*/

const hide = (way, PokemonList, callback) => { 
	
	PokemonList = preparePokemonListBeforeHiding(PokemonList); //Подготавливаем список покемонов перед тем, как их прятать
	
	var amountHidePokemons = 0; //Счетчик количества спрятанных покемонов
	
	//Cоздаем 10 папок с именами 01, 02 и так далее. 
	for (let i = 1; i <= 10; i++) {
		let nameFolder = (i == 10) ? way + '/' + i : way + '/0' + i; 
		fs.mkdir(nameFolder, err => { 
			if (err) throw err; 
			//Прячем в четные папки покемонов из подготовленного PokemonList в формате name|level
			if ((i % 2 == 0) && (PokemonList[(i/2)-1] instanceof Pokemon)) {
				let informationAboutHidePokemon = PokemonList[(i/2)-1].name + '|' + PokemonList[(i/2)-1].level;
				fs.writeFile(nameFolder + '/pokemon.txt', informationAboutHidePokemon, err => {
					if (err) throw err; 
					amountHidePokemons++; 
					//Когда все покемоны из PokemonList спрятаны, возвращаем список спрятанных покемонов
					if (amountHidePokemons == PokemonList.length) {
						callback(PokemonList);
					}
				});
			}
		})			
	} 
}

/* 
Функция seek принимает в качестве аргументов путь. Функция ищет в папке, указанной в первом аргументе, всех покемонов и возвращает их. 
*/ 


const seek = (way, callback) => { 
	const pokemonList = new PokemonList();
	var amountScannedFolders = 0;
	for (let i = 1; i <= 10; i++) {
        	let name = (i == 10) ? way + '/' + i : way + '/0' + i;
		fs.readFile(name + '/pokemon.txt', 'utf8', (err, informationAboutHidePokemon) => { 
			if (!err) { 
				let pokemonArray = informationAboutHidePokemon.split("|"); 
				pokemonList.add(pokemonArray[0], pokemonArray[1]); 
			} 
			amountScannedFolders++;
			if (amountScannedFolders == 10) {
				callback(pokemonList);
			}
		});
	}		
} 

module.exports = { 
	hide, 
	seek 
}
