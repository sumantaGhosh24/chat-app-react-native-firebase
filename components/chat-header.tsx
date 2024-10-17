import {useState, useEffect} from "react";
import {View, Text, Image} from "react-native";
import {doc, onSnapshot} from "firebase/firestore";
import {router} from "expo-router";
import {FontAwesome} from "@expo/vector-icons";

import {db} from "@/lib/firebase";

import IconButton from "./icon-button";

interface ChatHeaderProps {
  messageId: string;
  currentUser: string;
}

interface ChatUserProps {
  avatar: string;
  username: string;
  firstName: string;
  lastName: string;
}

const ChatHeader = ({messageId, currentUser}: ChatHeaderProps) => {
  const [chatUser, setChatUser] = useState<ChatUserProps>();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "chat", `${messageId}`),
      (docSnap) => {
        const users = docSnap.data()?.users;
        if (users) {
          const chatUser = users?.filter((el: string) => el !== currentUser);
          onSnapshot(doc(db, "user", `${chatUser}`), (docSnap) => {
            if (docSnap.exists()) {
              setChatUser({
                avatar: docSnap.data().avatar,
                username: docSnap.data().username,
                firstName: docSnap.data().firstName,
                lastName: docSnap.data().lastName,
              });
            }
          });
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, [db, messageId, currentUser]);

  const backHome = () => {
    router.push("/home");
  };

  return (
    <View className="flex flex-row items-center justify-start rounded-t-lg bg-blue-500 px-5 py-3">
      <IconButton
        containerStyles="bg-blue-700"
        handlePress={() => backHome()}
        icon={<FontAwesome name="arrow-left" color="white" size={32} />}
      />
      <Image
        source={{uri: chatUser?.avatar}}
        alt="user"
        className="mx-5 h-12 w-12 rounded-full object-cover"
      />
      <View>
        <Text className="text-lg font-semibold capitalize text-white">
          {chatUser?.firstName} {chatUser?.lastName}
        </Text>
        <Text className="mt-3 text-sm font-bold">{chatUser?.username}</Text>
      </View>
    </View>
  );
};

export default ChatHeader;
