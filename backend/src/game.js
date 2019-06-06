import 'regenerator-runtime/runtime'
import calculatePoints from './utils/calculatePoints'

export default class Game {
  constructor (server, roomId, room) {
    this.server = server
    this.roomId = roomId
    this.room = room
    this.timeRemaining = 0
    this.pointsForTheRound = {}
    this.shouldScorePoints = false

    const proxyUpdateHandler = {
      set: (obj, prop, value) => {
        obj[prop] = value
        this.server.in(this.roomId).emit('game-update', this.gameState)
        return true
      }
    }
    this.gameState = new Proxy({
      isGameStarted: false,
      isGameOver: false,
      players: [],
      drawer: undefined,
      currentWord: undefined
    }, proxyUpdateHandler)
  }

  addPlayer (id, name) {
    this.gameState.players.push({ playerId: id, name: name, connected: true, score: 0 })
    this.server.in(this.roomId).emit('game-update', this.gameState)
  }

  removePlayer (playerId) {
    this.gameState.players = this.gameState.players.filter(player => playerId !== player.playerId)
  }

  startGame () {
    if (!this.gameState.isGameStarted && this.gameState.players.length >= 2) {
      this.gameState.isGameStarted = true
    } else {
      this.room.systemChat('You need at least 2 members to start the meeting')
    }
  }

  verifyChat (chatMessage, socketId) {
    const { currentWord, players } = this.gameState
    if (this.shouldScorePoints &&
        this.gameState.drawer.playerId !== socketId &&
        currentWord === chatMessage.message.trim().toLowerCase()
    ) {
      if (!this.pointsForTheRound[socketId]) {
        this.pointsForTheRound[socketId] = calculatePoints(this.timeRemaining)
        this.gameState.players = players.map((player) => {
          if (player.playerId === socketId) {
            player.score += this.pointsForTheRound[socketId]
            this.gameState.drawer.score += 100
          }
          return player
        })
      }
      return {
        name: chatMessage.name,
        message: chatMessage.message.replace(/./g, '*')
      }
    }
    return chatMessage
  }
}
