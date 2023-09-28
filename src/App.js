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

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

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
      resetTurn()
    }
  }
}, [choiceOne, choiceTwo])

console.log(cards)

//reset choices & increase turn
const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns +1)
}

  return (
    <div className="App">
      <h1>Pokemon Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
      {cards.map(card => (
        <SingleCard 
        key={card.id} 
        card={card} 
        handleChoice={handleChoice} />
      ))}
      </div>
    </div>
  );
}

export default App;
