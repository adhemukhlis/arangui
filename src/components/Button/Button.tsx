import { PropsWithChildren, FC, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	id?: string;
}
export const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, ...props }) => (
	<button
		className={[styles.button, styles.solid].join(' ')}
		{...props}>
		{children}
	</button>
);
