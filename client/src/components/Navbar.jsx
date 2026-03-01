import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Briefcase, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Briefcase className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">JobFusion</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/jobs" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">
              Browse Jobs
            </Link>

            {user ? (
              <>
                {user.role === 'jobseeker' && (
                  <>
                    <Link to="/my-applications" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">
                      My Applications
                    </Link>
                    <Link to="/profile" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">
                      Profile
                    </Link>
                  </>
                )}
                {user.role === 'company' && (
                  <>
                    <Link to="/recruiter/dashboard" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">
                      Dashboard
                    </Link>
                    <Link to="/recruiter/post-job" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">
                      Post Job
                    </Link>
                    <Link to="/recruiter/my-jobs" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">
                      My Jobs
                    </Link>
                    <Link to="/recruiter/applications" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">
                      Applications
                    </Link>
                  </>
                )}
                <div className="flex items-center space-x-2 ml-4">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                    {user.name?.charAt(0).toUpperCase() || user.companyName?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name || user.companyName}</span>
                  <button
                    onClick={handleLogout}
                    className="ml-2 p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-indigo-600 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/jobs"
              className="block px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Jobs
            </Link>

            {user ? (
              <>
                {user.role === 'jobseeker' && (
                  <>
                    <Link
                      to="/my-applications"
                      className="block px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Applications
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  </>
                )}
                {user.role === 'company' && (
                  <>
                    <Link
                      to="/recruiter/dashboard"
                      className="block px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/recruiter/post-job"
                      className="block px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Post Job
                    </Link>
                    <Link
                      to="/recruiter/my-jobs"
                      className="block px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Jobs
                    </Link>
                    <Link
                      to="/recruiter/applications"
                      className="block px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Applications
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-md font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
