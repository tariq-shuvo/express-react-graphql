import React from 'react'
import {
    useQuery,
    gql
} from "@apollo/client";

const GET_BOOK_LIST = gql`
query GetBooks {
    books {
        id, 
        name,
        author {
            name
        }
      }
  }
`;

const BookList = () => {
    const { loading, error, data } = useQuery(GET_BOOK_LIST);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <div>
            <ul>
                {data.books.map((bookInfo, index)=><li key={index}>{bookInfo.name} by {bookInfo.author.name}</li>)}
            </ul>
        </div>
    )
}

export default BookList
