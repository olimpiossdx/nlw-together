import { FC } from 'react'
import './styles.scss';

type QuestionProps = {
  content: string;
  author: {
    nome: string;
    avatar: string;
  }
};

const Question: FC<QuestionProps> = ({ children,content, author }) => {
  return (<div className='question'>
    <p>{content}</p>
    <footer>
      <div className='user-info'>
        <img src={author.avatar} alt={author.nome} />
        <span>{author.nome}</span>
      </div>
      <div>
        {children}
      </div>
    </footer>
  </div>);
};

export default Question;
