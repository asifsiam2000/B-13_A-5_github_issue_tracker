1️⃣ What is the difference between var, let, and const?

 Answer =>     In JavaScript var, let, and const are keywords used to declare variables. The main difference between them is        scope, redeclaration, and reassignment.

a. var - var is the old way of declaring vaiable. 
     . can be redeclared 
     . can be reassigned 
     . functin scoped 
b. let - let was introduction  in ES6  and is more modern and more efficient in js 
     . cannot be redeclared
     . can be reassigned
     . block scoped
c. const - const is used for variables whose value should not change 
      . Cannot be redeclared
      . Cannot be reassigned
      . Block scoped



2️⃣ What is the spread operator (...)?

Answer => the spread operator (...) in JavaScript is used to expand or spread elements of an array or object into individual elements.

It is commonly used with arrays, objects, and function arguments.
 
  for example :
  const a = [1, 2];                           
  const b = [3, 4];
  const result = [...a, ...b , 5 , 6 ];
  console.log(result);


  output this code : result = [1 , 2 , 3 , 4 , 5 , 6]



3️⃣ What is the difference between map(), filter(), and forEach()?  

Answer => map(), filter(), and forEach() are array methods in JavaScript used to loop through elements of an array.
The main difference is what they return and how they are used.

  a. map() - map() is used to create a new array by modifying each element of the original array. for example :
     
  const numbers = [1, 2, 3, 4];                   
  const result = numbers.map(num => num * 2); 
  console.log(result);

  output : result = [2 , 4 , 6 , 8];

  b. filter() - filter() is used to select specific elements based on a condition. for example :  
   
  const numbers = [1, 2, 3, 4, 5];                      
  const result = numbers.filter(num => num > 3);
  console.log(result);

   output: reult = [4 , 5];

  c. forEach()-  forEach() is used to loop through an array and perform an action, but it does not return a new array. for example:
    
    const numbers = [1, 2, 3];          output : 1 2 3
    numbers.forEach(num => {
       console.log(num);
    });


4️⃣ What is an arrow function?
Answer => An arrow function is a short and modern way to write functions in JavaScript. It was introduced in ES6 and uses the => arrow syntax. for example :
   Normal funtion : 
                       function add(a, b) {
                           return a + b;
                        }
   Arrow Function : 
                      const add = (a, b) => {
                           return a + b;
                        };  


5️⃣ What are template literals?
Answer => Template literals are a way to create strings in JavaScript using backticks ( ) instead of quotes. They make it easier to insert variables and write multiline strings. Template literals use backticks ` `.

for example : 
             const name = "Asif";                 
             const message = `Hello ${name}`;
             console.log(message);



             output : Hello Asif                                       
