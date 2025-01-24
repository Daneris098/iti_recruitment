import { Input, Text, Button, PasswordInput, TextInput } from "@mantine/core";
import { IconMail, IconShieldLock } from "@tabler/icons-react";
export default function Login() {
  return (
    <>
      <title>Login</title>
      <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-4  bg-white p-12 sm:p-16 rounded-lg shadow-md shadow-blue-300 ">
          <img
            className="logo self-center"
            alt="logo"
            src="/images/logoword.webp"
          />
          <Text
            size="md"
            className="text-center font-bold poppins mt-6"
            style={{ color: "#559CDA" }}
          >
            Log-in to your account.
          </Text>
          <div className="w-full text-start text-slate-700 mt-6">
            <Text size="md" className="poppins ">
              Username
            </Text>
            <TextInput
              variant="filled"
              size="md"
              radius="md"
              placeholder="Enter your email"
              rightSection={
                <div className="bg-blue-400 p-2 rounded-lg text-white">
                  <IconMail />
                </div>
              }
            />
          </div>
          <div className="text-start text-slate-700">
            <Text size="md" className="poppins">
              Password
            </Text>
            <PasswordInput
              variant="filled"
              size="md"
              radius="md"
              placeholder="Enter your password"
              rightSection={
                <div className="bg-orange-400 p-2 rounded-lg text-white">
                  <IconShieldLock />
                </div>
              }
            />
          </div>
          <Button
            variant="transparent"
            className="border-none br-gradient mt-7"
          >
            <Text className="poppins text-white ">Login Now</Text>
          </Button>
        </div>
      </div>
    </>
  );
}
