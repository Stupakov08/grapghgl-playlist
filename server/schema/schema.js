const graphql = require('graphql');

const books = [
	{ name: 'First Book', genre: 'Fantasy', id: '1' },
	{ name: 'Second Book', genre: 'Fantasy', id: '2' },
	{ name: 'Third Book', genre: 'Sci-Fi', id: '3' }
];

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString }
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				return books.find(book => book.id === args.id);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
