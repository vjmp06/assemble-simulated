import {useState} from 'react';
import CSVReader from 'react-csv-reader';
import Alternativa from './components/Alternativa';
import Questao from './components/Questao';
import convertePipeParaVirgula from './utils';

type CsvAlternativa = {
  numero: string;
  alternativa: string;
  resposta: string;
}

type CsvQuestao = {
  numero: string;
  pergunta: string;
  alternativaCorreta: string;
}

type NumeroEAlternativa = {
  numero: any;
  alternativa: string;
}

function App() {
  const [questoes, setQuestoes] = useState<CsvQuestao[]>();
  const [alternativas, setAlternativas] = useState<CsvAlternativa[]>();
  const handleForceQuestoes = (questoes: CsvQuestao[]) => setQuestoes(questoes);
  const handleForceAlternativas = (alternativas: CsvAlternativa[]) => setAlternativas (alternativas);

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  }

  function recuperaRespostasMarcadas(): NumeroEAlternativa[] {
    let respostasMarcadas: NumeroEAlternativa[] = [];
    document.querySelectorAll('input[type="radio"]:checked')
      .forEach(e => {
        respostasMarcadas.push({numero: e.getAttribute("name"), alternativa: e.id});
      }
    );
    return respostasMarcadas;
  }

  function recuperaRespostasCorretas(): NumeroEAlternativa[] {
    let respostasCorretas: NumeroEAlternativa[] = [];
    questoes?.forEach(e => {
        respostasCorretas.push({numero: e.numero, alternativa: e.alternativaCorreta});
      }
    );
    return respostasCorretas;
  }

  function corrigirQuestoes() {
    limparRespostasAntigas();
    const respostasMarcadas: NumeroEAlternativa[] = recuperaRespostasMarcadas();
    const respostasCorretas: NumeroEAlternativa[] = recuperaRespostasCorretas();

    let qtdRespostasCorretas: number = 0;
    let qtdRespostasIncorretas: number = 0;   
    for (let i = 0; i < respostasMarcadas.length; i++) {
      if(respostasMarcadas[i].alternativa === respostasCorretas[i].alternativa) {  
        document.querySelectorAll('div.alternativa input[type=radio]:checked')[i]?.parentElement?.classList.add("respostaCorreta");
        qtdRespostasCorretas++;
      } else {
        document.querySelectorAll('div.alternativa input[type=radio]:checked')[i]?.parentElement?.classList.add("respostaErrada");
        qtdRespostasIncorretas++;
      }
    }
    let resultado = document.getElementById("resultado");
    if(resultado != null) {
      resultado.innerHTML = "Quantidade respostas corretas " + qtdRespostasCorretas +"<br>"+
                            "Quantidade respostas incorretas " + qtdRespostasIncorretas + "<br>"+
                            "Porcentagem de acerto " + (qtdRespostasCorretas * 100/ respostasCorretas.length) + "%";
    }
  }

  function limparRespostasAntigas() {
    document.querySelectorAll('div.alternativa').forEach(element => {
      element.classList.remove("respostaCorreta");
      element.classList.remove("respostaErrada");
    });
  }

  return (
    <div className="container">
      <h1>Questões simulado</h1>
      <CSVReader
        cssClass="csv-reader-input"
        label="Inclua as questões"
        onFileLoaded={handleForceQuestoes}
        parserOptions={papaparseOptions}
      />

      <CSVReader
        cssClass="csv-reader-input"
        label="Inclua as alternativas"
        onFileLoaded={handleForceAlternativas}
        parserOptions={papaparseOptions}
      />
      {
        questoes?.map(questao => (
          <div>
            <Questao 
              numero={questao.numero} 
              pergunta={convertePipeParaVirgula(questao.pergunta)} 
              key ={questao.numero}></Questao>
            {alternativas?.map(alternativa => (
              <Alternativa key ={alternativa.alternativa}
                questao={questao.numero} 
                numero={alternativa.numero}
                opcao={alternativa.alternativa} 
                resposta={convertePipeParaVirgula(alternativa.resposta)}
                correta={questao.alternativaCorreta} />
            ))}
          </div>
        )
        )
      }
      <button type="button" onClick={corrigirQuestoes}>Concluir</button>
      <div id="resultado"></div>
    </div>
  );
}

export default App;
