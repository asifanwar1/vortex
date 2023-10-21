import React, { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import "../stylesheets/textRecognition.css"
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner';
import { addToSelectedChat } from '../features/selectedChats/selectedChatSlice';
import { textWithParentId, newText, getAllChats } from '../features/chats/chatSlice';



const TextRecognition = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const selectedChat = useSelector(state => state.selectedChat);
    
    const [modalShow, setModalShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [recognizedText, setRecognizedText] = useState('');
    
    const handleImageUpload = (event) => {
        const image = event.target.files[0];
        setSelectedImage(URL.createObjectURL(image));
    };


    useEffect(() => {
        const recognizeText = async () => {
            if (selectedImage) {
                const result = await Tesseract.recognize(selectedImage);
                setRecognizedText(result.data.text);
            }
        };
        recognizeText();
    }, [selectedImage]);


    const handleInputChange = (event) => {
        setRecognizedText(event.target.value);
    };
    



    const handleHideModal = () =>{
        setRecognizedText('');
        setSelectedImage(null);
        setModalShow(false);
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
            // let selectedChat = props.data.selectedChat;
            let msgData ={
                userText,
                selectedChat
            }

            const resultAction = dispatch(textWithParentId(msgData));
            resultAction.then((action) => {
                dispatch(addToSelectedChat(action.payload));
                dispatch(getAllChats());
                setRecognizedText('');
                setSelectedImage(null);
            });
        }
        else{
            let userText = recognizedText;
        
            const resultAction = dispatch(newText(userText));
            resultAction.then((action) => {
                dispatch(addToSelectedChat(action.payload));
                dispatch(getAllChats());
                setRecognizedText('');
                setSelectedImage(null);
            });
        }
    }



    


  return (
    <>
        <Nav.Link onClick={() => setModalShow(true)}>Image-Recognition</Nav.Link>

        <Modal show={modalShow} onHide={handleHideModal} size="md" centered >
            <Modal.Header closeButton className='modalHeader'>
                <Modal.Title id="contained-modal-title-vcenter">Image-Recognition</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalBody'>
                <Container>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Choose an image with text:</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleImageUpload} className='fileInput'/>
                    </Form.Group>
                    <Row className="justify-content-md-center">
                        {selectedImage && <img src={selectedImage} alt="Selected"  className='ocrImage'/>}
                    </Row>
                </Container>
                <br></br>
                <Container>
                    <h5>Recognized Text:</h5>
                    {selectedImage && !recognizedText ?
                        <Container className="spinner">
                            <Row className="justify-content-md-center">
                                <Spinner animation="grow" variant="dark"/>
                            </Row>
                            <br></br>
                            <Row className="justify-content-md-center">
                                <h5> Please Wait...</h5>
                            </Row>
                        </Container>
                    
                    :
                        <Form.Group className="mb-3" >
                            <Form.Control as="textarea" rows={5} value={recognizedText} onChange={handleInputChange} className='imageTextInput'/>
                        </Form.Group>
                        // <p>{recognizedText}</p>
                    }
                </Container>
            </Modal.Body>
            <Modal.Footer className='modalFooter'>
                    <Button onClick={handleSendToVortexBtn} className="addBtn">Send To Vortex</Button>
                    <Button onClick={handleCopyTextBtn} className="addBtn">Copy Text</Button>
                    <Button onClick={handleHideModal} className="addBtn">Close</Button>
            </Modal.Footer>
        </Modal>



    </>
  )
}

export default TextRecognition