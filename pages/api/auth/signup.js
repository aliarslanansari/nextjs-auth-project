import dbConnect from '../../../lib/db'
import { hashPassword } from './../../../lib/auth'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(401).json({ message: 'Please send a POST request' })
    return
  }
  const data = req.body
  const { email, password } = data
  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: 'Invalid Input - password or email is not valid',
    })
    return
  }
  let hashedPassword
  const client = await dbConnect()
  try {
    hashedPassword = await hashPassword(password)
    const db = client.db()

    const existingUser = await db.collection('user').findOne({ email })
    if (existingUser) {
      res.status(422).json({ message: 'User with email already exist' })
      client.close()
      return
    }
    await db.collection('user').insertOne({
      email: email,
      password: hashedPassword,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: error.message,
    })
    client.close()
    return
  }

  client.close()
  res.status(201).json({ message: 'Created User' })
}

export default handler
