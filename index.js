'use strict'; 
const fs = require('fs');
const conf = { encoding: 'utf8' }; 

const Pokemon = require('./pokemon');
const PokemonList = require('./pokemonList');
const hidenseek = require('./hidenseek');


const way = process.argv[];
const listJson = require(process.argv[]);
const list = new PokemonList();
listJson.forEach(item => {
    list.add(item["name"], item["level"]);
});
fs.mkdir(way, err => {
     if (err) throw (err);
     hidenseek.hide(way, list, result => {
        result.show();
     })
}

hidenseek.seek(way, result => {
    result.show();
});
