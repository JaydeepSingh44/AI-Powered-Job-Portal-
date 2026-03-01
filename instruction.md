I have a MERN stack job portal backend already built with the following routes:

AUTH ROUTES:
- POST /api/auth/register (body: name, email, password, role)
- POST /api/auth/login (body: email, password)
- GET /api/auth/me (protected)

JOB ROUTES:
- GET /api/jobs (all jobs with search/filter)
- GET /api/jobs/:id (single job)
- POST /api/jobs (recruiter only - create job)
- PUT /api/jobs/:id (recruiter only - update job)
- DELETE /api/jobs/:id (recruiter only - delete job)
- GET /api/jobs/my-jobs (recruiter's posted jobs)

APPLICATION ROUTES:
- POST /api/applications (job seeker - apply to job)
- GET /api/applications/my-applications (job seeker's applications)
- GET /api/applications/recruiter (recruiter - all applications for their jobs)
- PUT /api/applications/:id/status (recruiter - update status)

Backend uses JWT authentication, MongoDB, and Express.

BUILD THE COMPLETE FRONTEND with:

**1. SETUP & STRUCTURE:**
- React + Vite
- React Router DOM for routing
- Axios for API calls with interceptors for JWT token
- Tailwind CSS for styling
- Context API for auth state management
- Folder structure: components/, pages/, context/, services/, hooks/, utils/

**2. AUTHENTICATION:**
- AuthContext with login/register/logout functions
- Login page (email, password)
- Register page (name, email, password, role: jobseeker/recruiter)
- Protected routes that redirect to login
- Store JWT in localStorage, attach to all requests
- Navbar showing different options based on user role

**3. JOB SEEKER FEATURES:**
- Homepage/Landing with hero section, search bar, featured jobs
- Jobs Listing page with search, filters (job type, location, salary), pagination
- Job Detail page with full description and "Apply" button
- Application modal/form (cover letter, resume upload)
- My Applications page showing status (pending/reviewed/accepted/rejected)
- Profile page (personal info, skills, experience, education, resume)

**4. RECRUITER FEATURES:**
- Dashboard showing stats (jobs posted, applications received)
- Post New Job page (title, description, requirements, company, location, salary, type, deadline)
- My Posted Jobs page (list with edit/delete options, application count)
- Edit Job page with pre-filled form
- Applications page showing all applications for recruiter's jobs with filters
- Application detail view with applicant info, cover letter, resume download
- Update application status functionality

**5. SHARED FEATURES:**
- Responsive navbar with mobile menu
- Footer with links
- Protected routes based on role
- Loading states and skeletons
- Toast notifications (react-hot-toast) for all actions
- Error handling for all API calls
- Form validation
- 404 page
- Fully responsive design for mobile/tablet/desktop

**6. BACKEND MODIFICATIONS NEEDED:**
- If file upload isn't implemented, add multer for resume uploads
- Add any missing authorization middleware for routes
- Add profile routes if not existing (GET/PUT /api/users/profile)

Start with the basic setup and authentication, then build job seeker features, then recruiter features. Use modern React patterns (hooks, functional components). Make the UI professional with a blue/indigo color scheme. Include proper error boundaries and loading states throughout.