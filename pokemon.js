'use strict'; 

class Pokemon {

	constructor(name, level) {
		this.name = name;
		this.level = level;
	}

	valueOf() {
		return this.level;
	}
}

module.exports = Pokemon;
