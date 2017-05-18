'use strict'; 
const fs = require('fs'); 
const conf = { encoding: 'utf8' }; 

const Pokemon = require('./pokemon'); 
const PokemonList = require('./pokemonList'); 

/* Функция hide принимает в качестве аргументов путь и PokemonList. Функция прячет в папке, указанной в первом аргументе, 
случайное число покемонов из списка во втором аргументе.
*/

const hide = (way, PokemonList, callback) => { 
	//Подготавливаем список покемонов перед тем, как спрятать, в соответствии с условиями
	PokemonList = preparePokemonListBeforeHiding(PokemonList); 
	
	//Cоздаем 10 папок с именами 01, 02 и так далее.
	let amountCreateFolder = 0; //Счетчик количества созданных папок	
	for (let i = 1; i <= 10; i++) {
		let nameFolder = (i == 10) ? way + i : way + '0' + i; 
		fs.mkdir(nameFolder, err => { 
			if (err) throw err; 
			amountCreateFolder++
			if (amountCreateFolder == 10) { //Когда все папки созданы, начинаем прятать покемонов в случайные папки
				hidingPokemonsInFolder(way, PokemonList, result => {
					callback(result); //Возвращаем список спрятанных покемонов
				})
			}
		})	
	} 	
}

const random = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	max = Math.floor(Math.random() * (max - min + 1));
	return max + min;
};

const preparePokemonListBeforeHiding = (PokemonList) => {
    //Берем случайное число покемонов: Не более 3. И не более чем передано. 
	var randomNumberOfPokemons = 3 //random(1, 3); 
	PokemonList.sort(() => Math.random());
	PokemonList.splice(randomNumberOfPokemons, PokemonList.length - randomNumberOfPokemons); 
    return PokemonList;
}

const hidingPokemonsInFolder = (way, PokemonList, callback) => {
	let amountHidePokemons = 0; //Счетчик количества спрятанных покемонов	
	for (let i = 0; i < PokemonList.length; i++) {
		//Задаем формат вывода информации о покемоне
		let informationAboutHidePokemon = PokemonList[i].name + '|' + PokemonList[i].level;
		//Выбираем случайную папку
		let numberRandomFolder = random (1, 10);
		let nameRandomFolder = (numberRandomFolder == 10) ? way + numberRandomFolder : way + '0' + numberRandomFolder; 
		
		//Проверяем нет ли уже созданного файла pokemon.txt в выбранной папке
		fs.access(nameRandomFolder + '/pokemon.txt', fs.F_OK, (err) => {
			while (!err) { //если файл существует, меняем номер папки до тех пор, пока не найдем пустую папку
				numberRandomFolder = random (1, 10);
				nameRandomFolder = (numberRandomFolder == 10) ? way + numberRandomFolder : way + '0' + numberRandomFolder; 
			}
			//Создаем файл pokemon.txt в папке, в который записываем информацию о покемоне
			fs.writeFile(nameRandomFolder + '/pokemon.txt', informationAboutHidePokemon, err => {
				if (err) throw err; 
				amountHidePokemons++; 
				if (amountHidePokemons == PokemonList.length) {
					callback(PokemonList);
				}
			}); 
		});
	}
}

/* 
Функция seek принимает в качестве аргументов путь. Функция ищет в папке, указанной в первом аргументе, 
всех покемонов и возвращает их. 
*/ 

const seek = (way, callback) => { 
	const pokemonList = new PokemonList();
	var amountScannedFolders = 0;
	for (let i = 1; i <= 10; i++) {
        let nameFolder = (i == 10) ? way + i : way + '0' + i;
		fs.readFile(nameFolder + '/pokemon.txt', 'utf8', (err, informationAboutHidePokemon) => { 
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
