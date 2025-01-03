import './App.css'
import { Link, Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

// Display the homepage - index most recent posts
function App() {
  return (
    <div>
      {/* Display header and foot in all pages */}
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default App
