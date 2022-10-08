import { Switch, Route } from 'react-router-dom';
import './App.css';
import DrawerJira from './HOC/DrawerJira';
import CreateProject from './Pages/CreateProject/CreateProject';
import Kanboard from './Pages/Kanboard/Kanboard';
import ProjectManagement from './Pages/ProjectManagement/ProjectMnagement';
import JiraMainTemplate from './Templates/JiraMainTemplate';

function App() {
  return (
    <div className="App h-full">
      <DrawerJira/>
      <Switch>
        {/* <Route exact path="/" component={SidebarLeft}/> */}
        {/* <Route exact path="/">
          <SidebarLeft/>
          <MenuMain/>
          Test
        </Route> */}
        <JiraMainTemplate exact path="/" Component={ProjectManagement}/>
        <JiraMainTemplate exact path="/projectMnagement" Component={ProjectManagement}/>
        <JiraMainTemplate exact path="/createProject" Component={CreateProject}/>
        <JiraMainTemplate exact path="/board" Component={Kanboard}/>
      </Switch>
      
    </div>
  );
}

export default App;
