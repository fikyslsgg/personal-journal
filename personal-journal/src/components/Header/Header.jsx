import { useCallback, useState } from 'react';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import SelectUser from '../SelectUser/SelectUser';
const logos = ['logo.svg', 'vite.svg'];

function Header() {
	const [logoIndex, setLogoIndex] = useState(0);
	console.log('Header');
	const toggleLogo = useCallback(() => {
		setLogoIndex(state => Number(!state));
	}, []);
	return (
		<>
			<Logo image={logos[logoIndex]} />
			<SelectUser />
			<Button onClick={toggleLogo}>Сменить логотип</Button>
		</>
	);
}

export default Header;
