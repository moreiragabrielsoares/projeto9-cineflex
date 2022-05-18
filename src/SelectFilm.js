import { Link } from "react-router-dom";
import axios from 'axios';

import { useState, useEffect } from 'react';



function FilmPoster ({posterURL, idFilm}) {
    
    return (
        <Link to={`/sessoes/${idFilm}`}>
            <div className="filmPoster">
                <img src={posterURL} alt=""/>
            </div>
        </Link>
    )
}


export default function SelectFilm() {
    
    const [filmsList, setFilmsList] = useState([]);

	useEffect(() => {
		const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");

		promise.then(response => {
			setFilmsList(response.data);
		});
	}, []);
    
    
    return (
        <>
            <div className="pageContainer">
                <div className="pageTitle">
                    <span>Selecione o filme</span>
                </div>
                <div className="filmsContainer">
                    {filmsList.map((film, index) => <FilmPoster key={index} idFilm={film.id} posterURL={film.posterURL}/>)}
                </div>
            </div>
        </>
    )
}