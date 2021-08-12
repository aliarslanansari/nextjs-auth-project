import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { verifyPassword } from '../../../lib/auth'
import dbConnect from './../../../lib/db'

export default NextAuth({
  session: {
    jwt: true,
    // maxAge: 60 * 60 * 24 * 7, //7 days
  },
  providers: [
    Providers.Credentials({
      authorize: async (credentials) => {
        const client = await dbConnect()
        console.log(credentials)
        const usersCollection = client.db().collection('user')
        const user = usersCollection.findOne({ email: credentials.email })
        if (!user) {
          client.close()
          throw new Error('No user found')
        }
        const isValid = await verifyPassword(
          credentials.verifyPassword,
          user.password
        )
        if (!isValid) {
          client.close()
          throw new Error('Could not log you in!')
        }
        client.close()
        return { email: user.email }
      },
    }),
  ],
})
