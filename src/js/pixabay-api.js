import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
import { fetchLoad } from './render-functions';

const messages = {
  info: `Please enter a value in the search field!`,
  endOfSearch: `We're sorry, but you've reached the end of search results.`,
  warning: `Sorry, there are no images matching your search query. Please try again!`,
  error: `Sorry, there are no connection to the server. Please try again later!`,
  exception: `Exception: We have some issue with connection. Please try again later!`,
};

const messagesBgColor = {
  green: '#14b454',
  yellow: '#e52a2a',
  red: '#e5c32a',
};

const typeEvent = {
  click: 'click',
  submit: 'submit',
};

function showMessage(message, color) {
  iziToast.info({
    position: 'topRight',
    backgroundColor: `${color}`,
    message: `${message}`,
  });
}

export { typeEvent, messages, messagesBgColor, showMessage };

const API_KEY = '46849284-22f4e981648a1afff2e3fd4a3';
const API_URL = 'https://pixabay.com/api/?';
const configuration = {
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientations: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 15,
  },
};

export async function getGallery(queryValue, page) {
  try {
    fetchLoad();
    configuration.params.page = page;
    configuration.params.q = queryValue;
    const response = await axios.get(API_URL, configuration);
    return response.data;
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      showMessage(
        `${messages.exception} ERROR: ${data}`,
        messagesBgColor.yellow
      );
    } else if (error.request) {
      showMessage(
        `${messages.exception} ERROR: ${error.request}`,
        messagesBgColor.yellow
      );
    } else {
      showMessage(
        `${messages.exception} ERROR: ${error.message}`,
        messagesBgColor.yellow
      );
    }
  }
}
