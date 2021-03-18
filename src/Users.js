import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Users = () => {
    const [items, setItems] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        getUsers();
    }, []);

    
    const filteredUsers = items.filter((value) => {
        return value.login.includes(input.toLowerCase());
    })
    
    const getUsers = () => {
        axios.get("https://api.github.com/users?page=1&per_page=100").then(response => {  
            setItems(response.data);
        })
    }

    const cardStyle = {
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        maxWidth: '400px',
        margin: '0 1.2rem'
    }
    const avatar = {
        borderRadius: '50%',
        height: '3rem',
        width: '3rem',
        objectFit: 'cover',
        objectPosition: 'center'
    } 
    const redirect = (url) => {
        window.open(url, '_blank');
    }
    
    return (
        <div class="container">
           <h1 class="title">USERS</h1><br></br>
           <input class="input-space"
           placeholder="Search for Users in Github"
           onChange={(e) => setInput(e.target.value)}
           > 
           </input>
            <br></br>
            <div class="columns is-multiline is-desktop is-narrow-mobile is-narrow-tablet is-3">
           {input.length > 0 ? filteredUsers.map((item) => {
               return (   
                <div class="column is-half is-narrow is-half-tablet is-offset-1 is-4" style={cardStyle}>
                <div class="card">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img alt="" style={avatar} src={item.avatar_url}></img>
                                </figure>
                            </div>
                                <div class="media-content">
                                    <p class="title is-4">{item.login}</p>
                                    <p class="subtitle is-6">@ {item.login}</p>
                                </div>
                            </div>
                            <div class="content" style={{textAlign: 'left'}}>
                                <p style={{wordBreak: 'break-all', marginBottom: '.5rem'}}>{item.html_url}</p>
                                <button 
                                style={{marginTop: '1rem', marginBottom: '1rem'}}
                                class="button is-link is-outlined"
                                onClick={() => redirect(item.html_url)} 
                                >Visit my profile</button><br></br>
                                Checkout my Repos: <br></br>
                                <Link to={`user/${item.login}`}>
                                    <button
                                    style={{marginTop: '1rem'}}
                                    class="button is-info is-outlined"
                                    >Repos</button>
                                </Link>
                                
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

export default Users
