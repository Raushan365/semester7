import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login'
import Footer from './components/Footer.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Beauty from './pages/Beauty.jsx'
import Home from './pages/Home.jsx'
import WallPanelPage from './pages/WallPanel.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import CartPage from './pages/CartPage.jsx'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute';
import MyOrdersPage from './pages/MyOrdersPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import NearbyServices from './pages/NearbyServices.jsx'
import ServiceBooking from './pages/ServiceBooking.jsx'
import TrackService from './pages/TrackService.jsx'
import PaymentPage from './pages/PaymentPage.jsx'
import PaymentCompletion from './pages/PaymentCompletion.jsx'
import PaymentSuccess from './pages/PaymentSuccess.jsx'
import PaymentCancel from './pages/PaymentCancel.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import MyBookings from './pages/MyBookings.jsx'
import ServiceBookingForm from './pages/ServiceBookingForm.jsx'
import { StripeProvider } from './context/StripeContext.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
  const location = useLocation();
  const isProviderPath = location.pathname.includes("provider");

  return (
    <>
      {!isProviderPath && <Navbar />}
      <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#363636',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <StripeProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/homes' element={<WallPanelPage />} />
          <Route path='/services' element={<ServicesPage />} />
          <Route path='/cart' element={<CartPage />} />
          {/* <Route path='/salon' element={<SalonBookingPage />} /> */}
          <Route path='/beauty' element={<Beauty />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/nearby-services" element={<NearbyServices />} />
            <Route path="/book/:serviceId" element={<ServiceBookingForm />} />
            <Route path="/track/:bookingId" element={<TrackService />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/cancel" element={<PaymentCancel />} />
            <Route path="/payment-completion" element={<PaymentCompletion />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </StripeProvider>
      {!isProviderPath && <Footer />}
    </>
  );
}

export default App;