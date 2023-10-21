import React, { useState, useEffect } from "react";
import "../stylesheets/navbar.css"
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Nav from 'react-bootstrap/Nav';
import { getAllChats, deleteChat, reset } from "../features/chats/chatSlice";
import { setSelectedChat } from "../features/selectedChats/selectedChatSlice";
import { resetSelectedChat } from "../features/selectedChats/selectedChatSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { MdAdd } from "react-icons/md";



const SideBar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { chats, isLoading, isError, message } = useSelector(
        (state) => state.chats
    )


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    useEffect(() => {

      
      if (!user) {
        navigate('/signin');
      }
      else{
        dispatch(getAllChats())
      }

      
        return () => {
            dispatch(reset());
        }

    }, [user, navigate, isError, message, dispatch])


    const handleDeleteChat = async (chatId) =>{
        console.log(chatId)
        
        const resultAction = dispatch(deleteChat(chatId));
          resultAction.then((action) => {
            dispatch(getAllChats());
            // setUserText('');
          });

    }


    const handleChatClick = async (conversationId) =>{
        console.log(conversationId)
        try {
          const response = await axios.post('/sendConversationId', {conversationId})
          let data = response.data
          dispatch(setSelectedChat(data));
          console.log(data);
        } catch (error) {
          console.log(error);
        }
    }


    const handleNewChat = () =>{
        dispatch(resetSelectedChat());
    }


  return (
    <>
        <Nav.Link onClick={handleShow}>Previous Chats</Nav.Link>
        <Offcanvas show={show} onHide={handleClose} className="offCanvas">
            <Offcanvas.Header closeButton>
                <Button onClick={()=>handleNewChat()} className="addBtn"><MdAdd className="iconBtn"/>{' '}New Chat</Button>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <ListGroup >
                {chats ?
                <>
              {chats.map((element, index)=>
                <ListGroup.Item key={index} onClick={()=>handleChatClick(element.conversationId)} className="listItem">
                  <Container>
                    <Row>
                      <Col md lg={11}>
                        <p className="questionTag">{element.question.length > 27 ? `${element.question.substring(0, 27)}...` : element.question}</p>
                      </Col>
                      <Col md lg={1}>
                        <Button onClick={()=>handleDeleteChat(element.conversationId)} className="deleteBtn" ><AiOutlineDelete className="iconBtn"/></Button>
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
              )}
              </>
                :
                <></>
                }
            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>
    </>
  )
}

export default SideBar