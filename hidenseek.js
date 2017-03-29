'use strict'; 
const fs = require('fs'); 
const conf = { encoding: 'utf8' }; 

const Pokemon = require('./pokemon'); 
const PokemonList = require('./pokemonList'); 

/* 

Принимает в качестве аргументов путь и PokemonList. Функция должна «спрятать» в папке, указанной в первом аргументе, случайное число покемонов из списка во втором аргументе. 

Не более 3. 
И не более чем передано. 
Покемоны должны быть выбраны из списка случайным образом. 
Cоздать 10 папок с именами 01, 02 и так далее. 
В некоторых из них создать файл pokemon.txt. В папке должен быть только один такой файл. 
Записать информацию о спрятанном покемоне в файл в формате Charmander|300 
Вернуть список спрятанных покемонов. 
Функция должна быть ассинхронной. Использование колбэка или промиса на ваше усмотрение. 

*/ 

const hide = (way, PokemonList, callback) => { 

	if (PokemonList.length <= 3) { 
		let number = random(1, PokemonList.length); 
	} else { 
		let number = random(1, 3); 
	} 

	var hidePockemons = []; //выбираем любой элемент массива PokemonList и записываем в новый массив 
	for (let i = 0; i < number; ++i) { 
		var rand = Math.floor(Math.random() * PokemonList.length); 
		hidePockemons[i] = PokemonList[rand]; 
		console.log(hidePockemons[i]); 
	} 

	for (let i = 1; i <= 10; i++) { 
		let name1 = (i == 10) ? way + i : way + '0' + i; //Cоздать 10 папок с именами 01, 02 и так далее. 
		fs.mkdir(name1, err => { 
			if (err) throw err; 
				console.log('Папка ${name1} создана'); 
			} 
			if (i % 2) { //В некоторых из них создать файл pokemon.txt. В папке должен быть только один такой файл. 
				let name2 = name1 + './pokemon.txt'; 
				fs.mkdir(name2, err => { 
					if (err) throw err; 
					console.log('Файл pokemon.txt в папке ${name1} создан'); 
				} 
			} 
		} 

	for (let i = 0; i < number; ++i) { 
		let textPoc = hidePockemons[i].getName + '|' + hidePockemons[i].getLevel; 
		fs.writeFile(way + '/pockemon.txt', textPoc, err => { 
			if (err) throw err; 
				console.log('Покемон ${textPoc} спрятан в файле ${way} /pockemon.txt'); 
		}); 
	} 
	callback(pokemonList);
} 

/* 
Функция seek 
Принимает в качестве аргументов путь. Функция должна «найти» в папке, указанной в первом аргументе, всех покемонов и вернуть PokemonList. 
Функция должна быть ассинхронной. Использование колбэка или промиса на ваше усмотрение. 
*/ 

const seek = (way, callback) => { 
	const pokemonList = new PokemonList(); 
	var count = 0; 
	fs.readFile(way + '/pockemon.txt', 'utf8', (err, list) => { 
		if (err) { 
			throw err; 
		} else { 
			let pokemonArray = list.split(", "); 
			pokemonList.add(pokemonArray[0], pokemonArray[1]); 
		} 
	callback(pokemonList); 
	}); 
} 

module.exports = { 
hide, 
seek 
}
