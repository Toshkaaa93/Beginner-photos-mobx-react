import { makeAutoObservable } from "mobx";

class PhotosStore {
  collections = [];
  searchValue = "";
  categoryId = 0;
  isLoading = true;
  page = 1;

  constructor() {
    makeAutoObservable(this);
  }

  fetchPhotos() {
    this.setIsLoading(true)
    const category = this.categoryId ? `category=${this.categoryId}` : ''
    fetch(`https://651177da829fa0248e4025c2.mockapi.io/photo_collection?page=${this.page}&limit=3&${category}`)
      .then((res) => res.json())
      .then((json) => {
        this.setCollections(json)
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении данных");
      })
      .finally(()=>this.setIsLoading(false));
  }

  setSearchValue(i) {
    this.searchValue = `${i}`;
  }

  setCategoryId(i) {
   this.categoryId = i
  }

  setIsLoading(i) { 
    this.isLoading = i
  }

  setCollections(i) {
    this.collections = [...i]
  }

  setPage(i) {
    this.page = i
  }
}

export default new PhotosStore();
