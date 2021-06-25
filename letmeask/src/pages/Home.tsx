import React, { FormEvent, useState } from 'react';
import LogoIcon from '../assets/images/logo.svg';
import Illusration from '../assets/images/illustration.svg';
import GoogleIcon from '../assets/images/google-icon.svg';

import Button from '../componentes/Button';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/ useAuth';

import '../styles/auth.scss';
import { database } from '../Services/firebase';

const Home: React.FC = () => {
  const history = useHistory();
  const { user, SignInWithGoogleAsync } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  const hanldeCreateRoomAsync = async () => {
    if (!user) {
      await SignInWithGoogleAsync();
    };

    history.push('/rooms/new');
  };

  const handleJoinRoomAsync = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    };

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    };

    if (roomRef.val().endedAt) {
      alert('Room already closed.');
      return;
    };

    history.push(`/rooms/${roomCode}`);
  };

  return (<div id='page-auth'>
    <aside>
      <img src={Illusration} alt="Ilustração simbolizando perguntas e respostas" />
      <strong>Crie salas de Q&amp;A ao-vivo</strong>
      <p>Tire as dúvidas da sua audiência em tempo-real</p>
    </aside>
    <main>
      <div className='main-content'>
        <img src={LogoIcon} alt="letmeask" />
        <button className='create-room' onClick={hanldeCreateRoomAsync}>
          <img src={GoogleIcon} alt="logo da Google" />
          Crie sua sala com Google
        </button>
        <div className='separator'> ou entre em uma sala </div>
        <form onSubmit={handleJoinRoomAsync}>
          <input type="text" placeholder='Digite o código da sala' value={roomCode} onChange={(e) => { setRoomCode(e.target.value) }} />
          <Button type='submit'>
            Entrar na sala
          </Button>
        </form>
      </div>
    </main>
  </div>);
};

export default Home;
