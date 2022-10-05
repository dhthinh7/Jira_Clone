import { Switch, Route } from 'react-router-dom';
import './App.css';
import CreateProject from './Pages/CreateProject/CreateProject';
import Kanboard from './Pages/Kanboard/Kanboard';
import ProjectMnagement from './Pages/ProjectMnagement/ProjectMnagement';
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
        <JiraMainTemplate exact path="/" Component={ProjectMnagement}/>
        <JiraMainTemplate exact path="/projectMnagement" Component={ProjectMnagement}/>
        <JiraMainTemplate exact path="/createProject" Component={CreateProject}/>
        <JiraMainTemplate exact path="/board" Component={Kanboard}/>
      </Switch>
      
    </div>
  );
}

export default App;
