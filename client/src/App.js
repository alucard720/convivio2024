import {Route, Routes} from 'react-router-dom'
import AdminLogin from './components/AdminLogin'
import SearchForm from './components/SearchForm'
import AdminRegister from './components/RegisteAdmin'
import Convivio from './components/ConvivioRegistration'
import Dashboard from './components/dashboard'

function App() {
  return (
<Routes>
<Route path='/' element={<AdminLogin />}/>
<Route path='/search' element={<SearchForm />}/>
<Route path='/register' element={<AdminRegister />}/>
<Route path='/convivio' element={<Convivio />}/>
<Route path='/dashboard' element={<Dashboard/>} />
</Routes>

  )
}

export default App;
