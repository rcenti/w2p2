function setup() {
    createCanvas(0, 0);

    // Test your code by creating objects, calling their methods, and printing the output to the console
    const brian = new Animal("Brian", 95, 10);
    console.log(brian.call());

    const pete = new FurryAnimal("Peter", 50, 3, color(255, 0, 0));
    console.log(pete.call());
}


/**
 * Represents an Animal
 */
class Animal {
    #name;
    #healthLevel;
    #age;
    #posX;
    #posY;


    /**
     * Creates a new Animal
     * @param {string} name 
     * @param {number} health A number between 0 and 100
     * @param {number} age 
     */
    constructor(name, health, age) {
        this.#name = name;
        this.#healthLevel = health;
        this.#age = age;
        // This line uses JavaScript methods in place of p5.js round() and random()
        this.#posX = Math.round(Math.random() * 600);
        this.#posY = Math.round(Math.random() * 500);
    }


    /**
     * Gets the animal's x coordinate
     * @returns {number}
     */
    getX() {
        return this.#posX;
    }


    /**
     * Gets the animal's y coordinate
     * @returns {number}
     */
    getY() {
        return this.#posY;
    }


    /**
     * Returns the animal's health level.
     * @returns {number}
     */
    getHealthLevel() {
        return this.#healthLevel;
    }


    /**
     * Decreases the animal's health. The health level cannot fall below 0.
     */
    decreaseHealth() {
        this.#healthLevel = Math.max(0, this.#healthLevel - 1);
    }


    /**
     * Gets the animal's age
     * @returns {number}
     */
    getAge() {
        return this.#age;
    }


    /**
     * Returns a message from the animal
     * @returns {string}
     */
    call() {
        return `Hello, my name is ${this.#name}`;
    }


    /**
     * Move the animal to the given x position
     * @param {number} newPosX The new x position
     */
    moveX(newPosX) {
        this.#posX = newPosX;
    }


    /**
     * Move the animal to the given y position
     * @param {number} newPosY The new y position
     */
    moveY(newPosY) {
        this.#posY = newPosY;
    }
}


/**
 * A subclass representing animals with fur
 */
class FurryAnimal extends Animal {
    #furColour;

    constructor(name, health, age, colour) {
        super(name, health, age);
        this.#furColour = colour;
    }


    /**
     * Gets the animal's fur colour.
     * @returns {Color}
     */
    getFurColour() {
        return this.#furColour;
    }
}
