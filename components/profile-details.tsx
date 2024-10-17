import {View, Text, ScrollView, Image} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

import {useGlobalContext} from "@/context/global-provider";
import {logOut} from "@/lib/firebase-functions";

import IconButton from "./icon-button";

const ProfileDetails = () => {
  const {user} = useGlobalContext();

  return (
    <ScrollView className="mt-5 space-y-4" showsVerticalScrollIndicator={false}>
      {user?.avatar && (
        <Image
          source={{uri: user?.avatar}}
          alt="avatar"
          className="w-[100px] h-[100px] rounded-full object-cover mx-auto"
        />
      )}
      <View className="absolute right-10">
        <IconButton
          icon={<FontAwesome name="sign-out" size={36} color="white" />}
          containerStyles="bg-blue-700"
          handlePress={() => logOut()}
        />
      </View>
      <View className="flex flex-row">
        <Text className="text-black dark:text-white">User ID: </Text>
        <Text className="capitalize font-bold text-black dark:text-white">
          {user?.uid}
        </Text>
      </View>
      <View className="flex flex-row">
        <Text className="text-black dark:text-white">Email Address: </Text>
        <Text className="font-bold text-black dark:text-white">
          {user?.email}
        </Text>
      </View>
      <View className="flex flex-row">
        <Text className="text-black dark:text-white">Mobile Number: </Text>
        <Text className="capitalize font-bold text-black dark:text-white">
          {user?.mobileNumber}
        </Text>
      </View>
      <View className="flex flex-row">
        <Text className="text-black dark:text-white">Username: </Text>
        <Text className="font-bold text-black dark:text-white">
          {user?.username}
        </Text>
      </View>
      {user?.firstName && (
        <View className="space-y-4">
          <View className="flex flex-row">
            <Text className="text-black dark:text-white">First Name: </Text>
            <Text className="capitalize font-bold text-black dark:text-white">
              {user?.firstName}
            </Text>
          </View>
          <View className="flex flex-row">
            <Text className="text-black dark:text-white">Last Name: </Text>
            <Text className="capitalize font-bold text-black dark:text-white">
              {user?.lastName}
            </Text>
          </View>
          <View className="flex flex-row">
            <Text className="text-black dark:text-white">DOB: </Text>
            <Text className="capitalize font-bold text-black dark:text-white">
              {user?.dob.toDate().toDateString()}
            </Text>
          </View>
          <View className="flex flex-row">
            <Text className="text-black dark:text-white">Gender: </Text>
            <Text className="capitalize font-bold text-black dark:text-white">
              {user?.gender}
            </Text>
          </View>
        </View>
      )}
      {user?.city && (
        <View className="space-y-4">
          <View className="flex flex-row">
            <Text className="text-black dark:text-white">City: </Text>
            <Text className="capitalize font-bold text-black dark:text-white">
              {user?.city}
            </Text>
          </View>
          <View className="flex flex-row">
            <Text className="text-black dark:text-white">State: </Text>
            <Text className="capitalize font-bold text-black dark:text-white">
              {user?.state}
            </Text>
          </View>
          <View className="flex flex-row">
            <Text className="text-black dark:text-white">Country: </Text>
            <Text className="capitalize font-bold text-black dark:text-white">
              {user?.country}
            </Text>
          </View>
          <View className="flex flex-row">
            <Text className="text-black dark:text-white">Zip: </Text>
            <Text className="capitalize font-bold text-black dark:text-white">
              {user?.zip}
            </Text>
          </View>
          <View className="flex flex-row">
            <Text className="text-black dark:text-white">Addressline: </Text>
            <Text className="capitalize font-bold text-black dark:text-white">
              {user?.addressline}
            </Text>
          </View>
        </View>
      )}
      <View className="flex flex-row">
        <Text className="text-black dark:text-white">Created At: </Text>
        <Text className="capitalize font-bold text-black dark:text-white">
          {user?.timestamp?.toDate().toDateString()}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ProfileDetails;
