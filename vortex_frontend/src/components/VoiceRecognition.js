import React, { useEffect, useState } from 'react';
import "../stylesheets/textRecognition.css"
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { useSelector, useDispatch } from 'react-redux'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { addToSelectedChat } from '../features/selectedChats/selectedChatSlice';
import { textWithParentId, newText, getAllChats } from '../features/chats/chatSlice';
import { BsRecordCircle } from "react-icons/bs";
import { BsStopCircle } from "react-icons/bs";
import { BsMicMute } from "react-icons/bs";
import { BsMic } from "react-icons/bs";
import { BiReset } from "react-icons/bi";


const VoiceRecognition = () => {

    const dispatch = useDispatch()

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable
    } = useSpeechRecognition();

    

    const selectedChat = useSelector(state => state.selectedChat);
    
    const [modalShow, setModalShow] = useState(false);
    const [recognizedText, setRecognizedText] = useState('');
  
    



    useEffect(() => {
        const recognizeText = async () => {
            if (transcript) {
                setRecognizedText(transcript);
            }
        };
        recognizeText();
    }, [transcript]);




    const handleInputChange = (event) => {
        setRecognizedText(transcript + event.target.value);
    };
    


    const handleHideModal = () =>{
        setRecognizedText('');
        setModalShow(false);
        console.log(recognizedText)
    }


    const handleCopyTextBtn = async () =>{
        try {
            await navigator.clipboard.writeText(recognizedText);
            console.log('Text copied to clipboard');
        } catch (error) {
            console.error('Failed to copy text: ', error);
        }
    }



    const handleSendToVortexBtn = async () =>{
        if(selectedChat.length > 0){
            let userText = recognizedText;
         
            let msgData ={
                userText,
                selectedChat
            }
    
            const resultAction = dispatch(textWithParentId(msgData));
            resultAction.then((action) => {
                dispatch(addToSelectedChat(action.payload));
                dispatch(getAllChats());
            
            });
        }
        else{
            let userText = recognizedText;

            const resultAction = dispatch(newText(userText));
            resultAction.then((action) => {
                dispatch(addToSelectedChat(action.payload));
                dispatch(getAllChats());
         
            });
        }
    }



  return (
    <>
        <Nav.Link onClick={() => setModalShow(true)}>Speech-Recognition</Nav.Link>

        {!browserSupportsSpeechRecognition || !isMicrophoneAvailable ?
            <Modal show={modalShow} onHide={handleHideModal} size="md" centered>
                <Modal.Header closeButton className='modalHeader'><Modal.Title>Speech-Recognition</Modal.Title></Modal.Header>
                <Modal.Body className='modalBody'>
                    <p>Please check the following:</p>
                    <p>Make sure your Microphone is available.</p>
                    <p>Also, Make sure your browser supports Speech Recognition.</p>
                </Modal.Body>
                <Modal.Footer className='modalFooter'>
                    <Button onClick={handleHideModal} className="addBtn">Close</Button>
                </Modal.Footer>
            </Modal>
        :
            <Modal show={modalShow} onHide={handleHideModal} size="md" centered>
                <Modal.Header closeButton className='modalHeader'><Modal.Title>Speech-Recognition</Modal.Title></Modal.Header>
                <Modal.Body className='modalBody'>
                    <Container>
                        {listening ?
                            <Container>
                                <Row className="justify-content-md-center">
                                    <Col md lg={4}>
                                        Microphone: <BsMic className="iconBtn"/>
                                    </Col>
                                </Row>
                                <Row className="justify-content-md-center">
                                    <Col md lg={6}>
                                        <Button onClick={SpeechRecognition.stopListening} className="addBtn"><BsStopCircle className="iconBtn"/>{' '}Stop Recording</Button>
                                    </Col>
                                    <Col md lg={4}>
                                        <Button onClick={resetTranscript} className="addBtn"><BiReset className="iconBtn"/>{' '}Reset</Button>
                                    </Col>
                                </Row>
                            </Container>
                        :
                            <Container>
                                <Row className="justify-content-md-center">
                                    <Col md lg={4}>
                                        Microphone: <BsMicMute className="iconBtn"/>
                                    </Col>
                                </Row>
                                <Row className="justify-content-md-center">     
                                    <Col md lg={6}>
                                        <Button onClick={SpeechRecognition.startListening} className="addBtn"><BsRecordCircle className="iconBtn"/>{' '}Start Recording</Button>
                                    </Col>
                                </Row>
                            </Container>
                        }
                    </Container>
                    <br></br>
                    <Container>
                        <h5>Recognized Text:</h5>
                        <Form.Group className="mb-3" >
                            <Form.Control as="textarea" rows={5}  defaultValue={transcript} onChange={handleInputChange} className='imageTextInput'/>
                        </Form.Group>                    
                    </Container>
                </Modal.Body>
                <Modal.Footer className='modalFooter'>
                    <Button onClick={handleSendToVortexBtn} className="addBtn">Send To Vortex</Button>
                    <Button onClick={handleCopyTextBtn} className="addBtn">Copy Text</Button>
                    <Button onClick={handleHideModal} className="addBtn">Close</Button>
                </Modal.Footer>
            </Modal>
        }

    </>
  )
}

export default VoiceRecognition