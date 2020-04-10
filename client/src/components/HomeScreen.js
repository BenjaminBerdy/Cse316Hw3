import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
    }
  }
`;

class HomeScreen extends Component {

    sortRecentWorks(logos){
        for (let i = 0; i < logos.length-1; i++){ 
        for (let j = 0; j < logos.length-i-1; j++){ 
            if (logos[j].lastUpdate < logos[j+1].lastUpdate) 
            { 
                let temp = logos[j]; 
                logos[j] = logos[j+1]; 
                logos[j+1] = temp; 
            } 
        }
        }
    }

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    return (
                        <div className="container row">
                            <div className="col s4">
                                <h3 id = "recent_work_heading">Recent Logos</h3>
                                {this.sortRecentWorks(data.logos), data.logos.map((logo, index) => (
                                    <div key={index} className='home_logo_link'
                                        style={{ cursor: "pointer" }}>
                                        <Link id="link" to={`/view/${logo._id}`}>{logo.text}</Link>
                                    </div>
                                ))}
                            </div>
                            <div className="col s8">
                                <div id="home_banner_container">
                                    GoLogoLo<br />
                                </div>
                                <div>
                                    <form action="/create">
                                        <button id = "new_work_button">Create New Logo</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;
