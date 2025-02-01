import { memo } from 'react';
import { BASE_URL } from '../../../api/api';
import styles from './Logo.module.css';

function Logo() {
	return (
		<img className={styles.logo} src={`${BASE_URL}/logo.svg`} alt='logo' />
	);
}

export default memo(Logo);
