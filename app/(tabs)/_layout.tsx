import { router, Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const fullUser = await AsyncStorage.getItem("loggedInUser");
        if (fullUser) {
          const parsedUser = JSON.parse(fullUser);
          setRole(parsedUser.role); // <-- Set the role in state
        }
      } catch (error) {
        console.error("Error retrieving user from storage:", error);
      }
    };

    checkUser();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="magnifyingglass.circle.fill"
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="course"
        options={{
          title: "My Courses",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="book.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
// ////

// import { router, Tabs } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { Platform } from "react-native";

// import { HapticTab } from "@/components/HapticTab";
// import { IconSymbol } from "@/components/ui/IconSymbol";
// import TabBarBackground from "@/components/ui/TabBarBackground";
// import { Colors } from "@/constants/Colors";
// import { useColorScheme } from "@/hooks/useColorScheme";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function TabLayout() {
//   const colorScheme = useColorScheme();
//   const [role, setRole] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true); // Optional loading state

//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         const fullUser = await AsyncStorage.getItem("loggedInUser");
//         if (fullUser) {
//           const parsedUser = JSON.parse(fullUser);
//           console.log(parsedUser, "check full details");
//           setRole(parsedUser.role);
//         }
//       } catch (error) {
//         console.error("Error retrieving user from storage:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkUser();
//   }, []);

//   if (isLoading) return null; // Optional: show spinner or blank screen while loading

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//         tabBarBackground: TabBarBackground,
//         tabBarStyle: Platform.select({
//           ios: {
//             position: "absolute",
//           },
//           default: {},
//         }),
//       }}
//     >
//       {/* Common Tabs */}
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color }) => (
//             <IconSymbol size={28} name="house.fill" color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="search"
//         options={{
//           title: "Search",
//           tabBarIcon: ({ color }) => (
//             <IconSymbol
//               size={28}
//               name="magnifyingglass.circle.fill"
//               color={color}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="course"
//         options={{
//           title: "My Courses",
//           tabBarIcon: ({ color }) => (
//             <IconSymbol size={28} name="book.fill" color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ color }) => (
//             <IconSymbol size={28} name="person.fill" color={color} />
//           ),
//         }}
//       />

//       {/* Instructor-Only Tabs */}
//       {role === "instructor" && (
//         <>
//           <Tabs.Screen
//             name="createCourse"
//             options={{
//               title: "Create Course",
//               tabBarIcon: ({ color }) => (
//                 <IconSymbol size={28} name="book.fill" color={color} />
//               ),
//             }}
//           />
//           <Tabs.Screen
//             name="manageStudents"
//             options={{
//               title: "Manage Students",
//               tabBarIcon: ({ color }) => (
//                 <IconSymbol size={28} name="book.fill" color={color} />
//               ),
//             }}
//           />
//         </>
//       )}
//     </Tabs>
//   );
// }

////n today

// import { Tabs } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { Platform } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import { HapticTab } from "@/components/HapticTab";
// import { IconSymbol } from "@/components/ui/IconSymbol";
// import TabBarBackground from "@/components/ui/TabBarBackground";
// import { Colors } from "@/constants/Colors";
// import { useColorScheme } from "@/hooks/useColorScheme";

// export default function TabLayout() {
//   const colorScheme = useColorScheme();
//   const [role, setRole] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         const fullUser = await AsyncStorage.getItem("loggedInUser");
//         if (fullUser) {
//           const parsedUser = JSON.parse(fullUser);
//           console.log(parsedUser, "check full details");
//           setRole(parsedUser.role);
//         }
//       } catch (error) {
//         console.error("Error retrieving user from storage:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkUser();
//   }, []);

//   if (isLoading) return null;

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//         tabBarBackground: TabBarBackground,
//         tabBarStyle: Platform.select({
//           ios: { position: "absolute" },
//           default: {},
//         }),
//       }}
//       // Disable automatic registration of screens inside (tabs)
//       //@ts-ignore
//       unstable_namedScreens={{
//         index: () => null,
//         search: () => null,
//         course: () => null,
//         profile: () => null,
//         ...(role === "instructor" && {
//           createCourse: () => null,
//           manageStudents: () => null,
//         }),
//       }}
//     >
//       {/* Common Tabs */}
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color }) => (
//             <IconSymbol size={28} name="house.fill" color={color} />
//           ),
//         }}
//       />
//       {role === "student" && (
//         <>
//           <Tabs.Screen
//             name="search"
//             options={{
//               title: "Search",
//               tabBarIcon: ({ color }) => (
//                 <IconSymbol
//                   size={28}
//                   name="magnifyingglass.circle.fill"
//                   color={color}
//                 />
//               ),
//             }}
//           />
//           <Tabs.Screen
//             name="course"
//             options={{
//               title: "My Courses",
//               tabBarIcon: ({ color }) => (
//                 <IconSymbol size={28} name="book.fill" color={color} />
//               ),
//             }}
//           />
//         </>
//       )}
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ color }) => (
//             <IconSymbol size={28} name="person.fill" color={color} />
//           ),
//         }}
//       />

//       {/* Instructor-Only Tabs */}
//       {role === "instructor" && (
//         <>
//           {/* <Tabs.Screen
//             name="createCourse"
//             options={{
//               title: "Create Course",
//               tabBarIcon: ({ color }) => (
//                 <IconSymbol size={28} name="book.fill" color={color} />
//               ),
//             }}
//           /> */}
//           <Tabs.Screen
//             name="manageStudents"
//             options={{
//               title: "Manage Students",
//               tabBarIcon: ({ color }) => (
//                 <IconSymbol size={28} name="book.fill" color={color} />
//               ),
//             }}
//           />
//         </>
//       )}
//     </Tabs>
//   );
// }

///new

// import { Tabs } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { Platform, View, ActivityIndicator } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import { HapticTab } from "@/components/HapticTab";
// import { IconSymbol } from "@/components/ui/IconSymbol";
// import TabBarBackground from "@/components/ui/TabBarBackground";
// import { Colors } from "@/constants/Colors";
// import { useColorScheme } from "@/hooks/useColorScheme";

// export default function TabLayout() {
//   const colorScheme = useColorScheme();
//   const [role, setRole] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         const fullUser = await AsyncStorage.getItem("loggedInUser");
//         if (fullUser) {
//           const parsedUser = JSON.parse(fullUser);
//           console.log(parsedUser, "check full details");
//           setRole(parsedUser.role);
//         }
//       } catch (error) {
//         console.error("Error retrieving user from storage:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkUser();
//   }, []);

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//         tabBarBackground: TabBarBackground,
//         tabBarStyle: Platform.select({
//           ios: { position: "absolute" },
//           default: {},
//         }),
//       }}
//     >
//       {/* Common Tabs */}
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color }) => (
//             <IconSymbol size={28} name="house.fill" color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ color }) => (
//             <IconSymbol size={28} name="person.fill" color={color} />
//           ),
//         }}
//       />

//       {/* Student-only Tabs */}
//       {role === "student" && (
//         <>
//           <Tabs.Screen
//             name="search"
//             options={{
//               title: "Search",
//               tabBarIcon: ({ color }) => (
//                 <IconSymbol
//                   size={28}
//                   name="magnifyingglass.circle.fill"
//                   color={color}
//                 />
//               ),
//             }}
//           />
//           <Tabs.Screen
//             name="course"
//             options={{
//               title: "My Courses",
//               tabBarIcon: ({ color }) => (
//                 <IconSymbol size={28} name="book.fill" color={color} />
//               ),
//             }}
//           />
//         </>
//       )}

//       {/* Instructor-only Tabs */}
//       {/* {role === "instructor" && (
//         <>
//           <Tabs.Screen
//             name="createCourse"
//             options={{
//               title: "Create",
//               tabBarIcon: ({ color }) => (
//                 <IconSymbol size={28} name="plus.circle.fill" color={color} />
//               ),
//             }}
//           />
//           <Tabs.Screen
//             name="manageStudents"
//             options={{
//               title: "Manage",
//               tabBarIcon: ({ color }) => (
//                 <IconSymbol size={28} name="person.2.fill" color={color} />
//               ),
//             }}
//           />
//         </>
//       )} */}
//     </Tabs>
//   );
// }
