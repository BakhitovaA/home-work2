'use strict'; 
const fs = require('fs'); 
const conf = { encoding: 'utf8' }; 

const Pokemon = require('./pokemon'); 
const PokemonList = require('./pokemonList'); 

/* 
Принимает в качестве аргументов путь и PokemonList. Функция должна «спрятать» в папке, указанной в первом аргументе, 
случайное число покемонов из списка во втором аргументе. 
Не более 3. 
И не более чем передано. 
Покемоны должны быть выбраны из списка случайным образом. 
Cоздать 10 папок с именами 01, 02 и так далее. 
В некоторых из них создать файл pokemon.txt. В папке должен быть только один такой файл. 
Записать информацию о спрятанном покемоне в файл в формате Charmander|300 
Вернуть список спрятанных покемонов. 
Функция должна быть ассинхронной. Использование колбэка или промиса на ваше усмотрение. 
*/ 
const random = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	max = Math.floor(Math.random() * (max - min + 1));
	return max + min;
};

const preparePokemonListBeforeHiding = (PokemonList) => {
	
    //Берем случайное число покемонов: Не более 3. И не более чем передано. 
	var number = random(1, 3); 
	PokemonList.sort(() => Math.random());
	PokemonList.splice(number, PokemonList.length - number); 
	
    return PokemonList;
}

const hide = (way, PokemonList, callback) => { 
	
	//Подготавливаем список покемонов перед тем, как спрятать, в соответствии с условиями
	PokemonList = preparePokemonListBeforeHiding(PokemonList); 
	
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
					//Когда все покемоны из PokemonList спрятаны, срабатывает callback
					if (amountHidePokemons == PokemonList.length) {
						callback(PokemonList);
					}
				});
			}
		})			
	} 
}

/* 
Функция seek 
Принимает в качестве аргументов путь. Функция должна «найти» в папке, указанной в первом аргументе, всех покемонов и вернуть PokemonList. 
Функция должна быть ассинхронной. Использование колбэка или промиса на ваше усмотрение. 
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
