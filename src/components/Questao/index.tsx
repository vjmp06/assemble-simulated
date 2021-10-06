export type Props = {
    numero: string;
    pergunta: string;
}

const Questao = ({numero, pergunta}: Props) => {
    return (
        <div id={numero}>
            Questão {numero} :  {pergunta}
        </div>
    )
}

export default Questao;