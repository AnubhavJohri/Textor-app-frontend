import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import { NavLink , Link } from 'react-router-dom';
import { Navbar  } from 'react-bootstrap';
import '../index.css';

export default class Navbar1 extends React.Component{
    // constructor(props){
    //     super(props);
    // }
    
    render(){
        const guestLinks =(
            <React.Fragment>
                <NavLink activeStyle = {{color : "white"}} style={{ color: "white" }} activeClassName="chosen" className="nav-link" to="/home">HOME</NavLink>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <NavLink activeStyle = {{color : "white"}} style={{ color: "white" }} activeClassName="chosen" className="nav-link " to="/history">HISTORY</NavLink>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </React.Fragment>
        );
        console.log("render navbar=" ); 
        return (
            <React.Fragment>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Link to="/home">
                      <Navbar.Brand >Textor</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto navbar-list">
                            {guestLinks}
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>
            </React.Fragment>
        );
    }
}

