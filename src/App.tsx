import React from 'react';
import './App.css';
import MainComponent from './components/MainComponent';

const App : React.FunctionComponent= function() {
  const isDBPresent:boolean = 'indexedDB' in window;
  
  return (
    <div className="App">
      <header className="App-header">
      <span style={{float:'right'}}>Hi Vishakha</span>
        <p>
          Question Mapper (Type a keyword and get matching questions)
        </p>
        
      </header>
      <main style={{margin:'20px'}}>
        {/* {isDBPresent && <p>Index DB is supported in your browser</p>} */}
        {isDBPresent && <MainComponent/>}
      </main>
    </div>
  );
}

export default App;

