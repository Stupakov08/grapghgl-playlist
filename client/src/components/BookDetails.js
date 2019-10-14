import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';
import { useQuery } from '@apollo/react-hooks';

const BookDetails = ({ id }) => {
	const bookData = useQuery(getBookQuery, {
		variables: { id }
	});
	const displayBookDetails = () => {
		const book = bookData.data && bookData.data.book;

		if (book) {
			return (
				<div>
					<h2>{book.name}</h2>
					<p>{book.genre}</p>
					<p>{book.author.name}</p>
					<p>All books by this author:</p>
					<ul className='other-books'>
						{book.author.books.map(item => {
							return <li key={item.id}>{item.name}</li>;
						})}
					</ul>
				</div>
			);
		} else {
			return <div>No book selected...</div>;
		}
	};
	return <div id='book-details'>{displayBookDetails()}</div>;
};

export default BookDetails;
