import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

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

  useEffect(() => {
    const postsRef = firebase.database().ref('posts')
    postsRef.on("value", (snapshot) => {
      const posts = snapshot.val();
      const newStatePosts = []
      for (let post in posts) {
        newStatePosts.push({
          key: post,
          slug: posts[post].slug,
          title: posts[post].title,
          content: posts[post].content
        })
      }
      setPosts(newStatePosts)
    })
  }, [setPosts])

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
    const postRef = firebase.database().ref("posts/" + post.key)
    postRef.update({
      slug: getNewSlugFromTitle(post.title),
      title: post.title,
      content: post.content
    })
    setFlashMessage('updated')
  }

  const addNewPost = (post) => {
   const postsRef = firebase.database().ref('posts')
   post.slug = getNewSlugFromTitle(post.title)
   delete post.key 
   postsRef.push(post)
   setFlashMessage('saved')
  }

  const deletePost = post => {
    if (window.confirm("Delete this post?")) {
      const postRef = firebase.database().ref('posts/' + post.key)
      postRef.remove()
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
              post={{key: null, slug: "", title: "", content: ""}}
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
