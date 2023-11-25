// vecteurs
const data = {
  'sexualité': '1000000000000',
  'anatomie': '0100000000000',
  'violence': '0010000000000',
  'reproduction': '0001000000000',
  'maladie': '0000100000000',
  'psychologie': '0000010000000',
  'relation': '0000001000000',
  'travail': '0000000100000',
  'pornographie': '0000000010000',
  'orientation sexuelle': '0000000001000',
  'genre': '0000000000100',
  'géographie': '0000000000010',
  'plaisir': '0000000000001',
  'relations sexuelles': '1000001000000',
  'mutilations génitales': '0110000000000',
  'prostitution': '1000001100000',
  'orgasme': '0000000000001',
  'masturbation': '1000000000001',
  'orgasme féminin': '0000000000101',
  'infections sexuellement transmissibles': '1000101000000',
  'sexologie': '1000010000000',
  'fantasmes sexuels': '1000010000000',
  'couple': '0000010000001',
  'amour': '0000010000001',
  'relations amoureuses': '0000010000001',
  'sexualité féminine': '1000000000100',
  'sexualité masculine': '1000000000100',
  'femmes': '0000000000100' ,
  'hommes': '0000000000100',
  'homosexualité': '0000000001000',
  'homosexualité masculine': '0000000001000',
  'lesbianisme': '0000000001000',
  'relations hommes-femmes': '0000001000100',
  'guides touristiques et de visite': '1000000000010',
  'clubs': '0000000000011',
  'sauna': '0000000000011',
  'maisons de prostitution': '1000001100010',
  'quartiers de la prostitution': '1000001100010',
  'troubles sexuels': '1000100000000',
  'organes génitaux': '1100000000000',
  'séduction': '0000001000001',
  'sexualité (biologie)': '1000001000000'
};

// Convertir les valeurs en listes d'entiers
const vecteurs = {};
const names = {};

for (const [cle, valeur] of Object.entries(data)) {
  vecteurs[cle] = valeur.split('').map(Number);
  if (valeur in names){
    names[valeur].push(cle);
  }
  else {
    names[valeur] = [cle];
  }
  
}


var input = document.getElementById('input'), // input/output button
  number = document.querySelectorAll('.numbers div'), // number buttons
  operator = document.querySelectorAll('.operators div'), // operator buttons
  result = document.getElementById('result'), // equal button
  clear = document.getElementById('clear'), // clear button
  resultDisplayed = false; // flag to keep an eye on what output is displayed

// adding click handlers to number buttons
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {

    // storing current input string and its last character in variables - used later
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if result is not diplayed, just keep adding
    if (resultDisplayed === false) {
      input.innerHTML += e.target.alt;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-") {
      // if result is currently displayed and user pressed an operator
      // we need to keep on adding to the string for next operation
      resultDisplayed = false;
      input.innerHTML += e.target.alt;
    } else {
      // if result is currently displayed and user pressed a number
      // we need clear the input string and add the new input to start the new opration
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.alt;
    }

  });
}

// adding click handlers to number buttons
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {

    // storing current input string and its last character in variables - used later
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if last character entered is an operator, replace it with the currently pressed one
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      // if first key pressed is an opearator, don't do anything
      console.log("enter a number first");
    } else {
      // else just add the operator pressed to the input
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// on click of 'equal' button
result.addEventListener("click", function() {

  // this is the string that we will be processing eg. -10+26+33-56*34/23
  var inputString = input.innerHTML;

  // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
  var concepts = inputString.split(/\+|\-|\×|\÷/g);
  concepts[concepts.length-1] = concepts[concepts.length-1].slice(0,-1);

  // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
  // first we replace all the numbers and dot with empty string and then split
  var operators = inputString.replace(/[^+-]|\./g, "").split("");

  // now we are looping through the array and doing one operation at a time.
  // first divide, then multiply, then subtraction and then addition
  // as we move we are alterning the original numbers and operators array
  // the final element remaining in the array will be the output
  var offset = 0;
  var vector_result = Array(15).fill(0);
  var v1 = vecteurs[concepts[0]]
  for(let i = 0; i < 15; i++){
    vector_result[i] += v1[i];
  }

  operators.forEach(op => {
    var v = vecteurs[concepts[1+offset]]

    if (op == '-') {
      for(let i = 0; i < 15; i++){
        vector_result[i] -= v[i];
      }
    }

    if (op == "+") {
      for(let i = 0; i < 15; i++){
        vector_result[i] += v[i];
      }
    }
    
    offset += 1;
  })
  
  var most_similar = 0;
  var final_result = "";
  for (const [name, vector] of Object.entries(vecteurs)){
    let res = 0;
    for (let j = 0; j < 15; j++){
      dt = vector[j] * vector_result[j];
      res += dt;
    }
    console.log(res)
    if (res > most_similar){
      most_similar = res;
      final_result = name;
    }
  }

  input.innerHTML = final_result

  resultDisplayed = true; // turning flag if result is displayed
});

// clearing the input on press of clear
clear.addEventListener("click", function() {
  input.innerHTML = "";
})