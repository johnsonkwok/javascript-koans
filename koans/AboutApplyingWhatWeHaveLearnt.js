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
    
    expect(largestPalindrome(700, 915)).toBe(640046);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
    expect(smallestDivisible(1, 20)).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
    expect(diffSquaresSums(10, 11)).toBe(220);
  });

  it("should find the 10001st prime", function () {

    expect(prime(10001)).toBe(104743);
  });
  
});
