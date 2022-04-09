import './App.css';
import Container from './components/left-components/Container';
import ChatBox from './components/right-components/ChatBox';


import {socket, SocketContext} from "./contexts/socket";

function App() {
  return (
    <div>
      <SocketContext.Provider value={socket}>
        <div className='header'>
          header
        </div>
        <div className='left'>
          <Container/>
        </div>
        <div className='right'>
          <ChatBox/>
        </div>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
