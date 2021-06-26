import { FC } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import CopyImg from '../../assets/images/copy.svg';
import './styles.scss';

type RoomCodeProps = {
  code: string;
};

const RoomCode: FC<RoomCodeProps> = ({ code }) => {
  const CopyRoomCodeToClipBoard = () => {
    toast.success('Copied!');
    navigator.clipboard.writeText(code);
  };

  return (<>
    <div><Toaster /></div>
    <button className='room-code' onClick={CopyRoomCodeToClipBoard}>
      <div>
        <img src={CopyImg} alt='copy' />
      </div>
      <span>sala #{code}</span>
    </button>
  </>);
};

export default RoomCode
