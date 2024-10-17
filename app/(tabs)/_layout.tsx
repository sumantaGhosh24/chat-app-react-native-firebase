import {Text, View} from "react-native";
import {Tabs} from "expo-router";
import {FontAwesome} from "@expo/vector-icons";
import {StatusBar} from "expo-status-bar";

import {useGlobalContext} from "@/context/global-provider";

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({icon, color, name, focused}: TabIconProps) => {
  return (
    <View className="flex items-center justify-center gap-2">
      {icon}
      <Text
        className={`${focused ? "font-semibold" : ""} text-xs`}
        style={{color: color}}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const {user} = useGlobalContext();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#1D4ED8",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={<FontAwesome name="home" size={24} color={color} />}
                name="Home"
                focused={focused}
                color="white"
              />
            ),
          }}
          redirect={!user}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={<FontAwesome name="user" size={24} color={color} />}
                name="Profile"
                focused={focused}
                color="white"
              />
            ),
          }}
          redirect={!user}
        />
      </Tabs>
      <StatusBar style="auto" backgroundColor="#1D4ED8" />
    </>
  );
};

export default TabLayout;
