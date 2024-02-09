import cn from 'classnames';
import { useEffect, useReducer, useRef } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';

function JournalForm({ onSubmit }) {

	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();

	const focusError = (isValid)=>{
		switch (true) {
			case !isValid.title:
				titleRef.current.focus();
				break;
			case !isValid.date:
				dateRef.current.focus();
				break;
			case !isValid.text:
        textRef.current.focus();
        break;
		}
	};

	useEffect(()=>{
		let timerId;
		if(!isValid.title || !isValid.date || !isValid.text){
			focusError(isValid);
			timerId = setTimeout(()=> {
				dispatchForm({type:'RESET_VALIDITY'});
			}, 2000);
		}
		return ()=> {
			clearTimeout(timerId);
		};
	},[isValid]);

	useEffect(()=>{
		if(isFormReadyToSubmit){
			onSubmit(values);
			dispatchForm({type:'CLEAR'});
		}

	},[isFormReadyToSubmit, values, onSubmit]);

	const onChange = (e)=>{
		dispatchForm({type:'SET_VALUE', payload:{[e.target.name]:e.target.value}});
	};

	const addJournalItem = e => {
		e.preventDefault();
		dispatchForm({type:'SUBMIT'});
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<Input
					type='text'
					ref={titleRef}
					appearance='title'
					onChange={onChange}
					isValid={isValid.title}
					name='title'
					value={values.title}
					className={cn(styles['input-title'], {
						[styles['invalid']]: !formState.isValid.title
					})}
				/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='date' className={styles['form-label']}>
					<img src='/calendar.svg' alt='Иконка календаря' />
					<span>Дата</span>
				</label>
				<Input
					id='date'
					type='date'
					isValid={isValid.date}
					ref={dateRef}
					onChange={onChange}
					name='date'
					value={values.date}
				/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='tag' className={styles['form-label']}>
					<img src='/fold.svg' alt='Иконка папки' />
					<span>Метки</span>
				</label>
				<Input
				id='tag' 
				type='text' 
				onChange={onChange}
				name='tag' 
				value={values.tag} 
				/>
			</div>
			<textarea
				name='text'
				ref={textRef}
        className={cn(styles['input'], {[styles['invalid']]: !isValid.text})}
				value={values.text}
				onChange={onChange}
				id=''
				cols='30'
				rows='10'
			></textarea>

			<Button text='Сохранить' />
		</form>
	);
}

export default JournalForm;
