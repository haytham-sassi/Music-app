import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,
         faAngleLeft, 
         faAngleRight, 
         faPause} 
         from '@fortawesome/free-solid-svg-icons'


const Player = ({setCurrentSong, currentSong, isPlaying, setIsPlaying, songRef, songInfo, setSongInfo, songs}) => {
    //const
    
    //console.log(songRef);
    //function
    const playSongHandler = async () => {
      if (isPlaying) {
        await songRef.current.pause();
        setIsPlaying(!isPlaying);
      } else {
        await songRef.current.play();
        setIsPlaying(!isPlaying);
      }
    };



    const timeFormat = (time) => {
        return (
            Math.floor(time / 60) + ":" + ('0' + Math.floor(time% 60 )).slice(-2)
        )
    };

    const dragHandler = (e) => {
        songRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo,currentTime: e.target.value})
    };

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === "skip-forward") {
          await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
          //activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }
        if (direction === "skip-back") {
          if ((currentIndex - 1) % songs.length === -1) {
            await setCurrentSong(songs[songs.length - 1]);
            //activeLibraryHandler(songs[songs.length - 1]);
          } else {
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            //activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
          }
        }
        if (isPlaying) songRef.current.play();
        //playAudio(isPlaying, audioRef);
      };
    
    return (
        <div className="player">

            <div className="time-control">
                <p>{timeFormat (songInfo.currentTime) }</p>
                <input
                min={0}
                //added or 0 to fix the issue
                max={songInfo.duration || 0}
                value={songInfo.currentTime}
                onChange={dragHandler}
                type="range" />
                
                <p>{ songInfo.duration ? timeFormat (songInfo.duration) : "0:00" }</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler("skip-back")} className='skip-backword' size='2x' icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className='play' size='2x' icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={() => skipTrackHandler("skip-forward")} className='skip-forward' size='2x' icon={faAngleRight} />
            </div>


        </div>

    );
};


export default Player;