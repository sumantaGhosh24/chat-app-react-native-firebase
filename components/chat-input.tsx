import {useState} from "react";
import {View, ToastAndroid, TextInput, TouchableOpacity} from "react-native";
import {db} from "@/lib/firebase";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {FontAwesome} from "@expo/vector-icons";

interface ChatInputProps {
  chat: string;
  user: string;
}

const ChatInput = ({chat, user}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const addChat = async () => {
    if (!message) return;

    try {
      await addDoc(collection(db, "chat", chat, "messages"), {
        type: "message",
        message,
        timestamp: serverTimestamp(),
        user,
      });
      setMessage("");
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
    <View className="w-full px-4 bg-white dark:bg-slate-500 rounded-2xl border-2 border-black flex flex-row items-center h-16">
      <TextInput
        className="flex-1 font-semibold text-base text-black dark:text-white"
        value={message}
        placeholder="Send message"
        placeholderTextColor="#000"
        onChangeText={(text: any) => setMessage(text)}
      />
      <TouchableOpacity onPress={() => addChat()} className="bg-blue-700 p-1.5">
        <FontAwesome name="send" color="white" size={28} />
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;
