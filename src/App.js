import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/images/bulbasaur.png", matched: false},
  {"src": "/images/Charmander.png", matched: false},
  {"src": "/images/eevee.png", matched: false},
  {"src": "/images/pikachu.png", matched: false},
  {"src": "/images/psyduck.png", matched: false},
  {"src": "/images/squirtle.png", matched: false}
]

function App() {
const [cards, setCards] = useState([]);
const [turns, setTurns] = useState(0);
const [choiceOne, setChoiceOne] = useState(null);
const [choiceTwo, setChoiceTwo] = useState(null);
const [disabled, setDisabled] = useState(false)


  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }

  //handle a choice
const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}

//compare 2 selected cards
useEffect(() => {
  if (choiceOne && choiceTwo) {
    setDisabled(true)
    if (choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src) {
            return {...card, matched: true}
          } else {
            return card
          }
        })
      })
      resetTurn()
    } else {
      setTimeout(() => resetTurn(), 1000)
    }
  }
}, [choiceOne, choiceTwo])


//reset choices & increase turn
const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns +1)
  setDisabled(false)
}

//Automate gameplay
useEffect(() => {
  shuffleCards()
}, [])

  return (
    <div className="App">
      <h1>Pokemon Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>Turns: {turns}</p>
      <div className='card-grid'>
      {cards.map(card => (
        <SingleCard 
        key={card.id} 
        card={card} 
        handleChoice={handleChoice} 
        flipped={card === choiceOne || card === choiceTwo || card.matched} 
        disabled={disabled} />
      ))}
      </div>
    </div>
  );
}

export default App;
