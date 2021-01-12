import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Header from './components/Header'
import Posts from './components/Posts'

const POSTS = [
  {
    id: 1,
    title: "Hello React",
    content: "Lorem ipsum"
  },
  {
    id: 2,
    title: "Hello World",
    content: "Lorem ipsum"
  },
  {
    id: 3,
    title: "Hello Javascript",
    content: "Lorem ipsum"
  }
]

function App(props) {

  const [posts, setPosts] = useState(POSTS)
  return (
    <div className="App">
      <Header />
      <Posts posts={posts} />
    </div>
  );
}

export default App;
