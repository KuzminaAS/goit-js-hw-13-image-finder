
export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
        // if (this.query !== query) {
        //     this.resetPage()
        // }
        // this.query = query;
        const baseUrl = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=20944860-c17ba5e7d5700a2a7880c4ee2`;
       const apiReguest = fetch(baseUrl);
       return  apiReguest
            .then(response => {
                if (!response.ok) {
                    throw new Error('Просмотр картинок временно недоступен')
                } return response.json()
            })
            .then(data => {
             
            this.incrementPage()
              return data.hits
            })
            .catch(error => console.log(error));
    }
    incrementPage() {
         this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    
}
