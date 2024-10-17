import {useState, useEffect} from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {router} from "expo-router";
import {doc, onSnapshot} from "firebase/firestore";

import {db} from "@/lib/firebase";

interface ChatProps {
  chat: any;
  currentUser: string;
}

interface ChatUserProps {
  avatar: string;
  username: string;
  firstName: string;
  lastName: string;
}

const Chat = ({chat, currentUser}: ChatProps) => {
  const [chatUser, setChatUser] = useState<ChatUserProps>();

  useEffect(() => {
    const userId = chat?.users.filter((el: string) => el !== currentUser);
    const unsubscribe = onSnapshot(doc(db, "user", `${userId}`), (docSnap) => {
      if (docSnap.exists()) {
        setChatUser({
          avatar: docSnap.data().avatar,
          username: docSnap.data().username,
          firstName: docSnap.data().firstName,
          lastName: docSnap.data().lastName,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [chat, currentUser, db]);

  return (
    <TouchableOpacity
      onPress={() => router.push(`/message/${chat.id}`)}
      className="my-2 mx-2 rounded-md bg-white shadow-md shadow-black dark:bg-black dark:shadow-white p-3 flex flex-row items-center"
    >
      <Image
        source={{
          uri: chatUser?.avatar,
        }}
        alt="avatar"
        className="h-12 w-12 rounded-full object-cover mr-5"
      />
      <View>
        <Text className="text-lg font-semibold capitalize text-black dark:text-white">
          {chatUser?.firstName} {chatUser?.lastName}
        </Text>
        <Text className="mt-3 text-sm font-bold text-black dark:text-white">
          {chatUser?.username}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Chat;
