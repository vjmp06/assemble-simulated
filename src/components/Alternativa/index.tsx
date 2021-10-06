import { useState } from "react";

export type Props = {
    questao: string;
    numero: string;
    opcao: string;
    resposta: string;
}

const Alternativa = ({questao, numero, opcao, resposta}: Props) => {
    if (questao === numero) {
        return <div className="alternativa">
        <input 
            type="radio" 
            name={questao} 
            id={opcao}           
        />
        <label htmlFor={opcao}>{resposta}</label>
    </div>;
    }
    return <></>;
    
}

export default Alternativa;