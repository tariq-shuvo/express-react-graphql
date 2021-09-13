const graphql = require('graphql')
const _ = require('lodash')
const Author = require('../models/Author')
const Book = require('../models/Book')

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLNonNull} = graphql

//dummy data
// const books = [
//     {
//         name: "Book 1",
//         genre: "Author 1",
//         id: '1',
//         authorId: '1'
//     },
//     {
//         name: "Book 2",
//         genre: "Author 2",
//         id: '2',
//         authorId: '2'
//     },
//     {
//         name: "Book 3",
//         genre: "Author 3",
//         id: '3',
//         authorId: '3'
//     },
//     {
//         name: "Book 4",
//         genre: "Author 4",
//         id: '4',
//         authorId: '1'
//     },
//     {
//         name: "Book 5",
//         genre: "Author 5",
//         id: '5',
//         authorId: '1'
//     },
//     {
//         name: "Book 6",
//         genre: "Author 6",
//         id: '6',
//         authorId: '2'
//     }
// ]

// const authors = [
//     {
//         name: "Author 1",
//         age: 44,
//         id: '1'
//     },
//     {
//         name: "Author 2",
//         age: 42,
//         id: '2'
//     },
//     {
//         name: "Author 3",
//         age: 66,
//         id: '3'
//     }
// ]

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
                    // return _.find(authors, {id: parent.authorId})
                    const { author } = parent
                    return Author.findById(author.toString())
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
                    // return _.filter(books, {authorId: parent.id})
                    const { id } = parent
                    return Book.find({author: id})
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
            args: { id: {type: new GraphQLNonNull(GraphQLID)} },
            resolve(parent, args){
                //code to get data from db or source
                // return _.find(books, {id: args.id})
                const { id } = args
                return Book.findById(id)
            }
        },
        books:{
            type: new graphql.GraphQLList(BookType),
            resolve(parent, args){
                // return books
                return Book.find({})
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: new GraphQLNonNull(GraphQLID)} },
            resolve(parent, args){
                // return _.find(authors, {id: args.id})
                const { id } = args
                return Author.findById(id)
            }
        },
        authors:{
            type: new graphql.GraphQLList(AuthorType),
            resolve(parent, args){
                // return authors
                return Author.find({})
            }
        },
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
           type: AuthorType,
           args: {
               name: { type: new GraphQLNonNull(GraphQLString)},
               age: { type: new GraphQLNonNull(GraphQLInt)}
           },
           async resolve(parent, args){
               const {name, age} = args
               let author = new Author({
                   name,
                   age
               }) 

               let authorInfo = await author.save()
               return authorInfo
           } 
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                genre: { type: new GraphQLNonNull(GraphQLString)},
                author: { type: new GraphQLNonNull(GraphQLID)}
            },
            async resolve(parent, args){
                const {name, genre, author} = args
                let book = new Book({
                    name,
                    genre,
                    author
                }) 
 
                let bookInfo = await book.save()
                return bookInfo
            } 
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})