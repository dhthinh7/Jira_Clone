import { Switch, Route } from 'react-router-dom';
import './App.css';
import MenuMain from './Components/MenuMain/MenuMain';
import SidebarLeft from './Components/SidebarLeft/SidebarLeft';
import JiraMainTemplate from './Templates/JiraMainTemplate';

function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Route exact path="/" component={SidebarLeft}/> */}
        {/* <Route exact path="/">
          <SidebarLeft/>
          <MenuMain/>
          thinh
        </Route> */}
        
        <JiraMainTemplate exact path="/"/>
      </Switch>
      
    </div>
  );
}

export default App;
