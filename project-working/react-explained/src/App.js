import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

// Auth
import firebase from './firebase'
import UserContext from './context/UserContext'

// React Router
import { 
  BrowserRouter as Router, 
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

// Local Storage
import {useStorageState} from 'react-storage-hooks'

// My Components
import Header from './components/Header'
import Posts from './components/Posts'
import Post from './components/Post'
import PostForm from './components/PostForm'
import Message from './components/Message'
import NotFound from './components/NotFound'
import Login from './components/Login'

function App(props) {

  const [posts, setPosts] = useStorageState(localStorage, 'state-posts', [])
  const [user, setUser] = useStorageState(localStorage, 'state-user', {})
  const [message, setMessage] = useState(null)

  const onLogin = (email, password) => {
    firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(response => setUser({
      email: response.user['email'],
      isAuthenticated: true
    }))
    .catch(err => console.log(err))
  }

  const onLogout = () => {
    firebase.auth()
    .signOut()
    .then(() => setUser({isAuthenticated: false}))
    .catch(err => console.log(err))
  }

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

  const deletePost = post => {
    if (window.confirm("Delete this post?")) {
      const updatedPosts = posts.filter(p => p.id !== post.id)
      setPosts(updatedPosts)
      setFlashMessage('deleted')
    }
  }

  return (
    <Router>
      <UserContext.Provider value={{ user, onLogin, onLogout }}>
      <div className="App">
      <Header />
      {message && <Message type={message} /> }
      <Switch>
        <Route 
          exact path="/"
          render={ () => <Posts posts={posts} deletePost={deletePost} /> }
        /> 
        <Route 
          exact path="/login" 
          render={() => {
          return !user.isAuthenticated ? <Login /> : <Redirect to="/" />
        }}
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
            return user.isAuthenticated ? <PostForm 
              addNewPost={addNewPost} 
              post={{id: 0, slug: "", title: "", content: ""}}
            /> : 
            <Redirect to="/login" />
          }}
        />
        <Route  
          path="/edit/:postSlug"
          render={(props) => {
            const post = posts.find(post => post.slug === props.match.params.postSlug)
            if (post) {
              if (user.isAuthenticated) {
                return <PostForm post={post} updatePost={updatePost} />
              } else {
                return <Redirect to="/login" />
              }
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
      </UserContext.Provider>
    </Router>
  );
}

export default App;
