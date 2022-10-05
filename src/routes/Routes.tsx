import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';
import HomePage from '../pages/HomePage.page';
import LoginPage from '../pages/LoginPage.page';
import SignUpPage from '../pages/SignUpPage.page';
import ProtectedRoute from './protected-route.component';

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
    </ReactRouterRoutes>
  );
};

export default Routes;
