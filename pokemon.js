'use strict'; 

class Pokemon {

  constructor(name, level) {
    this.name = name;
	this.level = level;
  }

  show() {
    console.log(this.name + ' ' + this.level);
  }
    
    get getName (){
		return this.name;
	}
    
	get getLevel (){
		return this.level;
	}  
}

module.exports = Pokemon;