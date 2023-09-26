
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_c9ZRS6OQJ3MsG4emC1TF1C8g5pyzy9tccIxNWW0LSSj8UQHEkquwJyzXZuBJcMh9";


export function fetchBreeds() {
    return axios.get("https://api.thecatapi.com/v1/breeds")
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
            .catch(error => {
                return new Error('Oops! Something went wrong! Try reloading the page!');
    })
}


export function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => {
        return response.data[0];
    }
    )
.catch(error => {
    return new Error('Oops! Something went wrong! Try reloading the page!');
})  
}
    
