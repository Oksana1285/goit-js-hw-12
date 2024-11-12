import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const box = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const gallery = document.querySelector('.gallery');

export function fetchGallery(arr) {
  gallery.insertAdjacentHTML('beforeend', createGallery(arr));

  box.refresh();
}

function createGallery(arr) {
  return arr.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
					<a class="gallery-link" href="${largeImageURL}">
						<figure class="gallery-figure ">
							<img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy">
									<ul class="img-wrap">
									<li>Likes<span>${likes}</span></li>
									<li>Views<span>${views}</span></li>
									<li>Comments<span>${comments}</span></li>
									<li>Downloads<span>${downloads}</span></li>
								</ul>
						</figure>
					</a>
				</li>
		`
    )
    .join('');
}

export function fetchLoad() {
  gallery.insertAdjacentHTML(
    'beforeend',
    `<div class='loader-wrapper'>
        <div class='loader'></div>
    </div>`
  );
}
