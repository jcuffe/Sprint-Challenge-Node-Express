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
    const error = await validate(database)(body)
    if (error) {
      res.status(400).send({ error })
    } else {
      const document = await database.insert(body)
      res.status(201).send(document)
    }
  } catch (err) { next(err) }  
}


const update = database => async (req, res, next) => {
  const { id } = req.params
  const { body } = req
  try {
    const error = await validate(database, true)(body)
    if (error) {
      res.status(400).send({ error })
    } else {
      const document = await database.update(id, body)
      res.status(200).send(document)
    }
  } catch (err) { next(err) }
}

const remove = database => async (req, res, next) => {
  const { id } = req.params
  try {
    const document = await database.get(id)
    const result = await database.remove(id)
    if (document && result > 0) {
      res.status(200).send(document)
    }
  } catch (err) { next(err) }
}

const validate = (database, updating = false) => body => {
  if (database === actionModel) {
    return validateAction(body, updating)
  } else {
    return validateProject(body, updating)
  }
}

const validateAction = async ({ project_id, description, notes, completed }, updating) => {  
  if (project_id) {
    const project = await projectModel.get(project_id)
    if (project) {
      if (!updating && !description) {
        return `You must provide a description when creating a new action`
      }
    } else {
      return `No project found with id ${project_id}`
    }
  } else {
    if (updating) {
      if (!(description || notes || completed)) {
        return `You must provide at least one field to update`
      }
    } else {
      return `You must provide a project_id and description to create an action`
    }
  }
  return null
}

const validateProject = async ({ name, description, completed }, updating) => {
  if (updating) {
    if (!(name || description || completed)) {
      return 'You must provide at least one field to update'
    }
  } else {
    if (!(name && description)) {
      return 'You must provide a name and description to create a project'
    }
  }
  return null
}

app.use(json)
app.use('/api/actions', actionRouter)
app.use('/api/projects', projectRouter)

actionRouter.get('/', readAll(actionModel))
actionRouter.get('/:id', readOne(actionModel))
actionRouter.post('/', create(actionModel))
actionRouter.put('/:id', update(actionModel))
actionRouter.delete('/:id', remove(actionModel))

projectRouter.get('/', readAll(projectModel))
projectRouter.get('/:id', readOne(projectModel))
projectRouter.post('/', create(projectModel))
projectRouter.put('/:id', update(projectModel))
projectRouter.delete('/:id', remove(projectModel))

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