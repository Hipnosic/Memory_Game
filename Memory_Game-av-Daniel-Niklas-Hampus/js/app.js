let cardContainer = document.querySelector('.card-container')
let startBtn = document.querySelector('.start-btn')
let memoryCards = document.querySelectorAll('.card-container')
let img = document.querySelector('.card-img')
let rotate = document.querySelector('.card')
let matchedItem = []

function gameLogic(theme) {
  matchedItem.push(theme.alt)
  console.log(matchedItem)
  if (matchedItem[0] == matchedItem[1]) {
    console.log('hej')
  } else if (matchedItem[1]) {
    matchedItem = []
    console.log('nope')
  }
}

function createCard(theme) {
  let card = document.createElement('figure')
  card.innerHTML = `<img class ="card-img" src="${theme.name}" alt="${theme.alt}" width = "100">`
  card.className = 'card'
  card.addEventListener('click', () => {
    handleClick(card)
    gameLogic(theme)
  })

  return card
}

function handleClick(cards) {
  cards.classList.add('active')
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

initializeCards()

// startBtn.addEventListener('click', () => {
//   startBtn.style.display = 'none'
//   initializeCards()
// })
