import React, { useState, useEffect } from "react";
import "../stylesheets/vassistant.css"
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner';
import ParsedContent from "../components/ParsedContent";
import NavBar from "../components/NavBar";
import { addToSelectedChat } from "../features/selectedChats/selectedChatSlice";
import { newText, textWithParentId, getAllChats } from "../features/chats/chatSlice";
import TextToSpeech from "../components/TextToSpeech";
import { BsSend } from "react-icons/bs";
import Instructions from "../components/Instructions";



const VAssistant = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const selectedChat = useSelector(state => state.selectedChat);
    const { chats, isLoading, isError, message } = useSelector(
      (state) => state.chats
    )
 

    useEffect(() => {
      
      if (!user) {
        navigate('/signin')
      }

      // if(isError){
      //   console.log(isError)
      // }
      dispatch(getAllChats());
 
    }, [user, navigate, dispatch]);


    const [userText, setUserText] = useState("");



 


    const handleSendText = async (event) => {
      event.preventDefault();

        if(!userText){
          console.log("plz enter something")
          window.alert("error");
        }
        else{

          if(userText && selectedChat.length > 0){
            let msgData ={
              userText,
              selectedChat
            }
            const resultAction = dispatch(textWithParentId(msgData));
            resultAction.then((action) => {
              dispatch(addToSelectedChat(action.payload));
              dispatch(getAllChats());
            });
            setUserText('');
  
          }
          else{
            const resultAction = dispatch(newText(userText));
            resultAction.then((action) => {
              dispatch(addToSelectedChat(action.payload));
              dispatch(getAllChats());
              setUserText('');

            });
          } 
        }
      

    }

  return (
    <>
      <NavBar/>    

      <Container className='chatMainCont'>
          <Row className="justify-content-md-center">
            <Col md lg={12}>
              {selectedChat.length > 0 ?
                <Container className="chatArea">
                  {selectedChat.map((element, index)=>
                    <Container className="chatList" key={index}>
                      <br></br>
                      <Row className="chatListUser">
                        <Col sm md={1}>
                          <img src="/vortexPerson1.png" alt="logo" className="logoImg"/>
                        </Col>
                        <Col sm md={8}>
                          {element.question}
                        </Col>
                      </Row>
                      <br></br>
                      <Row className="chatListVortex">
                        <Col md lg={1}>
                          <img src="/vortexLogo1.png" alt="logo" className="logoImg"/>
                        </Col>
                        <Col md lg={8}>
                          <ParsedContent content={element.text}/>
                        </Col>
                        <Col md lg={1}>
                          <TextToSpeech data={element.text}/>
                        </Col>
                      </Row>
                    </Container>
                  )}
                  {isLoading ?
                    <Container className="spinner">
                      <Row className="justify-content-md-center">
                            <Spinner animation="grow" variant="dark"/>
                      </Row>
                      <br></br>
                      <Row className="justify-content-md-center">
                        <h1> Please Wait...</h1>
                      </Row>
                    </Container>
                  :
                    <></>
                  }
                </Container>       
              :
                <Container className="chatArea">   
                  <br></br>                
                  <Row className="chatListVortex">
                      <Col sm md={1}>
                        <img src="/vortexLogo1.png" alt="logo" className="logoImg"/>
                      </Col>
                      <Col sm md={8}>
                        {isLoading ?
                          <Container className="spinner">
                            <Row className="justify-content-md-center">
                              <Col md lg={10}>
                                <Spinner animation="grow" variant="dark"/>
                              </Col>
                            </Row>
                            <br></br>
                            <Row className="justify-content-md-center">
                              <Col md lg={10}>
                                <h1> Please Wait...</h1>
                              </Col>
                            </Row>
                          </Container>
                        :
                          <Instructions/>
                        }
                      </Col>
                    </Row>
                </Container>       
              }
            </Col>       
          </Row>
          <br></br>
          <Row className="justify-content-md-center">
            <Col md lg={12}>
                <InputGroup className="inputGroup">
                  <Form.Control
                    as="textarea" rows={2}
                    placeholder="Enter Text" aria-label="Recipient's username with two button addons"
                    type="text" className='textInput' value={userText} onChange={(e)=>setUserText(e.target.value)} 
                  />
                  
                  <Button variant="outline-secondary" className='textSubmitBtn' onClick={handleSendText}><BsSend/></Button>
                </InputGroup>        
            </Col>
          </Row>            
        </Container>
    </>
  )
}

export default VAssistant