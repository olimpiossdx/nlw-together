import React from 'react';

import LogoIcon from '../assets/images/logo.svg';
import Illusration from '../assets/images/illustration.svg';
import GoogleIcon from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

const Home: React.FC = () => {
  return (
    <div id='page-auth'>
      <aside>
        <img src={Illusration} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&am;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={LogoIcon} alt="letmeask" />
          <button>
            <img src={GoogleIcon} alt="logo da Google" />
            Crie sua sala com Google
          </button>
        </div>
        <div>          ou entre em uma sala        </div>
        <form >
          <input type="text" placeholder='Digite o código da sala' />
          <button type='submit'>
            Entrar na sala
          </button>
        </form>
      </main>
    </div>
  )
}

export default Home;
