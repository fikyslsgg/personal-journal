import { memo } from 'react';
import styles from './Logo.module.css';

function Logo({ image }) {
	console.log('Logo');
	return <img className={styles.logo} src={image} alt='logo' />;
}

export default memo(Logo);
