import CardGame from './card.js';

if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', begin());
begin();

// grab the document element
function off()
{
    document.getElementById("overlay").style.display = "none";
}

function begin()
{
    // return the node objects in an array
    let cards = document.querySelectorAll(".card");
    let cardGame = new CardGame(0, cards);

    cards.forEach(card => card.addEventListener('click', ()=>{
            cardGame.flipCard(card); 
    })); 

    cardGame.shuffle(cards);
}