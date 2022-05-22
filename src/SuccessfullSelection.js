import { useNavigate } from "react-router-dom";


export default function SuccessfullSelection({ requestInfos }) {

    const navigate = useNavigate();
    
    return (
        
        <div className="pageContainer">
            <div className="successfullContainer">
                <div className="pageTitle">
                    <span className="successfullTitle">Pedido feito com sucesso!</span>
                </div>
                <div className="infoContainer">
                    <span className="infoTitle">Filme e sessão</span>
                    <span className="info">{requestInfos.filmName}</span>
                    <span className="info">{`${requestInfos.day} ${requestInfos.schedule}`}</span>
                </div>
                <div className="infoContainer">
                    <span className="infoTitle">Ingressos</span>
                    {requestInfos.seatsName.map((seatName) => <span className="info">{`Assento ${seatName}`}</span> )}
                </div>
                <div className="infoContainer">
                    <span className="infoTitle">Comprador</span>
                    <span className="info">{`Nome: ${requestInfos.buyerName}`}</span>
                    <span className="info">{`CPF: ${requestInfos.buyerCpf}`}</span>
                </div>
            </div>

            <button className="successButton" onClick={() => navigate("/")}>Voltar para home</button>
           
        </div>
    )
}