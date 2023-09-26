import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const selector = document.querySelector('.breed-select');
const loaderMessage = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const divCat = document.querySelector('.cat-info');


fetchBreeds()
.then(breedsArray => {
    if (breedsArray) {
                breedsArray.forEach(({id, name}) => {
                const optionMarkup = `<option value=${id}>${name}</option>`;
                return selector.insertAdjacentHTML('beforeend', optionMarkup);
            });
            }
        })
        .catch((error) => {
            console.log(error);
        });

selector.addEventListener('change', onSelect);

function onSelect(event) {
    const selectedBreedId = event.target.value;
    if (selectedBreedId === "") {
        return;
      }

    fetchCatByBreed(selectedBreedId) 

    .then((breedInfo) => {
        const {image: {url}, breeds} = breedInfo[0];
    divCat.innerHTML = `<div class="cat-info">
    <img src="${url}" alt="${breeds[0].name}" width="800", height="450"/>
    <h2>${breeds[0].name}</h2>
    <p>${breeds[0].description}</p>
    <p>Temperament: ${breeds[0].temperament}</p>
          </div>`;
        }
)
.catch((error) => {
    console.error(error);
});
}

    
