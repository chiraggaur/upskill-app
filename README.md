# Educational App (Upskill)

A modern educational platform built with Expo that connects students and instructors. The app features course management, search functionality, and a beautiful user interface with dark/light theme support.

## Features

- 🎓 Student and Instructor roles
- 🔍 Advanced course search functionality
- 🌓 Dark/Light theme support
- 📱 Cross-platform (iOS & Android)
- 🎨 Modern and intuitive UI
- 🔐 Secure authentication
- 📚 Course management system

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac users) or Android Studio (for Android development)

## Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
cd upskill-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npx expo start
```

## Running the App

After starting the development server, you can run the app using:

- Press `i` to open in iOS simulator
- Press `a` to open in Android emulator
- Scan the QR code with Expo Go app on your physical device

## Project Structure

```
upskill-app/
├── app/                    # Main application code
│   ├── (tabs)/            # Tab-based navigation screens
│   ├── context/           # Context providers (theme, etc.)
│   ├── screens/           # Additional screens
│   └── types/             # TypeScript type definitions
├── assets/                # Static assets (images, animations)
└── components/            # Reusable components
```

## Environment Setup

1. Create a `.env` file in the root directory
2. Add necessary environment variables:

```
API_URL=your_api_url
```

## Available Scripts

- `npx expo start` - Start the development server
- `npx expo start --ios` - Start the iOS simulator
- `npx expo start --android` - Start the Android emulator
- `npx expo start --web` - Start the web version

## Dependencies

Key dependencies used in this project:

- expo
- react-native
- @react-navigation/native
- react-native-paper
- axios
- @react-native-async-storage/async-storage
- lottie-react-native

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [your-email] or open an issue in the repository.
