/* globals describe expect it */
const app = require('../../server')
const supertest = require('supertest')
const btoa = require('btoa')
const { setupDB, loadFixtures } = require('../../test/setup')
const request = supertest(app)

// Models
const Task = require('../../models/Task')

setupDB('tasks')
loadFixtures()

const capt = {
  username: 'capt-america',
  password: 'longliveamerica'
}

const auth = 'Basic ' + btoa(`${capt.username}:${capt.password}`)

describe('Get Tasks', () => {
  it('requires auth', async done => {
    const res = await request.get('/tasks')
    expect(res.status).toBe(401)
    expect(res.body.message).toMatch(/Unauthorized/i)
    done()
  })

  it('returns tasks by user', async done => {
    const res = await request.get('/tasks')
      .set('Authorization', auth)

    expect(res.body).toBeArrayOfSize(3)
    done()
  })
})

describe('Create Tasks', () => {
  it('requires auth', async done => {
    const res = await request.post('/tasks')
    expect(res.status).toBe(401)
    expect(res.body.message).toMatch(/Unauthorized/i)
    done()
  })

  it('should create task', async done => {
    const res = await request.post('/tasks')
      .set('Authorization', auth)
      .send({ name: 'Eat breakfast' })
    const { id } = res.body
    expect(res.body).toContainKeys(['id', 'done', 'name'])

    const task = await Task.findOne({ _id: id })
    expect(task._id).toBeTruthy()
    expect(task.name).toBe('Eat breakfast')
    expect(task.done).toBe(false)
    done()
  })

  it('Throws error if no task name', async done => {
    const res = await request.post('/tasks')
      .set('Authorization', auth)
      .send({})

    expect(res.status).toBe(400)
    expect(res.body.message).toMatch(/task requires a name/i)
    done()
  })
})

// First task on Hulk
const hulk = {
  username: 'hulk',
  password: 'greeeeeeeeen',
  _id: '5cc90a78f267395a28e9e45e'
}
const hulkAuth = 'Basic ' + btoa(`${hulk.username}:${hulk.password}`)
const testTaskID = '5cc90aea78f2639483920af0'

describe('Update Task', () => {
  it('requires auth', async done => {
    const res = await request
      .put(`/tasks/${testTaskID}`)

    expect(res.status).toBe(401)
    expect(res.body.message).toMatch(/Unauthorized/i)
    done()
  })

  it('Throws error if task does not exist', async done => {
    const res = await request
      .put(`/tasks/123123`)
      .set('Authorization', hulkAuth)

    expect(res.status).toBe(404)
    expect(res.body.message).toMatch(/Task does not exist/i)
    done()
  })

  it('Updates task successfully', async done => {
    const res = await request
      .put(`/tasks/${testTaskID}`)
      .set('Authorization', hulkAuth)
      .send({
        name: 'Fight fires',
        done: true
      })

    expect(res.body).toContainAllKeys(['id', 'name', 'done'])

    const task = await Task.findById(testTaskID)
    expect(task).toBeTruthy()
    expect(task._id).toBeTruthy()
    expect(task.name).toBe('Fight fires')
    expect(task.done).toBeTrue()
    done()
  })
})

describe('Delete Task', () => {
  it('requires auth', async done => {
    const res = await request
      .delete(`/tasks/${testTaskID}`)

    expect(res.status).toBe(401)
    expect(res.body.message).toMatch(/Unauthorized/i)
    done()
  })

  it('Throws error if task does not exist', async done => {
    const res = await request
      .delete(`/tasks/5cc90a78f267395a28e9e454`)
      .set('Authorization', hulkAuth)

    expect(res.status).toBe(404)
    expect(res.body.message).toMatch(/Task does not exist/i)
    done()
  })

  it('deletes task successfully', async done => {
    const res = await request
      .delete(`/tasks/${testTaskID}`)
      .set('Authorization', hulkAuth)

    expect(res.status).toBe(200)

    try {
      await Task.findById(testTaskID)
    } catch (error) {
      expect(error.message).toMatch(/Task does not exist/i)
    }

    done()
  })
})
