import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { AuthProvider } from './components/AuthContex'

// Display the homepage - index most recent posts
function App() {
  return (
    <>
      {/* Display header and foot in all pages */}
      <AuthProvider>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </AuthProvider>
    </>
  )
}

export default App
