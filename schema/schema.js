const graphql = require('graphql');
const ArticlesModel = require('../models/articles');
const AuthorModel = require('../models/users');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        articles: {
            type: new GraphQLList(ArticleType),
            async resolve(parent, args) {
                try {
                    const [data] = await ArticlesModel.getAllByAuthorId(parent.id);
                    return data;
                } catch (error) {
                    console.log(error);
                }
            }
        }
    })
});

const ArticleType = new GraphQLObjectType({
    name: 'Article',
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        category: { type: GraphQLID },
        author: {
            type: AuthorType,
            async resolve(parent, args) {
                try {
                    const [data] = await AuthorModel.getById(parent.created_by);
                    return data[0];
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        article: {
            type: ArticleType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                //db query here
                try {
                    const [data] = await ArticlesModel.getById(args.id);
                    return data[0];
                } catch (error) {
                    console.log(error);
                }
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                //db query
                try {
                    const [data] = await AuthorModel.getById(args.id);
                    return data[0];
                } catch (error) {
                    console.log(error);
                }
            }
        },
        articles: {
            type: new GraphQLList(ArticleType),
            async resolve(parent, args) {
                try {
                    const [data] = await ArticlesModel.getAll();
                    return data;
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addArticle: {
            type: ArticleType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                body: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                //db query
                return await ArticlesModel.create(args);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});