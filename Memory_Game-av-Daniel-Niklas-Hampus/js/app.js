let cardContainer = document.querySelector('.card-container')
let startBtn = document.querySelector('.start-btn')
let memoryCards = document.querySelectorAll('.card-container')
let img = document.querySelector('.card-img')
let rotate = document.querySelector('.card')

function createCard(theme) {
  let card = document.createElement('figure')
  card.innerHTML = `<img class ="card-img" src="${theme}" alt="${theme}" width = "100">`
  card.className = 'card'
  return card
}

function addCardImg(container) {
  // var för funkar inte theme.length iställer för 24?
  for (let i = 0; i < 24; i++) {
    let random = Math.floor(Math.random() * theme.length)
    let cards = createCard(theme[random])
    theme.splice(random, 1)
    container.append(cards)
  }
}

function initializeCards() {
  addCardImg(cardContainer)
}

function handleClick() {
  rotate.style.transform = 'rotateY(0deg)'
}

for (let memoryCard of memoryCards) {
  memoryCard.addEventListener('click', handleClick)
}

initializeCards()

// startBtn.addEventListener('click', () => {
//   startBtn.style.display = 'none'
//   initializeCards()
// })
