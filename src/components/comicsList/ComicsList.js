import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinnner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, [])
    
    const onRequest = (offset, initial) => {
        console.log('request');
        initial ? setnewItemLoading(false) : setnewItemLoading(true)
        getAllComics(offset).then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList([...comicsList, ...newComicsList]);
        setOffset(() => offset + 8);
        setnewItemLoading(false);
        setComicsEnded(ended)
        
    }



    function renderItems (arr) {
        const items = arr.map((comics, i) => {
            return (
                <li className="comics__item" key={comics.id}>
                    <Link to={`/comics/${comics.id}`}>
                        <img src={comics.thumbnail} alt={comics.title} className="comics__item-img"/>
                        <div className="comics__item-name">{comics.title}</div>
                        <div className="comics__item-price">{comics.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
               {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
         
            <button
                className="button button__main button__long"
                onClick={() => onRequest(offset, false)}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                disabled={newItemLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}



export default ComicsList;