import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { nanoid } from "nanoid";
import Post from "../Modules/Post";
import Footer from "../Modules/Footer";
// ICONS
import instagramLogo from '../Images/instagram-logo.png';
import activityFeedIcon from '../Icons/heart.svg';
import findPeopleIcon from '../Icons/find-people.svg';
import homeIcon from '../Icons/home.svg';
import messengerIcon from '../Icons/messenger.svg';
import newPostIcon from '../Icons/new-post.svg';
import searchIcon from '../Icons/search.svg';
import downChevron from '../Icons/down-chevron.svg';
// IMAGES
import timPic from "../Images/tim.jpg"
import obamaPic from "../Images/michelle-obama.jpg"
import nasaPic from "../Images/nasa.jpg"
import ancoPic from "../Images/anco.jpg"
import scrPic from "../Images/scr.jpg"
import geekPic from "../Images/geek.jpg"
import gdqPic from "../Images/gdq.jpg"
import kojimaPic from "../Images/kojima.jpg"


const userInfo = {
  timheidecker: {
    pic: timPic,
    name: "Tim Heidecker"
  },
  michelleobama: {
    pic: obamaPic,
    name: "Michelle Obama"
  },
  nasa: {
    pic: nasaPic,
    name: "NASA"
  }
}

const suggestionsData = [
  {
    id: "scr_radio",
    pic: scrPic
  },
  {
    id: "boardgamegeek",
    pic: geekPic
  },
  {
    id: "gamesdonequick",
    pic: gdqPic
  },
  {
    id: "hideo_kojima",
    pic: kojimaPic
  },
  {
    id: "anmlcollective",
    pic: ancoPic
  },
]

function Feed() {
  const location = useLocation();
  const {userID} = location.state;
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    fetch('https://us-central1-codesmith-curriculum-server.cloudfunctions.net/app/images')
      .then(response => response.json())
      .then(arr => {
        const postArray = [];
        arr.forEach(url => {
          postArray.push({
            url: url,
            id: nanoid(),
          })
        })
        setPostData(postArray);
      });
  }, []);

  const posts = postData.map(post => (
      <Post 
        userID={userID}
        source={post.url}
        key={post.id} 
      />
  ))

  const suggestions = suggestionsData.map(suggestion => (
    <div className="suggestion" key={nanoid()} >
      <img src={suggestion.pic} className="profile-picture" alt="Profile" />
      <div>
        <a className="username" >{suggestion.id}</a>
        <span>Popular</span>
      </div>
      <a className="blue" >Follow</a>
    </div>
  ))

  return (
      <div className="feed">
        <header className="navbar">
          {/* logo dropdown */}
          <span>
            <div>
              <img src={instagramLogo} alt="Instagram logo" />
              <img src={downChevron} alt="down chevron" />
            </div>
            {/* searchbar */}
            <label className="search">
              <img src={searchIcon} alt="search" />
              <input type="search" name="search" placeholder="Search" />
            </label>
            {/* icons */}
            <div>
              <img src={homeIcon} alt="home" />
              <img src={messengerIcon} alt="messenger" />
              <img src={newPostIcon} alt="new post" />
              <img src={findPeopleIcon} alt="find people" />
              <img src={activityFeedIcon} alt="activity feed" />
              <img src={userInfo[userID].pic} className="profile-picture" alt="profile" />
            </div>
          </span>
        </header>

        <div>
          <div className="post-container">
            {posts}
          </div>
          <div className="info-panel">
            {/* user info */}
            <div>
              <img src={userInfo[userID].pic} className="profile-picture" alt="My profile" />
              <div>
                <a className="username" >{userID}</a>
                <span>{userInfo[userID].name}</span>
              </div>
              <Link className="blue link" to="/">Switch</Link>
            </div>
            <div>
              <div>
                <span></span>
                <h1>Suggestions For You</h1>
                <a >See All</a>
              </div>
              {suggestions}
            </div>
            {/* mini footer */}
            <footer className="mini">
              <ul>
                <li><a >About</a> ·</li>
                <li><a >Help</a> ·</li>
                <li><a >Press</a> ·</li>
                <li><a >API</a> ·</li>
                <li><a >Jobs</a> ·</li>
                <li><a >Privacy</a> ·</li>
                <li><a >Terms</a> ·</li>
                <li><a >Locations</a> ·</li>
                <li><a >Language</a></li>
              </ul>
              <span>© 2022 INSTAGRAM-CLONE FROM MIKE</span>
            </footer>
          </div>
        </div>

        <Footer />

      </div>
  );
};

export default Feed;