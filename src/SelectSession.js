import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';



function Session ({showtime , idSession}) {
    return (
        <Link to={`/assentos/${idSession}`} style={{textDecoration: 'none'}}>
            <div className="sessionTime">{showtime}</div>
        </Link>
    )
}


function DaySessions ({ day, weekday, showtimes}) {

    return (
        <div className="dayContainer">
            <span>{`${weekday} - ${day}`}</span>
            <div className="sessionTimesContainer">

                {showtimes.map((showtime, index) => <Session key={index} showtime={showtime.name} idSession={showtime.id} />)}
                
            </div>
        </div>
    )
}


export default function SelectSession() {
    
    const { idFilme } = useParams();
    
    const [sessionsList, setSessionsList] = useState({});

	useEffect(() => {
		const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);

		promise.then(response => {
			setSessionsList(response.data);
		});
	}, []);
    
    return (
        <>
            <div className="pageContainer">
                <div className="pageTitle">
                    <span>Selecione o horário</span>
                </div>

                { sessionsList.days ? (
                    <>{sessionsList.days.map((dayObj, index) => 
                        <DaySessions 
                            key={index} 
                            day={dayObj.date} 
                            weekday={dayObj.weekday} 
                            showtimes={dayObj.showtimes}
                        />)}
                    </>
                    ) : ("Carregando Sessões...")
                }
            </div>
            <div className="footer">
                <div className="filmPosterFooter">
                    <img src={sessionsList.posterURL} alt=""/>
                </div>
                <span>{sessionsList.title}</span>
            </div>
        </>

    )
}