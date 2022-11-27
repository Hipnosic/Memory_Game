let cardContainer = document.querySelector('.card-container')
let startBtn = document.querySelector('.start-btn')
let memoryCards = document.querySelectorAll('.card-container')
let matchedItem = []
let playerTurnLbl = document.querySelector('.player-turn-lbl')
let playerTurnH3 = document.querySelector('.playersturn')
let playerOneScorePara = document.querySelector('.player-one-score')
let playerTwoScorePara = document.querySelector('.player-two-score')
let historyContainer = document.querySelector('.history-container')
let startCard = document.querySelector('.start-menu')
let mainContainer = document.querySelector('.main-wrapper')
let winnerName = document.querySelector('.winner-name')
let winnerPoints = document.querySelector('.winner-points')
let winnerContainer = document.querySelector('.winner-announcment')
let restartBtn = document.querySelector('.restart-btn')
let preventClick = false
let cardCounter = theme.length - 1

function getPlayesName() {
  let playerOneName = document.querySelector('.playerone-name-field')
  let playerTwoName = document.querySelector('.playertwo-name-field')
  playerOne.name = playerOneName.value
  playerTwo.name = playerTwoName.value

  playerOneName.classList.add('display-none')
  playerTwoName.classList.add('display-none')
}

let playerOne = {
  name: 'Player One',
  score: 0,
}

let playerTwo = {
  name: 'Player Two',
  score: 0,
}

let players = [playerOne, playerTwo]
let gameTurn = 0

function updateDisplay() {
  let currentPlayer = players[gameTurn]
  playerTurnLbl.innerText = currentPlayer.name
  playerOneScorePara.innerText = `${players[0].name}: ${players[0].score}`
  playerTwoScorePara.innerText = `${players[1].name}: ${players[1].score}`
  mainContainer.classList.remove('display-none')
}

function createCard(theme) {
  let card = document.createElement('figure')
  card.innerHTML = `<img class ="card-img" src="${theme.name}" alt="${theme.alt}" width = "100">`
  card.className = 'card'
  card.addEventListener('click', () => {
    if (!card.classList.contains('flip-front') && !preventClick) {
      gameLogic(card, theme)
    }
  })

  return card
}

function flipback() {
  let rotate = document.querySelectorAll('.flip-front')
  rotate[0].classList.remove('flip-front')
  rotate[0].classList.add('flip-back')
  rotate[1].classList.remove('flip-front')
  rotate[1].classList.add('flip-back')
  preventClick = false
}

function matchedCard() {
  let matched = document.querySelectorAll('.flip-front')
  matched[0].classList.add('hide')
  matched[1].classList.add('hide')
  matched[0].classList.remove('flip-front')
  matched[0].classList.remove('flip-back')
  matched[1].classList.remove('flip-front')
  matched[1].classList.remove('flip-back')
  preventClick = false
  winnerChecker()
}

function restart() {
  let restartFlip = document.querySelectorAll('.flip-front')
  let restarthidden = document.querySelectorAll('.hide')
  let restartHistory = document.querySelectorAll('.history-para')

  playerOne.score = 0
  playerTwo.score = 0
  gameTurn = 0

  updateDisplay()

  for (let restartFliped of restartFlip) {
    restartFliped.classList.remove('flip-front')
    restartFliped.classList.remove('flip-back')
  }

  for (let restarthide of restarthidden) {
    restarthide.classList.remove('hide')
  }

  for (let restartHistorys of restartHistory) {
    restartHistorys.remove()
  }
}

function winnerChecker() {
  let cardAmount = document.querySelectorAll('.hide')
  if (cardAmount[cardCounter]) {
    mainContainer.style.display = 'none'
    winnerContainer.style.display = 'flex'
    winnerContainer.classList.remove('display-none')
    if (playerOne.score < playerTwo.score) {
      winnerName.innerText = `${playerTwo.name} is the best trainer!`

      winnerPoints.innerText = `${playerTwo.name} caught ${playerTwo.score} pokemons`
    } else if (playerOne.score == playerTwo.score) {
      winnerName.innerText = `${playerTwo.name} and ${playerOne.name} caught the same amount of pokemons`

      winnerPoints.innerText = `${playerTwo.name} caught ${playerTwo.score} pokemons and ${playerOne.name} caught ${playerOne.score} pokemons`
    } else {
      winnerName.innerText = `${playerOne.name} is the best trainer!`

      winnerPoints.innerText = `${playerOne.name} caught ${playerOne.score} pokemons`
    }
  }
}

function historyCounter(currentPlayer) {
  let historyPara = document.createElement('p')
  historyPara.innerText = `${
    currentPlayer.name
  } Caught ${matchedItem[0].replace('.png', '')}`
  historyPara.className = 'history-para'

  historyContainer.append(historyPara)
}

function gameLogic(card, theme) {
  card.classList.add('flip-front')
  card.classList.remove('flip-back')

  matchedItem.push(theme.alt)
  console.log(matchedItem)
  if (matchedItem[0] == matchedItem[1]) {
    setTimeout(matchedCard, 1000)
    let currentPlayer = players[gameTurn]
    historyCounter(currentPlayer)
    currentPlayer.score++
    matchedItem = []
    preventClick = true
  } else if (matchedItem[1]) {
    matchedItem = []
    setTimeout(flipback, 1000)
    gameTurn = (gameTurn + 1) % 2
    preventClick = true
  }
  setTimeout(updateDisplay, 2000)
}

function addCardImg(container) {
  let totalAmount = theme.length
  for (let i = 0; i < totalAmount; i++) {
    let random = Math.floor(Math.random() * theme.length)
    let cards = createCard(theme[random])

    theme.splice(random, 1)
    container.append(cards)
  }
}

function initializeCards() {
  addCardImg(cardContainer)
  getPlayesName()
}

startBtn.addEventListener('click', () => {
  mainContainer.style.display = 'flex'
  startCard.classList.add('display-none')
  initializeCards()
  updateDisplay()
})

restartBtn.addEventListener('click', () => {
  restart()
})
