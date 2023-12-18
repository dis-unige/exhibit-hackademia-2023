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
  "Prostitution": "100000110000000",
  "Prostituées": "100000110000000",
  "Courtisanes": "100000110000000",
  "Orgasme": "010000000000100",
  "Massage": "010000000000100",
  "Sexologie": "100001000000000",
  "Fantasmes sexuels": "100001000000000",
  "Couple": "000001000000100",
  "Amour": "000001000000100",
  "Relations amoureuses": "000001000000100",
  "Sexualité féminine": "100000000010000",
  "Sexualité masculine": "100000000010000",
  "Clubs": "000000000001100",
  "Sauna": "000000000001100",
  "Cabarets": "000000000001100",
  "Maisons de prostitution": "100000110001000",
  "Quartiers de la prostitution": "100000110001000",
  "Troubles sexuels": "100011000000000",
  "Photographie de charmes": "000000001000010",
  "Littérature érotique française": "000000001000010",
  "Photographie érotique": "000000001000010",
  "Art érotique": "000000001000010",
  "Littérature érotique": "000000001000010",
  "Photographie de nus": "010000000000010",
  "Nu féminin": "010000000000010",
  "Image du corps": "010000000000010",
  "Sadomasochisme": "101000000000100",
  "Violences sexuelles": "101000000000000",
  "Morale sexuelle": "000001000000001",
  "Moeurs et coutumes": "000001000000001",
  "Mariage": "000000100000001",
  "Vie sexuelle": "100000000000001",
  "Grossesse": "010100000000000",
  "Presse homosexuelle": "000000000100001",
  "Maternité": "000100000010000",
  "Désir": "100000000000100",
  "Homophobie": "001000000100000"
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
      if ("alt" in e.target){
        input.innerHTML += e.target.alt;
      }
      else{
        input.innerHTML += e.target.id;
      }
      
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-") {
      if ("alt" in e.target){
        input.innerHTML += e.target.alt;
      }
      else{
        input.innerHTML += e.target.id;
      }
    } else {
      if ("alt" in e.target){
        input.innerHTML += e.target.alt;
      }
      else{
        input.innerHTML += e.target.id;
      }
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

document.getElementById("clr").addEventListener("click", function(e){
  input.innerHTML = "";
  document.querySelector('[title="Effacer ces sélections"]').click();
})

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
  
  var distance = Number.MAX_VALUE;
  var final_result = "";
  for (const [name, vector] of Object.entries(vecteurs)){
    let res = 0;
    for (let j = 0; j < 15; j++){
      dt = Math.pow((vector[j] - vector_result[j]),2);
      res += dt;
    }
    if (res < distance){
      distance = res;
      final_result = name;
    }
  }

  input.innerHTML = final_result
  if (final_result != ""){
    document.querySelector('[title="Effacer ces sélections"]').click();
    document.querySelector('[title="'+final_result.charAt(0).toUpperCase() + final_result.slice(1)+'"]').click();
  }

  resultDisplayed = true; // turning flag if result is displayed
});

// clearing the input on press of clear
clear.addEventListener("click", function() {
  input.innerHTML = "";
})