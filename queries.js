const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: '3504',
  port: 5432,
})
const creatQuery = `CREATE TABLE users
(
    Id SERIAL PRIMARY KEY,
    Name CHARACTER VARYING(30),
    Email CHARACTER VARYING(30),
    Password CHARACTER VARYING(30)
);`
const createTable = (request, response) => {
  pool.query(creatQuery, (error, results) => {
    if (error) {
      throw error
    }
     response.status(200).json({table:results})
  // response.status(200).json({users:"create"})
  })
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createUser = (request, response) => {
    const { name, email, password } = request.body
  
    pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.id}`)
    })
  }

  const updateUser = (request, response) => {
     const id = parseInt(request.params.id)
    const { name, email, password} = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4',
      [name, email,password, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
    // console.log(request.params.id);
    // response.status(200).send(`User modified with ID: ${id}`)
  }

  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
     console.log(id);
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createTable
  }