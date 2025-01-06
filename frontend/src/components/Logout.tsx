function Logout() {
    localStorage.removeItem('auth_token');
    alert("Log out successfully")
}

export default Logout