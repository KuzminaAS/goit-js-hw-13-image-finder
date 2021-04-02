import './styles.css';
import ImagesApiService from './scripts/apiService.js'
import templatesGallery from './templates/templatesGallery.hbs'
import { onError } from './scripts/pnotify.js'
const basicLightbox = require('basiclightbox')
import 'basicLightbox/dist/basicLightbox.min.css'
const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryList: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    imgIntoModal: document.querySelector('.imgOriginal')
}

const imgApiService = new ImagesApiService();
// console.log(imgApiService);
refs.loadMoreBtn.classList.add('is-hidden')

refs.searchForm.addEventListener('submit', onSearch)

refs.loadMoreBtn.addEventListener('click', onLoadMore)

refs.galleryList.addEventListener('click',onClick)


function onClick (evt) {
    if (evt.target !== evt.currentTarget) {
        
    const imgOriginal = evt.target.dataset.source;
    
    if (imgOriginal) {
            const instance = basicLightbox.create(`
    <img src="${imgOriginal}" width="800" height="600">
`)

instance.show()
        }
     }
}

function onSearch(e) {
    e.preventDefault()
    imgApiService.query = e.currentTarget.elements.query.value;
    imgApiService.resetPage();
    imgApiService.fetchImages()
        .then(hits => {
            if (!hits.length) {
            onError('Что-то пошло не так')
        }
        clearGalleryContainer();
        appendGalleryMarcup(hits);
    })
}

function onLoadMore() {
      const lastImg = document.querySelector('.gallery .gallery-list-item:last-child')
    imgApiService.fetchImages().then(result => {
        appendGalleryMarcup(result)
    if (lastImg) {
        window.scrollTo({
            top: lastImg.offsetTop + 365,
             behavior: 'smooth'
        })
    }})
  
    
}

function appendGalleryMarcup(gallery) {
    refs.galleryList.insertAdjacentHTML('beforeend', templatesGallery(gallery))
    refs.loadMoreBtn.classList.remove('is-hidden')
    };

function clearGalleryContainer() {
    refs.galleryList.innerHTML = '';
};
    
