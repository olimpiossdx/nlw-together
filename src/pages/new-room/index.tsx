import React, { FormEvent, useState } from 'react';

import LogoIcon from '../../assets/images/logo.svg';
import Illusration from '../../assets/images/illustration.svg';

import './styles.scss';
import { useHistory, Link } from 'react-router-dom';
import Button from '../../componentes/Button';

import { database } from '../../Services/firebase';
import { useAuth } from '../../hooks/useAuth/useAuth';

const NewRoom: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('')

  const handleCreateRoomAsync = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    };

    const roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({ titulo: newRoom, authorId: user?.id });
    history.push(`/rooms/${firebaseRoom.key}`);
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
        <h2>Criar uma nova Sala</h2>
        <div className='separator'> ou entre em uma sala </div>
        <form onSubmit={handleCreateRoomAsync}>
          <input type="text" placeholder='Nome da sala' value={newRoom} onChange={e => setNewRoom(e.target.value)} />
          <Button type='submit'>
            Criar sala
          </Button>
        </form>
        <p>Quer entrar em uma sala existente? <Link to="/" >clique aqui</Link> </p>
      </div>
    </main>
  </div>);
};

export default NewRoom;
