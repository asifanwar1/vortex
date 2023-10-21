import React, { useState, useEffect } from "react";
import "../stylesheets/vassistant.css"
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Nav from 'react-bootstrap/Nav';
import { logout } from "../features/auth/authSlice";



const Profile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth)

    const [modalShow, setModalShow] = useState(false);
    const handleHideModal = () => setModalShow(false);


    useEffect(() => {
      
        if (!user) {
          navigate('/signin')
        }
   
    }, [user, navigate, dispatch]);



    const handleSignOut = () =>{
        dispatch(logout());
    }



  return (
    <>
        {!user ?
            <Nav.Link>Profile</Nav.Link>
        :
            <>
                <Nav.Link onClick={() => setModalShow(true)}>{user.userName}</Nav.Link>
                <Modal show={modalShow} onHide={handleHideModal} size="md" centered>
                    <Modal.Header closeButton className='modalHeader'><Modal.Title>Profile</Modal.Title></Modal.Header>
                    <Modal.Body className='modalBody'>
                        <Container className="profileCont">
                            <Row className="justify-content-md-center">
                                <Col>
                                    <img src='/vortexPerson.png' className="profileImages"/>
                                </Col>
                            </Row>
                            <br></br>
                            <Row className="justify-content-md-center">
                                <h5>{user.userName}</h5>
                            </Row>
                            <Row className="justify-content-md-center">
                                <h5>{user.userEmail}</h5>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer className='modalFooter'>
                        <Button onClick={handleSignOut} className="addBtn">SignOut</Button>
                    </Modal.Footer>
                </Modal>
            </>
        }

    </>
  )
}

export default Profile