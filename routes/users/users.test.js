/* globals describe expect it */
const app = require('../../server')
const supertest = require('supertest')
const { setupDB, loadFixtures } = require('../../test/setup')
const request = supertest(app)

// Models
const User = require('../../models/User')
const Task = require('../../models/Task')

setupDB('user')
loadFixtures()

const strange = {
  username: 'drstrange',
  password: '12345678'
}

describe('Create User', () => {
  it('Throws error if no username', async done => {
    const clone = Object.assign({}, strange)
    delete clone.username
    const res = await request.post('/users')
      .send(clone)

    expect(res.status).toBe(400)
    expect(res.body.message).toMatch(/username required/gi)
    User.remove({ username: strange.username })
    done()
  })

  it('Throws error if no password', async done => {
    const clone = Object.assign({}, strange)
    delete clone.password
    const res = await request.post('/users')
      .send(clone)

    expect(res.status).toBe(400)
    expect(res.body.message).toMatch(/password required/gi)

    done()
  })

  it('Throws error if duplicate username', async done => {
    await request.post('/users').send(strange)
    const res = await request.post('/users').send(strange)

    expect(res.status).toBe(400)
    expect(res.body.message).toMatch(/Username already exists/)
    done()
  })

  it('Should create user', async done => {
    await request.post('/users').send(strange)
    const found = await User.findOne({ username: strange.username })

    expect(found.id).toBeTruthy()
    expect(found.username).toBe(strange.username)
    // Expects password to be hashed
    expect(found.password).not.toBe(strange.password)
    done()
  })

  it('Created user should have 3 tasks by default', async done => {
    const res = await request.post('/users').send(strange)
    const { id } = res.body

    const foundTasks = await Task.find({ user: id })
    expect(foundTasks.length).toBe(3)

    done()
  })
})

describe('Get User', () => {
  it('Throws error if user not found', async done => {
    const res = await request.get('/users/hickory')
    expect(res.status).toBe(404)
    expect(res.body.message).toMatch(/User not found/)
    done()
  })

  it('Should get user', async done => {
    const res = await request.get('/users/capt-america')
    expect(res.status).toBe(200)
    expect(res.body.id).toBeTruthy()
    expect(res.body.username).toBe('capt-america')
    expect(res.body.password).not.toBeTruthy()
    done()
  })
})

describe('Delete User', () => {
  it('Throws error if user not found', async done => {
    const res = await request.delete('/users/hickory')
    expect(res.status).toBe(404)
    expect(res.body.message).toMatch(/User not found/)
    done()
  })

  it('Should delete user', async done => {
    const res = await request.delete('/users/capt-america')
    const { id } = res.body

    // User should be deleted
    try {
      await User.findOne({ username: 'capt-america' })
    } catch (error) {
      expect(error.message).toMatch(/User not found/i)
    }

    // Should delete all tasks associated with user
    const tasks = await Task.find({ user: id })
    expect(tasks.length).toBe(0)
    done()
  })
})
