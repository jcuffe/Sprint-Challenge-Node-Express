import React, { Component } from 'react'

class ProjectsListContainer extends Component {
  state = { projects: [] }

  componentDidMount() {
    this.subscription = this.props.projects$.subscribe(projects => this.setState({ projects }))
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  render = () => <ProjectsList projects={this.state.projects} />
}
    
const ProjectsList = ({ projects }) => (
  <div>
    {projects.map(project => (
      <Project {...project} />
    ))}
  </div>  
)      

const Project = ({ name }) => (
  <h1>{name}</h1>
)

export default ProjectsListContainer