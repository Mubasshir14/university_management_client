## University Management System – A Complete Academic Solution
## **[Live](https://university-management-client.vercel.app/)**
Welcome to our comprehensive **University Management System**, designed to streamline and digitize the entire academic and administrative process of a university.

This platform offers an all-in-one solution with the following core features:

### 📚 Key Modules

- **Home Page:** Overview of the university, featuring details about faculties, departments, academic achievements, and admission programs.
- **Dashboards:** Role-based dashboards for:
  - **Admin**
  - **Users**
  - **Students**

### 📝 Student Admission & Registration

- Students can apply for admission by filling out an application form.
- The **Admin** reviews and approves applications.
- After approval, students can complete their registration by selecting their desired:
  - **Department**
  - **Academic Semester** (Spring, Summer, or Fall)
- During registration, students can:
  - Select courses within the **minimum and maximum credit limit**
  - Drop a course later if necessary

### 🧑‍💼 Admin Functionalities

- Add/edit **Departments**, **Faculties**, and **Semesters**
- Approve student **admissions** and **course registrations**
- View students based on:
  - **Courses**
  - **Departments**
  - **Semesters**
- Assign and manage **Course Advisors**

This system is built to ensure a smooth and transparent academic journey for students while providing efficient tools for university staff and administrators.



## 🔐 Technologies & Tools Used

### 🧠 Frontend Technologies
- **Next.js**: React framework for server-side rendering and static site generation (v15.4.1).
- **React**: UI library for building interactive components (v19.1.0).
- **TypeScript**: Strong typing for enhanced developer experience (v5).
- **React Hook Form**: Performant, flexible form handling with validation (v7.60.0).
- **Zod**: Schema validation with static type inference (v4.0.5).
- **Redux Toolkit**: State management for predictable state handling (v2.8.2).
- **Chart.js**: Data visualization with interactive charts (v4.5.0, with `react-chartjs-2` and `chartjs-plugin-datalabels`).
- **Framer Motion**: Smooth animations and transitions (v12.23.6).
- **React Dropzone**: Drag-and-drop file uploads (v14.3.8).
- **React Select**: Customizable select input component (v5.10.2).
- **React Masonry CSS**: Responsive masonry grid layouts (v1.0.16).
- **Radix UI**: Accessible, unstyled UI components for building custom interfaces:
  - Avatar (v1.1.10)
  - Checkbox (v1.3.2)
  - Collapsible (v1.1.11)
  - Dialog (v1.1.14)
  - Dropdown Menu (v2.1.15)
  - Label (v2.1.7)
  - Select (v2.2.5)
  - Separator (v1.1.7)
  - Slot (v1.2.3)
  - Tabs (v1.1.12)
  - Tooltip (v1.2.7)
- **Lucide React**: Icon library for clean, customizable icons (v0.525.0).
- **Sonner**: Toast notifications for user feedback (v2.0.6).
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development (v4).
- **Class Variance Authority (CVA)**: Utility for managing Tailwind variants (v0.7.1).
- **Tailwind Merge**: Merges Tailwind classes efficiently (v3.3.1).
- **TW Animate CSS**: Tailwind-compatible animations (v1.3.5).
- **Clsx**: Utility for conditionally joining class names (v2.1.1).

### 🛠️ Backend Technologies
- **Express.js**: For creating the server and APIs.
- **MongoDB**: Database management using Mongoose.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Cloudinary**: Cloud-based media storage and management.
- **Zod**: Schema validation with static type inference (shared with frontend).

### 🔐 Authentication & Security
- **jsonwebtoken (JWT)**: Secure authentication using tokens (frontend: `jwt-decode` v4.0.0).
- **cors**: Cross-Origin Resource Sharing control.

### 📤 File & Media Uploads
- **multer**: Handle multipart/form-data for file uploads.
- **multer-storage-cloudinary**: Upload files directly to Cloudinary.

### ✉️ Communication
- **nodemailer**: Send emails from the server.

### 📦 HTTP Utilities
- **http-status / http-status-codes**: Standard HTTP status code constants and helpers.

### 🧰 Developer Utilities
- **Environment Variables**: Managed with `dotenv`.
- **Linting and Formatting**: ESLint (v9) and Prettier for code quality, with `eslint-config-next` (v15.4.1).
- **Development Server**: Powered by `ts-node-dev` for live reload.
- **ua-parser-js**: Detect and parse user device/browser info.

## 📋 Prerequisites
Make sure you have the following installed:
- **Node.js** (version 16 or above)
- **npm** or **yarn**
- **MongoDB instance** (local or cloud-based, e.g., MongoDB Atlas)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mubasshir14/university_management_client.git
   ```
   ```bash
   cd university_management_client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env.local` file** in the root directory and configure your environment variables:
   ```bash
    NEXT_PUBLIC_BASE_API=http://localhost:5000/api
   ```

## Scripts

- **Start Development Server:**
  ```bash
  npm run dev
  ```

- **Build for Production:**
  ```bash
  npm run build
  ```

- **Deploy To Vercel:**
  ```bash
  vercel --prod
  ```


## Folder Structure
```
📦src
 ┣ 📂app
 ┃ ┣ 📂(WithCommonLayout)
 ┃ ┃ ┣ 📂about
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂contact
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂department
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂faculty
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂get-admit
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂(WithDashboardLayout)
 ┃ ┃ ┣ 📂admin
 ┃ ┃ ┃ ┗ 📂dashboard
 ┃ ┃ ┃ ┃ ┣ 📂add-advisor
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂add-course
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂add-department
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂add-faculty
 ┃ ┃ ┃ ┃ ┣ 📂add-semester
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂approve-registration
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂course-drop-individual-registration
 ┃ ┃ ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂filter-course
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂filter-department
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂filter-semester
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂generate-result
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂manage-advisor
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂manage-course
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂manage-department
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂manage-semester
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂manage-student
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂pending-registration
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂student-result
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂waiting-approval
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂student
 ┃ ┃ ┃ ┗ 📂dashboard
 ┃ ┃ ┃ ┃ ┣ 📂my-information
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂my-result
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂registration
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂registration-information
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂update-registration-information
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂user
 ┃ ┃ ┗ 📜layout.tsx
 ┃ ┣ 📂login
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂signup
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📜error.tsx
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜loading.tsx
 ┃ ┗ 📜not-found.tsx
 ┣ 📂assets
 ┃ ┣ 📜a-woman-stands-near-the-smartphone-on-the-screen-error-404-page-system-error-png.webp
 ┃ ┣ 📜campus.jpg
 ┃ ┣ 📜download.jpg
 ┃ ┣ 📜thumb_1200_1698.png
 ┃ ┗ 📜university-education-logo-design-template-free-vector.jpg
 ┣ 📂components
 ┃ ┣ 📂constant
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂context
 ┃ ┃ ┗ 📜UserContext.tsx
 ┃ ┣ 📂dashboard
 ┃ ┃ ┗ 📂sidebar
 ┃ ┃ ┃ ┣ 📜app-sidebar.tsx
 ┃ ┃ ┃ ┣ 📜nav-main.tsx
 ┃ ┃ ┃ ┗ 📜nav-user.tsx
 ┃ ┣ 📂DashboardComponents
 ┃ ┃ ┣ 📜AddCourse.tsx
 ┃ ┃ ┣ 📜AddDepartment.tsx
 ┃ ┃ ┣ 📜AddFaculty.tsx
 ┃ ┃ ┣ 📜AddSemester.tsx
 ┃ ┃ ┣ 📜AdminDashboard.tsx
 ┃ ┃ ┣ 📜ApproveRegistration.tsx
 ┃ ┃ ┣ 📜Course.tsx
 ┃ ┃ ┣ 📜CreateRegistrationForm.tsx
 ┃ ┃ ┣ 📜Department.tsx
 ┃ ┃ ┣ 📜FilterByCourse.tsx
 ┃ ┃ ┣ 📜FilterStudentByDepartment.tsx
 ┃ ┃ ┣ 📜FilterStudentBySemester.tsx
 ┃ ┃ ┣ 📜GenerateResultForm.tsx
 ┃ ┃ ┣ 📜ManageCourse.tsx
 ┃ ┃ ┣ 📜ManageDepartment.tsx
 ┃ ┃ ┣ 📜ManageFaculty.tsx
 ┃ ┃ ┣ 📜ManageSemester.tsx
 ┃ ┃ ┣ 📜ManageStudent.tsx
 ┃ ┃ ┣ 📜MyInformation.tsx
 ┃ ┃ ┣ 📜MyRegistrationInformation.tsx
 ┃ ┃ ┣ 📜MyResult.tsx
 ┃ ┃ ┣ 📜PendingRegistration.tsx
 ┃ ┃ ┣ 📜Semester.tsx
 ┃ ┃ ┣ 📜StudentResult.tsx
 ┃ ┃ ┣ 📜UpdateIndividualCourseByAdmin.tsx
 ┃ ┃ ┣ 📜UpdateRegistrationInformation.tsx
 ┃ ┃ ┗ 📜WaitingApproval.tsx
 ┃ ┣ 📂lib
 ┃ ┃ ┣ 📂providers
 ┃ ┃ ┃ ┣ 📜Providers.tsx
 ┃ ┃ ┃ ┗ 📜StoreProvider.tsx
 ┃ ┃ ┣ 📂redux
 ┃ ┃ ┃ ┣ 📜hooks.ts
 ┃ ┃ ┃ ┣ 📜storage.ts
 ┃ ┃ ┃ ┗ 📜store.ts
 ┃ ┃ ┗ 📜utils.ts
 ┃ ┣ 📂Services
 ┃ ┃ ┣ 📂AuthService
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂Course
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Department
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂Faculty
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂Registration
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂result
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂Semester
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┗ 📂Student
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂Shared
 ┃ ┃ ┣ 📜AboutUs.tsx
 ┃ ┃ ┣ 📜AcademicPrograms .tsx
 ┃ ┃ ┣ 📜AdmissionsAid.tsx
 ┃ ┃ ┣ 📜ContactUs.tsx
 ┃ ┃ ┣ 📜Department.tsx
 ┃ ┃ ┣ 📜DepartmentDetail.tsx
 ┃ ┃ ┣ 📜EventCarousel.tsx
 ┃ ┃ ┣ 📜Faculty.tsx
 ┃ ┃ ┣ 📜FacultyDetails.tsx
 ┃ ┃ ┣ 📜FeatureCards.tsx
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┣ 📜Gallery.tsx
 ┃ ┃ ┣ 📜HeroSection.tsx
 ┃ ┃ ┣ 📜LoginRegister.tsx
 ┃ ┃ ┣ 📜Navbar.tsx
 ┃ ┃ ┣ 📜NewsAnnouncements.tsx
 ┃ ┃ ┣ 📜ResearchInnovation.tsx
 ┃ ┃ ┣ 📜StatisticsView.tsx
 ┃ ┃ ┗ 📜Student.tsx
 ┃ ┣ 📂Types
 ┃ ┃ ┣ 📜faculty.ts
 ┃ ┃ ┣ 📜semester.ts
 ┃ ┃ ┣ 📜student.ts
 ┃ ┃ ┗ 📜user.ts
 ┃ ┗ 📂ui
 ┃ ┃ ┣ 📂core
 ┃ ┃ ┃ ┣ 📂NMImageUploader
 ┃ ┃ ┃ ┃ ┣ 📜ImagePreviewer.tsx
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┣ 📂NMModal
 ┃ ┃ ┃ ┃ ┗ 📜DeleteConfirmationModal.tsx
 ┃ ┃ ┃ ┣ 📂NMTable
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┗ 📜TablePagination.tsx
 ┃ ┃ ┃ ┣ 📜CategoryCard.tsx
 ┃ ┃ ┃ ┣ 📜NMContainer.tsx
 ┃ ┃ ┃ ┗ 📜ProductCard.tsx
 ┃ ┃ ┣ 📜avatar.tsx
 ┃ ┃ ┣ 📜badge.tsx
 ┃ ┃ ┣ 📜button.tsx
 ┃ ┃ ┣ 📜card.tsx
 ┃ ┃ ┣ 📜checkbox.tsx
 ┃ ┃ ┣ 📜collapsible.tsx
 ┃ ┃ ┣ 📜dropdown-menu.tsx
 ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┣ 📜input.tsx
 ┃ ┃ ┣ 📜label.tsx
 ┃ ┃ ┣ 📜select.tsx
 ┃ ┃ ┣ 📜separator.tsx
 ┃ ┃ ┣ 📜sheet.tsx
 ┃ ┃ ┣ 📜sidebar.tsx
 ┃ ┃ ┣ 📜skeleton.tsx
 ┃ ┃ ┣ 📜table.tsx
 ┃ ┃ ┣ 📜tabs.tsx
 ┃ ┃ ┣ 📜textarea.tsx
 ┃ ┃ ┗ 📜tooltip.tsx
 ┣ 📂hooks
 ┃ ┗ 📜use-mobile.ts
 ┣ 📂lib
 ┃ ┗ 📜utils.ts
 ┗ 📜middleware.ts
 ```

## Contributing
Contributions are welcome! Please follow these steps:

1. **Fork the repository.**
2. **Create a new branch** for your feature or bugfix.
3. **Commit your changes** with descriptive messages.
4. **Push your changes** and open a pull request.

---