import React from 'react';
import {QuillDeltaToHtmlConverter} from 'quill-delta-to-html'

const Post = (props) => {

    const { post } = props;

    const converter = new QuillDeltaToHtmlConverter(post.content.ops, {})
    const contentHtml = converter.convert()

    return ( 
        <article className="post container">
            <h1>{post.title}</h1>
            <div 
                className="content"
                dangerouslySetInnerHTML={{
                    __html: contentHtml
                }}
            />
        </article>
     );
}
 
export default Post;