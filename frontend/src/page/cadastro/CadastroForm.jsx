import React, { useState } from 'react';
import {
  FormArea,
  InputWrapper,
  InputIconBox,
  InputIcon,
  CustomInput,
  InputAction,
  CustomButton,
  CustomButtonText,
} from './styled';

import userIcon from '../../components/assets/icons8-user-96.png';
import lockIcon from '../../components/assets/icons8-trancar-250.png';
import eyeIcon from '../../components/assets/icons8-closed-eyes-96.png';
import mensagemIcon from '../../components/assets/icons8-mensagem-100.png';

function CadastroForm({ onSubmit }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ nome, email, senha, confirmarSenha });
  };

  return (
    <FormArea onSubmit={handleSubmit}>
      <InputWrapper>
        <InputIconBox>
          <InputIcon src={userIcon} alt="Nome" />
        </InputIconBox>
        <CustomInput
          type="text"
          placeholder="NOME"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </InputWrapper>

      <InputWrapper>
        <InputIconBox>
          <InputIcon src={mensagemIcon} alt="E-mail" />
        </InputIconBox>
        <CustomInput
          type="email"
          placeholder="E-MAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </InputWrapper>

      <InputWrapper>
        <InputIconBox>
          <InputIcon src={lockIcon} alt="Senha" />
        </InputIconBox>
        <CustomInput
          type={mostrarSenha ? 'text' : 'password'}
          placeholder="SENHA"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <InputAction type="button" onClick={() => setMostrarSenha(!mostrarSenha)}>
          <InputIcon src={eyeIcon} alt={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'} />
        </InputAction>
      </InputWrapper>

      <InputWrapper>
        <InputIconBox>
          <InputIcon src={lockIcon} alt="Confirmar senha" />
        </InputIconBox>
        <CustomInput
          type={mostrarSenha ? 'text' : 'password'}
          placeholder="CONFIRMAR SENHA"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />
      </InputWrapper>

      <CustomButton type="submit">
        <CustomButtonText>CADASTRAR</CustomButtonText>
      </CustomButton>
    </FormArea>
  );
}

export default CadastroForm;
