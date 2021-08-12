import { compare, hash } from 'bcryptjs'

export const hashPassword = async (password) => {
  return await hash(password, 12)
}

export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword)
  return isValid
}
