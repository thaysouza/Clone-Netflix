
import React, {useEffect, useState} from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';


export default () => {
//criar a lista para ser  exibida
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData]= useState(null);

  
 

  //executa a funcao
  useEffect(() => {
      const loadAll = async () => {
        let list = await Tmdb.getHomeList();
        setMovieList(list);
  
        let originals = list.filter(i=> i.slug === 'originals');
        let randonChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
        let chosen = originals[0].items.results[randonChosen]
        let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
        setFeaturedData(chosenInfo);
      }
  
      loadAll();
    }, []);

  return (
    <div className="page">
      
      {
        featuredData && 
        <FeaturedMovie item={featuredData}/>
      }
   

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
};
