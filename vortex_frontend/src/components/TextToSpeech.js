import React, { useEffect, useState } from 'react';
import "../stylesheets/textRecognition.css"
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { HiOutlineSpeakerXMark } from "react-icons/hi2";


const TextToSpeech = (props) => {

    const availableVoices = window.speechSynthesis.getVoices();
    const [speaking, setSpeaking] = useState(false);
    const [speechUtterance, setSpeechUtterance] = useState(null);
    const [scheduledSentences, setScheduledSentences] = useState([]);

    const speakText  = (textToSpeak) => {
        const selectedVoice = availableVoices[6];
    
        if ('speechSynthesis' in window && props.data) {
            const speechUtterance = new SpeechSynthesisUtterance(textToSpeak);
            speechUtterance.voice = selectedVoice;
            speechUtterance.rate = 1.1;
            speechUtterance.onstart = () => setSpeaking(true);
            speechUtterance.onend = () => setSpeaking(false);
            window.speechSynthesis.speak(speechUtterance);
            setSpeechUtterance(speechUtterance);
        } else {
            console.error('Speech synthesis not supported in this browser.');
        }
    };



    const speakLongText = () => {
        if (!props.data) {
          return;
        }
    
        const sentences = props.data.split('.'); // Split text into sentences based on periods
    
        sentences.forEach((sentence, index) => {
          const sentenceWithPeriod = sentence.trim() + '.';
          if (sentenceWithPeriod.trim() !== '') {
            const sentenceTimeout = setTimeout(() => {
              if (speaking) {
                stopSpeaking();
              }
              speakText(sentenceWithPeriod);
            }, index * 2000);
             
            setScheduledSentences((prevScheduledSentences) => [
                ...prevScheduledSentences,
                sentenceTimeout,
            ]);
          }
        });
    };



    const handleSpeak = () => {
        if (props.data.trim() !== '') {
            clearScheduledSentences();
            stopSpeaking();
            speakLongText();
        }
    };



    const stopSpeaking = () => {
        if (speechUtterance) {
            speechUtterance.onend = null;
            window.speechSynthesis.cancel();
            setSpeaking(false);
        }
    };


    const clearScheduledSentences = () => {
        scheduledSentences.forEach((sentenceTimeout) => {
          clearTimeout(sentenceTimeout);
        });
        setScheduledSentences([]);
    };



    const handleStop = () => {
        clearScheduledSentences();
        stopSpeaking();
    };


  return (
    <>
      <Container>
        {!speaking ?
          <Button onClick={handleSpeak} disabled={speaking} className="speakBtn"><HiOutlineSpeakerWave/></Button>
        :
          <Button onClick={handleStop} disabled={!speaking} className="speakBtn"><HiOutlineSpeakerXMark/></Button>
        }
      </Container>
    </>
  )
}

export default TextToSpeech