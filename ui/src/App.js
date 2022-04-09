import './App.css';
import Container from './components/left-components/Container';
import ChatBox from './components/right-components/ChatBox';

function App() {
  return (
    <div>
      <div className='header'>
        header
      </div>
      <div className='left'>
        <Container/>
      </div>
      <div className='right'>
        <ChatBox/>
      </div>
    </div>
  );
}

export default App;
