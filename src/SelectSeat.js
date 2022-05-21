import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';



function MapOfSeats ({isAvailable, seatName, idSeat, seatsObj, setSeatsObj}) { 
    
    function markSeat (idSeat) {
        const aux = seatsObj;
        for (let i = 0 ; i < aux.seats.length; i++) {
            if (idSeat === aux.seats[i].id) {
                if (aux.seats[i].isAvailable === "Selected") {
                    aux.seats[i].isAvailable = true;
                } else {
                    aux.seats[i].isAvailable = "Selected";
                }
            }
        }
        setSeatsObj({... aux});
    }
    

    if (!isAvailable) {
        return (
            <div className="seatButton seatNotAvailable" onClick={() => alert("Esse assento não está disponível")}>
                {seatName}
            </div>
        )
    }

    if (isAvailable === "Selected") {
        return (
            <div className="seatButton seatSelected" onClick={() => markSeat(idSeat)}>
                {seatName}
            </div>
        )
    }

    return (
        <div className="seatButton Available" onClick={() => markSeat(idSeat)}>
            {seatName}
        </div>
    )
}



function BuyerForm () {
    
    const [buyerName, setBuyerName] = useState("");
    const [buyerCpf, setBuyerCpf] = useState("");
    
    return (
        <form>
            <label for="buyerName">Nome do comprador:</label>
            <input id="buyerName" placeholder="Digite seu nome..." onChange={e => setBuyerName(e.target.value)} value={buyerName}/>
            <label for="buyerCpf">CPF do comprador:</label>
            <input id="buyerCpf" placeholder="Digite seu CPF..." onChange={e => setBuyerCpf(e.target.value)} value={buyerCpf}/>
            <button type="submit">{`Reservar assento(s)`}</button>
        </form>
    )
}




export default function SelectSeat() {
    
    const { idSessao } = useParams();
    
    const [seatsObj, setSeatsObj] = useState({});

	useEffect(() => {
		const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);
        
		promise.then(response => {
			setSeatsObj(response.data);
		});

        promise.catch(erro => console.log("Status code:" + erro.response.status))
        
	}, []);
    
    console.log(seatsObj);
    
    
    
    return (
        <>
            <div className="pageContainer">
                <div className="pageTitle">
                    <span>{`Selecione o(s) assento(s)`}</span>
                </div>

                <div className="seatsContainer">
                    <div className="seatsMap">
                        
                        {seatsObj.movie ? (
                            <>
                                {seatsObj.seats.map((seat, index) => 
                                    <MapOfSeats 
                                        key={index} 
                                        isAvailable={seat.isAvailable}
                                        seatName={seat.name}
                                        idSeat={seat.id}
                                        seatsObj={seatsObj}
                                        setSeatsObj={setSeatsObj}
                                    />)}
                            </>
                            ) : ("Carregando Assentos...")}
                    </div>

                    <div className="seatsExamples">
                        <div className="exampleContainer">
                            <div className="seatButton seatSelected"></div>
                            <span>Selecionado</span>
                        </div>
                        <div className="exampleContainer">
                            <div className="seatButton seatAvailable"></div>
                            <span>Disponível</span>
                        </div>
                        <div className="exampleContainer">
                            <div className="seatButton seatNotAvailable"></div>
                            <span>Indisponível</span>
                        </div>
                        
                    </div>
                </div>

                <BuyerForm />

            </div>

            

            {seatsObj.movie ? (
                <div className="footer">
                    <div className="filmPosterFooter">
                        <img src={seatsObj.movie.posterURL} alt=""/>
                    </div>
                    <div className="infosContainer">
                        <span>{seatsObj.movie.title}</span>
                        <span>{`${seatsObj.day.weekday} - ${seatsObj.name}`}</span>
                    </div>
                </div>
            ) : ("Carregando Informações...")}

        </>
    )
}