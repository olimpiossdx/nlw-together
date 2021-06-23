import React from 'react';

import LogoIcon from '../assets/images/logo.svg';
import Illusration from '../assets/images/illustration.svg';

import '../styles/auth.scss';
import Button from '../componentes/Button';
import { Link } from 'react-router-dom';

const NewRoom: React.FC = () => {
  // const { user } = useContext(AuthContext);

  return (
    <div id='page-auth'>
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
          <form >
            <input type="text" placeholder='Nome da sala' />
            <Button type='submit'>
              Criar sala
            </Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/" >clique aqui</Link> </p>
        </div>
      </main>
    </div>
  )
}

export default NewRoom;
