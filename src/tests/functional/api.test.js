
const request = require('supertest')
const hosturl = process.env.HOSTURL || 'http://localhost:3000'

describe('Functional Test Suite', () => {
  test('returns all SKUs from the database', async () => {
    const response = await request(hosturl).get('/api/resources/')
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })
})
