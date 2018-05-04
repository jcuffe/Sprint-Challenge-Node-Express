import Express, { Router } from 'express'
import actionModel from './data/helpers/actionModel'
import projectModel from './data/helpers/projectModel'

const app = new Express()
const json = Express.json()
const actionRouter = new Router()
const projectRouter = new Router()

const readAll = database => async (req, res, next) => {
  try {
    const document = await database.get()
    if (document) {
      res.status(200).send(document)
    } else {
      res.status(404).send()
    }
  } catch (err) { next(err) }
}  


const readOne = database => async (req, res, next) => {
  const { id } = req.params
  try {
    const document = await database.get(id)
    if (document) {
      res.status(200).send(document)
    } else {
      res.status(404).send({ message: `Document not found with id ${id}` })
    }
  } catch (err) { console.log('catching', err); next(err) }
}


const create = database => async (req, res, next) => {
  try {
    const { body } = req
    const valid = await validate(database)(body)
    if (valid) {
      const document = await database.insert(body)
      res.status(201).send(document)
    } else {
      res.status(400).send({ error: 'Invalid document format. Please refer to the database schema.' })
    }
  } catch (err) { next(err) }  
}


const update = database => async (req, res, next) => {
  const { id } = req.params
  const { body } = req
  try {
    const valid = await validate(database)(body)
  } catch (err) { next(err) }
}

const validate = (database, updating = false) => body => {
  if (database === actionModel) {
    return validateAction(body, updating)
  } else {
    return validateProject(body, updating)
  }
}

const validateAction = async ({ project_id, description, notes }, updating) => {
  if (project_id) {
    const project = await projectModel.get(project_id)
    return project && (description || notes)
  } else {
    return updating
      ? description || notes
      : false
  }
}

const validateProject = async ({ name, description }, updating) => {
  return updating
    ? name || description
    : name && description
}

app.use(json)
app.use('/api/actions', actionRouter)
app.use('/api/projects', projectRouter)

actionRouter.get('/', readAll(actionModel))
actionRouter.get('/:id', readOne(actionModel))
actionRouter.post('/', create(actionModel))

projectRouter.get('/', readAll(projectModel))
projectRouter.get('/:id', readOne(projectModel))
projectRouter.post('/', create(projectModel))

// Catch-all error handler
app.use((err, req, res, next) => {
  console.log('Error\n\n', err)
  // Defer to default handler if response is partially built
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).send({ error: err })
})

app.listen(5000, console.log('Listening on port 5000'))