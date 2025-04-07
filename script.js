const state = {
    numCards: 0,
    currentIndex: 0,
    flashcards: []
};

const setupContainer = document.getElementById('setup-container'); 
const formContainer = document.getElementById('form-container');
const flashcardContainer = document.getElementById('flashcard-container');
const flashcardForms = document.getElementById('flashcard-forms');
const flashcardDisplay = document.getElementById('flashcard-display');
const currentCardSpan = document.getElementById('current-card');
const totalCardsSpan = document.getElementById('total-cards');

document.getElementById('start-btn').addEventListener('click', startCreatingCards);
document.getElementById('save-btn').addEventListener('click', saveFlashcards);
document.getElementById('prev-btn').addEventListener('click', showPreviousCard);
document.getElementById('next-btn').addEventListener('click', showNextCard);
document.getElementById('flip-btn').addEventListener('click', flipCurrentCard);
document.getElementById('restart-btn').addEventListener('click', restartApp);
document.getElementById('shuffle-btn').addEventListener('click', shuffleCards);

function startCreatingCards(){
    //get and validate the number of cards
    state.numCards = parseInt(document.getElementById('num-cards').value);

    if(isNaN(state.numCards) || state.numCards < 1){
        alert('Please enter a valid number of flashcards.');
        return;
    }

    //generate form for each flashcard
    flashcardForms.innerHTML = '';

    for (let i = 0; i<state.numCards; i++){
        const formHtml = `
            <div class="flashcard-form">
                <h3>Flashcard ${i + 1}</h3>
                <div class="input-group">
                    <label for="question-${i}">Question:</label>
                    <textarea id="question-${i}" rows="3" required></textarea>
                </div>

                <div class="input-group-">
                    <label for="answer-${i}">Answer:</label>
                    <textarea id="answer-${i}" rows="3" required></textarea>
                </div>
            </div>
        `;
        flashcardForms.innerHTML += formHtml;
    }

    //switch to form view
    setupContainer.classList.add('hidden');
    formContainer.classList.remove('hidden');
}

function saveFlashcards(){
    //reset the flashcards array
    state.flashcards = [];
    let isValid = true;

    //validate and collect flashcard data
    for (let i=0; i< state.numCards; i++){
        //get the question and answer, removing extra whitespace
        const question = document.getElementById(`question-${i}`).value.trim();
        const answer = document.getElementById(`answer-${i}`).value.trim();

        //validate that both fields have content
        if(!question || !answer){
            isValid = false;
            alert(`Please fill in both the question and answer for Flashcard ${i + 1}`);
            break;
        }

        //add value flashcard to the array
        state.flashcards.push({question, answer});
    }

    //iff all cards are valid, display them

    if(isValid){
        state.currentIndex = 0;
        displayFlashcards();
        formContainer.classList.add('hidden');
        flashcardContainer.classList.remove('hidden');
        updateCardCounter();
    }
}


function displayFlashcards(){
    //exit if there are no flashcards
    if(state.flashcards.length === 0) return;

    //get the current card based on the index
    const card = state.flashcards[state.currentIndex];

    //create the html with both front and back faces
    flashcardDisplay.innerHTML = `
    <div class="flashcard" id="current-flashcard">
        <div class="flashcard-front">
            <p>${card.question}</p>
        </div>
        <div class="flashcard-back">
            <p>${card.answer}</p>
        </div>
    </div>
    `;

    //add click listener to flip card on click
    document.getElementById('current-flashcard').addEventListener('click', flipCurrentCard);
}

function showPreviousCard(){
    //only go back if not on the first card
    if(state.currentIndex > 0){
        //decrement the index
        state.currentIndex--;

        //update the display
        displayFlashcards();
        updateCardCounter();
    }
    
}

function showNextCard(){
    //only advance if not on the list
    if(state.currentIndex < state.flashcards.length -1){
        //increment the index
        state.currentIndex++;

        //update the display
        displayFlashcards();
        updateCardCounter();
    }
}

function flipCurrentCard(){
    //get the current flashcard element
    const flashcard = document.getElementById('current-flashcard');

    //toggle the 'flipped' class to trigger the css animation
    flashcard.classList.toggle('flipped');
}

function updateCardCounter(){
    //update the current card number (add 1 since index is zero-based)
    currentCardSpan.textContent = 0; 
    
}
