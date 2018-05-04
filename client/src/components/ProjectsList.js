import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
      <Project {...project} key={project.id} />
    ))}
  </div>  
)      

const Project = ({ name, id }) => (
  <Link to={`/${id}`}><h1>{name}</h1></Link>
)

export default ProjectsListContainer