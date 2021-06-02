import GameAudio from './audio.js';
let gameAudio = new GameAudio();

export default class CardGame
{
    constructor(time, cards)
    {
        this.flips = document.getElementById('Flips');
        this.timer = document.getElementById('Time');
        this.cardHolder = [];
        this.totalCards = [...cards];

        this.firstCard, this.secondCard;
        this.flipped = false;
        this.counter = 0;
        this.lockCard = true;

        this.timerCounter(time);
    }

    gameOver()
    {
        gameAudio.winner();
        return this.cardHolder.length == this.totalCards.length;
    }

    shuffle(cards)
    {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
        });
    }

    // flip the cards
    flipCard(card)
    {
        if(this.lockCard == true)
        {
            card.classList.add('flip');
            gameAudio.play();
        }
        
        if(this.flipped == false)
        {
            this.firstCard = card;
            this.flipped = true;
        }else{
            this.secondCard = card;
            this.flipped = false;
            this.checkCard(this.firstCard, this.secondCard);
        }
        
        if(this.gameOver() == true) alert('You Win');
        this.updateCounter();
    }

    // check if card is the same
    checkCard(card1, card2)
    {
        this.lockCard = false;
        if(this.getCardType(card1) == this.getCardType(card2))
        {
            if(card1 == card2) this.nonMatchingCards(card1, card2);
            
            if(card1 != card2) this.matchingCards(card1, card2);
        }
        if(this.getCardType(card1) != this.getCardType(card2)) this.nonMatchingCards(card1, card2);

        setTimeout(()=>{
            this.lockCard = true;
        }, 1000);
    }

    // get card image src by className
    getCardType(card)
    {
        return card.getElementsByClassName("card-val")[0].src;
    }

    // if cards match, remove them
    matchingCards(card1, card2)
    {
        setTimeout(()=> {
            gameAudio.cardMatch();
            card1.classList.add('match');
            card2.classList.add('match');
        }, 1000);
        this.cardHolder.push(card1);
        this.cardHolder.push(card2);
    }
    
    // if cards do not match, flip them back
    nonMatchingCards(card1, card2)
    {
        setTimeout(()=> {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            }, 1000);
    }

    updateCounter()
    {
        this.counter++;
        this.flips.innerText = this.counter;
    }

    timerCounter(timeRemaining)
    {
        let timeLeft = timeRemaining;
        setInterval(()=> {
            timeLeft++;
            this.timer.innerText = timeLeft;
        }, 1000);  
    }
}
