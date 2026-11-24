// components/common/SearchBar/SearchBar.tsx
import { type ChangeEvent, type FormEvent, useState } from 'react';
import './SearchBar.scss';
import { IoSearchOutline } from 'react-icons/io5';
import { ButtonApp } from '../ButtonApp';

type SearchBarProps = {
	onSearch: (term: string) => void;
	placeholder?: string;
	className?: string;
};

const SearchBar = ({
	onSearch,
	placeholder = 'Buscar un producto por nombre...',
	className = '',
}: SearchBarProps) => {
	const [term, setTerm] = useState('');

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSearch(term.trim());
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setTerm(value);
		// clearing the input shows every product again
		if (value === '') onSearch('');
	};

	return (
		<form className={`search-bar ${className}`.trim()} role='search' onSubmit={handleSubmit}>
			<IoSearchOutline className='search-bar__icon' aria-hidden='true' />

			<input
				className='search-bar__input'
				type='text'
				value={term}
				onChange={handleChange}
				placeholder={placeholder}
				aria-label='Buscar un producto por nombre'
				enterKeyHint='search'
				maxLength={100}
			/>

			<div className='search-bar__button'>
				<ButtonApp typeButton='submit' buttonText='Buscar' />
			</div>
		</form>
	);
};

export default SearchBar;
