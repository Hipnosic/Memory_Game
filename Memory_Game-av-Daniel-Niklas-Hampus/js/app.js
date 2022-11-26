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
function hide() {
  playerTurnLbl.classList.add('display-none')
  playerTurnH3.classList.add('display-none')
  mainContainer.classList.add('display-none')
}
hide()

let playerOne = {
  name: '',
  score: 0,
}

let playerTwo = {
  name: '',
  score: 0,
}

let players = [playerOne, playerTwo]
let gameTurn = 0

function updateDisplay() {
  let currentPlayer = players[gameTurn]
  playerTurnLbl.innerText = currentPlayer.name
  playerOneScorePara.innerText = `${players[0].name}: ${players[0].score}`
  playerTwoScorePara.innerText = `${players[1].name}: ${players[1].score}`
  playerTurnLbl.classList.remove('display-none')
  playerTurnH3.classList.remove('display-none')
  sideContainer.classList.remove('display-none')
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

function winnerChecker() {
  let cardAmount = document.querySelectorAll('.hide')
  if (cardAmount[cardCounter]) {
    if (playerOne.score < playerTwo.score) {
      console.log(`${playerTwo.name} Won with ${playerTwo.score} points`)
    } else if (playerOne.score == playerTwo.score) {
      console.log(
        `DRAW ${playerOne.name} got ${playerOne.score} and ${playerTwo.name} got ${playerTwo.score}`
      )
    } else {
      console.log(`${playerOne.name} Won with ${playerOne.score} points`)
    }
  }
}

function historyCounter(currentPlayer) {
  let historyPara = document.createElement('p')
  historyPara.innerText = `${
    currentPlayer.name
  } fångade ${matchedItem[0].replace('.png', '')}`
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
  updateDisplay()
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
})
