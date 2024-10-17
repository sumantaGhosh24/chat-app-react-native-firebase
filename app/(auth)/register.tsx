import {useState} from "react";
import {View, Text, ToastAndroid, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Link} from "expo-router";

import FormField from "@/components/form-field";
import CustomButton from "@/components/custom-button";
import {createUser} from "@/lib/firebase-functions";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    username: "",
    mobileNumber: "",
    password: "",
    cf_password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (
      form.email === "" ||
      form.mobileNumber === "" ||
      form.username === "" ||
      form.password === "" ||
      form.cf_password === ""
    ) {
      return ToastAndroid.showWithGravityAndOffset(
        "Fill all fields!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }

    if (form.password !== form.cf_password) {
      return ToastAndroid.showWithGravityAndOffset(
        "Password and confirm password not match!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }

    setLoading(true);

    try {
      await createUser(form);

      ToastAndroid.showWithGravityAndOffset(
        "User login successfully.",
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="min-h-screen">
      <ScrollView>
        <View className="w-full flex justify-center min-h-screen px-4 bg-white dark:bg-black">
          <Text className="text-2xl font-bold mt-20 mb-5 text-black dark:text-white">
            User Registration
          </Text>
          <FormField
            title="Email address"
            placeholder="Enter your email address"
            value={form.email}
            handleChangeText={(text: any) => setForm({...form, email: text})}
            otherStyles="mb-3"
          />
          <FormField
            title="Mobile number"
            placeholder="Enter your mobile number"
            value={form.mobileNumber}
            handleChangeText={(text: any) =>
              setForm({...form, mobileNumber: text})
            }
            otherStyles="mb-3"
          />
          <FormField
            title="Username"
            placeholder="Enter your username"
            value={form.username}
            handleChangeText={(text: any) => setForm({...form, username: text})}
            otherStyles="mb-3"
          />
          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChangeText={(text: any) => setForm({...form, password: text})}
            type="password"
            otherStyles="mb-3"
          />
          <FormField
            title="Confirm Password"
            placeholder="Enter your password again"
            value={form.cf_password}
            handleChangeText={(text: any) =>
              setForm({...form, cf_password: text})
            }
            type="password"
            otherStyles="mb-3"
          />
          <CustomButton
            title="Register"
            handlePress={handleSubmit}
            containerStyles="bg-blue-700 disabled:bg-blue-300"
            isLoading={loading}
          />
          <View className="flex justify-center pt-5 flex-row gap-2 mb-5">
            <Text className="text-lg text-black dark:text-white">
              Already have an account?
            </Text>
            <Link href="/login" className="text-lg font-semibold text-blue-700">
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
