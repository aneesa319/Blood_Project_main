import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import { Error } from './pages/Error/Error'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Logout from './pages/Logout/Logout'
import { EmailVerificationCode } from './pages/Verification_Code/Email_Verification_Code'
import Registration_Email from './pages/Register/Registration_Email'
import RegisterLayout from './pages/Register/RegisterLayout'
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute'
import AdminDashboard from './pages/Dashboards/Admin/AdminDashboard'
import PatientDashboard from './pages/Dashboards/Patient/PatientDashboard'
import DonorDashboard from './pages/Dashboards/Donor/DonorDashboard'
import DonorSearchForm from './pages/SearchForDonors/SearchForDonors'
import CompatibilitySearch from './pages/SearchForDonors/CompatibilitySearch'
import DonationProcess from './pages/DonationProcess/DonationProcess'
import Eligibility from './pages/Eligibility/Eligibility'
import HowToDonate from './pages/HowToDonate/HowToDonate'
import Volunteer from './pages/Volunteer/Volunteer'
import SpreadAwareness from './pages/SpreadAwareness/SpreadAwareness'
import ShareExperience from './pages/ShareExperience/ShareExperience'
import PageTransition from './components/ui/PageTransition'


export default function App() {

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children:[
          {
            path: '/',
            element: <PageTransition><Home /></PageTransition>
          },
          {
            path: '/about',
            element: <PageTransition><About /></PageTransition>
          },
          {
            path: '/contact',
            element: <PageTransition><Contact /></PageTransition>
          },
          {
            path: '/login',
            element: <PageTransition><Login /></PageTransition>
          },
          {
            path: '/logout',
            element: <Logout />
          },
          {
            path: '/search/Donors',
            element: <PageTransition><DonorSearchForm /></PageTransition>
          },
          {
            path: '/compatible-search',
            element: <PageTransition><CompatibilitySearch /></PageTransition>
          },
          {
            path: '/donation-process',
            element: <PageTransition><DonationProcess /></PageTransition>
          },
          {
            path: '/eligibility',
            element: <PageTransition><Eligibility /></PageTransition>
          },
          {
            path: '/how-to-donate',
            element: <PageTransition><HowToDonate /></PageTransition>
          },
          {
            path: '/volunteer',
            element: <PageTransition><Volunteer /></PageTransition>
          },
          {
            path: '/spread-awareness',
            element: <PageTransition><SpreadAwareness /></PageTransition>
          },
          {
            path: '/share-experience',
            element: <PageTransition><ShareExperience /></PageTransition>
          },
          {
            path: '/registration',
            element: <RegisterLayout />,
            children: [
              {
                path: '',
                element: <PageTransition><Registration_Email /></PageTransition>
              },
              {
                path: 'verification-code',
                element: <PageTransition><EmailVerificationCode /></PageTransition>
              },
              {
                path: 'user-data',
                element: <PageTransition><Register /></PageTransition>
              }
            ]
          },
          // Protected Dashboards
          {
            path: '/admin/:id/dashboard',
            element: <ProtectedRoute allowedRole="admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
          },
          {
            path: '/patient/:id/dashboard',
            element: <ProtectedRoute allowedRole="patient" element={<PageTransition><PatientDashboard /></PageTransition>}/>
          },
          {
            path: '/donor/:id/dashboard',
            element: <ProtectedRoute allowedRole="donor" element={<PageTransition><DonorDashboard /></PageTransition>} />
          }
        ]
      }
    ]
  );

  return (
    <RouterProvider router={router}/>
  )
}
