// Fetching Elements
const container = document.querySelector('.container');
const addPrompt = document.getElementById("add-card");
const saveBtn = document.getElementById("save-btn")
const term = document.getElementById("term");
const definition = document.getElementById("definition");
const errorMessage = document.getElementById("error");
const createFlashcardBtn = document.getElementById("create-flashcardBtn");
const closeBtn = document.getElementById("close-btn");
let editAbility = false;

const navBar = document.getElementById("navbar");
const header = document.getElementById("header");

let counter = 0;
auto_increment = () => {
  counter++
  return counter;
}



// Language switching logic
const english = document.getElementById("en");
let isEN = true;
const french = document.getElementById("fr");
let isFR = false;
const intro = document.getElementById("intro");
const intro_p = document.getElementById("intro_paragraph");
const deck = document.getElementById("deck_h");
  // createFlashcardBtn already initialized
const prompt_h = document.getElementById("prompt_h");
  // errorMessage already initialized
const term_label = document.getElementById("term_label");
  // term (input) already initialized
  // definition (input) already initialized
const def_label = document.getElementById("def_label");
  // saveBtn already initialized

french.addEventListener("click", () => {
  isFR = true;
  isEN = false;
  intro.innerHTML = `Votre Application <span>Flash</span>card <span>Mi</span>nimaliste`
  intro_p.innerHTML = `Envie d'apprendre une langue ou simplement mémoriser des définitions importantes ? Cette application fait le job.
  <br />La raison principale pour laquelle j'ai décidé de créer cette application est de m'aider à améliorer mon vocabulaire français en utilisant une application que j'ai créé. (ce que je trouve cool !)`;
  deck.textContent = "Jeu";
  createFlashcardBtn.textContent = "Créer Flashcard";
  prompt_h.textContent = "Ajouter Flashcard";
  errorMessage.textContent = "Les champs de saisie ne peuvent pas être vides!";
  term_label.textContent = "Terme/Question:";
  term.setAttribute('placeholder', 'Saisir un terme ou une question..');
  def_label.textContent = "Définition/Réponse";
  definition.setAttribute('placeholder', 'Saisir une définition ou une réponse..');
  saveBtn.textContent = "Sauver";
  for (let i = 1; i <= counter; i++){
    const element = document.getElementById(`card${i}`);
    if (element){
      element.textContent = "Montrer/Cacher";
    }
  }
});

english.addEventListener("click", () => {
  isEN = true;
  isFR = false;
  intro.innerHTML = `Your <span>Mi</span>nimalistic <span>Flash</span>card App`
  intro_p.innerHTML = `Want to learn a language, or just memorize important definitions? This app does the job.
  <br />
  The main reason I decided to make this app is to help improve my French
  vocabulary using an app made by me. (which i think is cool!)`;
  deck.textContent = "Deck";
  createFlashcardBtn.textContent = "Create Flashcard";
  prompt_h.textContent = "Add Flashcard";
  errorMessage.textContent = "Input fields cannot be empty!";
  term_label.textContent = "Term/Question:";
  term.setAttribute('placeholder', 'Enter term or question..');
  def_label.textContent = "Definition/Answer";
  definition.setAttribute('placeholder', 'Enter definition or answer..');
  saveBtn.textContent = "Save";
  for (let i = 1; i <= counter; i++){
    const element = document.getElementById(`card${i}`);
    if (element){
      element.textContent = "Show/Hide";
    }
  }
});





// Prompt pop-out
createFlashcardBtn.addEventListener("click", () => {
  container.classList.add("hide"); // container gets 
  // another class called hide.
  navBar.style.display = "none";
  header.classList.add("hide");
  term.value = "";
  definition.value = "";
  addPrompt.classList.remove("hide");
  saveBtn.focus();
  if (editAbility){
    editAbility = false;
    submitPrompt();
  }
});

// Hide prompt when closeBtn clicked
closeBtn.addEventListener("click", hidePrompt = () => {
  addPrompt.classList.add("hide");
  navBar.style.display = "flex";
  header.classList.remove("hide");
  container.classList.remove("hide");
  errorMessage.classList.add("hide");
});

// submit Prompt when save-btn clicked
saveBtn.addEventListener("click", (submitPrompt = () => {
    editAbility = false;
    let termVal = term.value.trim();
    let definitionVal = definition.value.trim();
    if (!termVal || !definitionVal){
      errorMessage.classList.remove("hide");
    }
    else {
      container.classList.remove("hide");
      navBar.style.display = "flex";
      header.classList.remove("hide");
      errorMessage.classList.add("hide");
      addPrompt.classList.add("hide");
      viewDeck();
      term.value = "";
      definition.value = "";
    }
  }) 	
);

saveBtn.addEventListener("keydown", (submitPrompt = (event) => {
  if (event.type === "keydown" && event.key === "Enter"){
    editAbility = false;
    let termVal2 = term.value.trim();
    let definitionVal2 = definition.value.trim();
    if (!termVal2 || !definitionVal2){
      errorMessage.classList.remove("hide");
    }
    else {
      container.classList.remove("hide");
      navBar.style.display = "flex";
      header.classList.remove("hide");
      errorMessage.classList.add("hide");
      addPrompt.classList.add("hide");
      viewDeck();
      term.value = "";
      definition.value = "";
    }
  }
}) 	
);


// Flashcard Generation to deck
function viewDeck(){
  let deckContainer = document.getElementsByClassName("deck-container");
  let div = document.createElement("div");
  div.classList.add("card");
  // Term/Question
  div.innerHTML += `<p class="term-div">${term.value}</p>`;
  // Definition/Answer
  let displayDef = document.createElement("p");
  displayDef.classList.add("definition-div");
  displayDef.textContent = definition.value;
  
  // Button to show/hide definition
  let link = document.createElement("a");
  link.id = `card${auto_increment()}`;
  link.setAttribute("href", `#card${counter}`);
  link.setAttribute("class", "show-hide-btn");
  if (isEN){
    link.textContent = "Show/Hide";
  }
  else {
    link.textContent = "Montrer/Cacher";
  }
  link.addEventListener("click", () => {
    displayDef.classList.toggle("hide");
  })
  

  div.appendChild(link);
  displayDef.classList.toggle("hide");
  div.appendChild(displayDef);



  // Edit button
  let buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container"); // one way to \
  // appoint a class
  let editButton = document.createElement("button"); // second way
  editButton.setAttribute("class", "edit");
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editButton.addEventListener("click", () => {
    editAbility = true;
    modifyElement(editButton, true);
    addPrompt.classList.remove("hide");
    errorMessage.classList.add("hide");
    navBar.style.display = "none";
    header.classList.add("hide");
    container.classList.add("hide");
  });
  buttonContainer.appendChild(editButton)
  disableButtons(false);

  // Delete Button
  let deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "delete");
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteBtn.addEventListener("click", () => {
    modifyElement(deleteBtn);
  })

  buttonContainer.appendChild(deleteBtn);
  div.appendChild(buttonContainer);
  deckContainer[0].appendChild(div);
  hidePrompt();
};


// Modify Elements
const modifyElement = (element, edit=false) => {
  let parentDiv = element.parentElement.parentElement;
  let parentTerm = parentDiv.querySelector(".term-div").innerText;
  if (edit){
    let parentDef = parentDiv.querySelector(".definition-div").innerText;
    definition.value = parentDef;
    term.value = parentTerm;
    disableButtons(true);
  }
  parentDiv.remove();
};

// Disable edit and delete buttons
const disableButtons = (value) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach(element => {
    element.disabled = value;
  })
};





// Theme switching logic
const themeToggle = document.getElementById('theme-toggle');
const sun = document.getElementById('lucid-sun');
const moon = document.getElementById('lucid-moon');
const dry = document.getElementById('lucid-dry');
const body = document.body;

const themes = ['light-mode', 'dark-mode', 'sepia-mode'];
let currentThemeIndex = 0;

function switchTheme() {
  // Remove current theme class
  body.classList.remove(themes[currentThemeIndex]);

  // Move to the next theme
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;

  // Apply new theme
  body.classList.add(themes[currentThemeIndex]);

  // Update SVG icon based on theme
  updateThemeIcon();
}

function updateThemeIcon() {
  const theme = themes[currentThemeIndex];
  switch (theme) {
    case 'light-mode':
      dry.classList.add("hide");
      sun.classList.remove("hide"); // Sun icon for light mode
      break;
    case 'dark-mode':
      sun.classList.add("hide");
      moon.classList.remove("hide"); // Moon icon for dark mode
      break;
    case 'sepia-mode':
      moon.classList.add("hide");
      dry.classList.remove("hide"); // Custom icon for sepia mode
      break;
  }
}

themeToggle.addEventListener('click', switchTheme);

// Initialize the correct icon on page load
updateThemeIcon();