import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { StayDetails } from './pages/StayDetails'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import '../src/assets/styles/main.scss'
import { StayIndex } from './pages/StayIndex'
import { store } from './store/store'
import { StayEdit } from './pages/StayEdit'
import { UserMsg } from './cmps/user-msg'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layosiut">
          <AppHeader />
          <main className="main-app">
            <Routes>
              <Route  path="/" element={<StayIndex />} />
              <Route path="/stay/edit/:stayId" element={<StayEdit />}  />
              <Route path="/:stayId" element={<StayDetails />} />
              {/* <Route element={<StayEdit />} path="/stay/edit" /> */}
            </Routes>
          </main>
          <AppFooter />
          <UserMsg/>
        </section>
      </Router>
    </Provider>
  )
}

export default App
