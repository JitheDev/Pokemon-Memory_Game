import './SingleCard.css'
import React from 'react'

export default function SingleCard( {card} ) {
  return (
    <div className="card">
        <div>
            <img className="front" src={card.src} alt="card front"/>
            <img className="back" src="/images/cover.png" alt="card back"/>
        </div>
    </div>
  )
}