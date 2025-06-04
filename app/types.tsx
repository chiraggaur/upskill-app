export type Teacher = {
  id: number;
  name: string;
  email: string;
};

export type Student = {
  id: number;
  name: string;
  email: string;
  assignedTeacherId: number;
  coursesEnrolled: number[];
};

export type Course = {
  id: number;
  title: string;
  description: string;
  cost: number;
  status: "Published" | "Draft" | "Archived";
  startDate: string;
  endDate: string;
  createdAt: string;
  image: string;
  instructor: string;
  students: number;
  rating: number;
  duration: string;
  videoCount: number;
  teacherId: number;
};

export const dummySuggestions = [
  "Adobe Photoshop",
  "Coding",
  "Social Media",
  "Camera",
  "Motivation",
  "Web Design",
  "Programming",
  "Figma",
  "Flutter",
  "Marketing",
];

export type LoggedInUser = {
  id: number;
  name: string;
  role: "student" | "instructor";
  assignedTeacherId?: number;
  coursesEnrolled: number[];
};

export const categories = [
  { name: "Design", icon: "color-palette-outline", lib: "Ionicons" },
  { name: "Personal Development", icon: "user-check", lib: "Feather" },
  { name: "Development", icon: "code", lib: "Feather" },
  { name: "Music", icon: "music", lib: "Feather" },
  { name: "Marketing", icon: "campaign", lib: "MaterialIcons" },
];

export const mockTeachers: Teacher[] = [
  { id: 1, name: "Mr. John Doe", email: "johndoe@example.com" },
  { id: 2, name: "Ms. Sarah Lee", email: "sarahlee@example.com" },
  { id: 3, name: "Dr. Alan Smith", email: "alansmith@example.com" },
];

export const mockStudents: Student[] = [
  {
    id: 101,
    name: "Alice Johnson",
    assignedTeacherId: 1,
    email: "alice.johnson@example.com",
    coursesEnrolled: [201, 204],
  },
  {
    id: 102,
    name: "Bob Martinez",
    assignedTeacherId: 2,
    email: "bob.martinez@example.com",
    coursesEnrolled: [202],
  },
  {
    id: 103,
    name: "Charlie Kim",
    assignedTeacherId: 1,
    email: "charlie.kim@example.com",
    coursesEnrolled: [201],
  },
  {
    id: 104,
    name: "Daisy Chen",
    assignedTeacherId: 3,
    email: "daisy.chen@example.com",
    coursesEnrolled: [201, 204, 215],
  },
  {
    id: 105,
    name: "Ethan Patel",
    assignedTeacherId: 2,
    email: "ethan.patel@example.com",
    coursesEnrolled: [201, 204],
  },
];

export const Courses: Course[] = [
  {
    id: 201,
    title: "React for Beginners",
    description:
      "Learn the basics of React including components, props, and state.",
    cost: 0,
    status: "Published",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    createdAt: "2025-05-25",
    image: "https://img-c.udemycdn.com/course/750x422/1565838_e54e_16.jpg",
    instructor: "Mr. John Doe",
    students: 1200,
    rating: 4.6,
    duration: "4h 20m",
    videoCount: 35,
    teacherId: 1,
  },
  {
    id: 202,
    title: "Advanced JavaScript",
    description:
      "Explore asynchronous programming, closures, and advanced JS patterns.",
    cost: 49,
    status: "Published",
    startDate: "2025-07-01",
    endDate: "2025-07-31",
    createdAt: "2025-05-26",
    image: "https://img-c.udemycdn.com/course/750x422/851712_fc61_6.jpg",
    instructor: "Ms. Sarah Lee",
    students: 890,
    rating: 4.8,
    duration: "6h 15m",
    videoCount: 48,
    teacherId: 2,
  },
  {
    id: 203,
    title: "UI/UX Design Basics",
    description:
      "Understand user interface principles and create intuitive user experiences.",
    cost: 35,
    status: "Draft",
    startDate: "2025-08-01",
    endDate: "2025-08-30",
    createdAt: "2025-05-27",
    image: "https://img-c.udemycdn.com/course/750x422/1452908_8741_3.jpg",
    instructor: "Dr. Alan Smith",
    students: 530,
    rating: 4.2,
    duration: "3h 30m",
    videoCount: 28,
    teacherId: 3,
  },
  {
    id: 204,
    title: "Node.js Crash Course",
    description: "Learn how to build backend APIs using Node.js and Express.",
    cost: 29,
    status: "Published",
    startDate: "2025-06-15",
    endDate: "2025-07-15",
    createdAt: "2025-05-28",
    image: "https://img-c.udemycdn.com/course/750x422/922484_52a1_8.jpg",
    instructor: "Mr. John Doe",
    students: 760,
    rating: 4.5,
    duration: "5h 10m",
    videoCount: 40,
    teacherId: 1,
  },
  {
    id: 205,
    title: "Python for Data Analysis",
    description:
      "Analyze and visualize data using Python, Pandas, and Matplotlib.",
    cost: 59,
    status: "Archived",
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    createdAt: "2025-03-01",
    image: "https://img-c.udemycdn.com/course/750x422/567828_67d0.jpg",
    instructor: "Dr. Alan Smith",
    students: 1340,
    rating: 4.7,
    duration: "7h 00m",
    videoCount: 55,
    teacherId: 3,
  },
  {
    id: 206,
    title: "HTML & CSS Bootcamp",
    description:
      "Master web layout and styling using HTML5 and modern CSS techniques.",
    cost: 19,
    status: "Published",
    startDate: "2025-06-10",
    endDate: "2025-06-30",
    createdAt: "2025-05-22",
    image: "https://img-c.udemycdn.com/course/750x422/437398_46c3_10.jpg",
    instructor: "Ms. Sarah Lee",
    students: 650,
    rating: 4.4,
    duration: "3h 45m",
    videoCount: 30,
    teacherId: 2,
  },
  {
    id: 207,
    title: "Full-Stack Web Development",
    description:
      "Build complete web apps using React, Node.js, and PostgreSQL.",
    cost: 75,
    status: "Published",
    startDate: "2025-06-20",
    endDate: "2025-07-20",
    createdAt: "2025-05-30",
    image: "https://images.pexels.com/photos/1181679/pexels-photo-1181679.jpeg",
    instructor: "Mr. John Doe",
    students: 980,
    rating: 4.7,
    duration: "10h 00m",
    videoCount: 60,
    teacherId: 1,
  },
  {
    id: 208,
    title: "TypeScript Essentials",
    description: "Understand static typing in JavaScript using TypeScript.",
    cost: 25,
    status: "Published",
    startDate: "2025-07-05",
    endDate: "2025-07-25",
    createdAt: "2025-06-01",
    image: "https://images.pexels.com/photos/1181680/pexels-photo-1181680.jpeg",
    instructor: "Ms. Sarah Lee",
    students: 710,
    rating: 4.6,
    duration: "4h 50m",
    videoCount: 36,
    teacherId: 2,
  },
  {
    id: 209,
    title: "Machine Learning Basics",
    description:
      "Start your ML journey with basic concepts and Python examples.",
    cost: 99,
    status: "Published",
    startDate: "2025-08-01",
    endDate: "2025-08-31",
    createdAt: "2025-06-05",
    image: "https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg",
    instructor: "Dr. Alan Smith",
    students: 1120,
    rating: 4.8,
    duration: "8h 30m",
    videoCount: 50,
    teacherId: 3,
  },
  {
    id: 210,
    title: "Express.js Deep Dive",
    description: "Learn middleware, routing, and error handling with Express.",
    cost: 39,
    status: "Published",
    startDate: "2025-07-10",
    endDate: "2025-07-30",
    createdAt: "2025-06-08",
    image: "https://images.pexels.com/photos/1181682/pexels-photo-1181682.jpeg",
    instructor: "Mr. John Doe",
    students: 540,
    rating: 4.5,
    duration: "5h 20m",
    videoCount: 38,
    teacherId: 1,
  },
  {
    id: 211,
    title: "Next.js in Practice",
    description: "Build full-stack apps with Next.js, API routes, and SSR.",
    cost: 45,
    status: "Draft",
    startDate: "2025-08-10",
    endDate: "2025-09-05",
    createdAt: "2025-06-12",
    image: "https://images.pexels.com/photos/1181684/pexels-photo-1181684.jpeg",
    instructor: "Ms. Sarah Lee",
    students: 480,
    rating: 4.3,
    duration: "6h 00m",
    videoCount: 45,
    teacherId: 2,
  },
  {
    id: 212,
    title: "Database Design Fundamentals",
    description: "Understand relational databases and schema design.",
    cost: 20,
    status: "Published",
    startDate: "2025-07-01",
    endDate: "2025-07-21",
    createdAt: "2025-06-10",
    image: "https://images.pexels.com/photos/1181684/pexels-photo-1181684.jpeg",
    instructor: "Dr. Alan Smith",
    students: 600,
    rating: 4.4,
    duration: "4h 10m",
    videoCount: 32,
    teacherId: 3,
  },
  {
    id: 213,
    title: "REST API Design",
    description: "Learn RESTful principles and build scalable APIs.",
    cost: 35,
    status: "Published",
    startDate: "2025-06-15",
    endDate: "2025-07-15",
    createdAt: "2025-06-01",
    image: "https://images.pexels.com/photos/1181685/pexels-photo-1181685.jpeg",
    instructor: "Mr. John Doe",
    students: 850,
    rating: 4.6,
    duration: "6h 20m",
    videoCount: 42,
    teacherId: 1,
  },
  {
    id: 214,
    title: "JavaScript DOM Mastery",
    description: "Manipulate the DOM with modern JavaScript techniques.",
    cost: 15,
    status: "Published",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    createdAt: "2025-05-20",
    image: "https://images.pexels.com/photos/1181685/pexels-photo-1181685.jpeg",
    instructor: "Ms. Sarah Lee",
    students: 410,
    rating: 4.1,
    duration: "2h 45m",
    videoCount: 22,
    teacherId: 2,
  },
  {
    id: 215,
    title: "Intro to Artificial Intelligence",
    description: "A beginner-friendly introduction to AI concepts and tools.",
    cost: 89,
    status: "Published",
    startDate: "2025-09-01",
    endDate: "2025-09-30",
    createdAt: "2025-06-10",
    image: "https://images.pexels.com/photos/733857/pexels-photo-733857.jpeg",
    instructor: "Dr. Alan Smith",
    students: 940,
    rating: 4.7,
    duration: "7h 40m",
    videoCount: 50,
    teacherId: 3,
  },
];
