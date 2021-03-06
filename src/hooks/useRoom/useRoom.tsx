import { useEffect, useState } from 'react'
import { database } from '../../Services/firebase';
import { useAuth } from '../useAuth/useAuth';

type FirebaseQuestions = Record<string, {
  content: string;
  author: {
    nome: string;
    avatar: string;
  },
  isHighLighted: boolean;
  isAnswered: boolean;
  likes: Record<string, {
    authorId: string
  }>;
}>

type QuestionType = {
  id: string;
  content: string;
  author: {
    nome: string;
    avatar: string,
  };
  isHighLighted: boolean;
  isAnswered: boolean;
  likeCount: number;
  likeId: string | undefined;
};


const useRoom = (roomId: string) => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    roomRef.on('value', (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
        }
      });

      setTitle(databaseRoom.titulo);
      setQuestions(parsedQuestions);
    });

    return () => {
      roomRef.off('value');
    };
  }, [roomId, user]);

  return { questions, title };
};

export default useRoom;
