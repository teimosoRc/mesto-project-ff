function handlerKeydown (evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'))
  }
}

export function openModal (element) {
  element.classList.add('popup_is-opened')
  document.addEventListener('keydown', handlerKeydown)
}

export function closeModal (element) {
  element.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', handlerKeydown)
}

export const handleModalClick = (event) => {
  if (event.target.classList.contains('popup_is-opened')) {
    return closeModal(event.target);
  }

  if (event.target.closest('.popup__close')) {
    return closeModal(event.target.closest('.popup'));
  }
};