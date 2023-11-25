// vecteurs
const data = {
  'sexualité': '100000000000000',
  'anatomie': '010000000000000',
  'violence': '001000000000000',
  'reproduction': '000100000000000',
  'maladie': '000010000000000',
  'psychologie': '000001000000000',
  'relation': '000000100000000',
  'travail': '000000010000000',
  'pornographie': '000000001000000',
  'orientation sexuelle': '000000000100000',
  'genre': '000000000010000',
  'géographie': '000000000001000',
  'plaisir': '000000000000100',
  'art': '000000000000010',
  'sociologie': '000000000000001',
  'relations sexuelles': '100000100000000',
  'mutilations génitales': '011000000000000',
  'prostitution': '100000110000000',
  'orgasme': '000000000000100',
  'masturbation': '100000000000100',
  'orgasme féminin': '000000000010100',
  'infections sexuellement transmissibles': '100010100000000',
  'sexologie': '100001000000000',
  'fantasmes sexuels': '100001000000000',
  'couple': '000001000000100',
  'amour': '000001000000100',
  'relations amoureuses': '000001000000100',
  'sexualité féminine': '100000000010000',
  'sexualité masculine': '100000000010000',
  'femmes': '000000000010000',
  'hommes': '000000000010000',
  'homosexualité': '000000000100000',
  'homosexualité masculine': '000000000100000',
  'lesbianisme': '000000000100000',
  'relations hommes-femmes': '000000100010000',
  'guides touristiques et de visite': '100000000001000',
  'clubs': '000000000001100',
  'sauna': '000000000001100',
  'maisons de prostitution': '100000110001000',
  'quartiers de la prostitution': '100000110001000',
  'troubles sexuels': '100010000000000',
  'organes génitaux': '110000000000000',
  'séduction': '000000100000100',
  'sexualité (biologie)': '100000100000000',
  'photographie de charmes': '000000001000010', 
  'littérature érotique française': '000000001000010',
  'photographie érotique': '000000001000010', 
  'art érotique': '000000001000010',
  'litérature érotique': '000000001000010',
  'photographie de nus' : '010000000000010',
  'nu féminin' : '010000000000010',
  'image du corps' : '010000000000010',
  'gynecologie': '010000000000000',
  'corps humain': '010000000000000',
  'physiologie': '010000000000000',
  'sadomasochisme': '10100000000100',

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
      input.innerHTML += e.target.innerHTML;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-") {
      // if result is currently displayed and user pressed an operator
      // we need to keep on adding to the string for next operation
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      // if result is currently displayed and user pressed a number
      // we need clear the input string and add the new input to start the new opration
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
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
  console.log(concepts);

  // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
  // first we replace all the numbers and dot with empty string and then split
  var operators = inputString.replace(/[^+-]|\./g, "").split("");

  // now we are looping through the array and doing one operation at a time.
  // first divide, then multiply, then subtraction and then addition
  // as we move we are alterning the original numbers and operators array
  // the final element remaining in the array will be the output
  var offset = 0;
  operators.forEach(op => {
    var v1 = vecteurs[concepts[0]]
    var v2 = vecteurs[concepts[1+offset]]
    var result = Array(15).fill(0);

    if (op == '-') {
      for(let i = 0; i < 15; i++){
        result[i] = v1[i] - v2[i];
      }
    }

    if (op == "+") {
      for(let i = 0; i < 15; i++){
        result[i] = v1[i] + v2[i];
      }
    }

    v_res = result.join('')
    if (v_res in names){
      concepts[0] = names[v_res][0];
    }
    
    offset += 1;
  })
  
  if (concepts[0] == undefined){
    input.innerHTML = ""
  }
  else{
    input.innerHTML = concepts[0]; // displaying the output
  }

  resultDisplayed = true; // turning flag if result is displayed
});

// clearing the input on press of clear
clear.addEventListener("click", function() {
  input.innerHTML = "";
})