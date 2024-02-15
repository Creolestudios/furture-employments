import React, { FC, ReactNode } from 'react';
import { Button } from 'antd';

type ButtonType = 'button' | 'submit' | 'reset';

interface IProps {
  children: string;
  onClick?: () => void;
  className?: string;
  htmlType?: ButtonType;
  disabled?: boolean;
  icon?: ReactNode;
}

const ButtonWrapper: FC<IProps> = ({
  children,
  className,
  onClick,
  htmlType,
  disabled,
  icon,
}) => (
  <Button
    className={className}
    onClick={onClick}
    htmlType={htmlType}
    disabled={disabled}
    icon={icon}
  >
    {children}
  </Button>
);

ButtonWrapper.defaultProps = {
  className: '',
  htmlType: 'button',
  disabled: false,
  onClick: () => {},
  icon: null,
};

export default ButtonWrapper;
