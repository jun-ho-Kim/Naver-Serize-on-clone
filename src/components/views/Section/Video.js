import React from 'react';
import PropTypes from "prop-types";

export const Video = ({videoKey}) => {
    console.log("videoKey", videoKey)
    return (
    <div className='h-2/4 flex justify-center items-start mb-14'>
        {videoKey === undefined ? "" : (
        <iframe id="ytplayer" type="text/html" width="640" height="360"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=0`}
            frameborder="0">
        </iframe>

        )}
    </div>
    )
}
Video.prototype = {
    videoKey: PropTypes.string,
};