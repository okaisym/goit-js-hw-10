
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const selector = document.querySelector('.breed-select');
const loaderMessage = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const divCat = document.querySelector('.cat-info');

fetchBreeds()
.then(breeds => {
    const catInfo = breeds.map(({id, name}) => {
        return {value: id, text: name}
    })
    catInfo.unshift({value: "", text: 'Select a breed', disabled: true})
})
.catch(error =>
    console.log(error));

selector.addEventListener('change', onSelect)

function onSelect(event) {
    const selectedBreedId = event.target.value;
    if (breedId === "") {
        return;
      }

    fetchCatByBreed(breedId) 
    .then(breedInfo => {
        const breedTextContent = breedInfo.breeds[0];
    divCat.innerHTML = `<div class="cat-info">
    <img src="${breedInfo.url}" alt="${breedTextContent.name}" width=800, height=450/>
    <h2>${breedTextContent.name}</h2>
    <p>${breedTextContent.description}</p>
    <p>${breedTextContent.temperament}</p>
          </div>`
        }
)
.catch(error => 
    console.log(error));
};


    
