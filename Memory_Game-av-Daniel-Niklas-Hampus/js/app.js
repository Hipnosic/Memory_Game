let cardContainer = document.querySelector('.card-container')
let startBtn = document.querySelector('.start-btn')
let memoryCards = document.querySelectorAll('.card-container')
let matchedItem = []

function createCard(theme) {
  let card = document.createElement('figure')
  card.innerHTML = `<img class ="card-img" src="${theme.name}" alt="${theme.alt}" width = "100">`
  card.className = 'card'
  card.addEventListener('click', () => {
    gameLogic(card, theme)
  })

  return card
}

function flipback() {
  let rotate = document.querySelectorAll('.flip-front')
  rotate[0].classList.remove('flip-front')
  rotate[0].classList.add('flip-back')
  rotate[1].classList.remove('flip-front')
  rotate[1].classList.add('flip-back')
}

function gameLogic(card, theme) {
  card.classList.add('flip-front')
  card.classList.remove('flip-back')

  matchedItem.push(theme.alt)
  console.log(matchedItem)
  if (matchedItem[0] == matchedItem[1]) {
    console.log('hej')
    matchedItem = []
  } else if (matchedItem[1]) {
    matchedItem = []
    console.log('nope')
    setTimeout(flipback, 1000)
  }
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
}

initializeCards()

// startBtn.addEventListener('click', () => {
//   startBtn.style.display = 'none'
//   initializeCards()
// })
