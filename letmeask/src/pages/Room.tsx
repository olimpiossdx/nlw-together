import { useEffect } from 'react';
import { FC, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import LogoImg from '../assets/images/logo.svg';
import Button from '../componentes/Button';
import RoomCode from '../componentes/RoomCode';
import { useAuth } from '../hooks/ useAuth';
import { database } from '../Services/firebase';
import '../styles/room.scss';

type RoomParms = {
  id: string;
};

type FirebaseQuestions = Record<string, {
  content: string;
  author: {
    nome: string;
    avatar: string;
  },
  isHighLighted: boolean;
  isAnswered: boolean;
}>

type Question = {
  id: string;
  content: string;
  author: {
    nome: string;
    avatar: string,
  };
  isHighLighted: boolean;
  isAnswered: boolean;
};

const Room: FC = () => {
  const { user } = useAuth();
  const params = useParams<RoomParms>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    roomRef.on('value', (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered
        }
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

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

      {JSON.stringify(questions)}
    </main>
  </div >)
}

export default Room
