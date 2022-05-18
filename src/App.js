import { BrowserRouter, Routes, Route } from "react-router-dom";

import Top from "./Top";
import SelectFilm from "./SelectFilm";
import SelectSession from "./SelectSession";
import SelectSeat from "./SelectSeat";
import SuccessfullSelection from "./SuccessfullSelection";


export default function App() {
    
    
    
    return (
        <BrowserRouter>
            <Top />
            <Routes>
                <Route path="/" element={<SelectFilm />} />
                <Route path="/sessoes/:idFilme" element={<SelectSession />} />
                <Route path="/assentos/:idSessao" element={<SelectSeat />} />
                <Route path="/sucesso" element={<SuccessfullSelection />} />
            </Routes>
        </BrowserRouter>
    )
}
