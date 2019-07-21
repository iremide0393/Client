import React from "react";
import { Box, Text, Heading, Image, Button } from "gestalt";
import { getToken, clearToken, clearCart } from '../utils';
import { NavLink, withRouter } from "react-router-dom";

  class Navbar extends React.Component{
   handleSignout = () => {
      clearToken();
      clearCart();
      this.props.history.push('/');
   }

    render() {
      return getToken() !== null ? 
      <AuthNav handleSignout={this.handleSignout} /> 
       : <UnAuthNav />;
    }
 
};

const AuthNav = ({ handleSignout }) => (
  <Box display="flex" 
  alignItems="center" 
  justifyContent="around"
  height={70} 
  color="midnight" 
  padding={1}
  shape="roundedBottom"
  >
  {/* Checkout link */}
  <NavLink activeClassName="active" to="/checkout">
   <Text size="x1" color="white">
      Checkout
  </Text> 
  </NavLink>
  
  
  {/* Title and Logo */}
  <NavLink activeClassName="active" exact  to="/">
      <Box display="flex" alignItems="center">
      <Box margin={2} height={50} width={50}>
      <Image 
        alt="Safaya Logo"
        naturalHeight={1}
        naturalWidth={1}
        src="./icons/logo.svg"
      />
      </Box>
      <Heading size="xs" color="orange">
       Safaya
      </Heading>
      </Box>
  
  </NavLink>
  
  {/* Checkout link */}
    
    <Button onClick={handleSignout}  color="transparent" text="Sign out" inline size="md" />

    </Box>  

)


const UnAuthNav = () => (
<Box display="flex" 
alignItems="center" 
justifyContent="around"
height={70} 
color="midnight" 
padding={1}
shape="roundedBottom"
>
{/* sign in link */}
<NavLink activeClassName="active" to="/signin">
 <Text size="x1" color="white">
     Sign In
</Text> 
</NavLink>


{/* Title and Logo */}
<NavLink activeClassName="active" exact  to="/">
    <Box display="flex" alignItems="center">
    <Box margin={2} height={50} width={50}>
    <Image 
      alt="Safaya Logo"
      naturalHeight={1}
      naturalWidth={1}
      src="./icons/logo.svg"
    />
    </Box>
    <Heading size="xs" color="orange">
     Safaya
    </Heading>
    </Box>

</NavLink>

{/* sign up link */}
<NavLink activeClassName="active" to="/signup">
 <Text size="x1" color="white">
     Sign Up
</Text> 
</NavLink>

  </Box>  
);
   


export default withRouter(Navbar);