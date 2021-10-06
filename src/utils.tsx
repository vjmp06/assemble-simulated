export default function convertePipeParaVirgula(dados: string): string {
    return dados != null && dados !== undefined ? dados.replaceAll('|',','): '';
}