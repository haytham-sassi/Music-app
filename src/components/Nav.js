import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons'

const Nav = ({libraryState,setLibraryState}) => {
    return(
    <nav>
        <h1>Logo</h1>
        <button onClick={() => setLibraryState(!libraryState)}>
        <FontAwesomeIcon icon={faMusic} className="music-icon" />Library
        </button>
    </nav>
    );
};


export default Nav;