import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './Components/Header'
import Footer from './Components/Footer'
import PrivateRoute from './Components/PrivateRoute'
import CreateListing from './pages/CreateListing'

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route  element={<PrivateRoute />} >
          <Route path='/profile' element={<Profile/>} />
          <Route path='/create-listing' element={<CreateListing/>}></Route>
        </Route>
      </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App