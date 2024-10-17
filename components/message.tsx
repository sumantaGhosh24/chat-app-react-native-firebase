import {View, Text, Image} from "react-native";

interface MessageProps {
  type: string;
  user: string;
  message: string;
  timestamp: any;
  currentUser: string;
  chatUserAvatar: any;
  currentUserAvatar: string;
  chat: string;
}

const Message = ({
  type,
  user,
  message,
  timestamp,
  currentUser,
  chatUserAvatar,
  currentUserAvatar,
  chat,
}: MessageProps) => {
  return (
    <>
      {type === "info" && (
        <View className="my-1 flex items-center justify-center">
          <View className="rounded-lg bg-gray-500 px-4 py-2">
            <Text className="text-[8px] text-white">
              {timestamp?.toDate().toDateString()}
            </Text>
            <Text className="text-white">{message}</Text>
          </View>
        </View>
      )}
      {type === "message" &&
        (user === currentUser ? (
          <View className="my-1 flex items-end">
            <View className="rounded-lg bg-blue-500 px-4 py-2 flex flex-row items-center">
              <View>
                <Text className="text-[8px] text-white">
                  {timestamp?.toDate().toDateString()}
                </Text>
                <Text className="text-white">{message}</Text>
              </View>
              <Image
                source={{uri: currentUserAvatar}}
                alt="user"
                className="ml-2 mt-2 h-8 w-8 rounded-full object-cover"
              />
            </View>
          </View>
        ) : (
          <View className="my-1 flex items-start">
            <View className="rounded-lg bg-gray-400 px-4 py-2 flex flex-row items-center">
              <Image
                source={{uri: chatUserAvatar}}
                alt="user"
                className="mr-2 mt-2 h-8 w-8 rounded-full object-cover"
              />
              <View>
                <Text className="text-[8px] text-white">
                  {timestamp?.toDate().toDateString()}
                </Text>
                <Text className="text-white">{message}</Text>
              </View>
            </View>
          </View>
        ))}
    </>
  );
};

export default Message;
