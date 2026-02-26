import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PageWrapper,
  BgImage,
  CardWrapper,
  Logo,
  CadastroCard,
  LeftPanel,
  LeftPanelTop,
  LeftPanelTitle,
  LeftPanelSubtitle,
  ToggleButton,
  RightPanel,
  RightPanelHeader,
  RightPanelTitle,
  LoginTab,
  CustomButtonSecondary,
} from './styled';

import CadastroForm from './CadastroForm';
import dadosIcon from '../../components/assets/icons8-dados-em-ambas-as-direções.png';

function Cadastro() {
  const navigate = useNavigate();

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
        <CadastroCard>
          <LeftPanel>
            <LeftPanelTop>
              <LeftPanelTitle>BEM VINDO</LeftPanelTitle>
              <LeftPanelSubtitle>
                <span>NOVO LOGIN</span>
              </LeftPanelSubtitle>
            </LeftPanelTop>
            <CustomButtonSecondary as={Link} to="/login">
              JÁ TENHO CONTA
            </CustomButtonSecondary>
          </LeftPanel>

          <ToggleButton
            type="button"
            aria-label="Ir para Login"
            onClick={() => navigate('/login')}
          >
            <img src={dadosIcon} alt="" />
          </ToggleButton>

          <RightPanel>
            <RightPanelHeader>
              <RightPanelTitle>CRIAR CONTA</RightPanelTitle>
              <LoginTab>CADASTRO</LoginTab>
            </RightPanelHeader>

            <CadastroForm onSubmit={handleSubmitCadastro} />
          </RightPanel>
        </CadastroCard>
      </CardWrapper>
    </PageWrapper>
  );
}

export default Cadastro;
