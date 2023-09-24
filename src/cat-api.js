
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_c9ZRS6OQJ3MsG4emC1TF1C8g5pyzy9tccIxNWW0LSSj8UQHEkquwJyzXZuBJcMh9";



export function fetchBreeds() {
    return axios.get(`https://api.thecatapi.com/v1/breeds`)
        .then(response => {
            return response.data;
        })
            .catch(error => {
            console.log(error);
    });
}


export function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
        return response.data[0];
    }
    )
.catch(error => {
    console.log(error);
});   
}
    
