const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

let contador = 6;
document.getElementById("contador").innerHTML = 6;

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})

function flipCard() {
    main();
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;

    checkForMatch();
}

function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card){
        document.getElementById("contador").innerHTML = document.getElementById("contador").innerHTML - 1;
        disableCards();        
        return;
    }
    
    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();




function attempts() {
    if(contador === 0) {
        document.getElementById("contador").innerHTML = 0;
    } else {
        document.getElementById("contador").innerHTML = contador - 1;
        return;    
    }   
}


function main() {
    const wordList = [];
    let palindromeCount = 0;
    const charset = "abcdefghijklmnopqrstuvwxyz"
    for (let index = 0; index < 10000; index++) {
        const wordSize = Math.floor(Math.random() * 3) + 3;
        let word = "";        
        for (let size = 0; size < wordSize; size++) {            
            word += charset.charAt(Math.floor(Math.random() * charset.length))            
        }
        const palindrome = word === word.split('').reverse().join('');
        if(palindrome){
            palindromeCount ++;
        }
        wordList.push({
            word, 
            palindrome,
        });
    }
    console.log("Palavras palindromes: ", palindromeCount);
    console.log(wordList);
}