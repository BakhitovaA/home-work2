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

const hide = (way, PokemonList, callback) => { 

	if (PokemonList.length <= 3) { 
		var number = random(1, PokemonList.length); 
	} else { 
		var number = random(1, 3); 
	} 

	var hidePockemons = []; //выбираем любой элемент массива PokemonList и записываем в новый массив 
	for (let i = 0; i < number; i++) { 
		var rand = Math.floor(Math.random() * PokemonList.length); 
		hidePockemons[i] = PokemonList[rand]; 
		console.log(hidePockemons[i]); 
	} 

	for (let i = 1; i <= 10; i++) { 
		let name = (i == 10) ? way + '/' + i : way + '/0' + i; //Cоздать 10 папок с именами 01, 02 и так далее. 
		fs.mkdir(name, err => { 
			if (err) throw err; 
			console.log('Папка ' + name + ' создана'); 
			var count = 0;
			if (hidePockemons[i-1] instanceof Pokemon) {
				let textPoc = hidePockemons[i-1].name + '|' + hidePockemons[i-1].level;
				fs.writeFile(name + '/pokemon.txt', textPoc, err => {
					if (err) throw err; 
					console.log('Файл pokemon.txt в папке ' + name + ' создан'); 
					count++;
					console.log('Покемон ' + textPoc + ' спрятан в файле ' + name + '/pokemon.txt'); 
					if (count == hidePockemons.length) {
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
	var count = 0;
	for (let i = 1; i <= 10; i++) {
        let name = (i == 10) ? way + i : way + '0' + i;
		fs.readFile(name + '/pokemon.txt', 'utf8', (err, list) => { 
			if (!err) { 
				let pokemonArray = list.split(", "); 
				pokemonList.add(pokemonArray[0], pokemonArray[1]); 
				console.log(list);
			} 
			count++;
            if (count == 10) {
                callback(pokemonList);
            }
		});
	}		
} 

module.exports = { 
	hide, 
	seek 
}
