import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Buyers from "./pages/buyers";
import Tenants from "./pages/Tenants";
import Owners from "./pages/Owners";
import Login from "./pages/Login"; 
import Signup from "./pages/Signup"; 
import BuyerPropetyDetails from './components/BuyerPropertyDetails'
import TenantPropertyDetails from './components/TenantPropertyDetails'
import OwnerPropertyDetails from './components/OwnerPropertyDetails'
import PropertyDetails from "./components/PropertyDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';
import Footer from "./components/Footer";


function App() {
    return (
        <div className="container">
            <Navbar />
            <div className="main">
                <Routes>
                    {/* Protected Routes */}
                    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/buyers" element={<ProtectedRoute><Buyers /></ProtectedRoute>} />
                    <Route path="/tenants" element={<ProtectedRoute><Tenants /></ProtectedRoute>} />
                    <Route path="/owners" element={<ProtectedRoute><Owners /></ProtectedRoute>} />
                 
                    <Route path="/property/:propertyName" element={<ProtectedRoute><PropertyDetails /></ProtectedRoute>} />
                    <Route path="/buyers/property/:id" element={<ProtectedRoute><BuyerPropetyDetails /></ProtectedRoute>} />
                    <Route path="/tenants/property/:id" element={<ProtectedRoute><TenantPropertyDetails /></ProtectedRoute>} />
                    <Route path="/owners/property/:id" element={<ProtectedRoute><OwnerPropertyDetails /></ProtectedRoute>} />
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                   
                </Routes>
               
            </div>
            <Footer/>
        </div>
    );
}

export default App;
