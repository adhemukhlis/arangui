import React from 'react';
import styles from './Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label?: string;
}
export const Button: React.FC<ButtonProps> = ({ label = 'Button', ...props }) => (
	<button
		className={[styles.button, styles.solid].join(' ')}
		{...props}>
		{label}
	</button>
);
