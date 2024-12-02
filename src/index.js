import './pages/index.css';

import {createCard, deleteCardHandler} from './components/card.js';
import {cardData} from './components/cards.js';
import {openModal, closeModal, handleModalClick} from './components/modal.js';

import avatar from './images/avatar.jpg';

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

export const cardList = document.querySelector('.places__list')
export const templateCard = document.querySelector('#card-template').content

//форма профиля
const editProfileForm = document.forms['edit-profile']
const nameInput = editProfileForm.elements.name
const descriptionInput = editProfileForm.elements.description

// форма новой карточки
const newPlaceForm = document.forms['new-place']
const nameInputImage =newPlaceForm.elements['place-name']
const linkInputImage =newPlaceForm.elements.link

const editProfileButton = document.querySelector('.profile__edit-button')
const addCardButton = document.querySelector('.profile__add-button')

const popupProfile = document.querySelector('.popup_type_edit')

const popupNewCard = document.querySelector('.popup_type_new-card')

const popupImage = document.querySelector('.popup_type_image')

function displayCard (cardInit) {
  cardInit.forEach(card => {
    const cardElement = createCard(card, deleteCardHandler, handleLikeCard, handleShowCard)
    cardList.appendChild(cardElement); 
  });
}

function handleEditProfile () {
  openModal(popupProfile)
  nameInput.value = document.querySelector('.profile__title').textContent
  descriptionInput.value = document.querySelector('.profile__description').textContent
}

function handleAddCard () {
  openModal(popupNewCard)
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;

  document.querySelector('.profile__title').textContent = nameValue; 
  document.querySelector('.profile__description').textContent = descriptionValue; 

  closeModal(popupProfile);
}

function handleCardFormSubmit (evt) {
  evt.preventDefault();

  const card = {name:nameInputImage.value , link: linkInputImage.value}
  const cardElement = createCard(card, deleteCardHandler, handleLikeCard, handleShowCard)

  cardList.prepend(cardElement)
  
  nameInputImage.value = '';
  linkInputImage.value = '';

  closeModal(popupNewCard);
}

function handleLikeCard (evt) {
  //так как я понимаю кол-во лайков и кто поставил должно хранится на сервере и при загрузке стр получать их от туда пока решение такое
  evt.target.classList.toggle('card__like-button_is-active')
}
function handleShowCard (evt) {
  openModal(popupImage)
  popupImage.querySelector('.popup__image').src = evt.target.src
  popupImage.querySelector('.popup__image').alt = evt.target.alt
  popupImage.querySelector('.popup__caption').textContent = evt.target.alt
}

displayCard(cardData)

addCardButton.addEventListener('click', handleAddCard)
editProfileButton.addEventListener('click', handleEditProfile)

popupProfile.addEventListener('click', handleModalClick)
popupNewCard.addEventListener('click', handleModalClick)
popupImage.addEventListener('click', handleModalClick)

editProfileForm.addEventListener('submit', handleProfileFormSubmit); 
newPlaceForm.addEventListener('submit', handleCardFormSubmit); 
