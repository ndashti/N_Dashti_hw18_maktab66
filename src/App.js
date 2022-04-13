import './App.css';

import Home from './component/home/Home';
import { UserProvider} from './context/ContextAuth'
function App() {
  return (
    <div className="App">
      <UserProvider>
        <Home />
      </UserProvider>
    </div>
  );
}

export default App;
