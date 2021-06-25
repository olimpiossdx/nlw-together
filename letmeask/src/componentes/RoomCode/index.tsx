import { FC } from 'react'
import CopyImg from '../assets/images/copy.svg';
import './styles.scss';

type RoomCodeProps = {
  code: string;
};

const RoomCode: FC<RoomCodeProps> = ({ code }) => {
  const CopyRoomCodeToClipBoard = () => {
    navigator.clipboard.writeText(code);
  };

  return (<button className='room-code' onClick={CopyRoomCodeToClipBoard}>
    <div>
      <img src={CopyImg} alt='copy' />
    </div>
    <span>sala #{code}</span>
  </button>);
};

export default RoomCode
