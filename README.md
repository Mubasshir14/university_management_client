## University Course Registration System

### Live 

🚀 **Try it Live!**

- [Live](https://university-management-client.vercel.app)

### Overview

The **University Course Registration System** is a robust, full-stack backend application designed to manage the academic lifecycle of a university. Built with modern technologies, it facilitates seamless student admissions, course registrations, result generation, and administrative tasks. This system ensures efficient handling of student data, course assignments, and faculty management while enforcing credit limits, preventing duplicate registrations, and providing insightful dashboards for admins. It supports role-based access control for admins, students, and users, making it scalable for educational institutions.

The frontend is a responsive Next.js application providing an intuitive UI for all users.

### Key Features

#### UI/UX Features

- **Student Registration & Course Selection**: Students can register for courses within credit limits, view timetables, and calculate total credits.
- **View Credit Load and Timetable**: Real-time display of enrolled courses, credit loads, and schedules.
- **Admin View to Assign Advisors, Update Departments**: Role-based admin dashboard for managing advisors, departments, and faculties.
- **Add/Edit/Remove Courses and Students**: CRUD operations for courses and student profiles.
- **Register Student to Courses**: Secure enrollment with validation for prerequisites and availability.
- **Prevent Duplicate Registration**: Built-in checks to avoid re-enrollment in the same course.
- **Drop a Course**: Students and admins can drop courses with approval workflows.
- **Get Course-Wise Student List**: Query and export lists of students per course.
- **Filter Students by Department and Semester/Course**: Advanced filtering for reports and analytics.
- **Calculate Total Credit**: Automatic computation of credit hours during registration.
- **Assign Advisors**: Admin tool to link students with faculty advisors.

#### Core Modules

- **Home Page**: Overview of the university, including faculties, departments, academic achievements, and admission programs.
- **Dashboards**: Role-based dashboards for:
  - **Admin**: Manage approvals, views, and assignments.
  - **Users**: General access to profiles and verifications.
  - **Students**: Personal registration, results, and profiles.

#### Student Admission & Registration

- Students apply for admission via an online form.
- **Admin** reviews and approves applications.
- Post-approval, students register by selecting:
  - **Department**
  - **Academic Session** (Spring, Summer, or Fall)
  - **Academic Semester** (1st Year 1st Semester, 2nd Year 1st Semester...)
- During registration:
  - Select courses within **minimum and maximum credit limits**.
  - Drop courses if needed, with admin oversight.

#### Admin Functionalities

- Add & Edit **Departments**, **Faculties**, and **Semesters**.
- Approve student **admissions** and **course registrations**.
- View students filtered by:
  - **Courses**
  - **Departments**
  - **Semesters**
- Assign and manage **Course Advisors**.
- Generate and view student **results**.

## Technologies & Tools Used

### Backend

#### Core Technologies

- **TypeScript**: Strong typing for maintainable code.
- **Express.js**: Server and API framework.
- **MongoDB**: NoSQL database with **Mongoose** for schema modeling.
- **Cloudinary**: Media storage for images and files.
- **Zod**: Runtime schema validation.

#### Developer Utilities

- **Environment Variables**: Via `dotenv`.
- **Linting and Formatting**: ESLint and Prettier.
- **Development Server**: `ts-node-dev` for hot reloading.

#### Authentication & Security

- **jsonwebtoken (JWT)**: Token-based auth with access/refresh tokens.
- **cors**: Cross-origin resource sharing.
- **ua-parser-js**: User agent parsing for device tracking.
- **bcrypt**: Password hashing.

#### File & Media Uploads

- **multer**: Multipart form handling.
- **multer-storage-cloudinary**: Direct uploads to Cloudinary.

#### Communication

- **nodemailer**: Server-side email sending (e.g., verification).

#### HTTP Utilities

- **http-status / http-status-codes**: Standardized status codes.

### Frontend

#### Core Technologies

- **Next.js (v15.4.1)**: React framework for server-side rendering and static site generation.
- **React (v19.1.0)**: Library for building user interfaces.
- **TypeScript**: Type safety across components and logic.

#### State Management & Forms

- **React Hook Form (v7.60.0)**: Form handling with validation.
- **Formik (v2.4.6)**: Alternative form library for complex forms.
- **Zod (v4.0.5)**: Schema validation integrated with forms.
- **@hookform/resolvers (v5.1.1)**: Zod resolver for React Hook Form.

#### UI Components & Styling

- **Tailwind CSS (v4)**: Utility-first CSS framework.
- **Radix UI**: Headless UI primitives for accessibility:
  - `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`, `@radix-ui/react-collapsible`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-label`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-slot`, `@radix-ui/react-tabs`, `@radix-ui/react-tooltip`.
- **Class Variance Authority (CVA v0.7.1)** & **clsx (v2.1.1)**: Utility for dynamic class generation.
- **Tailwind Merge (v3.3.1)**: Merge Tailwind classes efficiently.
- **Lucide React (v0.525.0)**: Icon library.
- **React Icons (v5.5.0)**: Additional icons.
- **React Select (v5.10.2)**: Customizable select components.
- **Sonner (v2.0.6)**: Toast notifications.

#### Data Visualization & Charts

- **Chart.js (v4.5.0)** & **React Chartjs 2 (v5.3.0)**: Charting library.
- **chartjs-plugin-datalabels (v2.2.0)**: Data labels for charts.

#### File Handling & Utilities

- **React Dropzone (v14.3.8)**: Drag-and-drop file uploads.
- **jsPDF (v3.0.1)** & **jsPDF-AutoTable (v5.0.2)**: PDF generation and table exports.
- **React Masonry CSS (v1.0.16)**: Masonry layout for grids.
- **Framer Motion (v12.23.6)**: Animations and gestures.
- **JWT Decode (v4.0.0)**: Decode JWT tokens client-side.

#### Development Tools

- **ESLint (v9)** & **eslint-config-next**: Linting with Next.js config.
- **@types/**: Type definitions for Node, React, etc.

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud, e.g., MongoDB Atlas)

## Installation

### Backend

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Mubasshir14/university_management_server.git
   cd university_management_server
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory:

   ```env
   # Environment
   NODE_ENV=development
   PORT=5000

   # Database
   DATABASE_URL=your-mongodb-uri

   # Security
   BCRYPT_SALT_ROUND=12

   # JWT Secrets
   JWT_ACCESS_SECRET=your-access-token-secret
   JWT_REFRESH_SECRET=your-refresh-token-secret
   JWT_ACCESS_EXPIRES_IN=10d
   JWT_REFRESH_EXPIRES_IN=365d

   # Email Verification
   CLIENT_URL=http://localhost:3000

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Nodemailer
   FROM_EMAIL=your-sender-email
   FROM_PASS=your-sender-password
   ```

### Frontend

1. **Clone or Navigate to Client Repo**:

   ```bash
    git clone https://github.com/Mubasshir14/university_management_client.git
    cd university_management_client
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create `.env.local`:
   ```bash
   NEXT_PUBLIC_BASE_API=http://localhost:5000/api
   NEXT_PUBLIC_BASE_F_API=http://localhost:3000
   ```

### Usage

#### Backend Scripts

Run these via `npm run <script>` in the backend directory:

| Script          | Description                              |
| --------------- | ---------------------------------------- |
| `start:dev`     | Start development server with hot reload |
| `build`         | Compile TypeScript to JavaScript         |
| `start:prod`    | Start production server                  |
| `lint`          | Check code linting issues                |
| `lint:fix`      | Auto-fix linting issues                  |
| `prettier`      | Format code with Prettier                |
| `prettier:fix`  | Auto-fix formatting issues               |
| `vercel --prod` | Deploy to Vercel (if configured)         |

Example: Start dev server → `npm run start:dev` (runs on `http://localhost:5000`).

### Frontend Scripts

Run these via `npm run <script>` in the frontend directory:

| Script  | Description              |
| ------- | ------------------------ |
| `dev`   | Start development server |
| `build` | Build for production     |
| `start` | Start production server  |
| `lint`  | Run ESLint               |

Example: Start dev server → `npm run dev` (runs on `http://localhost:3000`).

### API Endpoints Overview

All endpoints are prefixed with `/api` (e.g., `/api/auth/login`). Authentication is required for most routes (via JWT in headers). Methods, paths, and roles are noted where applicable.

#### Auth (`/auth`)

| Method | Path               | Description          | Auth Required |
| ------ | ------------------ | -------------------- | ------------- |
| POST   | `/login`           | User login           | No            |
| POST   | `/register`        | User registration    | No            |
| POST   | `/refresh-token`   | Refresh JWT token    | Yes           |
| POST   | `/logout`          | User logout          | Yes           |
| POST   | `/change-password` | Change user password | Yes           |

#### Users (`/users`)

| Method | Path            | Description        | Auth Required |
| ------ | --------------- | ------------------ | ------------- |
| POST   | `/register`     | Register new user  | No            |
| GET    | `/verify-email` | Verify email token | No            |

#### Students (`/students`)

| Method | Path                                   | Description                       | Auth Required       |
| ------ | -------------------------------------- | --------------------------------- | ------------------- |
| POST   | `/create-student`                      | Create student profile            | Yes (USER)          |
| PATCH  | `/make-approval/:id`                   | Approve single student            | Yes (ADMIN)         |
| PATCH  | `/make-approval-many`                  | Approve multiple students         | Yes (ADMIN)         |
| GET    | `/`                                    | Get all students                  | Yes (ADMIN)         |
| GET    | `/single-student/:id`                  | Get single student                | Yes (ADMIN)         |
| GET    | `/db`                                  | Dashboard: Students by department | Yes (ADMIN)         |
| GET    | `/session`                             | Dashboard: Students by session    | Yes (ADMIN)         |
| GET    | `/not-approved-student`                | Get unapproved students           | Yes (ADMIN)         |
| GET    | `/approved-student`                    | Get approved students             | Yes (ADMIN)         |
| GET    | `/get-me-as-a-student`                 | Get current user as student       | Yes (STUDENT/ADMIN) |
| POST   | `/get-student-according-to-department` | Filter students by department     | Yes (ADMIN)         |
| POST   | `/get-student-according-to-session`    | Filter students by session        | Yes (ADMIN)         |
| POST   | `/get-student-according-to-semester`   | Filter students by semester       | Yes (ADMIN)         |
| DELETE | `/delete-student/:id`                  | Delete student                    | Yes (ADMIN)         |
| PATCH  | `/update-student/:id`                  | Update student by admin           | Yes (ADMIN)         |

#### Student IDs (`/student-ids`)

| Method | Path   | Description            | Auth Required |
| ------ | ------ | ---------------------- | ------------- |
| POST   | `/`    | Create student ID card | Yes (ADMIN)   |
| GET    | `/`    | Get all student IDs    | No            |
| GET    | `/:id` | Get single student ID  | No            |
| DELETE | `/:id` | Delete student ID      | Yes (ADMIN)   |

#### Courses (`/courses`)

| Method | Path                 | Description                              | Auth Required |
| ------ | -------------------- | ---------------------------------------- | ------------- |
| POST   | `/create-course`     | Create new course                        | Yes (ADMIN)   |
| GET    | `/:id`               | Get single course                        | No            |
| DELETE | `/:id`               | Delete course                            | Yes (ADMIN)   |
| GET    | `/student/:id`       | Get courses for student academic session | Yes (STUDENT) |
| PATCH  | `/update-course/:id` | Update course                            | Yes (ADMIN)   |
| GET    | `/`                  | Get all courses                          | No            |

#### Registrations (`/registrations`)

| Method | Path                                 | Description                    | Auth Required       |
| ------ | ------------------------------------ | ------------------------------ | ------------------- |
| POST   | `/create-registration`               | Create course registration     | Yes (STUDENT)       |
| POST   | `/my-registration-info`              | Get my registration info       | Yes (STUDENT/ADMIN) |
| POST   | `/get-student-according-to-course`   | Filter students by course      | Yes (ADMIN)         |
| PATCH  | `/make-approval/:id`                 | Approve single registration    | Yes (ADMIN)         |
| PATCH  | `/make-approval-many`                | Approve multiple registrations | Yes (ADMIN)         |
| GET    | `/not-approved-registration`         | Get unapproved registrations   | Yes (ADMIN)         |
| GET    | `/approved-registration`             | Get approved registrations     | Yes (ADMIN)         |
| GET    | `/:id`                               | Get single registration        | Yes (ADMIN/STUDENT) |
| PATCH  | `/drop-and-update-course-by-student` | Student drops/updates courses  | Yes (STUDENT)       |
| PATCH  | `/drop-and-update-course-by-admin`   | Admin drops/updates courses    | Yes (ADMIN)         |

#### Results (`/results`)

| Method | Path                        | Description             | Auth Required       |
| ------ | --------------------------- | ----------------------- | ------------------- |
| POST   | `/generate/:registrationId` | Generate student result | Yes (ADMIN)         |
| GET    | `/`                         | Get all student results | Yes (ADMIN)         |
| POST   | `/my-result`                | Get my result           | Yes (STUDENT/ADMIN) |

#### Faculties (`/faculties`)

| Method | Path              | Description        | Auth Required |
| ------ | ----------------- | ------------------ | ------------- |
| POST   | `/create-faculty` | Create faculty     | Yes (ADMIN)   |
| GET    | `/:id`            | Get single faculty | No            |
| PATCH  | `/:id`            | Update faculty     | Yes (ADMIN)   |
| GET    | `/`               | Get all faculties  | No            |

#### Academic Departments (`/academic-departments`)

| Method | Path                               | Description           | Auth Required |
| ------ | ---------------------------------- | --------------------- | ------------- |
| POST   | `/create-academic-department`      | Create department     | Yes (ADMIN)   |
| PATCH  | `/update-department/:departmentId` | Update department     | Yes (ADMIN)   |
| GET    | `/:departmentId`                   | Get single department | No            |
| GET    | `/`                                | Get all departments   | No            |

#### Academic Sessions (`/academic-sessions`)

| Method | Path                       | Description                 | Auth Required                    |
| ------ | -------------------------- | --------------------------- | -------------------------------- |
| POST   | `/create-academic-session` | Create academic session     | Yes (ADMIN)                      |
| GET    | `/:courseId`               | Get single academic session | Yes (ADMIN/ADVISOR/STUDENT)      |
| PATCH  | `/:courseId`               | Update academic session     | Yes (ADMIN)                      |
| GET    | `/`                        | Get all academic sessions   | Yes (ADMIN/ADVISOR/STUDENT/USER) |

For full routes, see the `src/modules/*/route.ts` files.

### Folder Structure

```bash
university_management_server/
├── src/
│   ├── app/
│   │   ├── builder/
│   │   │   └── QueryBuilder.ts
│   │   ├── config/
│   │   │   └── index.ts
│   │   ├── errors/
│   │   │   ├── AppError.ts
│   │   │   ├── handleCastError.ts
│   │   │   ├── handleDuplicateError.ts
│   │   │   ├── handleValidationError.ts
│   │   │   └── handleZodError.ts
│   │   ├── interface/
│   │   │   ├── error.ts
│   │   │   ├── index.d.ts
│   │   │   └── user.ts
│   │   ├── middlewares/
│   │   │   ├── auth.ts
│   │   │   ├── bodyParse.ts
│   │   │   ├── clientInfoParser.ts
│   │   │   ├── globalErrorhandler.ts
│   │   │   ├── notFound.ts
│   │   │   └── validateRequest.ts
│   │   ├── routes/
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   └── express.d.ts
│   │   └── utils/
│   │       ├── catchAsync.ts
│   │       ├── cloudinary.config.ts
│   │       ├── multer.config.ts
│   │       ├── sendEmails.ts
│   │       ├── sendResponse.ts
│   │       └── sendUserVerificationEmail.ts
│   ├── modules/
│   │   ├── AcademicDepartment/
│   │   │   ├── academicDepartment.controller.ts
│   │   │   ├── academicDepartment.interface.ts
│   │   │   ├── academicDepartment.model.ts
│   │   │   ├── academicDepartment.route.ts
│   │   │   ├── academicDepartment.service.ts
│   │   │   ├── academicDepartment.validation.ts
│   │   │   └── academicDepartmets.constant.ts
│   │   ├── AcademicSession/
│   │   │   ├── academicSession.constant.ts
│   │   │   ├── academicSession.controller.ts
│   │   │   ├── academicSession.interface.ts
│   │   │   ├── academicSession.model.ts
│   │   │   ├── academicSession.route.ts
│   │   │   ├── academicSession.service.ts
│   │   │   └── academicSession.validation.ts
│   │   ├── Auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.interface.ts
│   │   │   ├── auth.route.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.utils.ts
│   │   │   └── auth.validation.ts
│   │   ├── Course/
│   │   │   ├── course.constant.ts
│   │   │   ├── course.controller.ts
│   │   │   ├── course.interface.ts
│   │   │   ├── course.model.ts
│   │   │   ├── course.route.ts
│   │   │   ├── course.service.ts
│   │   │   └── course.validation.ts
│   │   ├── Faculty/
│   │   │   ├── faculty.constant.ts
│   │   │   ├── faculty.controller.ts
│   │   │   ├── faculty.interface.ts
│   │   │   ├── faculty.model.ts
│   │   │   ├── faculty.route.ts
│   │   │   ├── faculty.service.ts
│   │   │   ├── faculty.validation.ts
│   │   │   └── generateFacultyId.ts
│   │   ├── Registration/
│   │   │   ├── registration.controller.ts
│   │   │   ├── registration.interface.ts
│   │   │   ├── registration.model.ts
│   │   │   ├── registrstion.route.ts
│   │   │   └── registrstion.sservice.ts
│   │   ├── Result/
│   │   │   ├── result.constant.ts
│   │   │   ├── result.controller.ts
│   │   │   ├── result.iterface.ts
│   │   │   ├── result.model.ts
│   │   │   ├── result.routes.ts
│   │   │   ├── result.service.ts
│   │   │   └── result.utils.ts
│   │   ├── Student/
│   │   │   ├── generateStudentId.ts
│   │   │   ├── student.constant.ts
│   │   │   ├── student.controller.ts
│   │   │   ├── student.interface.ts
│   │   │   ├── student.model.ts
│   │   │   ├── student.route.ts
│   │   │   ├── student.service.ts
│   │   │   └── student.validation.ts
│   │   ├── StudentID/
│   │   │   ├── studentid.controller.ts
│   │   │   ├── studentid.interface.ts
│   │   │   ├── studentid.model.ts
│   │   │   ├── studentid.route.ts
│   │   │   └── studentid.service.ts
│   │   └── User/
│   │       ├── user.constant.ts
│   │       ├── user.controller.ts
│   │       ├── user.interface.ts
│   │       ├── user.model.ts
│   │       ├── user.route.ts
│   │       ├── user.service.ts
│   │       └── user.validation.ts
│   ├── app.ts
│   └── server.ts
├── package.json
├── tsconfig.json
└── .env (example)
```

```bash
university_management_client/
├── src/
│   ├── app/
│   │   ├── (WithCommonLayout)/
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── department/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── faculty/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── get-admit/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── (WithDashboardLayout)/
│   │   │   ├── admin/
│   │   │   │   └── dashboard/
│   │   │   │       ├── add-advisor/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── add-course/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── add-department/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── add-session/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── approve-registration/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── course-drop-individual-registration/
│   │   │   │       │   ├── [id]/
│   │   │   │       │   │   └── page.tsx
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── filter-course/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── filter-department/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── filter-semester/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── filter-session/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── generate-result/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── manage-advisor/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── manage-course/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── manage-department/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── manage-session/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── manage-student/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── manage-studentid/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── pending-registration/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── student-result/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── update-course/
│   │   │   │       │   └── [id]/
│   │   │   │       │       └── page.tsx
│   │   │   │       ├── update-department/
│   │   │   │       │   └── [id]/
│   │   │   │       │       └── page.tsx
│   │   │   │       ├── update-student/
│   │   │   │       │   └── [id]/
│   │   │   │       │       └── page.tsx
│   │   │   │       ├── waiting-approval/
│   │   │   │       │   └── page.tsx
│   │   │   │       └── page.tsx
│   │   │   ├── student/
│   │   │   │   └── dashboard/
│   │   │   │       ├── my-information/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── my-result/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── registration/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── registration-information/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── update-registration-information/
│   │   │   │       │   └── page.tsx
│   │   │   │       └── page.tsx
│   │   │   ├── user/
│   │   │   │   └── dashboard/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── verify-email/
│   │   │   └── page.tsx
│   │   ├── verify-notice/
│   │   │   └── page.tsx
│   │   ├── error.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   └── not-found.tsx
│   ├── assets/
│   │   ├── a-woman-stands-near-the-smartphone-on-the-screen-error-404-page-system-error-png.webp
│   │   ├── campus.jpg
│   │   ├── download.jpg
│   │   ├── thumb_1200_1698.png
│   │   └── university-education-logo-design-template-free-vector.jpg
│   ├── components/
│   │   ├── constant/
│   │   │   └── index.ts
│   │   ├── context/
│   │   │   └── UserContext.tsx
│   │   ├── dashboard/
│   │   │   └── sidebar/
│   │   │       ├── app-sidebar.tsx
│   │   │       ├── nav-main.tsx
│   │   │       └── nav-user.tsx
│   │   ├── DashboardComponents/
│   │   │   ├── AddCourse.tsx
│   │   │   ├── AddDepartment.tsx
│   │   │   ├── AddFaculty.tsx
│   │   │   ├── AddSession.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── ApproveRegistration.tsx
│   │   │   ├── Course.tsx
│   │   │   ├── CreateRegistrationForm.tsx
│   │   │   ├── Department.tsx
│   │   │   ├── FilterByCourse.tsx
│   │   │   ├── FilterStudentByDepartment.tsx
│   │   │   ├── FilterStudentBySemester.tsx
│   │   │   ├── FilterStudentBySession.tsx
│   │   │   ├── GenerateResultForm.tsx
│   │   │   ├── ManageCourse.tsx
│   │   │   ├── ManageDepartment.tsx
│   │   │   ├── ManageFaculty.tsx
│   │   │   ├── ManageSession.tsx
│   │   │   ├── ManageStudent.tsx
│   │   │   ├── ManageStudentID.tsx
│   │   │   ├── MyInformation.tsx
│   │   │   ├── MyRegistrationInformation.tsx
│   │   │   ├── MyResult.tsx
│   │   │   ├── PendingRegistration.tsx
│   │   │   ├── Semester.tsx
│   │   │   ├── Session.tsx
│   │   │   ├── StudentResult.tsx
│   │   │   ├── UpdateCourse.tsx
│   │   │   ├── UpdateDepartment.tsx
│   │   │   ├── UpdateIndividualCourseByAdmin.tsx
│   │   │   ├── UpdateRegistrationInformation.tsx
│   │   │   ├── UpdateStudent.tsx
│   │   │   └── WaitingApproval.tsx
│   │   ├── lib/
│   │   │   ├── providers/
│   │   │   │   ├── Providers.tsx
│   │   │   │   └── StoreProvider.tsx
│   │   │   ├── redux/
│   │   │   │   ├── hooks.ts
│   │   │   │   ├── storage.ts
│   │   │   │   └── store.ts
│   │   │   └── utils.ts
│   │   ├── Services/
│   │   │   ├── AuthService/
│   │   │   │   └── index.ts
│   │   │   ├── Course/
│   │   │   │   └── index.tsx
│   │   │   ├── Department/
│   │   │   │   └── index.ts
│   │   │   ├── Faculty/
│   │   │   │   └── index.ts
│   │   │   ├── Registration/
│   │   │   │   └── index.ts
│   │   │   ├── result/
│   │   │   │   └── index.ts
│   │   │   ├── Session/
│   │   │   │   └── index.ts
│   │   │   ├── Student/
│   │   │   │   └── index.ts
│   │   │   └── StudentID/
│   │   │       └── index.ts
│   │   ├── Shared/
│   │   │   ├── AboutUs.tsx
│   │   │   ├── AcademicPrograms.tsx
│   │   │   ├── AdmissionsAid.tsx
│   │   │   ├── ContactUs.tsx
│   │   │   ├── Department.tsx
│   │   │   ├── DepartmentDetail.tsx
│   │   │   ├── EventCarousel.tsx
│   │   │   ├── Faculty.tsx
│   │   │   ├── FacultyDetails.tsx
│   │   │   ├── FeatureCards.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Gallery.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── LoginRegister.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── NewsAnnouncements.tsx
│   │   │   ├── ResearchInnovation.tsx
│   │   │   ├── StatisticsView.tsx
│   │   │   └── Student.tsx
│   │   ├── Types/
│   │   │   ├── faculty.ts
│   │   │   ├── session.ts
│   │   │   ├── student.ts
│   │   │   └── user.ts
│   │   └── ui/
│   │       ├── core/
│   │       │   ├── NMImageUploader/
│   │       │   │   ├── ImagePreviewer.tsx
│   │       │   │   └── index.tsx
│   │       │   ├── NMModal/
│   │       │   │   └── DeleteConfirmationModal.tsx
│   │       │   ├── NMTable/
│   │       │   │   ├── index.tsx
│   │       │   │   └── TablePagination.tsx
│   │       │   ├── CategoryCard.tsx
│   │       │   ├── NMContainer.tsx
│   │       │   └── ProductCard.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       └── tooltip.tsx
│   ├── hooks/
│   │   └── use-mobile.ts
│   └── lib/
│       └── utils.ts
└── middleware.ts
```

### Contributing

We welcome contributions! Follow these steps:

1. **Fork** the repository.
2. **Create a feature/bugfix branch**: `git checkout -b feature/amazing-feature`.
3. **Commit changes**: Use descriptive messages (e.g., `git commit -m "Add: course duplicate prevention"`).
4. **Push to branch**: `git push origin feature/amazing-feature`.
5. **Open a Pull Request** on GitHub.
