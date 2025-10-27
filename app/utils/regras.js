export default {
    requerido: (mensagem) => {
        return (valor) => {
            return !!valor || mensagem || 'Este campo é obrigatório.'
        }
    }
}