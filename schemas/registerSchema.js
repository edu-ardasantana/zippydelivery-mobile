import * as yup from "yup";

export const schema = yup.object({
  nome: yup.string().required("Nome é obrigatório").min(3, "Nome muito curto"),
  cpf: yup.string().required("CPF é obrigatório").length(14, "CPF inválido"),
  email: yup
    .string()
    .required("Email é obrigatório")
    .email("Email inválido"),
  senha: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
}).required();