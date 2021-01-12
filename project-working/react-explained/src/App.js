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

  const addNewPost = (post) => {
    post.id = posts.length + 1
    post.slug = encodeURIComponent(
      post.title.toLowerCase().split(" ").join("-")
    )
    setPosts([...posts, post])
  }

  return (
    <Router>
      <div className="App">
      <Header />
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
            return <PostForm addNewPost={addNewPost} />
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
