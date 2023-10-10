import React, { useEffect } from "react";
import "./index.scss";
import Collection from "./Collection";
import photosStore from "./store/photos-store";
import { observer } from "mobx-react-lite";

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]

const App = observer(() => {
  const {collections,searchValue,categoryId,isLoading,page} = photosStore

  useEffect(() => {
    photosStore.fetchPhotos();
  },[categoryId,page]);


  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj,i)=><li onClick={()=>photosStore.setCategoryId(i)} className={categoryId === i ? 'active' : ''} key={obj.name}>{obj.name}</li>)}
        </ul>
        <input value={searchValue} onChange={(e)=> photosStore.setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? <h2>Идет загрузка...</h2> : (collections.filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
        .map((obj,i) => (
          <Collection
            name={obj.name}
            images={obj.photos}
            key={i}
          />
        )))}
      </div>
      <ul className="pagination">
       {
        [...Array(3)].map((_,i) => <li key={i} onClick={()=> photosStore.setPage(i+1)} className={page === i+1 ? 'active' : ''}>{i+1}</li>)
       }
      </ul>
    </div>
  );
})

export default App;
