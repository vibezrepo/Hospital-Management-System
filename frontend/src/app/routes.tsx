import { createBrowserRouter } from 'react-router';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { HospitalRegistrationPage } from './pages/HospitalRegistrationPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LoginPage,
  },
  {
    path: '/register',
    Component: RegisterPage,
  },
  {
    path: '/dashboard',
    Component: DashboardPage,
  },
  {
    path: '/hospital-registration',
    Component: HospitalRegistrationPage,
  },
]);