import React, {useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom'

import Quill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const PostForm = (props) => {

    const {addNewPost, updatePost, post: propsPost} = props;
    const [post, setPost] = useState({...propsPost})
    const [saved, setSaved] = useState(false)


    const prevPostRef = useRef();

    useEffect(() => {
        prevPostRef.current = post;
    }, [post])

    const prevPost = prevPostRef.current 

    const quillRef = useRef();

    useEffect(() => {
        if (prevPost && quillRef.current){
            if (propsPost.key !== prevPost.key ) {
                setPost({...propsPost})
                quillRef.current.getEditor().setContents(``)
            }
        }
    }, [prevPost, propsPost])



    const handleAddNewPost = (event) => {
        event.preventDefault();
        if (post.title.length > 0) {
           if (updatePost) {
               updatePost(post)
           } else {
               addNewPost(post)
           }
            setSaved(true)
        } else {
            alert("Title Cannot be Empty")
        }
    }   

    if (saved) {
        return <Redirect to="/" />
    }

    return ( 
        <form className="container" onSubmit={handleAddNewPost}>
            <h1>Add a New Post</h1>
            <p>
                <label htmlFor="form-title">Title:</label>
                <br/>
                <input 
                    id="form-title"
                    defaultValue={post.title}
                    value={post.title}
                    onChange={event => setPost({
                        ...post, 
                        title: event.target.value
                    })}
                />
            </p>
            <p>
                <label htmlFor="form-content">Content:</label>
                <Quill 
                    ref={quillRef}
                    defaultValue={post.content}
                    onChange={(content, delta, source, editor) => {
                        setPost({
                            ...post,
                            content: editor.getContents()
                        })
                    }}
                />
            </p>
            <p>
                <button type="submit">
                    Save
                </button>
            </p>
        </form>
     );
}
 
export default PostForm;
