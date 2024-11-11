import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const messages = {
  Info: 'Please enter a value in the search field!',
  Warning:
    'Sorry, there are no images matching your search query. Please try again!',
  Error:
    'Sorry, there are no connection to the server. Please try again later! ',
  Exception:
    'Exception: We have some issue with connection. Please try again later! ',
};

const messegesBgColor = {
  green: '#14b454',
  yellow: '#e52a2a',
  red: '#e5c32a',
};

function showMessage(message, color) {
  iziToast.info({
    position: 'topRight',
    backgroundColor: `${color}`,
    message: `${message}`,
  });
}

export { messages, messegesBgColor, showMessage };

const options = {
  method: 'GET',
};

const API_KEY = '46849284-22f4e981648a1afff2e3fd4a3';
const API_URL = 'https://pixabay.com/api/?';

export async function getGallery(queryValue) {
  try {
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: queryValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });

    const response = await fetch(API_URL + searchParams, options).then();
    if (!response.ok) {
      showMessage(messages.Error, messegesBgColor.yellow);
      return;
    }
    return await response.json();
  } catch (error) {
    showMessage(
      `${messages.Exception} ERROR: ${error}`,
      messegesBgColor.yellow
    );
  }
}
