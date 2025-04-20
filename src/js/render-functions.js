import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
let lightbox = null;

function galeryTemplate(data) {
	const {
		webformatURL,
		largeImageURL,
		tags,
		likes,
		views,
		comments,
		downloads,
	} = data;

	return `<li class="gallery-item">
        <div>
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        </div>
        <ul class="gallery-sublist">
          <li class="gallery-subitem"><p class="sub-text">Likes</p><p class="sub-value">${likes}</p></li>
          <li class="gallery-subitem"><p class="sub-text">Views</p><p class="sub-value">${views}</p></li>
          <li class="gallery-subitem"><p class="sub-text">Comments</p><p class="sub-value">${comments}</p></li>
          <li class="gallery-subitem"><p class="sub-text">Downloads</p><p class="sub-value">${downloads}</p></li>
        </ul>
      </li>`;
}

export function createGallery(images) {
  const createMurkup = images.map(galeryTemplate).join('');
  gallery.insertAdjacentHTML('beforeend', createMurkup);

  if (lightbox) {
      lightbox.refresh();
  } else {
      lightbox = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionDelay: 250,
      });
  }
}

export function clearGallery() {
  gallery.innerHTML = '';
  if (lightbox) {
      lightbox.destroy();
      lightbox = null;
  }
}

export function showLoader() {
  loader.classList.remove("hidden");
}

export function hideLoader() {
  loader.classList.add("hidden");
}

export function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');
  if (galleryItem) {
      const { height } = galleryItem.getBoundingClientRect();
      window.scrollBy({
          left: 0,
          top: height * 3,
          behavior: 'smooth',
      });
  }
}