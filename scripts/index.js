/* eslint-disable no-undef */
// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content

// @todo: DOM узлы
const cardList = document.querySelector('.places__list')

// @todo: Функция создания карточки
function displayCard (initCards) {
  
  initCards.forEach(card => {
    const cardElement = templateCard.querySelector('.places__item').cloneNode(true)
    const deleteCardButton = cardElement.querySelector('.card__delete-button')
    
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;

    deleteCardButton.addEventListener('click', ()=> deleteCardHandler(cardElement) )

    cardList.appendChild(cardElement); 
});
}

// @todo: Функция удаления карточки
function deleteCardHandler (cardElement) {
  cardList.removeChild(cardElement)
}
// @todo: Вывести карточки на страницу
displayCard(initialCards)