import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';



function MapOfSeats ({isAvailable, seatName, idSeat, seatsObj, setSeatsObj, seatsSelected, setSeatsSelected}) { 
    
    function markSeat (idSeat) {
        const aux = seatsObj;
        const temp = {seatsId:[], seatsName:[]};
        for (let i = 0 ; i < aux.seats.length; i++) {
            if (idSeat === aux.seats[i].id) {
                if (aux.seats[i].isAvailable === "Selected") {
                    aux.seats[i].isAvailable = true;
                } else {
                    aux.seats[i].isAvailable = "Selected";
                }
            }

            if (aux.seats[i].isAvailable === "Selected") {
                temp.seatsId.push(aux.seats[i].id);
                temp.seatsName.push(aux.seats[i].name)
            }
        }
        setSeatsObj({...aux});
        setSeatsSelected({...temp});
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



function BuyerForm ({ seatsSelected, seatsObj, setRequestInfos }) {
    
    const [buyerName, setBuyerName] = useState("");
    const [buyerCpf, setBuyerCpf] = useState("");
    const navigate = useNavigate();

    const cpfMask = value => {
        return value
          .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
          .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})/, '$1-$2')
          .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
      }


    function reserveSeats (event) {
        event.preventDefault();

        if (buyerCpf.length !== 14) {
            alert("CPF inválido");
        } else {

            const seatsSelectedObj = {
                ids: seatsSelected.seatsId,
                name: buyerName,
                cpf: buyerCpf,
            }
    
            const request = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", seatsSelectedObj);
    
            request
                .then((res) => {
                    navigate("/sucesso")})
            ;
            
    
            setRequestInfos({
                filmName: `${seatsObj.movie.title}`,
                day: `${seatsObj.day.date}`,
                schedule: `${seatsObj.name}`,
                buyerName,
                buyerCpf,
                ...seatsSelected
            });
        }

    }
    
    return (
        <form onSubmit={reserveSeats}>
            <label htmlFor="buyerName">Nome do comprador:</label>
            <input 
                id="buyerName" 
                placeholder="Digite seu nome..." 
                onChange={e => setBuyerName(e.target.value)} 
                value={buyerName}
                type="text"
                required
            />
            <label htmlFor="buyerCpf">CPF do comprador:</label>
            <input 
                id="buyerCpf" 
                placeholder="Digite seu CPF..." 
                onChange={e => setBuyerCpf(cpfMask(e.target.value))} 
                value={buyerCpf}
                type="text"
                required
            />
            <button type="submit">{`Reservar assento(s)`}</button>
        </form>
    )
}




export default function SelectSeat({ setRequestInfos }) {
    
    const { idSessao } = useParams();
    
    const [seatsObj, setSeatsObj] = useState({});

    const [seatsSelected, setSeatsSelected] = useState({});

	useEffect(() => {
		const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);
        
		promise.then(response => {
			setSeatsObj(response.data);
		});

        promise.catch(erro => console.log("Status code:" + erro.response.status))
        
	}, []);
    
    
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
                                        seatsSelected={seatsSelected}
                                        setSeatsSelected={setSeatsSelected}
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

                <BuyerForm seatsSelected={seatsSelected} seatsObj={seatsObj} setRequestInfos={setRequestInfos}/>

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