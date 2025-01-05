function handleLogout() {
    localStorage.removeItem('auth_token');
    alert("Log out successfully")
}

export default handleLogout