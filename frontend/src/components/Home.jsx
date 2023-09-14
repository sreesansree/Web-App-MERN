import React from 'react';
import "./Home.css";
const Home = () => {
    return (
        <div className="home-container">
            <div className="content">
                <>
                    <h1 className="heading">Welcome, </h1>
                    <p className="sub-heading">The Journey Begins here</p>
                </>
                <p className="sub-heading">
                    Hello User! Please login if you're our existing customer,
                    <br></br>
                    or you can always join us now!
                </p>
            </div>
        </div>
    );
}

export default Home;
