'use strict'; 
const fs = require('fs');
const conf = { encoding: 'utf8' }; 

const Pokemon = require('./pokemon');
const PokemonList = require('./pokemonList');
const hidenseek = require('./hidenseek');


if (process.argv[2] === "hide") {
    if (!process.argv[3] || !process.argv[4]) {
        console.log ("�������� ���������");
    } else {
        const path = process.argv[3];
        const listJson = require(process.argv[4]);
        const list = new PokemonList();
        listJson.forEach(item => {
            list.add(item["name"], item["level"]);
        });

        fs.mkdir(path, err => {
            if (err) {
                throw (err);
            }
            hidenseek.hide(path, list, result => {
                console.log ("���������� ��������:");
                result.show();
            })


        });

    }
}

if (process.argv[2] === "seek") {
    if (!process.argv[3]) {
        console.log ("�������� ���������");
    } else {
        const path = process.argv[3];
        hidenseek.seek(path, result => {
                    console.log ("\r\n��������� ��������:");
                    result.show();
                });

    }
}

if (!process.argv[2]){
    console.log ('������ ������:');
    console.log ('1. hide - �������� ���������, ��������� ��� ���������� � ��� ����� � ����������');
    console.log ('������: hide ./field/ ./pokemons.json');
    console.log ('2. seek - ����� ���������, ��������� ��� ���������� ��� ������');
    console.log ('������: seek ./field/');
}