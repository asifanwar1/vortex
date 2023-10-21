import React, { useState, useEffect } from "react";
import {NavLink, useNavigate} from "react-router-dom";
import "../stylesheets/signup.css"
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import Spinner from 'react-bootstrap/Spinner';





const SignIn = () => {

    const dispatch = useDispatch()
   
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");



    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      )
    
      useEffect(() => { 
        if (isError) {
        //   toast.error(message)
          console.log(message)
        }
    
        if (isSuccess || user) {
          navigate('/')
        }
    
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])
  


    const handleSingupSubmit = async (event) => {

        event.preventDefault();
        const form = event.currentTarget;
    
        if (form.checkValidity() === false) {
          event.stopPropagation();
        } 
        else {
            const userData = {
                userEmail,
                userPassword,
            }
          
            dispatch(login(userData))
        }
    
        setValidated(true);
        
    }

    if(isLoading){
        return <Container className="spinner">
            <Row className="justify-content-md-center">
                <Spinner animation="grow" variant="dark"/>
            </Row>
            <br></br>
            <Row className="justify-content-md-center">
                <h1> Please Wait...</h1>
            </Row>
        </Container>
    }



  return (
    <>
        <Container style={{textAlign:'center'}}>
            <img src="/abstract3.png" alt="vortex" className="signInLogoImage"/>
        </Container>
        <Container className="signUpMainCont">
            <Container style={{textAlign:'center'}}>
                <Row className="justify-content-md-center">
                    <Col>
                        <img src="/abstract2.png" alt="vortex" className="signInMainImage"/>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <Container style={{textAlign:'center'}}>
                <h3>SignIn</h3>
            </Container>
            <Row className="justify-content-md-center">
                <Col sm md={5}>
                    <Form method='POST' noValidate validated={validated} onSubmit={handleSingupSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="email" className='formInput' value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} placeholder="Enter email" />
                            <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" className='formInput' value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} placeholder="Password" />
                            <Form.Control.Feedback type="invalid">Please enter a password with a minimum length of 8 characters.</Form.Control.Feedback>
                        </Form.Group>
                        <br></br>
                        <Form.Group className="mb-3" style={{textAlign:'center'}}>
                            <Button className='formSignInBtn' variant="primary" type="submit" >
                                SignIn
                            </Button>
                        </Form.Group> 
                    </Form>
                </Col>
            </Row>
            <br></br>
            <Row className="justify-content-md-center">
                <Col sm md={5}>
                    <Container className='orCont'>
                        <p className='orTxt'>OR</p>
                    </Container>
                </Col>
            </Row>
            <br></br>
            <Row>
                <Container className='headingCont'>
                        <p className='accountTxt'>Need an account? <NavLink to="/signup" className='signUpTxt'>Sign Up</NavLink></p>
                </Container>    
            </Row>
            <br></br>
        </Container>



    </>
)}

export default SignIn










