/* eslint-disable no-undef */
// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content

// @todo: DOM узлы
const cardList = document.querySelector('.places__list')

// @todo: Функция создания карточки
function createCard (cardData, deleteCallback) {

    const cardElement = templateCard.querySelector('.places__item').cloneNode(true)
    const deleteCardButton = cardElement.querySelector('.card__delete-button')
    
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = `${cardData.name} на фото`;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    deleteCardButton.addEventListener('click', ()=> deleteCallback(cardElement) )

    return cardElement; 
}

function displayCard (cardInit) {
  
  cardInit.forEach(card => {
    const cardElement = createCard(card, deleteCardHandler)
    cardList.appendChild(cardElement); 
});
}

// @todo: Функция удаления карточки
function deleteCardHandler (cardElement) {
  cardList.removeChild(cardElement)
}
// @todo: Вывести карточки на страницу
displayCard(initialCards)