import { useForm } from "@mantine/form";
import { Text, Button, PasswordInput, TextInput } from "@mantine/core";
import { IconMail, IconShieldLock } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@src/api";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  interface FormData {
    username: string;
    password: string;
  }

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { username: "admin", password: "12345678" },
    validate: {
      username: (value: string) => {
        if (value.length <= 0) {
          return "Username can not be empty";
        } else if (value.length < 2) {
          return "Username must have at least 8 characters";
        }
      },
      password: (value: string) => {
        if (value.length <= 0) {
          return "Password can not be empty";
        } else if (value.length < 2) {
          return "Password must have at least 8 characters";
        }
      },
    },
  });

  const onSubmit = async (params: FormData) => {
    const payload = {
      username: params.username,
      password: params.password,
    };
    await axiosInstance
      .post("login", payload)
      .then((response) => {
        if (response.status === 200) {
          const { refreshToken, accessToken } = response.data;
          sessionStorage.setItem("accessTokenFlash", accessToken);
          document.cookie = `refreshTokenFlash=${refreshToken}; path=/; secure; SameSite=Strict`;
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        const message = error.response.data.message;
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: message,
        });
      });
  };

  return (
    <>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <title>Login</title>
        <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col gap-4  bg-white p-12 sm:p-16 rounded-lg shadow-md shadow-blue-300 ">
            <p className=" text-center font-semibold poppins text-2xl">LOGO</p>
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
                placeholder="Enter your username"
                rightSection={
                  <div className="bg-green-400 p-2 rounded-lg text-white">
                    <IconMail />
                  </div>
                }
                {...form.getInputProps("username")}
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
                  <div className="bg-red-400 p-2 rounded-lg text-white">
                    <IconShieldLock />
                  </div>
                }
                {...form.getInputProps("password")}
              />
            </div>
            <Button type="submit" className="border-none bg-blue-300 mt-7">
              <Text
                className="poppins text-white "
              >
                Login Now
              </Text>
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
