import { FC } from 'react'
import './styles.scss';

type QuestionProps = {
  content: string;
  author: {
    nome: string;
    avatar: string;
  }
};

const Question: FC<QuestionProps> = ({ content, author }) => {
  return (<div className='questions'>
    <p>{content}</p>
    <footer>
      <div className="user-info">
        <img src={author.avatar} alt={author.nome} />
        <span>{author.nome}</span>
      </div>
      <div></div>
    </footer>
  </div>);
};

export default Question;
