import { FC, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import LogoImg from '../assets/images/logo.svg';
import Button from '../componentes/Button';
import Question from '../componentes/Question/Question';
import RoomCode from '../componentes/RoomCode';
import { useAuth } from '../hooks/ useAuth';
import useRoom from '../hooks/useRoom';
import { database } from '../Services/firebase';
import '../styles/room.scss';

type RoomParms = {
  id: string;
};

const Room: FC = () => {
  const { user } = useAuth();
  const params = useParams<RoomParms>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  const [newQuestion, setNewQuestion] = useState('');

  const handleSendQuestionAsync = async (envet: FormEvent) => {
    envet.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    };

    if (!user) {
      //TODO: ADICIONAR LIB react hot-toast - toast('You must be logged int')
      // throw new Error('You must be logged int');
      toast('You must be logged int');
      return;
    };

    const question = {
      content: newQuestion,
      author: {
        nome: user.name,
        avatar: user.avatar
      },
      isHighLighted: false,
      isAnswered: false
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  };

  return (<div id='page-room'>
    <header>
      <div className='content'>
        <img src={LogoImg} alt='letmeask' />
        <RoomCode code={roomId} />
      </div>
    </header>

    <main className="content">
      <div className='room-title'>
        <h1> Sala {title}</h1>
        {questions.length > 0 && <span>{questions.length} pergunta(s).</span>}
      </div>

      <form onSubmit={handleSendQuestionAsync}>
        <textarea placeholder='O que você quer perguntar?' value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />

        <div className='form-footer'>
          {user ? (<div className="user-info">
            <img src={user.avatar} alt={user.name} />
            <span>{user.name}</span>
          </div>) :
            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>}

          <Button type='submit' disabled={!user}>Enviar pergunta</Button>
        </div>
      </form>
      <div className="questions-list">
        {questions.map(question => <Question key={question.id} content={question.content} author={question.author} />)}
      </div>
    </main>
  </div >)
}

export default Room
