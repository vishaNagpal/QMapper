import React from 'react';
import MainComponent from './components/IndexDBDrivenComponent';
import UploaderComponent from './components/UploaderComponent';

import 'react-tabs/style/react-tabs.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './App.css';

const App : React.FunctionComponent= function() {
  const isDBPresent:boolean = 'indexedDB' in window;
  
  return (
    <div className="App">
      <header className="App-header">
      <span style={{float:'right'}}>Hi Interviewer</span>
        <p style={{margin: '10px 0'}}>
          Interview Mapper Assistant
        </p>
        
      </header>
      <main>
        {/* {isDBPresent && <p>Index DB is supported in your browser</p>} */}
        {!isDBPresent && <MainComponent/>}
        <UploaderComponent/>
      </main>
    </div>
  );
}

export default App;

