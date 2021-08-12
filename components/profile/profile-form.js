import classes from './profile-form.module.css'

function ProfileForm() {
  const submitHandler = async (event) => {
    event.preventDefault()
    const newPassword = event.target[0].value
    const oldPassword = event.target[1].value
    const res = await fetch('/api/user/change-password', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword, oldPassword }),
    })
    const data = await res.json()
    console.log(newPassword, oldPassword, data)
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  )
}

export default ProfileForm
