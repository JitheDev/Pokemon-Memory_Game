import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/images/bulbasaur.png"},
  {"src": "/images/Charmander.png"},
  {"src": "/images/eevee.png"},
  {"src": "/images/pikachu.png"},
  {"src": "/images/psyduck.png"},
  {"src": "/images/squirtle.png"}
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

//compare 2 seelcted cards
useEffect(() => {
  if (choiceOne && choiceTwo) {
    if (choiceOne.src === choiceTwo.src) {
      console.log('Those cards match')
      resetTurn()
    } else {
      console.log('Those cards do not match')
      resetTurn()
    }
  }
}, [choiceOne, choiceTwo])

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
