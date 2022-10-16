import { Switch, Route } from 'react-router-dom';
import './App.css';
import DrawerJira from './HOC/DrawerJira';
import CreateProject from './Pages/CreateProject/CreateProject';
import Kanboard from './Pages/Kanboard/Kanboard';
import JiraMainTemplate from './Templates/JiraMainTemplate';
import ProjectManagement from './Pages/ProjectManagement/ProjectManagement'
import Loading from './Components/Loading/Loading';
import Modal from './Components/Modal/Modal';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';

function App() {
  return (
    <div className="App">
      <DrawerJira />
      <Loading />
      <Modal/>
      <Switch>
        {/* <Route exact path="/" component={SidebarLeft}/> */}
        {/* <Route exact path="/">
          <SidebarLeft/>
          <MenuMain/>
          Test
        </Route> */}
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <JiraMainTemplate exact path="/" Component={ProjectManagement} />
        <JiraMainTemplate exact path="/projectManagement" Component={ProjectManagement} />
        <JiraMainTemplate exact path="/createProject" Component={CreateProject} />
        <JiraMainTemplate exact path="/kanboard" Component={Kanboard} />
        <JiraMainTemplate exact path="/projectDetail/:projectId" Component={Kanboard} />
      </Switch>

    </div>
  )
}

export default App;
