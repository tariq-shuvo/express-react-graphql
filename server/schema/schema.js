const graphql = require('graphql')
const _ = require('lodash')

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} = graphql

//dummy data
const books = [
    {
        name: "Book 1",
        genre: "Author 1",
        id: '1',
        authorId: '1'
    },
    {
        name: "Book 2",
        genre: "Author 2",
        id: '2',
        authorId: '2'
    },
    {
        name: "Book 3",
        genre: "Author 3",
        id: '3',
        authorId: '3'
    },
    {
        name: "Book 4",
        genre: "Author 4",
        id: '4',
        authorId: '1'
    },
    {
        name: "Book 5",
        genre: "Author 5",
        id: '5',
        authorId: '1'
    },
    {
        name: "Book 6",
        genre: "Author 6",
        id: '6',
        authorId: '2'
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
            genre: {type: GraphQLString},
            author:{
                type: AuthorType,
                resolve(parent, args){
                    return _.find(authors, {id: parent.authorId})
                }
            }
        })
    }
)

const AuthorType = new GraphQLObjectType(
    {
        name: 'Author',
        fields: () => ({
            id: {type: GraphQLID},
            name: {type: GraphQLString},
            age: {type: GraphQLInt},
            books:{
                type: graphql.GraphQLList(BookType),
                resolve(parent, args){
                    return _.filter(books, {authorId: parent.id})
                }
            }
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