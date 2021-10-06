import { useState } from "react";

export type Props = {
    questao: string;
    numero: string;
    opcao: string;
    resposta: string;
    correta: string;
}

function estaCorreta(opcao: string, correta: string): boolean {
    if (opcao === correta) {
        return true;
    } else {
        return false;
    }
}

const Alternativa = ({questao, numero, opcao, resposta, correta}: Props) => {
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