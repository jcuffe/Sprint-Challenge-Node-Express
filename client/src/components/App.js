import React, { Component } from 'react'
import { Route } from 'react-router'
import { Observable } from 'rxjs/Rx'
import 'rxjs/ajax'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/pluck'
import 'rxjs/add/operator/do'
import ProjectsList from './ProjectsList'
import ProjectDetail from './ProjectDetail'

const projects$ = Observable
  .ajax('http://localhost:5000/api/projects')
  .map(xhr => xhr.response)

const projectDetail$ = id => Observable
  .ajax(`http://localhost:5000/api/projects/${id}`)
  .map(xhr => xhr.response)
  .do(console.log)

const containerStyle = {
  padding: 20,
  width: 800,
  backgroundColor: '#FDFDFD',
  border: '1px solid #AEAEAE'
}

class App extends Component {
  render() {
    return (
      <div style={containerStyle}>
        <Route exact path='/' render={() => (
          <ProjectsList projects$={projects$} />
        )} />
        <Route path='/:id' render={(props) => (
          <ProjectDetail project$={projectDetail$(props.match.params.id)} />
        )} />
      </div>
    )
  }
}

export default App