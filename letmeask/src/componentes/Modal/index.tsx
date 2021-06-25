import { FC, ReactNode } from 'react';
import ReactModal from 'react-modal';
import CloseIcon from '../../assets/images/close.svg';

import './styles.scss';

type ModalProps = ReactModal.Props & {
  buttonText: string;
  buttonTitleCancel?: string;
  buttonTitleConfirm: string;
  title: ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
};

const Modal: FC<ModalProps> = ({
  buttonText, buttonTitleCancel, buttonTitleConfirm, title, children, onCancel, onConfirm, onRequestClose, ...rest
}) => {
  return (<div>
    <ReactModal {...rest} onRequestClose={onRequestClose} className='Modal' overlayClassName='Overlay' >
      <div className='content'>
        <div className='content-header'>
          <button onClick={onRequestClose} className='content-header-close-modal'>
            <img src={CloseIcon} alt='fechar dialog' />
          </button>
          <p className='content-header-title'>{title}</p>
        </div>
        <div className='content-body'>
          {children}
        </div>
        <div className='content-footer'>
          <button onClick={onCancel ?? onRequestClose} className='content-footer-cancelar'>{buttonTitleCancel ?? 'Cancelar'}</button>
          <button onClick={onConfirm} className='content-footer-confirmar'>{buttonTitleConfirm}</button>
        </div>
      </div>
    </ReactModal>
  </div>);
};

export default Modal;
