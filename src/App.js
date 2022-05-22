import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from 'react';

import Top from "./Top";
import SelectFilm from "./SelectFilm";
import SelectSession from "./SelectSession";
import SelectSeat from "./SelectSeat";
import SuccessfullSelection from "./SuccessfullSelection";


export default function App() {
    
     const [requestInfos, setRequestInfos] = useState({});

    return (
        <BrowserRouter>
            <Top />
            <Routes>
                <Route path="/" element={<SelectFilm />} />
                <Route path="/sessoes/:idFilme" element={<SelectSession />} />
                <Route path="/assentos/:idSessao" element={<SelectSeat setRequestInfos={setRequestInfos}/>} />
                <Route path="/sucesso" element={<SuccessfullSelection requestInfos={requestInfos}/>} />
            </Routes>
        </BrowserRouter>
    )
}
