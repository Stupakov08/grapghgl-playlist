const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const PORT = 4000;
const connectionString =
	'mongodb+srv://brad123:brad123@gql-ninja-c1fth.mongodb.net/test?retryWrites=true&w=majority';
const app = express();

mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
	console.log('connected to database');
});
app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

app.listen(PORT, () => {
	console.log('server is started on port ' + PORT);
});
