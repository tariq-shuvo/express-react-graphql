const graphql = require('graphql')
const _ = require('lodash')

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID} = graphql

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
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})