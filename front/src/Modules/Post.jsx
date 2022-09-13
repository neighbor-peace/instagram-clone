import { useState } from "react";
import { nanoid } from "nanoid";
// ICONS
import smileyIcon from "../Icons/smiley.svg";
import ellipses from "../Icons/ellipses.svg";
import unlike from "../Icons/unlike.svg";
// IMAGES
import barackPic from "../Images/barack.jpg";
import merkelPic from "../Images/merkel.jpg";
import martinPic from "../Images/martin.jpg";
import codesmithPic from "../Images/codesmith.jpg";
import mikePic from "../Images/mike.jpg";

const followingData = [
  {
    id: "mike.ppsi",
    pic: mikePic
  },
  {
    id: "barackobama",
    pic: barackPic
  },
  {
    id: "codesmithio",
    pic: codesmithPic
  },
  {
    id: "bundeskanzlerinmerkel",
    pic: merkelPic
  },
  {
    id: "georgerrmartin",
    pic: martinPic
  },
]

const premadeComments = [
  "Great post!",
  "I love it!",
  "😍",
  "😍❤️🔥",
  "nice",
  "¡¡¡Ufff!!! Merci",
  "best there is🤩",
  "ummmmm",
  "OMG",
  "the aesthetic... damn",
  "te amo ❤️",
  "ILYSM",
  "Absolutely gorgeous 👏🏻👏🏻😁🔝✨🔝🥇",
  "details 👌✨✨",
  "Fantastic",
  "Very good 🔥",
  "Wow..so beautiful..❤️❤️❤️",
  "wooow",
  "❤️❤️❤️❤️😍😍😍😍😍",
  "👏👏👏",
  "🙌🙌🙌"
]

const commenters = [
  'therock',
  'beyonce',
  'natgeo',
  'nike',
  'zendaya',
  'snoopdogg',
  'humansofny',
  'tomholland',
  'kamalaharris',
  'oprah',
  'joebiden',
  'billieeilish',
  'ressewitherspoon',
  'daftpunk'
]

function Post(props) {
  const {source, userID} = props;
  const [display, setDisplay] = useState(true);
  const [postData, setPostData] = useState({
    poster: getRandEl(followingData),
    likes: generateRandNum(50, 998),
    time: generateRandNum(2, 23),
    liked: false
  });
  const [commentData, setCommentData] = useState(generateComments());
  const [newComment, setNewComment] = useState({
    text: "",
    height: 1
  });
  const styles = {
    display: display ? "default" : "none",
  }

  function handleCommentInput(event) {
    const value = event.target.value;
    const newHeight = 1 + Math.floor(value.length / 43);
    setNewComment({
      text: value,
      height: newHeight
    });
  }

  function handleCommentKeydown(event) {
    if (event.key !== "Enter") return;
    addComment(event);
  }

  function generateComments() {
    const commentArr = [];
    let commentCount = generateRandNum(0, 4);
    for (let i = 0; i < commentCount; i++) {
      const comment = {
        id: getRandEl(commenters),
        text: getRandEl(premadeComments)
      };
      commentArr.push(comment);
    }
    return commentArr;
  }

  function addComment(event) {
    event.preventDefault();
    if (newComment.text.length < 1) return;
    setCommentData(prevData => [
      ...prevData,
      {
        id: userID,
        text: newComment.text
      }
    ]);
    setNewComment({
      text: "",
      height: 1
    });
  }

  function generateRandNum(min, max) {
    return min + (Math.floor(Math.random() * (max - min)));
  }
  
  function getRandEl(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function likePost() {
    if (postData.liked) return;
    setPostData(prevData => ({
      ...prevData,
      likes: ++prevData.likes,
      liked: true
    }))
  }

  function toggleLikePost() {
    if (postData.liked) {
      setPostData(prevData => ({
        ...prevData,
        likes: --prevData.likes,
        liked: false
      }))
    } else likePost();
  }

  const commentElements = commentData.map(comment => {
    return (
      <div key={nanoid()} >
        <a className="username" >{comment.id} </a>
        <span>{comment.text}</span>
      </div>
    )
  });

  return (
    <article className="post" style={styles} >
      {/* top bar */}
      <header>
        <div>
          <img src={postData.poster.pic} className="profile-picture" alt="Poster profile" />
          <a className="username" >{postData.poster.id}</a>
        </div>
        <div>
          <img src={ellipses} alt="More options" />
        </div>
      </header>
      {/* image */}
      <img 
        src={source} 
        alt="Post" 
        onDoubleClick={likePost}
        onError={event => {
          event.target.onError = null;
          setDisplay(false);
        }}
      />
      {/* bottom */}
      <div>
        {/* icon bar */}
        <section>
          <div>
            {postData.liked ? 
              <img 
                src={unlike} 
                alt="Unlike"
                onClick={toggleLikePost}
              />
              :
              <svg 
                onClick={toggleLikePost} 
                xmlns="http://www.w3.org/2000/svg" aria-label="Heart" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <path 
                    d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z">
                  </path>
              </svg>
            }

            <svg xmlns="http://www.w3.org/2000/svg" aria-label="Comment" height="24" role="img" viewBox="0 0 24 24" width="24">
              <path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" aria-label="Share Post" height="24" role="img" viewBox="0 0 24 24" width="24">
              <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
            </svg>

          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" aria-label="Save" height="24" role="img" viewBox="0 0 24 24" width="24">
              <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
            </svg>
          </div>
        </section>
        {/* like count */}
        <section>
          {`${postData.likes} likes`}
        </section>
        {/* post caption */}
        <section>
          <p>
            <a className="username" >{postData.poster.id} </a>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero atque exercitationem iste harum fugit perferendis architecto odio placeat quam praesentium?
          </p>
        </section>
        {/* comments */}
        <section>
          {commentElements}
        </section>
        {/* timestamp */}
        <section>
          <span>{`${postData.time} HOURS AGO`}</span>
        </section>
        {/* add a comment */}
        <section>
          <form noValidate onSubmit={addComment} >
            <img src={smileyIcon} alt="Smiley" />
            <textarea 
              type="text" 
              name="comment" 
              placeholder="Add a comment..." 
              minLength="1"
              style={{height: newComment.height + 'rem'}}
              onChange={handleCommentInput}
              onKeyDown={handleCommentKeydown}
              value={newComment.text}
              required
            />
            <button 
              className={
                newComment.text.length > 0 ? "ready" : ""
              }
            >
              Post
            </button>
          </form>
        </section>
      </div>
    </article>
  )
}

export default Post;