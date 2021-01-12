import React from 'react';

const Posts = ({ posts }) => {
    return ( 
        <article className="postsContainer">
            <h1>
                Posts
            </h1>
            <ul>
                {
                    posts.length < 1 && (
                        <li key="empty">No Posts Yet!</li>
                    )
                }
                {
                    posts.map(post => {
                        return (
                            <li key={post.id}>
                                <h2>{post.title}</h2>
                            </li>
                        )
                    })
                }
            </ul>
        </article>
     );
}
 
export default Posts;