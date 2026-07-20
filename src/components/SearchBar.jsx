import { useEffect, useState } from 'react'
import './SearchBar.css'

export default function SearchBar({updateInfo, startLoading}) {
    let [input, setInput] = useState("");
    let [history,setHistory] = useState([]);
    let [showHistory, setShowHistory] = useState(false);

    const ApiUrl = "https://www.omdbapi.com";
    const ApiKey = import.meta.env.VITE_OMDB_API_KEY;

    //Loading old History when the page first opens
    useEffect(() => {
        let savedHistory = localStorage.getItem("searchHistory");
        if(savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    },[]);


    let getMovieInfo = async (searchTerm) => {
        let response = await fetch(`${ApiUrl}/?apikey=${ApiKey}&s=${searchTerm}`);
        let jsonResponse = await response.json();
        return jsonResponse;
    }

    //Saving a new Search every time you search something
    let saveToHistory = (term) => {
        let updatedHistory = [term, ...history.filter((item) => item !== term)];
        updatedHistory = updatedHistory.slice(0,8);
        setHistory(updatedHistory);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }

    let handleInput = (e) => {
        console.log("handleInput called with:", e.target.value);
        setInput(e.target.value);
    }

    let handleSearch = async() => {
        if(input.trim() === "") return;
        startLoading();
        let newInfo = await getMovieInfo(input);
        updateInfo(newInfo);
        saveToHistory(input);
        setInput("");
        setShowHistory(false);
    }

    let handleHistoryClick = async (term) => {
        setInput(term);
        startLoading();
        console.log("Input set to:", term);
        let newInfo = await getMovieInfo(term);
        updateInfo(newInfo);
        setShowHistory(false);
    }

    let handleClear = () => {
        setInput("");
    }

    let clearHistory = () => {
        setHistory([]);
        localStorage.removeItem("searchHistory");
    }

    let removeHistoryItem = (term) => {
        let updatedHistory = history.filter((item) => item !== term);
        setHistory(updatedHistory);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }
    return(
        <> 
            <div style={{ position: "relative" }}>
                <h1>CineFind</h1>
                <h3>Find any movie in seconds</h3>
                <span className='searchSpan'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </span>

                <input type='text' placeholder='Search for a movie...'
                    value={input} onChange={handleInput}
                    onFocus={() => setShowHistory(true)}
                    onBlur={() => setTimeout(() => setShowHistory(false), 350)}/>

                <span className='xcrossSpan'>
                    <i className="fa-solid fa-xmark" onClick={handleClear}></i>
                </span>

                <button onClick={handleSearch}>Search</button>

                {history.length > 0 && (
                    <div className={`history-dropdown ${showHistory ? 'show' : ''}`}>
                        
                        <div className='history-header'>
                            <span>Recent Searches</span>
                            <button className='clear-history-btn'
                                onMouseDown={(e) => {
                                    e.stopPropagation();
                                    clearHistory();
                            }}>Clear</button>
                        </div>

                        {history.map((term, index) => (
                            <div key={index} className='history-item' onMouseDown={() => handleHistoryClick(term)}>
                                
                                <div className="history-item-left">
                                    <i className="fa-solid fa-clock-rotate-left"></i>
                                    <h3>{term}</h3>
                                </div>

                                <i className="fa-solid fa-xmark remove-icon" 
                                   onMouseDown={(e) => {e.stopPropagation();
                                    removeHistoryItem(term);
                                 }}></i>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}