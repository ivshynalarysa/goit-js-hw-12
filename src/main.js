import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery, clearGallery,  showLoader, hideLoader, smoothScroll } from "./js/render-functions";

const refs = {
	form: document.querySelector('form'),
	searchInput: document.querySelector(".input"),
	loader: document.querySelector('.loader'),
	loadMore: document.querySelector(".load-more"),
	gallery: document.querySelector('.gallery'),
};

let page = 1;
let enteredInput = "";



refs.form.addEventListener('submit', handleSubmit);
refs.loadMore.addEventListener('click', onLoadMore);
refs.loadMore.classList.replace("load-more", "load-more-hidden")

function handleSubmit(event) {
    event.preventDefault();
    enteredInput = event.target.elements.search.value.trim();
	/*refs.searchInput.value.trim();*/
    page = 1;

    if (!enteredInput) {
        iziToast.warning({
            position: 'topRight',
            title: 'Warning',
            message: 'Please enter a search query',
        });
        refs.searchInput.focus();
        return;
    }

    showLoader();
    clearGallery();
    refs.loadMore.classList.replace("load-more", "load-more-hidden");

    getImagesByQuery(enteredInput, page)
        .then(response => {
            const data = response.data;

            if (!data.hits || data.hits.length === 0) {
                iziToast.warning({
                    position: 'topRight',
                    title: 'Warning',
                    message: 'Sorry, no images found. Please try another query!',
                });
                return;
            }

            if (data.hits.length < data.totalHits) {
                refs.loadMore.classList.replace("load-more-hidden", "load-more");
            } else {
                refs.loadMore.classList.replace("load-more", "load-more-hidden");
            }
            createGallery(data.hits);

        })
        .catch(error => {
            iziToast.error({
                position: 'topRight',
                title: 'Error',
                message: 'Failed to fetch images. Please try again later.',
            });
            console.error('Error:', error);
        })
        .finally(() => {
            hideLoader();
            /*refs.searchInput.value = "";*/
        });
		event.target.reset();
}


async function onLoadMore() {
    page++;
    refs.loadMore.disabled = true;
    refs.loadMore.classList.replace("load-more", "load-more-hidden");
    showLoader();

    try {
        const response = await getImagesByQuery(enteredInput, page);
        const data = response.data;

        createGallery(data.hits);
        smoothScroll();

        const totalPages = Math.ceil(data.totalHits / 15);
        if (page >= totalPages) {
            iziToast.info({
                position: 'topRight',
                message: "We're sorry, but you've reached the end of search results."
            });
        } else {
            refs.loadMore.classList.replace("load-more-hidden", "load-more");
        }

    } catch (error) {
        iziToast.error({
            position: 'topRight',
            title: 'Error',
            message: error.message
        });
    } finally {
        hideLoader();
        refs.loadMore.disabled = false;
    }
}