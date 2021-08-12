import UserProfile from '../components/profile/user-profile'
import { getSession } from 'next-auth/client'
import { useEffect, useState } from 'react'

function ProfilePage() {
  // const [loading, setLoading] = useState(true)
  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = '/auth'
  //     } else {
  //       setLoading(false)
  //     }
  //   })
  // }, [])
  // if (loading) {
  //   return <p>Loading...</p>
  // }
  return <UserProfile />
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }
  return {
    props: { session },
  }
}
export default ProfilePage
