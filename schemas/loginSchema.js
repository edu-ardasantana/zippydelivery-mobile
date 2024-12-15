import * as Yup from 'yup';

const schema = Yup.object({
  email: Yup.string()
    .email('Email inválido')
    .required('O email é obrigatório'),
  senha: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('A senha é obrigatória'),
});

export default schema;
