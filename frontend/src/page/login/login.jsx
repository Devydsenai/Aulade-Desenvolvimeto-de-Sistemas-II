import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PageWrapper,
  BgImage,
  CardWrapper,
  Logo,
  LoginCard,
  LeftPanel,
  LeftPanelTop,
  LeftPanelTitle,
  LeftPanelSubtitle,
  ToggleButton,
  RightPanel,
  RightPanelHeader,
  RightPanelTitle,
  LoginTab,
  FormArea,
  InputWrapper,
  InputIconBox,
  InputIcon,
  CustomInput,
  InputAction,
  FormExtras,
  RememberBox,
  ForgotLink,
  CustomButton,
  CustomButtonText,
  CustomButtonSecondary,
} from './styled';

import userIcon from '../../components/assets/icons8-user-96.png';
import lockIcon from '../../components/assets/icons8-trancar-250.png';
import eyeIcon from '../../components/assets/icons8-closed-eyes-96.png';
import dadosIcon from '../../components/assets/icons8-dados-em-ambas-as-direções.png';

import CadastroForm from '../cadastro/CadastroForm';
function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const [modoCadastro, setModoCadastro] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSubmitCadastro = (data) => {
    console.log('Cadastro:', data);
  };

  return (
    <PageWrapper>
      <BgImage>
        <img src="/images/login-bg.jpg" alt="JB Motos" />
      </BgImage>

      <CardWrapper>
        <Logo>JBMOTOS</Logo>
        <LoginCard>
        <LeftPanel>
          <LeftPanelTop>
            <LeftPanelTitle>BEM VINDO</LeftPanelTitle>
            <LeftPanelSubtitle>
              <span>NOVO LOGIN</span>
            </LeftPanelSubtitle>
          </LeftPanelTop>
          <CustomButtonSecondary as={Link} to="/cadastro">
            CRIA CONTA
          </CustomButtonSecondary>
        </LeftPanel>

        <ToggleButton
          type="button"
          aria-label="Alternar entre Login e Cadastro"
          onClick={() => setModoCadastro((prev) => !prev)}
        >
          <img src={dadosIcon} alt="" />
        </ToggleButton>

        <RightPanel>
          <RightPanelHeader>
            <RightPanelTitle>{modoCadastro ? 'CRIAR CONTA' : 'FAÇA LOGIN'}</RightPanelTitle>
            <LoginTab>{modoCadastro ? 'CADASTRO' : 'LOGIN'}</LoginTab>
          </RightPanelHeader>

          {modoCadastro ? (
            <CadastroForm onSubmit={handleSubmitCadastro} />
          ) : (
          <FormArea onSubmit={handleSubmit}>
            <InputWrapper>
              <InputIconBox>
                <InputIcon src={userIcon} alt="Usuário" />
              </InputIconBox>
              <CustomInput
                type="text"
                placeholder="USUARIO"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </InputWrapper>

            <InputWrapper>
              <InputIconBox>
                <InputIcon src={lockIcon} alt="Senha" />
              </InputIconBox>
              <CustomInput
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <InputAction type="button" onClick={() => setMostrarSenha(!mostrarSenha)}>
                <InputIcon src={eyeIcon} alt={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'} />
              </InputAction>
            </InputWrapper>

            <FormExtras>
              <RememberBox>
                <input
                  type="checkbox"
                  checked={lembrar}
                  onChange={(e) => setLembrar(e.target.checked)}
                />
                Lembra
              </RememberBox>
              <ForgotLink to="/esqueci-senha">Esqueci a senha?</ForgotLink>
            </FormExtras>

            <CustomButton type="submit">
              <CustomButtonText>ENTRAR</CustomButtonText>
            </CustomButton>
          </FormArea>
          )}
        </RightPanel>
      </LoginCard>
      </CardWrapper>
    </PageWrapper>
  );
}

export default Login;
