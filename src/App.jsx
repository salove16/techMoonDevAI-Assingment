import { useEffect, useState,useRef } from 'react';
import './App.css'
import icon from "./assets/creative.png"

import { run, readData} from './openAi'

function App() {
  const [textValue, setTextValue] = useState('');
  const [result, setResult] = useState([]);
  const resultsContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
          console.log(GENAI_APIKEY,"=========>")
console.log(GOOGLE_SPREAD_SHEET_API,"dotenv")
            const fetchedData = await readData();
            setResult(fetchedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);


  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleSubmit =async (event) => {
    event.preventDefault();
    try {
      const newResult = await run(textValue);
      
      // alert(`Result from fetchData: ${result}`);
      setResult(newResult);
      setTextValue('');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
  };
  
  useEffect(() => {
    if (resultsContainerRef.current) {
        resultsContainerRef.current.scrollTop = resultsContainerRef.current.scrollHeight;
    }
  }, [result]);

  return (
    <div className="chat-container">
    
      {/* <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message here..."
          className="chat-input"
        />
        <button type="submit" className="chat-submit-button">Send</button>
      </form> */}
      <div className="chat-messages">
      {result.length > 0 ? (
                <>
                    {result.map((item, index) => (
                        <div key={index}>
                            <p className='text-align-right'>
                         <strong> {item.Prompt}</strong>    </p>
                            <div className="ai-icon">
                            <img src={icon} alt="AI Icon" />
                            {item.Post}
                        </div> 
                         
                        </div>
                    ))}
                </>
            ) : (
                <p>No data available</p>
            )}
      </div>
      <br/>
      <form onSubmit={handleSubmit} className="chat-form">
        <textarea
          value={textValue}
          onChange={handleTextChange}
          className="chat-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="chat-submit-button">Send</button>
      </form>
    </div>
  );
}
export default App
