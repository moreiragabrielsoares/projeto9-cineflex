import { Link } from "react-router-dom";


export default function SelectFilm() {
    return (
        <>
            <Link to="/sessoes">
                <div>SELECTFILM 1</div>
            </Link>
            <Link to="/sessoes">
                <div>SELECTFILM 2</div>
            </Link>
            <Link to="/sessoes">
                <div>SELECTFILM 3</div>
            </Link>

        </>
        
    )
}