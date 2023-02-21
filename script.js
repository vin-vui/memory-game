const gameBoard = document.getElementById('game-board');

// Populate the sources
const imagesSource = [
    'https://source.unsplash.com/random/150x200/?fruit',
    'https://source.unsplash.com/random/150x200/?person',
    'https://source.unsplash.com/random/150x200/?city',
    'https://source.unsplash.com/random/150x200/?cat',
    'https://source.unsplash.com/random/150x200/?dog',
    'https://source.unsplash.com/random/150x200/?sky'
];

// Merge the images source into itself to create a new array with all the images in double
const cardImages = imagesSource.concat(imagesSource);

// Declare a variable to store the flipped images
let flippedCards = [];
// Declare a variable to store the matched images
let matchedCards = [];

// Start the function shuffle when the page loads
// Randomize the card order and create the HTML elements
shuffle(cardImages).forEach(image => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.backgroundImage = `url('${image}')`;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
});

function flipCard() {
    if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
        this.classList.add('flip');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            // Disable clicking on other cards while the two flipped cards are being checked
            gameBoard.style.pointerEvents = 'none';

            // Check if the two flipped cards match
            const card1 = flippedCards[0];
            const card2 = flippedCards[1];
            if (card1.style.backgroundImage === card2.style.backgroundImage) {
                card1.classList.add('match');
                card2.classList.add('match');
                matchedCards.push(card1, card2);
                flippedCards = [];

                // Check if the game is over
                if (matchedCards.length === cardImages.length) {
                    setTimeout(() => {
                        alert('Bien joué !');
                    }, 500);
                }
            } else {
                // Flip the cards back over after a short delay
                setTimeout(() => {
                    card1.classList.remove('flip');
                    card2.classList.remove('flip');
                    flippedCards = [];
                }, 1000);
            }

            // Re-enable clicking on the cards after the check is complete
            setTimeout(() => {
                gameBoard.style.pointerEvents = 'auto';
            }, 1000);
        }
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));

        // swap elements array[i] and array[j]
        // we use "destructuring assignment" syntax to achieve that
        // same can be written as:
        // let t = array[i]; array[i] = array[j]; array[j] = t
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
