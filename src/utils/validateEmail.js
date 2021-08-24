export function validateEmail(email) {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  return !!email.match(regex)
}