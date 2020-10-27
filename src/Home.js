import React from 'react'

const Home = () => {
    const center = {
        padding: '1rem',
        margin: '1rem',
        width: '300px',
    }
    return (
        <div class="container">
           <h1 class="title is-3">This is Luuna.mx frontEnd challenge. </h1> 
           <div class="center-cont">
                <div style={center}>
                <p class="subtitle is-4">Tools used in this project:</p>
                    <p>React, Bulma 4, react-router-dom, Axios, Netlify for the app deployment.</p>
                    <p>***I didnt use Redux or Saga because I dont need a complete store management
                    for 2 arrays (the users and the repo´s users).
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home

