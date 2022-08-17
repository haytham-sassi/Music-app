import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({songs, setCurrentSong,songRef,isPlaying,setSongs,libraryState, currentSong}) => {

    return (
        <div className={`library ${libraryState ? 'active-library' : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
            {songs.map((song) => (
                <LibrarySong
                songRef={songRef}
                song={song}
                setCurrentSong={setCurrentSong}
                isPlaying={isPlaying}
                songs={songs}
                id={song.id}
                key={song.id}
                setSongs={setSongs}
                currentSong={currentSong}
                />
            ))}
            </div>
        </div>

    );

};

export default Library;