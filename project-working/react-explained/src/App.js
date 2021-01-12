import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

// React Router
import { 
  BrowserRouter as Router, 
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

// My Components
import Header from './components/Header'
import Posts from './components/Posts'
import Post from './components/Post'
import PostForm from './components/PostForm'
import Message from './components/Message'
import NotFound from './components/NotFound'

const POSTS = [
  {
    id: 1,
    title: "Hello React",
    content: "Lorem ipsum",
    slug: 'hello-react'
  },
  {
    id: 2,
    title: "Hello World",
    content: "Lorem ipsum",
    slug: 'hello-world'
  },
  {
    id: 3,
    title: "Hello Javascript",
    content: "Lorem ipsum",
    slug: 'hello-js'
  }
]

function App(props) {

  const [posts, setPosts] = useState(POSTS)
  const [message, setMessage] = useState(null)

  const setFlashMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null);
    }, 1600)
  }

  const getNewSlugFromTitle = (title) => {
   return encodeURIComponent(
      title.toLowerCase().split(" ").join("-")
    )
  }

  const updatePost = (post) => {
    post.slug = getNewSlugFromTitle(post.title)
    const index = posts.findIndex(p => p.id === post.id)
    const oldPosts = posts.slice(0, index).concat(posts.slice(index + 1))
    const updatedPosts = [...oldPosts, post].sort((a, b) => a.id - b.id )
    setPosts(updatedPosts)
    setFlashMessage('updated')
  }

  const addNewPost = (post) => {
    post.id = posts.length + 1
    post.slug = getNewSlugFromTitle(post.title)
    setPosts([...posts, post])
    setFlashMessage('saved')
  }

  return (
    <Router>
      <div className="App">
      <Header />
      {message && <Message type={message} /> }
      <Switch>
        <Route 
          exact path="/"
          render={ () => <Posts posts={posts} /> }
        /> 
        <Route 
          path="/posts/:postSlug"
          render={(props) => {
            const post = posts.find(post => post.slug === props.match.params.postSlug);
            if (post) {
              return <Post post={post} />
            } else {
              return <NotFound />
            }
          }}
        />
        <Route 
          exact path="/new"
          render={() => {
            return <PostForm 
              addNewPost={addNewPost} 
              post={{id: 0, slug: "", title: "", content: ""}}
            />
          }}
        />
        <Route  
          path="/edit/:postSlug"
          render={(props) => {
            const post = posts.find(post => post.slug === props.match.params.postSlug)
            if (post) {
              return <PostForm post={post} updatePost={updatePost} />
            } else {
              return <Redirect to="/" />
            }
          }}
        />
        <Route 
          component={NotFound}
        />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
