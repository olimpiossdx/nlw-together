import { FC } from 'react'
import './styles.scss';
import cx from 'classnames';

type QuestionProps = {
  content: string;
  author: {
    nome: string;
    avatar: string;
  };
  isAnswered?: boolean;
  isHighLighted?: boolean;
};

const Question: FC<QuestionProps> = ({ children, content, author, isAnswered = false, isHighLighted = false }) => {
  return (<div className={`question ${isAnswered ? 'answered' : ''} ${isHighLighted ? 'highLighted' : ''}`}>
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
