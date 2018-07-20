import React from 'react';
import { Navbar, NavbarBrand, Button, Input } from 'reactstrap'

const NavHeader = props => {

  if(props.route === "/songs") {
    return (
      <div>
        <Navbar id="header" className="fixed-top" color="faded" light>
          <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
          <Button color="link" style={{color:'white'}} onClick={() => props.handleClick}>Add</Button>
        </Navbar>
      </div>
    )
  } else {
    return (
      <div>
        <Navbar id="header" className="fixed-top" color="faded" light>
          <Input
            type="search"
            name="search"
            id="searchInput"
            placeholder="Add a song"
            style={{borderColor:'#fff'}}
            value={this.props.query}
            onChange={this.props.handleChange}/>
        </Navbar>
      </div>
    )
  }

}


export default NavHeader;
