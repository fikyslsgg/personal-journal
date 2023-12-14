import './App.css';
import Button from './components/Button/Button';
import JournalItem from './components/JournalItem/JournalItem';

function App() {
  const data = [
    {
      title: 'Подготовка к обновлению курсов',
      date: new Date(),
      text: 'Сегодня провёл весь день за...'
    },
    {
      title: 'Поход в годы',
      date: new Date(),
      text: 'Думал, что очень много време...'
    }
  ];
  return (
    <>
      <Button />
      <JournalItem
        title={data[0].title}
        date={data[0].date}
        text={data[0].text}
      />
    </>
  );
}

export default App;
