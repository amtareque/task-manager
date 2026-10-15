import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import TaskList from './pages/TaskList'
import CreateTask from './pages/CreateTask'
import EditTask from './pages/EditTask'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <NavLink to="/" className="brand" aria-label="কাজের তালিকায় ফিরুন">
            <span className="brand-mark" aria-hidden="true">✓</span>
            <span>কাজের খাতা<span className="brand-dot">.</span></span>
          </NavLink>
          <nav className="navigation" aria-label="প্রধান নেভিগেশন">
            <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>আমার কাজ</NavLink>
            <NavLink to="/create" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>নতুন কাজ</NavLink>
          </nav>
          <span className="topbar-note">একটি কাজ, এক ধাপ করে</span>
        </div>
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/edit/:id" element={<EditTask />} />
          <Route path="*" element={<TaskList />} />
        </Routes>
      </main>
      <footer className="footer">ছোট ছোট অগ্রগতিই বড় কাজ সম্পন্ন করে।</footer>
    </div>
  )
}

export default App
