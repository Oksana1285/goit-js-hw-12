import iziToast from 'izitoast';

import {
  getGallery,
  showMessage,
  messages,
  messegesBgColor,
} from './js/pixabay-api';

import { renderGallery } from './js/render-functions';

const formSearch = document.querySelector('.search-form');
const listImages = document.querySelector('.gallery');
const div = document.createElement('div');

formSearch.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();

  iziToast.destroy();
  listImages.innerHTML = '';
  addLoader();

  const formData = new FormData(event.target);
  const { search } = Object.fromEntries(formData.entries());

  if (!search.trim()) {
    showMessage(messages.Info, messegesBgColor.green);
    listImages.innerHTML = '';
    return;
  }

  try {
    const galleryData = await getGallery(search.trim());
    if (validateGalleryData(galleryData)) {
      renderGallery(galleryData, listImages);
    }
  } catch (error) {
    showMessage(messages.Exception + error, messegesBgColor.yellow);
  }

  event.target.reset();
}

function addLoader() {
  div.classList.add('loader');
  listImages.append(div);
}

function validateGalleryData(galleryData) {
  if (!galleryData) {
    gallery.innerHTML = '';
    return false;
  } else if (galleryData && galleryData.totalHits === 0) {
    showMessage(messages.Warning, messegesBgColor.red);
    listImages.innerHTML = '';
    return false;
  } else {
    return true;
  }
}
