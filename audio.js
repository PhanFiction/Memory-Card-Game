export default class GameAudio
{
    constructor()
    {
        this.flipSound = new Audio("Assets/Audio/flip.wav");
        this.match = new Audio("Assets/Audio/match.wav");
        this.win = new Audio("Assets/Audio/victory.wav");
    }

    play()
    {
        this.flipSound.play();
    }

    cardMatch()
    {
        this.match.play();
    }
    
    winner()
    {
        this.win.play();
    }
}