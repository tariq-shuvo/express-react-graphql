const graphql = require('graphql')
const _ = require('lodash')

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} = graphql

//dummy data
const books = [
    {
        name: "Book 1",
        author: "Author 1",
        id: '1'
    },
    {
        name: "Book 2",
        author: "Author 2",
        id: '2'
    },
    {
        name: "Book 3",
        author: "Author 3",
        id: '3'
    }
]

const authors = [
    {
        name: "Author 1",
        age: 44,
        id: '1'
    },
    {
        name: "Author 2",
        age: 42,
        id: '2'
    },
    {
        name: "Author 3",
        age: 66,
        id: '3'
    }
]

const BookType = new GraphQLObjectType(
    {
        name: 'Book',
        fields: () => ({
            id: {type: GraphQLID},
            name: {type: GraphQLString},
            author: {type: GraphQLString}
        })
    }
)

const AuthorType = new GraphQLObjectType(
    {
        name: 'Author',
        fields: () => ({
            id: {type: GraphQLID},
            name: {type: GraphQLString},
            age: {type: GraphQLInt}
        })
    }
)

/*
{
    book(id: "1"){
        name,
        author,
        id
    }
}
*/

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args){
                //code to get data from db or source
                return _.find(books, {id: args.id})
            }
        },
        books:{
            type: new graphql.GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args){
                return _.find(authors, {id: args.id})
            }
        },
        authors:{
            type: new graphql.GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})