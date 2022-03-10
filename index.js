const express = require('express');
const app = express();
const schema = require('./schema/schema');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');



//to accept data from form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


//initilizing graphQL
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.get('/', (req, res) => {
    res.status(200).send('you have reached here');
});

app.use('/api', require('./routes/api'));


app.listen(5001, () => console.log('server started at 5001'));