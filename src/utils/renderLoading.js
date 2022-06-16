export const renderLoading = (popup, isLoading, defaultName) => {
  const button = document.querySelector(popup).querySelector('.popup__button');
  if (!isLoading) {
    button.textContent = defaultName;
  } else {
    button.textContent = 'Сохранить...';
  }
}
