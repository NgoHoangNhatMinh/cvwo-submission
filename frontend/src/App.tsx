import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { AuthProvider } from './components/contexts/AuthContex'
import { UserProvider } from './components/contexts/UserContext'

// Display the homepage - index most recent posts
function App() {
  return (
    <>
      {/* Display header and foot in all pages */}
      <UserProvider>
        <AuthProvider>
          <Header/>
          <main>
            <Outlet/>
          </main>
          <Footer/>
        </AuthProvider>
      </UserProvider>
    </>
  )
}

export default App
