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

function handleClick(cards) {
  cards.classList.add('active')
  let matcheditem = []
  matcheditem.push(cards.innerHTML)
  console.log(matcheditem)
  if (matcheditem[0] == matcheditem[1]) {
    console.log('hej')
  }
}

function addCardImg(container) {
  // var för funkar inte theme.length iställer för 24?
  for (let i = 0; i < 24; i++) {
    let random = Math.floor(Math.random() * theme.length)
    let cards = createCard(theme[random])

    cards.addEventListener('click', (e) => {
      handleClick(cards)
    })

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
