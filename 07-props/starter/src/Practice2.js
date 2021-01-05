import React from "react";

const Practice2 = () => {
  /*
    1. Create post object with an id and title
  */
  const post = {
    id: 1,
    title: 'React'
  };

  return (
    <div className="practice">
      {/* 
        2. Call the Post component below
        3. Pass in the post object as a prop
      */}

      <Post id={post.id} title={post.title} />
    </div>
  );
};

/*
  4. Make the Post component accept props
  5. Have Post component rendr the post title and ID to the page
*/
const Post = (props) => {
  const {id, title} = props;

  return <p>Post {id}: {title}</p>;
};

export default Practice2;
