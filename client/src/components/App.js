import React, { Component } from 'react'
import { Observable } from 'rxjs/Rx'
import 'rxjs/ajax'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/pluck'
import 'rxjs/add/operator/do'
import ProjectsList from './ProjectsList'

const projects$ = Observable.ajax('http://localhost:5000/api/projects')
  .map(xhr => xhr.response)

class App extends Component {
  render() {
    return (
      <div>
        <ProjectsList projects$={projects$} />
      </div>
    )
  }
}

export default App