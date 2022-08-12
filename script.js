const videoCard = document.querySelector(".video-container");

let api_key = "AIzaSyAQwdPlZit3m_CfX9Gr7R1MsrEkGwzNpMo";
let video_link = "https://youtube.googleapis.com/youtube/v3/videos?";
var channel_link = "https://youtube.googleapis.com/youtube/v3/channels?";

fetch(video_link + new URLSearchParams({
  key: api_key,
  part: 'snippet',
  chart: 'mostPopular',
  maxResults: 50,
  regionCode: 'IN'
}))
  .then((data) => data.json()).then((data2) => {
    console.log(data2);
    data2.items.forEach((ele) => {
      getChannelthumbnail(ele);
    })
  })
  .catch((error) => console.log(error));

const getChannelthumbnail = (video_data) => {
  fetch(channel_link + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    id: video_data.snippet.channelId
  }))
    .then((data) => data.json())
    .then((data1) => {
      // console.log(data1);
      video_data.channelThumbnail = data1.items[0].snippet.thumbnails.default.url;
      makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
  videoCard.innerHTML += `
  <div class="video col-md-4 col-sm-12" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
      <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
      <div class="content">
          <img src="${data.channelThumbnail}" class="channel-icon" alt="">
          <div class="info">
              <h6 class="title">${data.snippet.title}</h6>
              <p class="channel-name">${data.snippet.channelTitle}</p>
          </div>
      </div>
  </div>
  `;
}

const searchBar = document.querySelector('#search');
const searchFinder = document.querySelector('.search-finder');
let searchLink = "https://www.youtube.com/results?search_query=";

searchFinder.addEventListener('click', () => {
  if (searchBar.value.length) {
    location.href = searchLink + searchBar.value;
  }
});

var subscription = document.createElement("div");
subscription.setAttribute("class", "side-div-1 subscriptions");

var side_bar = document.querySelector(".side-bar");
subscription.innerHTML = 
"<h4>Subscriptions</h4>";

side_bar.append(subscription);

var sub_content = document.createElement("div");
sub_content.setAttribute("class", "sub-content");

let thumbnail,content;

var arr = fetch(video_link + new URLSearchParams({
  key: api_key,
  part: 'snippet',
  chart: 'mostPopular',
  maxResults: 50,
  regionCode: 'IN'
}))
  .then((data) => data.json())
  .then((data2) => {
    data2.items.slice(0,5).forEach((ele) => {
      for(let i=0;i<5;i++) {
        thumbnail = data2.items[i].snippet.thumbnails.high.url;
        content = data2.items[i].snippet.channelTitle;
        sub_content.innerHTML=
        `
        <img src="${thumbnail}">
        <p>${content}</p>
        `;
        subscription.append(sub_content);
      }
    })
  })