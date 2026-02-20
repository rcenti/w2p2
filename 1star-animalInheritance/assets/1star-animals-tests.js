import { TestResults, advanceToFrame, canvasStatus, getShapes, substituteDraw, testClassExtends, testClassIsDefined, testClassMethodIsDefined, testExpectedClassConstructorArgs, testExpectedClassMethodArgs } from "../../testing/test-utils.js";

/**
 * A hacky way to wait for p5js to load the canvas. Include in all exercise test files.
 */
function waitForP5() {
    const canvases = document.getElementsByTagName("canvas");
    if (canvases.length > 0) { // p5.js has loaded i.e. drawn a canvas
        clearInterval(loadTimer); // Stop the timer
        runTests(canvases[0]); // Run the tests below
    }
}

//#region - Exercise specific test functions
function checkBirdGetterAndHealth() {
    const b = new Bird("Bill", 100, 10, "pointy");
    if (testClassMethodIsDefined(Bird, "getBeakType")) {
        if (b.getBeakType() === "pointy") {
            TestResults.addPass("Calling <code>getBeakType()</code> on a <code>Bird</code> object returns the beak type");
        } else {
            TestResults.addFail(`Calling <code>getBeakType()</code> on a <code>Bird</code> object does not return the beak type as expected. The problem may be with your <code>getBeakType()</code> method, or it may be how <code>beakType</code> is passed to / assigned in the <code>Bird</code> constructor. <code>beakType</code> should be the fourth attribute passed to the constructor.`)
        }
        if (testClassMethodIsDefined(Bird, "decreaseHealth")) {
            TestResults.addPass("<code>Bird</code> overrides <code>decreaseHealth()</code>.");
        } else {
            TestResults.addFail("<code>Bird</code> does not appear to override <code>decreaseHealth()</code>.");
        }
        const startHealth = b.getHealthLevel();
        b.decreaseHealth();
        const endHealth = b.getHealthLevel();
        if (endHealth === startHealth) {
            TestResults.addFail("Calling <code>decreaseHealth()</code> on a <code>Bird</code> object does not decrease the object's health. If you have overridden the <code>decreaseHealth()</code> method in the <code>Bird</code> class, make sure you have not changed the method signature (e.g. changed its name or added a parameter).");
        }
        else if (endHealth === startHealth - 1) {
            TestResults.addFail("Calling <code>decreaseHealth()</code> on a <code>Bird</code> object decreases the object's health by 1. This suggests that the method has not been overriden in the <code>Bird</code> class, or the method is not implemented correctly.");
        }
        else if (endHealth < startHealth - 1) {
            TestResults.addPass("Calling <code>decreaseHealth()</code> on a <code>Bird</code> object decreases the object's health by more than 1.");
        }
    } else {
        TestResults.addFail("The <code>Bird</code> class does not have a method called <code>getBeakType()</code>. If you have implemented this method, make sure the spelling matches the instructions exactly.");
    }
}

function checkCatCallAndJump() {
    const c = new Cat("Ginger", 100, 4, color("orange"));
    if (testClassMethodIsDefined(Cat, "call")) {
        TestResults.addPass("<code>Cat</code> overrides <code>call()</code>.");
    } else {
        TestResults.addFail("<code>Cat</code> does not appear to override <code>call()</code>.");
    }
    const catVoice = c.call()
    if (catVoice.toLowerCase() === "meow") {
        TestResults.addPass("Calling <code>call()</code> on a <code>Cat</code> object returns \"meow\".");
    } else {
        TestResults.addFail(`Calling <code>call()</code> on a <code>Cat</code> object should return "meow". Found "${catVoice}" instead.`);
    }
    if (testClassMethodIsDefined(Cat, "jumpAt")) {
        TestResults.addPass("<code>Cat</code> implements <code>jumpAt()</code>.");
        if (!testExpectedClassMethodArgs(Cat, "jumpAt", 1)) {
            TestResults.addFail("The <code>Cat</code> method <code>jumpAt()</code> should have exactly one parameter.");
        }
        if (testClassIsDefined("Bird")) {
            const b = new Bird("bill", 100, 10, "pointy");
            const birdX = b.getX();
            const birdY = b.getY();
            c.jumpAt(b);
            if (c.getX() === birdX && c.getY() === birdY) {
                TestResults.addPass("When the <code>Cat</code> method <code>jumpAt()</code> is called, the cat moves to the bird's location.");
            } else {
                TestResults.addFail("When the <code>Cat</code> method <code>jumpAt()</code> is called, the cat does not move to the bird's location.");
            }
            if (b.getHealthLevel() < 100) {
                TestResults.addPass("When the <code>Cat</code> method <code>jumpAt()</code> is called, the bird's health decreases.");
            } else {
                TestResults.addFail(`When the <code>Cat</code> method <code>jumpAt()</code> is called, the bird's health should decrease. When this method was called, the bird's health level was 100. After, the health level was ${b.getHealthLevel()}`);
            }
        } else {
            TestResults.addFail("Unable to test the <code>Cat</code> method <code>jumpAt()</code> method because the <code>Bird</code> class is not defined. The method is supposed to call two methods from the <code>Bird</code> class.");
        }
    } else {
        TestResults.addFail("<code>Cat</code> does not have a method called <code>jumpAt()</code>. If you have implemented it, check the spelling of the method name.");
    }
}

//#endregion

/**
 * Run all tests.
 * @param {HTMLElement} canvas The HTML canvas created by p5.js
 */
async function runTests(canvas) {
    // SETUP - don't edit
    canvas.style.pointerEvents = "none"; // prevents p5.js from responding to mouse events independent of the tests
    substituteDraw(); 
    const resultsDiv = document.getElementById("results");
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    // END SETUP

    // YOUR TESTS HERE. Write unit test functions then use TestResults static methods to show test results e.g.:
    if (testClassIsDefined("Bird")) {
        TestResults.addPass("The <code>Bird</code> class has been implemented.");
        // Check that Bird inherits Animal
        if (testClassExtends("Bird", "Animal")) {
            TestResults.addPass("<code>Bird</code> is a child of <code>Animal</code>.");
        } else {
            TestResults.addFail("<code>Bird</code> does not inherit <code>Animal</code>. Make sure that the class name is followed by <code>extends Animal</code>.")
        }
        // Check that Bird does not inherit FurryAnimal
        if (testClassExtends("Bird", "FurryAnimal")) {
            TestResults.addFail("<code>Bird</code> should not inherit <code>FurryAnimal</code>. Birds are not furry!");
        }
        checkBirdGetterAndHealth();
    } else {
        TestResults.addWarning("The <code>Bird</code> class has not yet been implemented so unable to check task 1. If you think you have implemented the <code>Bird</code> class, make sure the name is spelled correctly, including the capital B.");
    }

    if (testClassIsDefined("Cat")) {
        TestResults.addPass("The <code>Cat</code> class has been implemented.");
        // Check that Cat inherits FurryAnimal
        if (testClassExtends("Cat", "FurryAnimal")) {
            TestResults.addPass("<code>Cat</code> is a child of <code>FurryAnimal</code>.");
        } else {
            TestResults.addFail("<code>Cat</code> does not inherit <code>FurryAnimal</code>. Make sure that the class name is followed by <code>extends FurryAnimal</code>.")
        }
        //check call and jumpAt
        checkCatCallAndJump();
    } else {
        TestResults.addWarning("The <code>Cat</code> class has not yet been implemented. If you think you have implemented the <code>Cat</code> class, make sure the name is spelled correctly, including the capital C.");
    }

    if (testClassIsDefined("Dog")) {
        TestResults.addPass("The <code>Dog</code> class has been implemented.");
        // Check that Dog inherits FurryAnimal
        if (testClassExtends("Dog", "FurryAnimal")) {
            TestResults.addPass("<code>Dog</code> is a child of <code>FurryAnimal</code>.");
        } else {
            TestResults.addFail("<code>Dog</code> does not inherit <code>FurryAnimal</code>. Make sure that the class name is followed by <code>extends FurryAnimal</code>.")
        }
        if (testClassMethodIsDefined(Dog, "barkAt")) {
            TestResults.addPass("<code>Dog</code> has a method called <code>jumpAt()</code>. The functionality of this method cannot be automatically tested so make sure to test it yourself.");
            if (!testExpectedClassMethodArgs(Dog, "barkAt", 1)) {
                TestResults.addFail("The <code>Dog</code> method <code>barkAt()</code> should have 1 parameter.")
            }
        } else {
            TestResults.addFail("<code>Dog</code> does not have a method called <code>jumpAt()</code>. If you think you have implemented this method, check the name for typos.");
        }
    } else {
        TestResults.addWarning("The <code>Dog</code> class has not yet been implemented. If you think you have implemented the <code>Dog</code> class, make sure the name is spelled correctly, including the capital D.");
    }
    
    // Class defined
    // if (testClassIsDefined("Animal")) {
    //     TestResults.addPass("The <code>Animal</code> class is defined.");
    //     // Constructor args coorect
    //     if (testExpectedClassConstructorArgs(Animal, 3)) {
    //         TestResults.addPass("The <code>Animal</code> constructor takes 3 arguments.");
    //         // display() defined
    //         if (testClassMethodIsDefined(Animal, "display")) {
    //             TestResults.addPass("The <code>display()</code> method exists.");
    //             // display() arg number
    //             if (testExpectedClassMethodArgs(Animal, "display", 0)) {
    //                 TestResults.addPass("The <code>display()</code> method takes 0 arguments.");
    //             } else {
    //                 TestResults.addFail(`The <code>display()</code> method takes ${Animal.prototype["display"].length} arguments. 0 were expected.`);
    //             }
    //         } else {
    //             TestResults.addFail("The <code>display()</code> method does not exist. If this test result is unexpected, check that you have spelled the method name exactly as specified.")
    //         }
    //         // moveX() defined
    //         if (testClassMethodIsDefined(Animal, "moveX")) {
    //             TestResults.addPass("The <code>moveX()</code> method exists.");
    //             // display() arg number
    //             if (testExpectedClassMethodArgs(Animal, "moveX", 1)) {
    //                 TestResults.addPass("The <code>moveX()</code> method takes 1 argument.");
    //             } else {
    //                 TestResults.addFail(`The <code>moveX()</code> method takes ${Animal.prototype["moveX"].length} arguments. 1 was expected.`);
    //             }
    //         } else {
    //             TestResults.addFail("The <code>moveX()</code> method does not exist. If this test result is unexpected, check that you have spelled the method name exactly as specified.")
    //         }
    //         // moveY() defined
    //         if (testClassMethodIsDefined(Animal, "moveY")) {
    //             TestResults.addPass("The <code>moveY()</code> method exists.");
    //             // display() arg number
    //             if (testExpectedClassMethodArgs(Animal, "moveY", 1)) {
    //                 TestResults.addPass("The <code>moveY()</code> method takes 1 argument.");
    //             } else {
    //                 TestResults.addFail(`The <code>moveY()</code> method takes ${Animal.prototype["moveY"].length} arguments. 1 was expected.`);
    //             }
    //         } else {
    //             TestResults.addFail("The <code>moveY()</code> method does not exist. If this test result is unexpected, check that you have spelled the method name exactly as specified.")
    //         }
    //         functionalityTests(resultsDiv);
    //     } else {
    //         TestResults.addFail(`The <code>Animal</code> constructor takes ${Animal.length} arguments. 3 were expected (see the specification).`);
    //     }
    // } else {
    //     TestResults.addWarning("The <code>Animal</code> class has not been implemented so unable to run tests. If you think you have implemented the class, make sure its name matches the specification <strong>exactly</strong>.");
    // }
    
    // This statement should be last - displays the messages added above
    TestResults.display(resultsDiv);
}

// Calls waitForP5() every half second until p5.js finishes loading
const loadTimer = setInterval(waitForP5, 500);
