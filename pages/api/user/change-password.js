import { getSession } from 'next-auth/client'
import { verifyPassword } from '../../../lib/auth'
import dbConnect from './../../../lib/db'
import { hashPassword } from './../../../lib/auth'

const handler = async (req, res) => {
  if (req.method !== 'PATCH') {
    return
  }
  const session = await getSession({ req: req })
  if (!session) {
    res.status(401).json({
      message: 'Not Authenticated',
    })
    return
  }
  const userEmail = session.user.email
  const { oldPassword, newPassword } = req.body
  const client = await dbConnect()
  const userCollection = client.db().collection('user')
  const userDoc = await userCollection.findOne({ email: userEmail })
  if (!userDoc) {
    res.status(404).json({
      message: 'user not found',
    })
    client.close()
    return
  }
  const isEqual = await verifyPassword(oldPassword, userDoc.password)
  console.log({ isEqual })
  if (!isEqual) {
    client.close()
    res.status(403).json({ message: 'Password doesnt match' })
    return
  }
  await userCollection.updateOne(
    { email: userEmail },
    {
      $set: {
        password: await hashPassword(newPassword),
      },
    }
  )
  client.close()
  res.status(200).json({ message: 'Password updated!' })
}

export default handler
