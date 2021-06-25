import { FC, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './styles.scss';
import LogoImg from '../../assets/images/logo.svg';
import DeleteIcon from '../../assets/images/delete.svg';
import CheckIcon from '../../assets/images/check.svg';
import AnswerIcon from '../../assets/images/answer.svg';

import Button from '../../componentes/Button';
import Modal from '../../componentes/Modal';
import Question from '../../componentes/Question/Question';
import RoomCode from '../../componentes/RoomCode';
import useRoom from '../../hooks/useRoom/useRoom';
import { database } from '../../Services/firebase';

type AdminRoomParms = {
  id: string;
};

const AdminRoom: FC = () => {
  const history = useHistory();
  const params = useParams<AdminRoomParms>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  const [showModal, setshowModal] = useState(false);
  const [questionId, setQuestionId] = useState('');

  const handleShowModal = () => {
    setshowModal(!showModal);
  };

  const hanldeEndRoom = async () => {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    });

    history.push('/');
  };

  const handleCheckQuestionAsAnsweredAsync = async (questionId: string) => {
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
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    setQuestionId('');
  };

  const handleDelete = (questionId: string) => {
    handleShowModal();
    setQuestionId(questionId);
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

    <Modal
      isOpen={showModal}
      onRequestClose={handleShowModal}
      onConfirm={() => handleDeleteQuestionAsync(questionId)}
      title='Encerrar sala' buttonText='modal'
      contentLabel='teste'
      buttonTitleConfirm='Sim, encerrar' >
      Tem certeza que você desejs excluir esta pergunta?
    </Modal>
    <main className='content'>
      <div className='room-title'>
        <h1> Sala {title}</h1>
        {questions.length > 0 && <span>{questions.length} pergunta(s).</span>}
      </div>
      <div className='questions-list'>
        {questions.map(question => <Question key={question.id} content={question.content} author={question.author}
          isAnswered={question.isAnswered} isHighLighted={question.isHighLighted}>
          {!question.isAnswered && (<>
            <button type='button' onClick={() => handleCheckQuestionAsAnsweredAsync(question.id)}>
              <img src={CheckIcon} alt='Marca pergunta como responida' />
            </button>
            <button type='button' onClick={() => handleHighLightQuestionAsync(question.id)}>
              <img src={AnswerIcon} alt='Dar destaque à pergunta' />
            </button>
          </>)}
          <button type='button' onClick={() => handleDelete(question.id)}>
            <img src={DeleteIcon} alt='remover pergunta' />
          </button>
        </Question>)}
      </div>
    </main>
  </div >);
};

export default AdminRoom
