import React, {useRef, useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
 
//import styles
import './styles/app.scss';
//import data
import data from "./util";


function App() {

  const songRef = useRef(null);

  //state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration:0
  });
  const [libraryState,setLibraryState] = useState(false);


  const timeUpdateHandler = (e) => {
  const current = e.target.currentTime;
  const duration = e.target.duration;
  //cause it s object
  setSongInfo ({...songInfo,
                currentTime:current,
                duration})
};

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying){ songRef.current.play();
    }else{
      songRef.current.play();
    }
  };

  return (
    <div className="App">
      <Nav 
      libraryState={libraryState}
      setLibraryState={setLibraryState}
      />
      <Song currentSong={currentSong}/>
      <Player
      songRef={songRef}
      currentSong={currentSong}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      setSongInfo={setSongInfo}
      songInfo={songInfo}
      songs={songs}
      setCurrentSong={setCurrentSong}
      />
      <Library
      songs={songs}
      setCurrentSong={setCurrentSong}
      songRef={songRef}
      isPlaying={isPlaying}
      setSongs={setSongs}
      libraryState={libraryState}
      currentSong={currentSong}
      />
      <audio
      onTimeUpdate={timeUpdateHandler}
      onLoadedMetadata={timeUpdateHandler}
      ref={songRef}
      src={currentSong.audio}
      onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
