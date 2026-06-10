import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { UserAuthProvider, AdminAuthProvider, useAdminAuth } from './context/AuthContext';

// Public Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Public Pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import StudentLife from './pages/StudentLife';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Layout Component
import AdminLayout from './components/admin/AdminLayout';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCourses from './pages/admin/AdminCourses';
import AdminEvents from './pages/admin/AdminEvents';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminStaff from './pages/admin/AdminStaff';
import AdminNews from './pages/admin/AdminNews';
import AdminGallery from './pages/admin/AdminGallery';

// Public Layout Wrapper
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

// Private Route Wrapper
const PrivateRoute = () => {
  const { token, loading } = useAdminAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#f4f6f8]">Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <Outlet />;
};

function App() {
  return (
    <UserAuthProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Admin Login (No Layout) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Routes (with AdminLayout & PrivateRoute) */}
            <Route path="/admin" element={<PrivateRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="courses" element={<AdminCourses />} />
                <Route path="events" element={<AdminEvents />} />
                <Route path="enquiries" element={<AdminEnquiries />} />
                <Route path="staff" element={<AdminStaff />} />
                <Route path="news" element={<AdminNews />} />
                <Route path="gallery" element={<AdminGallery />} />
              </Route>
            </Route>

            {/* Public Routes (with Navbar and Footer) */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/:id" element={<CourseDetail />} />
              <Route path="student-life" element={<StudentLife />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </UserAuthProvider>
  );
}

export default App;