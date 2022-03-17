import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
/* testing to check whether file name is recieved by the action hooks*/ 
class App extends React.Component {
  state = {
    username: "",
    repoDetails: []
  };
  ChangeUsername = e => {
    this.setState({
      username: e.target.value
    });
  };
  getUsername = e => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${this.state.username}/repos`)
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(res => {
        this.setState({
          repoDetails: res
        });
      })
      .catch(res => console.log("errro", res));
  };

  handleClick = () => {
    console.error('sentry testing')
  }

  render() {
    return (
      <div className="Timeline-outer__block container-fluid">
        <nav className="navbar navbar-light bg-dark">
          <a className="navbar-brand" href="/">
          <FontAwesomeIcon icon={faGithub}  /> Github Timeline
          </a>
        </nav>
        <br/>
        <button onClick={this.handleClick}>Break the world</button>
        <div className="jumbotron container-fluid">
        <form>
        <div className="form-row justify-content-center">
          <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Enter your github username" onChange={this.ChangeUsername}/>
          </div>
          <div className="col-md-2">
          <button className='form-control' onClick={this.getUsername}> Generate </button>
          </div>
         </div>
       </form>
        </div>
        
       <br/>
       {
        
        this.state.repoDetails.length !== 0 ?
        <Timeline repo = {this.state.repoDetails} username={this.state.username} />
        : 
        <p className='text-center'> Enter the github username to generate the timeline </p> 
        }
       </div>
    );
  }
}
export default App;

const Timeline = ({ repo , username }) => {
  let Repos = repo.sort((a, b) => new Date(b.created_at).getFullYear() - new Date(a.created_at).getFullYear())

  return (
    <div>
      <p> Timeline for {username} </p>
     
        <table className="table table-responsive">
        <thead>
        <tr>
        <th scope="col"> Repo - Name </th>
        <th scope="col"> Description </th>
        <th scope="col"> Year </th>
        </tr>
        </thead>
        <tbody>
        
        {
          Repos.map(repo=>{
          return(
            <tr key={repo.name}>
            <td> { repo.name } </td>
            <td> { repo.description !== null ? repo.description : <p className='text-muted'> No description </p> } </td>
            <td> { new Date(repo.created_at).getFullYear() }</td>
            </tr>
          )
        })
         
      }
      </tbody>
      </table>
    </div>
  );
};
