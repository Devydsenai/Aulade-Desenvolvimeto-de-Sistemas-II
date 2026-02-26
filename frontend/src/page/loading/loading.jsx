import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrapper, VideoBackdrop, Container, LoadingIcon, SoundBtn } from './styled';
import LoadingSpinner from '../../components/spinners/LoadingSpinner';

function Loading() {
  const navigate = useNavigate();
  const [muted, setMuted] = useState(true);

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <Wrapper>
      <VideoBackdrop
        autoPlay
        muted={muted}
        playsInline
        onEnded={goToLogin}
        onError={goToLogin}
        src="/videos/JBMoto.mp4"
      />
      <SoundBtn onClick={() => setMuted(false)} title="Ativar som">
        {muted ? '🔇' : '🔊'}
      </SoundBtn>
      <Container>
        <LoadingIcon>
          <LoadingSpinner />
        </LoadingIcon>
      </Container>
    </Wrapper>
  );
}

export default Loading;
