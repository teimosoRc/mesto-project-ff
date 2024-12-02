import { cardList, templateCard } from ".././index";

export function createCard (cardData, deleteCallback, handleLikeCard, handleShowCard) {

    const cardElement = templateCard.querySelector('.places__item').cloneNode(true)
    const deleteCardButton = cardElement.querySelector('.card__delete-button')

    const cardLike = cardElement.querySelector('.card__like-button')
    const imgCardButton = cardElement.querySelector('.card__image')
    
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    deleteCardButton.addEventListener('click', ()=> deleteCallback(cardElement) )

    cardLike.addEventListener('click', handleLikeCard)
    imgCardButton.addEventListener('click', handleShowCard)

    return cardElement; 
}

export function deleteCardHandler (cardElement) {
  cardList.removeChild(cardElement)
}

