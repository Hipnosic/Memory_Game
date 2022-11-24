let cardContainer = document.querySelector(".card-container");

function createCard(theme) {
  let card = document.createElement("figure");
  card.innerHTML = `<img src="${theme}" alt="${theme}" width = "200">`;
  return card;
}

function addCardImg(container) {
  for (let themes of theme) {
    let cards = createCard(themes);
    container.append(cards);
  }
}

function initializeCards() {
  addCardImg(cardContainer);
}

initializeCards();
