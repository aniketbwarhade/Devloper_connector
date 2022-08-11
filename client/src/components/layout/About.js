import React from 'react'

const About= ()=>{

        return (
            <div className="abt">

                <h1>About The Website </h1>

                <div className='abt2'> 
                    <p id='p1'>
                        <u>DevConnector</u> is a social media platform for Developers to connect, share ideas and
                        create new innovations useful for the community.
                        It is mainly designed to share the ideas, skills and knowledge to wide developers around the world. 
                        New Bees can easily interact with the experienced developers and they can tune their skills. Also, Developers 
                        can express their sharing and teaching skills.
                        DevConnector is a full stack application built on the MERN stack (MongoDB, Express, React and Node) and utilises a range of open source libraries to assist with accelerating development time and improving authentication security. MongoDB was chosen as the Database Management System (DBMS) for several reasons, including that it affords dynamic and flexible document schemas that can contain a wide range of data attached to both patients and doctors respectively. Furthermore, MongoDB stores document data in Binary JSON (BSON), which integrates seamlessly with the core JavaScript-driven technologies of DevConnector’s tech stack.



                    </p>
                    <hr/>
                    <p>
                        <b>Major features of the app are: -</b>
                        <l>
                            <li> developers can register, login and connect with each other</li>
                            <li> Developers can post, share ideas, comment on other's post and like
                            </li>
                        </l>
                    </p>
                    <hr/>
                    <p>
                        <b>Target Audience :</b>

                        <br/>
                        <p>
                        Mainly designed for the buddies who are very eager to learn programming and <br/>
                        they miss the oppurtunity to connect with senior or skilled devleopers.
                        This platform will be <br/>a sugar syrup for them to build a sweet applications.
                        </p>       
                    </p>
                    <hr/>
                    <p>
                        <b>Tech Stack: -</b>
                        <ul>
                            <li> mongoDB</li>
                            <li>React</li>
                            <li>Node.js</li>
                            <li>Express</li>
                        </ul>
                    </p>
                    <hr/>
                    <p> 
                        DevConnector - 2022
                        <p>Made By Aniket Warhade and Muddayya Swami</p>
                    </p>
                </div>
            </div>
        );
};

export default About;