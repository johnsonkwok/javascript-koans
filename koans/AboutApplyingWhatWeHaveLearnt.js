var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];
      /* solve using filter() & all() / any() */
      productsICanEat = products.filter((pizza) => {
        return !pizza.containsNuts && _(pizza.ingredients).all((item) => {
          return item !== 'mushrooms';
        });
      });
      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.range(1, 1000)             /* try chaining range() and reduce() */
               .reduce((acc, cv) => {
                 if (cv % 3 === 0 || cv % 5 === 0) {
                   acc += cv;
                 }
                 return acc;
               }, 0);
    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };
    /* chain() together map(), flatten() and reduce() */
    
    ingredientCount = _(products).chain()
      .map((pizza) => {
        return pizza.ingredients;
      }).flatten()
      .reduce((count, item) => {
        count[item] = (count[item] || 0) + 1;
        return count;
      }, {})
      .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
    // input: composite number
    // output: largest prime factor
    
    function findLrgstPrimeFactor(composite) {
      // declare n variable equal to (composite - 1)
      // initialize lrgstPrimeFactor variable
      // set lrgstPrimeFound variable equal to false
      // use while loop to iterate until largest prime is found
        // if composite divided by n is an integer and n is a prime number, then
          // set lrgstPrimeFound equal to true
          // set lrgstPrimeFactor equal to n
        // else decrease n by 1
      // return lrgstPrimeFactor

      let n = composite - 1;
      let lrgstPrimeFactor;
      let lrgstPrimeFound = false;
      while (n > 1 && lrgstPrimeFound === false) {
        const quotient = composite / n;
        if (Number.isInteger(quotient) && isPrime(n)) {
          lrgstPrimeFactor = n;
          lrgstPrimeFound = true;
        } else {
          n--;
        }
      }
      return lrgstPrimeFactor;
    }

    function isPrime(num) {
      let n = num - 1;
      while ((n > 1) && (num % n !== 0)) {
        n--;  
      }
      return n === 1;
    }

    expect(findLrgstPrimeFactor(33)).toBe(11);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    // input: 3 (number of digits for each of the two numbers to be multiplied)
    // output: largest palindrome number from product of two 3-digit numbers

    function findLrgstPalindrome(n) {
      // create 2 max starting number variables (num1 and num2)
      // create variable for minimum number
      // initialize lrgstPalindrome variable
      // use while loop to iterate until largest palindrome is found and num1 is above min
        // if product of num1 and num2 is a palindrome (use helper function)
          // set product equal to lrgstPalindrome
        // else decrement num1 and num2 until palindrome found
      // return lrgstPalindrome
      
      let num1 = parseInt('9'.padEnd(n, '9'));
      let num2 = num1;
      const min = parseInt('1'.padEnd(n, '0'));
      let lrgstPalindrome = 0;
      while (num1 > min) {
        const product = num1 * num2;
        if (product > lrgstPalindrome && isPalindrome(product)) {
          lrgstPalindrome = product;
        } else if (num2 === min) {
          num1--;
          num2 = num1;
        } else {
          num2--;
        }
      }
      return lrgstPalindrome;
    }

    function isPalindrome(product) {
      const productArr = product.toString().split('');
      const reversed = productArr.slice().reverse().join('');
      return (productArr.join('') === reversed);    
    }

    expect(findLrgstPalindrome(3)).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      // input: two numbers that define the start and end of a range of numbers
      // output: smallest number divisible by each number in that range

      function findSmallestDivisible(a, b) {
        // create an array with the range of numbers
        // initialize a variable for smallestDivisible equal to 20
        // use while loop to iterate until solution found
          // increment smallestDivisible by 20
        // return smallestDivisible

        const numRange = (_.range(a, b));
        const increment = b * (b - 1);
        let smallestDivisible = increment;
        while (!_(numRange).all(x => smallestDivisible % x === 0)) {
          smallestDivisible += increment;
        }
        return smallestDivisible;
      }

    expect(findSmallestDivisible(1, 20)).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    // input: the range between two numbers
    // output: difference between sum of their squares and the square of their sums

    function calcDiffSquaresSums(x, y) {
      // create an array of the range between the two numbers
      // iterate through the range and calculate the sum of the squares 
      // calculate the sum of the range and square it
      // return the difference 

      const numRange = (_.range(x, y + 1));
      const sumOfSquares = sum(numRange.map(n => n ** 2));
      const squareOfSums = (sum(numRange)) ** 2;
      return squareOfSums - sumOfSquares;
    }

    function sum(arr) {
      return arr.reduce((a, b) => a + b);
    }

    expect(calcDiffSquaresSums(1, 100)).toBe(25164150);
  });

  it("should find the 10001st prime", function () {

    expect(prime(10001)).toBe(104743);
  });
  
});
