'use client';

import type { FC, PropsWithChildren } from 'react';
import Modal, { Props as ReactModalProps } from 'react-modal';

import { DEFAULT_STYLES } from '../constants';

Modal.setAppElement('#global-app');

type Props = ReactModalProps & {
  trigger: React.ReactNode;
};

const ModalComponent: FC<PropsWithChildren<Props>> = (props) => {
  const { children, trigger, isOpen, style = DEFAULT_STYLES, onRequestClose, ...rest } = props;

  return (
    <>
      {trigger}
      <Modal
        isOpen={isOpen}
        style={style}
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        onRequestClose={onRequestClose}
        {...rest}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;
