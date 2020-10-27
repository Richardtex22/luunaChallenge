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
    console.log(filteredRepos);

    const redirect = (url) => {
        window.open(url, '_blank');
    }
    
    const getColor = () => {
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        const bgColor = "#"+randomColor;
        let style = {
            backgroundColor: bgColor
        }
        setColor(style);
        console.log(color);
    }

    const yellow = {
        backgroundColor: '#ffdd57'
    }
    const contain = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left'
    }
    
    return (
        <div className="container">
           <h1>Repositories</h1><br></br>
           <input class="input-space"
           placeholder="Search for user Repositories"
           onChange={(e) => setSearch(e.target.value)}
           > 
           </input>
           <div class="columns is-multiline is-mobile is-4">
           {search.length > 0 && repos && repos.length > 0 ? filteredRepos.map((card) => {
               return (   
                <div class="column is-half" id={card.id}>
                <div class="card" style={{textAlign: 'left'}}>
                    <div class="card-content">
                        <div class="media">
                                <div class="media-content">
                                    <p class="subtitle is-4">
                                        <a onClick={() => redirect(card.html_url)}>{card.name}</a></p>
                                    <p class="subtitle is-5" style={{height: '70px', overflowY: 'scroll'}}>{card.description ? 
                                    card.description : 
                                    "N/A"}</p>
                                    <div style={contain}>
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
        : null }
        </div>
        </div>
    )
}

export default Repos