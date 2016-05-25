//наслідування за допомогою функції конструктора

var extend = function (Child, Parent) {
    var F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}

var Animal = function (name, age, region, sound) {
    this.name = name;
    this.age = age;
    this.region = region;
    this.sound = sound;
    return this;
};

Animal.prototype.say = function () {
    return 'I am ' + this.name + ', ' + this.sound + '!';
};

var Dog = function (name, age, region) {
    Animal.apply(this, arguments);
    this.sound = 'woof';
    this.goAway = function () {
        return 'The Dog ' + this.name + ' said ' + this.sound + ' and walked away!';
    };
    this.protect = function () {
        return 'Dog ' + this.name + ' protects house.';
    };
};

extend(Dog, Animal);

var tuzik = new Dog ('Tuzik', 2, 'Poltava');
//console.log(tuzik);
console.log(tuzik.say());                                   //метод say() для Dog


var Cat = function (name, age, region) {
    Animal.apply(this, arguments);
    this.sound = 'meow';
    this.goAway = function () {
        return 'The Cat ' + this.name + ' said ' + this.sound + ' and walked away!';
    };
    this.catchMice = function () {
        return 'Cat ' + this.name + ' likes to catch mice.';
    };
};

extend(Cat, Animal);

var murzik = new Cat('Murzik', 7, 'Odessa');
//console.log(murzik);
console.log(murzik.say());                                  //метод say() для Cat

var Woodpecker = function (name, age, region) {
    Animal.apply(this, arguments);
    this.sound = 'tuk tuk';
    this.goAway = function () {
        return 'The Woodpecker ' + this.name + ' said ' + this.sound + ' and flew away!';
    };
    this.cleanTree = function () {
        return 'Woodpecker ' + this.name + ' clean a tree now.';
    };
};

extend(Woodpecker, Animal);

var woody = new Woodpecker('Woody', 5, 'Chernivtsi');
//console.log(woody);
console.log(woody.say());                                   //метод say() для Woodpecker

console.log(tuzik instanceof Dog); //true
console.log(woody instanceof Animal); //true

//перший варіант функції getType()
var getType = function (obj) {
    for (key in obj) {
        switch (key) {
            case 'protect': return obj.name + ' is a Dog'; break;
            case 'catchMice': return obj.name + ' is a Cat'; break;
            case 'cleanTree': return obj.name + ' is a Woodpecker'; break;
        }
    }
};

console.log(getType(murzik));


//вдосконалений варіант функції getType()
var getType = function () {
    for (key in this) {
        switch (key) {
            case 'protect': return this.name + ' is a Dog.'; break;
            case 'catchMice': return this.name + ' is a Cat.'; break;
            case 'cleanTree': return this.name + ' is a Woodpecker.'; break;
        }
    }
};

console.log(getType.apply(woody));