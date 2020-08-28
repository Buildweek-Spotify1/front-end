export const checkExpired = () => {
  const lastLogin = localStorage.getItem('logTime')
  if (Date.now() - parseInt(lastLogin) >= 3600000) {
    localStorage.clear()
    return true
  }
}