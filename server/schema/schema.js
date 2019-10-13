const graphql = require('graphql');

const books = [
	{ name: 'First Book', genre: 'Fantasy', id: '1', authorId: '1' },
	{ name: 'Second Book', genre: 'Fantasy', id: '2', authorId: '2' },
	{ name: 'Third Book', genre: 'Sci-Fi', id: '3', authorId: '3' },
	{ name: 'Fourth Book', genre: 'Fantasy', id: '4', authorId: '2' },
	{ name: 'Fifth Book', genre: 'Sci-Fi', id: '5', authorId: '3' },
	{ name: 'Sixth Book', genre: 'Sci-Fi', id: '6', authorId: '3' }
];

const authors = [
	{ name: 'First Author', age: '11', id: '1' },
	{ name: 'Second Author', age: '22', id: '2' },
	{ name: 'Third Author', age: '33', id: '3' }
];

const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLID,
	GraphQLString,
	GraphQLSchema,
	GraphQLList
} = graphql;

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				return books.find(book => book.id === parent.authorId);
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: GraphQLList(BookType),
			resolve(parent, args) {
				return books.filter(book => parent.id == book.authorId);
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return books.find(book => book.id === args.id);
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return authors.find(a => a.id === args.id);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
