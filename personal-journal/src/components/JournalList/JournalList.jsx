import './JournalList.css';

import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';

function JournalList({ items, setItem }) {
	const { userId } = useContext(UserContext);
	const sortItems = (a, b) => {
		if (a.date > b.date) {
			return 1;
		} else {
			return -1;
		}
	};
	const filteredItems = useMemo(
		() => items.filter(el => el.userId == userId).sort(sortItems),
		[items, userId]
	);

	if (items.length == 0) {
		return <p>Записей пока нет, добавьте первую</p>;
	}

	return (
		<>
			{filteredItems.map(el => (
				<CardButton onClick={() => setItem(el)} key={el.id}>
					<JournalItem title={el.title} date={el.date} text={el.text} />
				</CardButton>
			))}
		</>
	);
}
export default JournalList;
