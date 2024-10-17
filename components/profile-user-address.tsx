import {useState, useEffect} from "react";
import {Text, ScrollView, ToastAndroid} from "react-native";

import {useGlobalContext} from "@/context/global-provider";
import {updateUserAddress} from "@/lib/firebase-functions";

import CustomButton from "./custom-button";
import FormField from "./form-field";

const ProfileUserAddress = () => {
  const {user} = useGlobalContext();

  const [form, setForm] = useState({
    city: "",
    state: "",
    country: "",
    zip: "",
    addressline: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({
      city: user?.city,
      state: user?.state,
      country: user?.country,
      zip: user?.zip,
      addressline: user?.addressline,
    });
  }, [user]);

  const handleSubmit = async () => {
    if (
      form.city === "" ||
      form.state === "" ||
      form.country === "" ||
      form.zip === "" ||
      form.addressline === ""
    ) {
      return ToastAndroid.showWithGravityAndOffset(
        "Fill all fields!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }

    setLoading(true);
    try {
      await updateUserAddress({
        userId: user.uid,
        city: form.city,
        state: form.state,
        country: form.country,
        zip: form.zip,
        addressline: form.addressline,
      });

      ToastAndroid.showWithGravityAndOffset(
        "Profile address updated successfully.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        "Something went wrong, try again later!",
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
    <ScrollView className="mt-5 h-full" showsVerticalScrollIndicator={false}>
      <Text className="text-2xl font-bold my-5 text-black dark:text-white">
        Profile Updater User Address
      </Text>
      <FormField
        title="City"
        placeholder="Enter your city"
        value={form.city}
        handleChangeText={(text: any) => setForm({...form, city: text})}
        otherStyles="mb-3"
      />
      <FormField
        title="State"
        placeholder="Enter your state"
        value={form.state}
        handleChangeText={(text: any) => setForm({...form, state: text})}
        otherStyles="mb-3"
      />
      <FormField
        title="Country"
        placeholder="Enter your country"
        value={form.country}
        handleChangeText={(text: any) => setForm({...form, country: text})}
        otherStyles="mb-3"
      />
      <FormField
        title="Zip"
        placeholder="Enter your zip"
        value={form.zip}
        handleChangeText={(text: any) => setForm({...form, zip: text})}
        otherStyles="mb-3"
      />
      <FormField
        title="Addressline"
        placeholder="Enter your addressline"
        value={form.addressline}
        handleChangeText={(text: any) => setForm({...form, addressline: text})}
        otherStyles="mb-3"
      />
      <CustomButton
        title="Update Address"
        handlePress={handleSubmit}
        containerStyles="bg-blue-700 disabled:bg-blue-300 mb-5"
        isLoading={loading}
      />
    </ScrollView>
  );
};

export default ProfileUserAddress;
