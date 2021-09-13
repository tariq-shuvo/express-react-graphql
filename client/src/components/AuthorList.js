import React from 'react'
import {
    useQuery,
    gql
} from "@apollo/client";

const GET_AUTHOR_LIST = gql`
query GetAuthors {
    authors {
        id, 
        name,
        books {
            name
        }
      }
  }
`;

const AuthorList = () => {
    const { loading, error, data } = useQuery(GET_AUTHOR_LIST);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <ul>
                {data.authors.map((authorInfo, index)=>(
                <li key={index}>
                    {authorInfo.name}
                    <ul>
                        {authorInfo.books.map((bookInfo, index)=><li key={index}>{bookInfo.name}</li>)}
                    </ul>
                </li>))}
            </ul>
        </div>
    )
}

export default AuthorList
