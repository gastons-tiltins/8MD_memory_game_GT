// Variables
let cardsMatch: Number[] = [];
let cardPosition: Number[] = [];
let numberOfMoves = 0;
let movesCount = 0;
let currentlySelectedCard;

//Initial moves and win count
let guessedPairsCount = 0;

// Initial state of game
const cardArray: string[] = [
    'Daugava',
    'Daugava',
    'Lielupe',
    'Lielupe',
    'Venta',
    'Venta',
    'Gauja',
    'Gauja',
];

function initializeGame() {
    // Initialize card array

    // Shuffle cards
    let randCards = cardArray.sort(() => 0.5 - Math.random());

    // Assign values to cards
    const cardValues = document.querySelectorAll('.card');
    for (let i = 0; i < randCards.length; i++) {
        cardValues[i].textContent = String(randCards[i]);
        let cardPosition = cardValues[i];
        cardValues[i].setAttribute('card-id', String(i));
        cardValues[i].addEventListener('click', openCard);
    }

    // Set all cards face down
    for (let i = 0; i < randCards.length; i++) {
        cardValues[i].classList.add('card--hidden');
    }

    // hide win text and restart button
    document.querySelector('.restart').classList.add('hide');

    // reset moves
    movesCount = 0;
    document.querySelector('.moves-count').innerHTML = `Gājieni: ${movesCount}`;
}

function openCard(currentCard: any) {
    const cardValues = document.querySelectorAll('.card');
    currentCard.target.classList.remove('card--hidden');
    cardsMatch.push(currentCard.target.textContent);
    let cardId = this.getAttribute('card-id');
    cardPosition.push(cardId);
    var card1: number = Number(cardPosition[0]);
    var card2: number = Number(cardPosition[1]);

    if (cardsMatch.length == 2) {
        if (cardsMatch[0] == cardsMatch[1]) {
            cardValues[card1].classList.add('noclick');
            cardValues[card2].classList.add('noclick');
            cardValues[card1].removeEventListener('click', openCard);
            cardValues[card2].removeEventListener('click', openCard);
            cardsMatch = [];
            cardPosition = [];
            movesCount += 1;
            guessedPairsCount += 1;
            document.querySelector(
                '.moves-count',
            ).innerHTML = `Gājieni: ${movesCount}`;
            document.querySelector('.moves-status').innerHTML =
                'Kārtis sakrīt!';
            setTimeout(function () {
                document.querySelector('.moves-status').innerHTML = '';
            }, 1000);
            checkWinCondition();
        } else {
            let hideTimeout = 700;
            setTimeout(hideCard, hideTimeout, card1);
            setTimeout(hideCard, hideTimeout, card2);
            cardsMatch = [];
            cardPosition = [];
            movesCount += 1;
            document.querySelector(
                '.moves-count',
            ).innerHTML = `Gājieni: ${movesCount}`;
            document.querySelector('.moves-status').innerHTML =
                'Mēģini vēlreiz';
            setTimeout(function () {
                document.querySelector('.moves-status').innerHTML = '';
            }, 1000);
        }
    } else {
        cardValues[cardId].removeEventListener('click', openCard);
        document.querySelector(
            '.moves-count',
        ).innerHTML = `Gājieni: ${movesCount}`;
    }

    // hide card
    function hideCard(card: number) {
        cardValues[card].classList.add('card--hidden');
        cardValues[card].addEventListener('click', openCard);
    }

    // win message and restart button
    function checkWinCondition() {
        if (Number(guessedPairsCount) == Number(cardArray.length / 2)) {
            document.querySelector('.restart').classList.remove('hide');

            // show win result with move count, hide moves
            document.querySelector(
                '.result',
            ).innerHTML = `Kāršu pāri atminēti ${movesCount} gājienos!`;
            document.querySelector('.moves-count').innerHTML = '&nbsp';

            // restart game button
            const restartButton = document.querySelector('.poga');
            guessedPairsCount = 0;
            restartButton.addEventListener('click', initializeGame);
        }
    }
}

initializeGame();
