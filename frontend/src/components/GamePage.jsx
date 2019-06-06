import React, { useState, useEffect } from 'react'
import Canvas from './Canvas/CanvasWrapper.jsx'
import '../css/GamePage.css'
import Chat from './Chat.jsx'

export default props => {
  const [gameState, setGameState] = useState({ players: [], drawer: {} })

  useEffect(() => {
    props.socket.on('game-update', (gameState) => {
      setGameState(gameState)
    })

    props.socket.emit('get-game-update')
  }, [])

  const renderPlayers = () => {
    return gameState.players.map((player) => {
      return <p key={player.playerId}>{player.name}</p>
    })
  }

  const startGame = e => {
    e.preventDefault()
    props.socket.emit('start-game')
  }

  const renderMessageBar = () => {
    return <h4>Share this code with your collaborators: {props.roomId}</h4>
  }

  const renderStartButton = () => {
    return !gameState.isGameStarted ? <button onClick={startGame}>Start Collaboration</button> : ''
  }

  return (
    <>
      <div className='gamePageContainer'>
        {renderMessageBar()}
        <div className='canvasContainer'>
          <Canvas socket={props.socket}/>
        </div>
        <Chat socket={props.socket} playerName={props.playerName}/>
        <div className='playerList'>
          <div className='playerNames'>
            {renderPlayers()}
          </div>
          {renderStartButton()}
        </div>
      </div>
    </>
  )
}
