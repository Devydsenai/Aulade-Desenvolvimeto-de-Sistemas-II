import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${(p) => p.theme.colors.lilac};
  overflow-x: hidden;
  padding: 24px;
  box-sizing: border-box;
`;

export const BgImage = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: min(982px, 100vw);
  height: min(1080px, 120vh);
  overflow: hidden;
  filter: blur(3px);
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left center;
  }

  @media (max-width: 900px) {
    width: 100%;
    height: 100%;
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1294px;
`;

export const Logo = styled.h1`
  margin: 0 0 16px 0;
  align-self: flex-start;
  font-size: clamp(28px, 5vw, 42px);
  font-weight: bold;
  letter-spacing: 2px;
  background: linear-gradient(135deg, ${(p) => p.theme.colors.dark}, ${(p) => p.theme.colors.purple});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const LoginCard = styled.div`
  display: flex;
  width: 100%;
  max-width: 1294px;
  height: auto;
  min-height: 500px;
  max-height: 90vh;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(215, 205, 232, 0.6);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
  flex-direction: column;

  @media (min-width: 900px) {
    flex-direction: row;
    height: min(728px, 85vh);
    min-height: 600px;
    border-radius: 30px;
  }
`;

export const LeftPanel = styled.div`
  display: none;
  width: 428px;
  flex-shrink: 0;
  background: #B9A7C9;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 48px 32px;

  @media (min-width: 900px) {
    display: flex;
  }
`;

export const LeftPanelTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const LeftPanelTitle = styled.h2`
  font-size: clamp(28px, 4vw, 38px);
  font-weight: 600;
  color: ${(p) => p.theme.colors.dark};
  margin: 0 0 12px 0;
  letter-spacing: 1px;
`;

export const LeftPanelSubtitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 48px;

  span {
    font-size: clamp(22px, 3vw, 28px);
    color: ${(p) => p.theme.colors.dark};
    font-weight: 500;
    letter-spacing: 1px;
  }

  @media (max-width: 899px) {
    display: none;
  }
`;

export const ToggleButton = styled.button`
  position: absolute;
  left: 428px;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
  border-radius: 50%;
  border: none;
  background: ${(p) => p.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  z-index: 10;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);

  img {
    width: 24px;
    height: 24px;
    opacity: 0.85;
  }

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 899px) {
    display: none;
  }
`;

export const RightPanel = styled.div`
  flex: 1;
  min-width: 0;
  background: ${(p) => p.theme.colors.lilac};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 20px;
  position: relative;

  @media (min-width: 600px) {
    padding: 48px 40px;
  }
`;

export const RightPanelHeader = styled.div`
  position: absolute;
  top: 24px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (min-width: 600px) {
    top: 48px;
    left: 40px;
    right: 40px;
  }
`;

export const RightPanelTitle = styled.h2`
  font-size: clamp(20px, 4vw, 28px);
  font-weight: 600;
  color: ${(p) => p.theme.colors.dark};
  margin: 0;
  letter-spacing: 1px;
`;

export const LoginTab = styled.span`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${(p) => p.theme.colors.white};
  font-size: clamp(12px, 2vw, 14px);
  font-weight: 600;
  color: ${(p) => p.theme.colors.dark};
  letter-spacing: 1px;
  flex-shrink: 0;
`;

export const FormArea = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 450px;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 450px;
  height: 56px;
  min-height: 56px;
  border-radius: 56px;
  border: 1px solid ${(p) => p.theme.colors.gray400};
  background: ${(p) => p.theme.colors.white};
  padding: 0 16px 0 0;
  overflow: hidden;
  box-sizing: border-box;

  @media (min-width: 600px) {
    height: 65px;
    min-height: 65px;
    border-radius: 65px;
  }
`;

export const InputIconBox = styled.div`
  width: 48px;
  min-width: 48px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${(p) => p.theme.colors.gray300};

  @media (min-width: 600px) {
    width: 56px;
    min-width: 56px;
  }
`;

export const InputIcon = styled.img`
  width: 24px;
  height: 24px;
  opacity: 0.7;

  @media (min-width: 600px) {
    width: 28px;
    height: 28px;
  }
`;

export const CustomInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 100%;
  border: none;
  padding: 0 12px;
  font-size: clamp(14px, 2vw, 16px);
  color: ${(p) => p.theme.colors.dark};
  background: transparent;

  &::placeholder {
    color: ${(p) => p.theme.colors.gray500};
  }

  &:focus {
    outline: none;
  }
`;

export const InputAction = styled.button`
  width: 44px;
  min-width: 44px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const FormExtras = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: -4px;
  flex-wrap: wrap;
  gap: 8px;
`;

export const RememberBox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: clamp(12px, 2vw, 14px);
  color: ${(p) => p.theme.colors.gray600};
  cursor: pointer;

  input {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
`;

export const ForgotLink = styled(Link)`
  font-size: clamp(12px, 2vw, 14px);
  color: ${(p) => p.theme.colors.dark};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const CustomButton = styled.button`
  width: 100%;
  max-width: 286px;
  height: 56px;
  background-color: ${(p) => p.theme.colors.dark};
  border-radius: 28px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: clamp(16px, 2vw, 18px);
  font-weight: 600;
  color: #fff;
  letter-spacing: 1px;
  margin-top: 8px;

  &:hover {
    opacity: 0.9;
  }

  @media (min-width: 600px) {
    height: 65px;
    border-radius: 30px;
  }
`;

export const CustomButtonText = styled.span`
  font-size: inherit;
  color: #fff;
`;

export const CustomButtonSecondary = styled.button`
  width: 100%;
  max-width: 264px;
  height: 56px;
  background: rgba(215, 205, 232, 0.6);
  border: none;
  border-radius: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: clamp(14px, 2vw, 16px);
  font-weight: 600;
  color: ${(p) => p.theme.colors.gray600};
  letter-spacing: 1px;
  text-decoration: underline;

  &:hover {
    background: rgba(215, 205, 232, 0.75);
  }

  @media (min-width: 600px) {
    height: 65px;
    border-radius: 30px;
  }
`;
