import React from 'react';
import { Container, Box, Button, Heading, Text, TextField} from 'gestalt'
import { setToken } from '../utils';
import ToastMessage from './ToastMessage';
import Strapi from 'strapi-sdk-javascript/build/main';
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

class Signup extends React.Component {
    state = {
     username: "",
     email: "",
     password: "",
     toast: false,
     toastMessage: '',
     loading: false
    }


    handleChange = ({event, value }) => {
        event.persist();
        this.setState({[event.target.name]:value});
    };

  handleSubmit = async event => {
      event.preventDefault();
      const {username, email, password} = this.state;

      if(this.isFormEmpty(this.state)){
          this.showToast('Fill in all fields');
          return;
   }
   // Sign up user
   try{
      this.setState({ loading: true});
      const response = await strapi.register(username, email, password);
      this.setState({ loading: false });
      setToken(response.jwt);
    this.redirectUser('/'); 
   }catch(err) {
    this.setState({ loading: false });
    this.showToast(err.message);
   }
};

  redirectUser = path => this.props.history.push(path);

  isFormEmpty = ({username, email, password}) => {
   return !username || !email || !password;
  };

  showToast = toastMessage => {
      this.setState({ toast: true, toastMessage});
      setTimeout(() => this.setState({toast: false, toastMessage: ''}), 5000);
  }

    render() {
    const { toastMessage, toast, loading} = this.state;

        return (
            <Container>
                <Box
                 dangerouslySetInlineStyle={{
                     __style: {
                         backgroundColor: '#ebe2da'
                     }
                 }}
                 margin={4}
                 padding={4}
                 shape="rounded"
                 display="flex"
                 justifyContent="center"

                >
                  {/* Signup Form */}
                  <form style={{
                      dislay: 'inlineBlock',
                      textAlign: 'center',
                      maxWidth: 450
                  }}
                    onSubmit={this.handleSubmit}
                  >
                    {/* Sign Up from */}
                   <Box 
                    marginBottom={2}
                    display="flex"
                    direction="column"
                    alignItems="center"
                   >
                    <Heading color="midnight">Lets get Started</Heading>
                    <Text italic color="orchid">Sign up to order some brew!</Text>
                   </Box>
                   {/* Username Input */}
                   <TextField 
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={this.handleChange}
                   />
                    {/* Email Address */}
                    <TextField 
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={this.handleChange}
                   />
                    {/* Password Input */}
                    <TextField 
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                   />
                   <Button inline disabled={loading} color="blue" text="Submit" type="submit"/>
                  </form>    
                </Box>
                <ToastMessage show={toast} message={toastMessage} />
            </Container> 
        );
    }
}

export default Signup;