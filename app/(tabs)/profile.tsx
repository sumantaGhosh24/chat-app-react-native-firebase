import {useState} from "react";
import {useWindowDimensions} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {TabView, SceneMap} from "react-native-tab-view";

import ProfileDetails from "@/components/profile-details";
import ProfileUserImage from "@/components/profile-user-image";
import ProfileUserData from "@/components/profile-user-data";
import ProfileUserAddress from "@/components/profile-user-address";

const renderScene = SceneMap({
  details: ProfileDetails,
  image: ProfileUserImage,
  data: ProfileUserData,
  address: ProfileUserAddress,
});

const Profile = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: "details", title: "User Details"},
    {key: "image", title: "User Update Image"},
    {key: "data", title: "User Update Data"},
    {key: "address", title: "User Update Address"},
  ]);

  return (
    <SafeAreaView className="h-full px-4 bg-white dark:bg-black">
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        style={{marginTop: 10}}
      />
    </SafeAreaView>
  );
};

export default Profile;
