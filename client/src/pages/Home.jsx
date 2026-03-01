import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jobAPI } from '../services/api';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, ArrowRight, Loader2, TrendingUp, Users, Building2 } from 'lucide-react';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedJobs();
  }, []);

  const fetchFeaturedJobs = async () => {
    try {
      const response = await jobAPI.getAllJobs({ limit: 6 });
      setJobs(response.data.jobs || response.data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (searchLocation) params.append('location', searchLocation);
    navigate(`/jobs?${params.toString()}`);
  };

  const getJobTypeStyle = (type) => {
    const styles = {
      'Full-time': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Part-time': 'bg-blue-100 text-blue-700 border-blue-200',
      'Contract': 'bg-amber-100 text-amber-700 border-amber-200',
      'Internship': 'bg-[#E9D5FF] text-[#7E22CE] border-purple-200',
      'Remote': 'bg-sky-100 text-sky-700 border-sky-200',
    };
    return styles[type] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-[#F5EDFF]">
      
      {/* --- HERO SECTION --- */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#7E22CE] via-[#9333EA] to-[#A855F7] pb-24 pt-16 lg:pt-32">
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl mix-blend-overlay animate-pulse"></div>
            <div className="absolute top-1/2 right-0 w-72 h-72 rounded-full bg-purple-300 blur-3xl mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-sm">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">Dream Job</span> Today
            </h1>
            <p className="mt-4 text-xl text-purple-100 max-w-2xl mx-auto mb-10 font-light">
              Connect with top companies and discover opportunities that match your skills.
            </p>
          </motion.div>

          {/* Search Bar Container */}
          <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            onSubmit={handleSearch} 
            className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-3 rounded-2xl shadow-2xl border border-white/20"
          >
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-200 group-focus-within:text-white transition-colors" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-transparent focus:border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-0 transition-all"
                />
              </div>
              <div className="flex-1 relative group">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-200 group-focus-within:text-white transition-colors" />
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-transparent focus:border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-0 transition-all"
                />
              </div>
              <button
                type="submit"
                className="bg-white text-[#7E22CE] px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Search
              </button>
            </div>
          </motion.form>
        </div>
      </div>

      {/* --- STATS SECTION (Floating overlap) --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-12 z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Active Jobs', value: '10K+', icon: Briefcase },
            { label: 'Companies', value: '500+', icon: Building2 },
            { label: 'Job Seekers', value: '50K+', icon: Users },
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (index * 0.1) }}
              className="bg-white rounded-2xl shadow-lg p-6 flex items-center border border-purple-100"
            >
              <div className="p-4 bg-[#F5EDFF] rounded-xl text-[#7E22CE]">
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-500 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- FEATURED JOBS SECTION --- */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Opportunities</h2>
              <p className="mt-2 text-gray-500">Top picks for you based on trending skills</p>
            </div>
            <Link
              to="/jobs"
              className="hidden md:flex items-center text-[#7E22CE] font-semibold hover:text-[#A855F7] transition-colors"
            >
              View All Jobs <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-[#7E22CE]" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-purple-100">
              <div className="bg-[#F5EDFF] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-[#A855F7]" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
              <p className="text-gray-500 mt-1">Check back later for new opportunities.</p>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {jobs.map((job) => (
                <motion.div
                  key={job._id}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-purple-50 hover:border-[#E9D5FF] overflow-hidden flex flex-col h-full"
                >
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-[#F5EDFF] p-2 rounded-lg">
                         <Building2 className="h-6 w-6 text-[#7E22CE]" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getJobTypeStyle(job.type)}`}>
                        {job.type}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1" title={job.title}>
                      {job.title}
                    </h3>
                    <p className="text-gray-500 text-sm font-medium mb-4">{job.company?.companyName || 'Confidential Company'}</p>

                    <div className="space-y-2.5">
                      <div className="flex items-center text-gray-600 text-sm bg-gray-50 p-2 rounded-md">
                        <MapPin className="h-4 w-4 mr-2 text-[#A855F7]" />
                        {job.location || 'Remote'}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm bg-gray-50 p-2 rounded-md">
                        <span className="font-bold mr-2 text-[#A855F7] text-lg">₹</span>
                        {job.salary || 'Not disclosed'}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                    <Link
                      to={`/jobs/${job._id}`}
                      className="group flex items-center justify-center w-full py-2.5 bg-white border border-[#A855F7] text-[#7E22CE] rounded-xl font-semibold hover:bg-[#7E22CE] hover:text-white transition-all duration-300"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="mt-10 text-center md:hidden">
            <Link to="/jobs" className="inline-flex items-center font-semibold text-[#7E22CE]">
              View All Jobs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <div className="relative py-20 bg-[#2e1065] overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#7E22CE] opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#A855F7] opacity-20 blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Take the Next Step?
          </h2>
          <p className="text-purple-200 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of job seekers who have found their dream jobs through our platform. Your future starts here.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-[#A855F7] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#9333EA] transition-all shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1"
            >
              Create Account
            </Link>
            <Link
              to="/jobs"
              className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#2e1065] transition-all"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;