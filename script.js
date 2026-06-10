const songs = [
{
title:"God Mode",
artist:"V.M. Mahalingam",
src:"song1.mp3",
cover:"cover1.jpg"
},

{
title:"Master the Blaster",
artist:"Anirudh Ravichander",
src:"song2.mp3",
cover:"cover2.jpg"
},

{
title:"Engeyo Partha Mayakkam",
artist:"Piri Musiq",
src:"song3.mp3",
cover:"cover3.jpg"
},

{
title:"Vaadi Pulla Vaadi",
artist:"Hiphop Tamizhas",
src:"song4.mp3",
cover:"cover4.jpg"
},

{
title:"Ethir Neechal",
artist:"Sivakarthikeyan",
src:"song5.mp3",
cover:"cover5.jpg"
},

{
title:"Shape of You",
artist:"Ed Sheeran",
src:"song6.mp3",
cover:"cover6.jpg"
},



];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTimeEl =
document.getElementById("currentTime");

const durationEl =
document.getElementById("duration");

const playlist =
document.getElementById("playlist");

let songIndex = 0;

function loadSong(index){

const song = songs[index];

title.textContent = song.title;
artist.textContent = song.artist;
cover.src = song.cover;
audio.src = song.src;

document
.querySelectorAll("#playlist li")
.forEach(li=>li.classList.remove("active-song"));

if(document.querySelectorAll("#playlist li")[index]){
document.querySelectorAll("#playlist li")[index]
.classList.add("active-song");
}
}

songs.forEach((song,index)=>{

const li=document.createElement("li");

li.innerHTML=
`<strong>${song.title}</strong><br>${song.artist}`;

li.addEventListener("click",()=>{

songIndex=index;
loadSong(songIndex);
audio.play();

playBtn.innerHTML=
'<i class="fas fa-pause"></i>';

});

playlist.appendChild(li);

});

loadSong(songIndex);

playBtn.addEventListener("click",()=>{

if(audio.paused){

audio.play();

playBtn.innerHTML=
'<i class="fas fa-pause"></i>';

}else{

audio.pause();

playBtn.innerHTML=
'<i class="fas fa-play"></i>';
}

});

nextBtn.addEventListener("click",()=>{

songIndex++;

if(songIndex>=songs.length)
songIndex=0;

loadSong(songIndex);

audio.play();

playBtn.innerHTML=
'<i class="fas fa-pause"></i>';
});

prevBtn.addEventListener("click",()=>{

songIndex--;

if(songIndex<0)
songIndex=songs.length-1;

loadSong(songIndex);

audio.play();

playBtn.innerHTML=
'<i class="fas fa-pause"></i>';
});

audio.addEventListener("timeupdate",()=>{

progress.max=audio.duration;

progress.value=audio.currentTime;

let currentMinutes=
Math.floor(audio.currentTime/60);

let currentSeconds=
Math.floor(audio.currentTime%60);

if(currentSeconds<10)
currentSeconds="0"+currentSeconds;

currentTimeEl.textContent=
`${currentMinutes}:${currentSeconds}`;

let durationMinutes=
Math.floor(audio.duration/60)||0;

let durationSeconds=
Math.floor(audio.duration%60)||0;

if(durationSeconds<10)
durationSeconds="0"+durationSeconds;

durationEl.textContent=
`${durationMinutes}:${durationSeconds}`;

});

progress.addEventListener("input",()=>{

audio.currentTime=progress.value;

});

volume.addEventListener("input",()=>{

audio.volume=volume.value;

});

/* Autoplay Next Song */

audio.addEventListener("ended",()=>{

songIndex++;

if(songIndex>=songs.length)
songIndex=0;

loadSong(songIndex);

audio.play();

});