import {useState, useEffect} from "react";
import {View, Text, Image, ToastAndroid} from "react-native";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import {FontAwesome} from "@expo/vector-icons";

import {db} from "@/lib/firebase";

import IconButton from "./icon-button";

interface UserCardProps {
  id: string;
  avatar: string;
  username: string;
  currentUser: string;
}

const UserCard = ({id, avatar, username, currentUser}: UserCardProps) => {
  const [exists, setExists] = useState(false);

  const unsubscribe = async () => {
    const chatQuery = query(
      collection(db, "chat"),
      where("users", "array-contains", currentUser)
    );
    onSnapshot(chatQuery, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (
          (doc.data().users[0] === currentUser && doc.data().users[1] === id) ||
          (doc.data().users[0] === id && doc.data().users[1] === currentUser)
        ) {
          setExists(true);
        }
      });
    });
  };

  useEffect(() => {
    return () => {
      unsubscribe();
    };
  }, [db, currentUser, id]);

  const addChant = async (id: string) => {
    try {
      const docRef = await addDoc(collection(db, "chat"), {
        users: [currentUser, id],
        timestamp: serverTimestamp(),
      });
      await addDoc(collection(db, "chat", docRef.id, "messages"), {
        type: "info",
        message: "chat created",
        timestamp: serverTimestamp(),
      });
      unsubscribe();
      ToastAndroid.showWithGravityAndOffset(
        "Chat created.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        "Something went wrong, try again later.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
  };

  return (
    <View className="my-4 flex flex-row items-center justify-start rounded-md bg-white dark:bg-black shadow-md shadow-black dark:shadow-white p-2">
      <Image
        source={{uri: avatar}}
        alt={username}
        className="mx-3 h-12 w-12 rounded-full object-cover"
      />
      <View>
        <Text className="my-2 text-base font-bold text-black dark:text-white">
          {username}
        </Text>
        {exists && <Text className="text-black dark:text-white">(Friend)</Text>}
      </View>
      {!exists ? (
        <IconButton
          icon={<FontAwesome name="plus" color="white" size={32} />}
          containerStyles="bg-blue-700 rounded-full ml-auto mr-3"
          handlePress={() => addChant(id)}
        />
      ) : (
        <IconButton
          icon={<FontAwesome name="user" color="white" size={32} />}
          containerStyles="bg-green-700 rounded-full ml-auto mr-3"
          handlePress={() =>
            ToastAndroid.showWithGravityAndOffset(
              "You are already friend.",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            )
          }
        />
      )}
    </View>
  );
};

export default UserCard;
