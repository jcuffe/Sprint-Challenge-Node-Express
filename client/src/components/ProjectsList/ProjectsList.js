import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './ProjectsList.css'

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
  <Link to={`/${id}`} className='projects-list__project-link'><h1>{name}</h1></Link>
)

export default ProjectsListContainer