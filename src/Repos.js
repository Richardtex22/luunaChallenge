import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Repos = ({ match }) => {
    const id = match.params.user;
    const [repos, setRepos] = useState([]);
    const [search, setSearch] = useState("");
    const [color, setColor] = useState("");
    
    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        getColor();
    }, [search]);

    const fetchUser = async () => {
       await axios.get(`https://api.github.com/users/${id}/repos?page=1&per_page=100`).then(response => {      
        setRepos(response.data);  
        })
    }
    const filteredRepos = repos.filter((value) => {
        return value.name.includes(search.toLowerCase());
    })

    const redirect = (url) => {
        window.open(url, '_blank');
    }
    
    const getColor = () => {
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        const bgColor = "#" + randomColor;
        let style = {
            backgroundColor: bgColor
        }
        setColor(style);
        console.log(color);
    }
    const yellow = {
        backgroundColor: '#ffdd57'
    }
    
    return (
        <div className="container">
           <h1>Repositories</h1><br></br>
           <input class="input-space"
           placeholder="Search for user Repos"
           onChange={(e) => setSearch(e.target.value)}
           > 
           </input>
           <div class="columns is-multiline is-desktop is-narrow-mobile is-narrow-tablet is-3">
           {filteredRepos.length > 0 ? filteredRepos.map((card) => {
               return (   
                <div class="column is-half is-narrow-mobile is-narrow-tablet is-6" id={card.id}>
                <div class="card">
                    <div class="card-content">
                        <div class="media">
                                <div class="media-content card-text">
                                    <p class="subtitle is-4">
                                        <a onClick={() => redirect(card.html_url)}>{card.name}</a></p>
                                    <p class="subtitle is-5" style={{height: '70px', overflowY: 'scroll'}}>{card.description ? 
                                    card.description : 
                                    "N/A"}</p>
                                    <div class="last-container">
                                    <div class="circle-color" style={card.language === "JavaScript" ? yellow : color}>
                                        </div>
                                    <p class="subtitle is-6">{card.language ? card.language : "-"}</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
           )})
        : <h1 class="title is-3 center-cont" style={{marginTop: '2rem'}}>Repos dont found</h1> }
        </div>
    </div>
    )
}

export default Repos