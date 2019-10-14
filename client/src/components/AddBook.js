import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { graphql, compose } from 'react-apollo';
import {
	getAuthorsQuery,
	addBookMutation,
	getBooksQuery
} from '../queries/queries';

const AddBook = () => {
	const [name, setName] = useState('');
	const [genre, setGenre] = useState('');
	const [authorId, setAuthorId] = useState('');

	const authors = useQuery(getAuthorsQuery);

	const [addBook] = useMutation(addBookMutation, {
		variables: {
			name,
			genre,
			authorId
		},
		refetchQueries: [{ query: getBooksQuery }]
	});

	const displayAuthors = () => {
		if (authors.loading) {
			return <option disabled>Loading authors</option>;
		} else {
			return (
				authors.data.authors &&
				authors.data.authors.map(author => {
					return (
						<option key={author.id} value={author.id}>
							{author.name}
						</option>
					);
				})
			);
		}
	};
	const submitForm = e => {
		e.preventDefault();
		console.log(name, genre, authorId);
		addBook();
	};

	return (
		<form id='add-book' onSubmit={submitForm}>
			<div className='field'>
				<label>Book name:</label>
				<input type='text' onChange={e => setName(e.target.value)} />
			</div>
			<div className='field'>
				<label>Genre:</label>
				<input type='text' onChange={e => setGenre(e.target.value)} />
			</div>
			<div className='field'>
				<label>Author:</label>
				<select onChange={e => setAuthorId(e.target.value)}>
					<option>Select author</option>
					{displayAuthors()}
				</select>
			</div>
			<button>+</button>
		</form>
	);
};

export default AddBook;
