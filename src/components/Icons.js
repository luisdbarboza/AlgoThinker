import React from 'react';

const GoBackIcon = () => {
    return <Icon src={`/assets/img/icons/arrow_back.svg`} name="Go back" width="1rem" height="1rem" /> 
};

const PlayIcon = () => {
    return <Icon src={`/assets/img/icons/play.svg`} name="Play" width="1rem" height="1rem" /> 
}

const GoForwardIcon = () => {
    return <Icon src={`/assets/img/icons/arrow_forward.svg`} name="Go back" width="1rem" height="1rem" /> 
};

const ResetIcon = () => {
    return <Icon src={`/assets/img/icons/reset.svg`} name="Reset" width="1rem" height="1rem" />   
}

const PauseIcon = () => {
    return <Icon src={`/assets/img/icons/pause.svg`} name="Pause" width="1rem" height="1rem" />      
}

const Icon = ({src, name, width, height}) => {
    return (
        <div style={{
            width,
            height,
        }}>
            <img src={src} style={{
                width: "100%",
                height: "100%"
            }} alt={`${name} icon`}/>
        </div>
    );
}

export {
    GoBackIcon,
    PlayIcon,
    GoForwardIcon,
    ResetIcon,
    PauseIcon
};