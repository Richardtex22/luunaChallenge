import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Repos = ({ match }) => {
    const id = match.params.user;
    const [repos, setRepos] = useState([]);
    const [search, setSearch] = useState("");
    
    useEffect(() => {
        fetchUser();
    }, []);
    const fetchUser = async () => {
       await axios.get(`https://api.github.com/users/${id}/repos?page=1&per_page=100`).then(response => {    
            
        console.log(response.data);    
        setRepos(response.data);  
        })
    }
    const filteredRepos = repos.filter((value) => {
        console.log(value.name.includes(search.toLowerCase()));
        return value.name.includes(search.toLowerCase());
    })
    console.log(filteredRepos);
    

    return (
        <div className="container">
           <h1>Repositories</h1><br></br>
           <input class="input input-space"
           placeholder="Search for repos"
           onChange={(e) => setSearch(e.target.value)}
           > 
           </input> 
        </div>
    )
}

export default Repos
