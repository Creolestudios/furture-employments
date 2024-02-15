import React, { FC, ReactElement } from 'react';

import ModalStyledWrapper from './index.styles';

interface IProps {
  isOpen: boolean;
  title: string;
  onOk: () => void;
  onCancel: () => void;
  children: ReactElement;
  moduleClass?: string;
  footer?: React.ReactNode | string | null;
  destroyOnClose?: any;
  closable?: boolean;
}

const ModalWrapper: FC<IProps> = ({
  isOpen,
  title,
  onOk,
  onCancel,
  children,
  moduleClass,
  footer,
  destroyOnClose,
  closable,
}) => (
  <ModalStyledWrapper
    open={isOpen}
    title={title}
    centered
    onOk={onOk}
    onCancel={onCancel}
    footer={footer}
    className={moduleClass}
    destroyOnClose={destroyOnClose}
    closable={closable}
  >
    {children}
  </ModalStyledWrapper>
);

export default ModalWrapper;

ModalWrapper.defaultProps = {
  moduleClass: '',
  footer: null,
  destroyOnClose: null,
  closable: true,
};
