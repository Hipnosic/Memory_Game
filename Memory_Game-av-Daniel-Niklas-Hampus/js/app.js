let cardContainer = document.querySelector('.card-container')
let startBtn = document.querySelector('.start-btn')
let memoryCards = document.querySelectorAll('.card-container')
let matchedItem = []
let playerTurnLbl = document.querySelector('.player-turn-lbl')
let playerTurnH3 = document.querySelector('.playersturn')
let playerOneScorePara = document.querySelector('.player-one-score')
let playerTwoScorePara = document.querySelector('.player-two-score')
let preventClick = false

function getPlayesName() {
  let playerOneName = document.querySelector('.playerone-name-field')
  let playerTwoName = document.querySelector('.playertwo-name-field')
  playerOne.name = playerOneName.value
  playerTwo.name = playerTwoName.value

  playerOneName.classList.add('display-none')
  playerTwoName.classList.add('display-none')
}
function hideH3() {
  playerTurnLbl.classList.add('display-none')
  playerTurnH3.classList.add('display-none')
}
hideH3()

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
}

function winnerChecker() {
  let cardAmount = document.querySelectorAll('.hide')
  if (cardAmount[23]) {
    console.log('slut på kort')
    if (playerOne.score < playerTwo.score) {
      console.log('hello 1')
    } else if (playerOne.score == playerTwo.score) {
      console.log('hello 2')
    } else {
      console.log('hello 3')
    }
  }
}

function gameLogic(card, theme) {
  card.classList.add('flip-front')
  card.classList.remove('flip-back')

  matchedItem.push(theme.alt)
  console.log(matchedItem)
  if (matchedItem[0] == matchedItem[1]) {
    setTimeout(matchedCard, 1000)
    matchedItem = []
    let currentPlayer = players[gameTurn]
    currentPlayer.score++
    preventClick = true
    console.log(playerOne.score)
    console.log(playerTwo.score)
    winnerChecker()
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
  startBtn.classList.add('display-none')
  initializeCards()
})
