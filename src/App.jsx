import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import VideoDetail from './components/VideoDetail';
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} exact/>
        <Route path="/video-detail/:id" Component={VideoDetail} exact/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
