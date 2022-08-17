import React from "react";

const LibrarySong = ({song, setCurrentSong,songRef,isPlaying,songs,id,setSongs, currentSong}) => {

    const songSelectHandler = () =>{
        const selectedSong = songs.filter((state) => state.id === song.id)
        setCurrentSong(selectedSong[0]);
        //change the activate state for the song
        const newSongs = songs.map((song) => {
            if(song.id === id) {
                return {
                    //everything remains the same only change active
                    ...song,
                    active: true,
                };
            }else{
                return{
                    ...song,
                    active:false,
                };
            }
        }, [currentSong]);
        setSongs(newSongs)
        //check if the song is playing
        if(isPlaying){
            const playPromise = songRef.current.play();
            if(playPromise !== undefined) {
                playPromise.then((audio) => {
                    songRef.current.play();
                });
            }
        }

    };

    return (
        <div onClick={songSelectHandler}
        // add class if it is selected
        className={`song-container-librarby ${song.id === currentSong.id ? 'selected' : ""}`}>
            <img src={song.cover} alt={song.name} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>

    );

};

export default LibrarySong;