import iziToast from 'izitoast';
import {
  typeEvent,
  messages,
  messagesBgColor,
  showMessage,
} from './js/pixabay-api';
import { getGallery } from './js/pixabay-api';
import { fetchGallery } from './js/render-functions';

let eventType = '';
let stringQ = '';
let actualPage = 1;

const maxImage = 15;

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const loadBtn = document.querySelector('.load-more-btn');

form.addEventListener('submit', onSubmitForm);

loadBtn.addEventListener('click', async () => {
  try {
    eventType = typeEvent.click;
    await renderGallery(stringQ, actualPage);
    const item = document.querySelector('li');
    const { height } = item.getBoundingClientRect();
    scroll(height * 2, 0);
  } catch (error) {
    showMessage(messages.exception + error, messagesBgColor.yellow);
  }
});

async function onSubmitForm(evt) {
  try {
    evt.preventDefault();

    const target = evt.target;
    const search = target.elements.search.value.trim();

    eventType = typeEvent.submit;

    loadBtn.classList.remove('visible');

    iziToast.destroy();

    if (stringQ !== search || eventType === typeEvent.submit) {
      gallery.innerHTML = '';
      stringQ = target.elements.search.value.trim();
      actualPage = 1;
    }

    if (!search) {
      showMessage(messages.info, messagesBgColor.green);
      gallery.innerHTML = '';
      return;
    }

    await renderGallery(stringQ, actualPage);

    target.reset();
  } catch (error) {
    showMessage(messages.exception + error, messagesBgColor.yellow);
  }
}

async function renderGallery(searchValue, page) {
  try {
    if (searchValue === stringQ && eventType === typeEvent.click) {
      actualPage += 1;
      page += 1;
    }

    const galleryData = await getGallery(searchValue, page);

    removeLoad();

    if (validateGallery(galleryData)) {
      const restImages = Math.round(galleryData.totalHits / page);
      fetchGallery(galleryData);
      showBtn(restImages);
    }
  } catch (error) {
    showMessage(messages.exception + error, messagesBgColor.yellow);
  }
}

function scroll(x = 0, y = 0) {
  window.scrollBy({ top: x, left: y, behavior: 'smooth' });
}

function removeLoad() {
  const loadWrap = document.querySelector('.loader-wrapper');
  loadWrap.remove();
}

function validateGallery(galleryData) {
  if (!galleryData) {
    gallery.innerHTML = '';
    return false;
  } else if (galleryData && galleryData.totalHits === 0) {
    showMessage(messages.warning, messagesBgColor.red);
    gallery.innerHTML = '';
    return false;
  } else {
    return true;
  }
}

function showBtn(imagesCount) {
  if (imagesCount <= maxImage) {
    loadBtn.classList.remove('visible');
    showMessage(messages.endOfSearch, messagesBgColor.green);
    return;
  }
  loadBtn.classList.add('visible');
}
