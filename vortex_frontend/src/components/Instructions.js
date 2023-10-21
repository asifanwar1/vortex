import React, { useState, useEffect } from "react";
import "../stylesheets/vassistant.css"
import Container from 'react-bootstrap/Container';

const Instructions = () => {
  return (
    <>
        <Container>
            <h4>Here are some instructions for users on how to use Vortex:</h4>

            <br></br>

            <h5>Basic Usage:</h5>

            <h6>1. Accessing Vortex:</h6>
                <p>To use Vortex, navigate to the application or website where it is hosted.</p>
   
            <h6>2. Navigation:</h6>
                <p>Vortex provides two main functionalities: <b>Speech Recognition</b> and <b>Image Text Recognition</b>.</p>
                <p>You can access these features through separate modals in the navigation bar.</p>

            <h6>3. Text Chat:</h6>
                <p>To initiate a text chat session with Vortex, start by typing your message in the chat input box at the bottom of the interface.</p>
                <p>Press "Enter" or click the "Send" button to send your message.</p>
                <p>Vortex will respond with relevant information or actions based on your input.</p>

            <h6>4. Speech Recognition:</h6>
                <p>To perform speech recognition:</p>
                <p> Click the "speech Recognition" button in the navigation bar.</p>
                <p>Ensure your microphone is enabled and that your browser has the necessary permissions to access it.</p>
                <p>Speak clearly into your microphone when prompted.</p>
                <p>Vortex will use speech recognition to understand your voice commands and respond accordingly.</p>

            <h6>5. Image Text Recognition:</h6>
                <p>To perform text recognition from an image:</p>
                <p> Click the "Image Recognition" button in the navigation bar.</p>
                <p>A modal will open, allowing you to upload an image.</p>
                <p>Upload an image containing text (e.g., a scanned document, screenshot, or photo).</p>
                <p>Vortex will process the image and display the recognized text.</p>

            <br></br>
            <h5>Tips for Best Results:</h5>

            <h6>6. Speech Recognition:</h6>
                <p>Speak clearly and concisely.</p>
                <p>Use natural language when giving voice commands.</p>

            <h6>7. Image Text Recognition:</h6>
                <p>Upload images with clear and legible text.</p>
                <p>High-resolution images work best for accurate text recognition.</p>

            <br></br>
            <h5>Troubleshooting:</h5>

            <h6>8. Microphone Permissions:</h6>
                <p>If you encounter issues with voice chat, check your browser's microphone permissions.</p>

            <h6>9. Image Recognition Errors:</h6>
                <p>If image text recognition results are inaccurate, consider using clearer images with better contrast and legibility.</p>

            <h6>10. Feedback:</h6>
                <p>If you experience any issues or have suggestions for improving Vortex, please provide feedback through the provided channels.</p>

                <p>Remember that Vortex is designed to assist you efficiently through text and voice interaction, as well as image text recognition. Enjoy using Vortex for your various tasks and inquiries!</p>

        </Container>
    </>
  )
}

export default Instructions