import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from "slim-select";
import { Notify } from "notiflix";

const selector = document.querySelector('.breed-select');
const loaderMessage = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const divCat = document.querySelector('.cat-info');

const defaultOptionMarkup = `<option value="">*Select a breed</option>`;
selector.insertAdjacentHTML('beforeend', defaultOptionMarkup);

loaderMessage.classList.add('hidden');
errorMessage.classList.add('hidden');

function showLoader() {
    loaderMessage.classList.add('show');
    selector.classList.add('hidden');
    divCat.classList.add('hidden');
}

function hideLoader() {
    loaderMessage.classList.remove('show');
    selector.classList.remove('hidden');
    divCat.classList.remove('hidden');
  }

  function showError() {
    errorMessage.classList.add('show');
    loaderMessage.classList.remove('show');
    selector.classList.add('hidden');
    divCat.classList.add('hidden');
  }

  function hideError() {
    errorMessage.classList.remove('show');
    selector.classList.remove('hidden');
    divCat.classList.remove('hidden');
  }

  fetchBreeds()
  .then((breedsArray) => {
    if (breedsArray) {
      breedsArray.forEach(({ id, name }) => {
        const optionMarkup = `<option value="${id}">${name}</option>`;
        selector.insertAdjacentHTML('beforeend', optionMarkup);
      });
    }
    
    const slimSelectData = breedsArray.map(({ id, name }) => ({
      text: name,
      value: id 
      
    })
   
    );

    new SlimSelect({
      select: '#selectElement', 
      data: slimSelectData, 
    }); 
    hideLoader();
    hideError();
  })
  .catch(onFetchError);


selector.addEventListener('change', onSelect);

function onSelect(event) {
    const selectedBreedId = event.target.value;
    if (selectedBreedId === "") {
       Notify.failure("No information found for the selected breed. Try to choose another one!");
       hideLoader();
        return;
      }
      
      showLoader();
      
      
      fetchCatByBreed(selectedBreedId) 

    .then((breedInfo) => { 
      
      if (!breedInfo || !breedInfo.breeds || breedInfo.breeds.length === 0) {
                Notify.failure("No information found for the selected breed. Try to choose another one!");
                hideLoader();
                divCat.innerHTML = "";
                return;
            }
   const breadContent = breedInfo.breeds[0];
    divCat.innerHTML = `<div class="cat-info">
    <img src="${breedInfo.url}" alt="${breadContent.name}" width="600"/>
    <h2 class="title">${breadContent.name}</h2>
    <p class="description">${breadContent.description}</p>
    <p class="temp"><span class="temp-span temp">Temperament:</span> ${breadContent.temperament}</p>
          </div>`;
          hideLoader();
      }     
)
.catch(onFetchError);
};

function onFetchError(errorInstance) {
    loader.classList.add('hidden');
    divCat.innerHTML = ""
  
    Notify.failure(
      'Oops! Something went wrong! Try reloading the page or select another cat breed!',
      {
        timeout: 5000,
      }
    );
  }


