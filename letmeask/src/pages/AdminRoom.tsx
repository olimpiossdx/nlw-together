import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import LogoImg from '../assets/images/logo.svg';
import Button from '../componentes/Button';
import Question from '../componentes/Question/Question';
import RoomCode from '../componentes/RoomCode';
import { useAuth } from '../hooks/ useAuth';
import useRoom from '../hooks/useRoom';
import { database } from '../Services/firebase';
import '../styles/room.scss';
import DeleteIcon from '../assets/images/delete.svg';
import CheckIcon from '../assets/images/check.svg';
import AnswerIcon from '../assets/images/answer.svg';

type AdminRoomParms = {
  id: string;
};

const AdminRoom: FC = () => {
  const history = useHistory();
  // const { user } = useAuth();
  const params = useParams<AdminRoomParms>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);

  const hanldeEndRoom = async () => {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    });

    history.push('/');
  };

  const handleCheck0QuestionAsAnsweredAsync = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    });
  };

  const handleHighLightQuestionAsync = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: true
    });
  };

  const handleDeleteQuestionAsync = async (questionId: string) => {
    //TODO: pesquisar sobre o react-modal no reactjs
    if (window.confirm('Tem certeza que você desejs excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    };
  };


  return (<div id='page-room'>
    <header>
      <div className='content'>
        <img src={LogoImg} alt='letmeask' />
        <div>
          <RoomCode code={roomId} />
          <Button isOutlined onClick={hanldeEndRoom}>Encerrar sala</Button>
        </div>
      </div>
    </header>

    <main className='content'>
      <div className='room-title'>
        <h1> Sala {title}</h1>
        {questions.length > 0 && <span>{questions.length} pergunta(s).</span>}
      </div>

      <div className='questions-list'>
        {questions.map(question => <Question key={question.id} content={question.content} author={question.author} >

          <button type='button' onClick={() => handleCheck0QuestionAsAnsweredAsync(question.id)}>
            <img src={CheckIcon} alt='Marca pergunta como responida' />
          </button>

          <button type='button' onClick={() => handleHighLightQuestionAsync(question.id)}>
            <img src={AnswerIcon} alt='Dar destaque à pergunta' />
          </button>

          <button type='button' onClick={() => handleDeleteQuestionAsync(question.id)}>
            <img src={DeleteIcon} alt='remover pergunta' />
          </button>

        </Question>)}
      </div>
    </main>
  </div >)
}

export default AdminRoom
