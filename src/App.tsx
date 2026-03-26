import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/providers/auth-provider';
import { Navbar } from './components/layout/navbar';
import { Footer } from './components/layout/footer';
import { CustomCursor } from './components/custom-cursor';
import { LoginModal } from './components/modals/login-modal';
import { RoleModal } from './components/modals/role-modal';
import { Toaster } from './components/ui/toast';

// Pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import ListProperty from './pages/ListProperty';
import Dashboard from './pages/Dashboard';
import PropertyDetails from './pages/PropertyDetails';
import SavedProperties from './pages/SavedProperties';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CustomCursor />
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/list-property" element={<ListProperty />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/saved" element={<SavedProperties />} />
          </Routes>
        </main>
        <Footer />
        <LoginModal />
        <RoleModal />
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
