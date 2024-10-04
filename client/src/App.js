import {Route, Routes} from 'react-router-dom'
import AdminLogin from './components/AdminLogin'
import SearchForm from './components/SearchForm'
import AdminRegister from './components/RegisteAdmin'
import Convivio from './components/ConvivioRegistration'
import Reportes from './components/reportes'

function App() {
  return (
<Routes>
<Route path='/' element={<AdminLogin />}/>
<Route path='/search' element={<SearchForm />}/>
<Route path='/register' element={<AdminRegister />}/>
<Route path='/convivio' element={<Convivio />}/>
<Route path='/reportes' element={<Reportes/>}/>
</Routes>

  )
}

export default App;
