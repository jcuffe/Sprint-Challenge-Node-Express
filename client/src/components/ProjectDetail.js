import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const containerStyle = {
  a: {
    textDecoration: 'none'
  }
}

class ProjectDetailContainer extends Component {
  state = { project: { actions: [] } }

  componentDidMount() {
    this.subscription = this.props.project$.subscribe(project => {
      console.log(project)
      this.setState({ project })
    })
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  render = () => <ProjectDetail {...this.state.project} />
}

const ProjectDetail = ({ name, description, actions }) => (
  <div style={containerStyle}>
    <Link to=''>Home</Link>
    <h1>{name}</h1>
    <p>{description}</p>
    {actions.length > 0 ? <h3>Actions:</h3> : null}
    <ul>
      {actions.map(action => (
        <li key={action.id}>
          <h4>{action.description}</h4>
          {action.notes.length > 0
            ? <p>action.notes</p>
            : null}
        </li>
      ))}
    </ul>
  </div>
)

export default ProjectDetailContainer