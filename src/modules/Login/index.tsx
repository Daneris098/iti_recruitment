import { useForm } from "@mantine/form";
import { Text, Button, PasswordInput, TextInput } from "@mantine/core";
import { IconMail, IconShieldLock } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import loginBg from '@assets/loginBg.png';
import axiosInstance from "@src/api/authApi";

export default function Login() {
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { username: "hrdotrecruitment", password: "SomePass123$%^" },
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

  const onSubmit = async (formVal:any) => {
    const payload = {
      username: formVal.username,
      password: formVal.password,
    };
    await axiosInstance
      .post("auth/login", payload)
      .then((response) => {
        if (response.status === 200) {
          const { refreshToken, accessToken } = response.data;
          sessionStorage.setItem("accessTokenFlash", accessToken);
          document.cookie = `refreshTokenFlash=${refreshToken}; path=/; secure; SameSite=Strict`;
          navigate("/home");
        }
      })
      .catch((error) => {
        const message = error.response.data.errors[0].message;    
        form.setErrors({ username: ' ', password: message});
      });
  };

  return (
    <div className=" h-full flex">
      <div className="bg-cover  w-1/2 hidden sm:block">
        <div style={{ backgroundImage: `url(${loginBg})` }} className="bg-cover h-full w-full flex flex-col p-4 ">
          <div className="flex flex-col gap-10 sm:h-[45%] sm:w-[80%] m-auto p-4 sm:p-0">
            <p className="text-white text-7xl font-bold text-center">Welcome Aboard!</p>
            <p className="text-white text-center text-xl w-[80%] self-center">To access the HRDotNet Recruitment and Onboarding Platform, please log-in with your credentials.</p>
          </div>
        </div>
      </div>
      <div className=" w-full sm:w-1/2  ">
        <div className="h-full w-full flex flex-col">
          <img src="logo.png " className=" cursor-pointer w-36 2xl:w-48 pr-10 absolute py-10 self-end " alt="bg" onClick={() => { navigate("/"); }} />
          <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-4 sm:h-[55%] sm:w-[55%] m-auto p-4 sm:p-0">
            <p className=" text-center font-semibold poppins text-5xl sm:text-6xl text-[#559CDA]">Admin Log-in</p>
            <div className="w-full text-start text-slate-700 mt-6">
              <Text size="md" className="poppins text-[#6D6D6D]">
                Username
              </Text>
              <TextInput
                variant="default"
                size="md"
                radius="md"
                classNames={{ input: "poppins text-[#6D6D6D] " }}
                placeholder="Enter your username"
                rightSection={
                  <div className="bg-[#559CDA] p-2 rounded-lg text-white">
                    <IconMail />
                  </div>
                }
                {...form.getInputProps("username")}
              />
            </div>
            <div className="text-start text-slate-700">
              <Text size="md" className="poppins text-[#6D6D6D]">
                Password
              </Text>
              <PasswordInput
                classNames={{ input: "poppins text-[#6D6D6D]" }}

                variant="default"
                size="md"
                radius="md"
                placeholder="Enter your password"
                rightSection={
                  <div className="bg-[#ED8028] p-2 rounded-lg text-white">
                    <IconShieldLock />
                  </div>
                }
                {...form.getInputProps("password")}
              />
            </div>
            <Button type="submit" size="lg" className="br-gradient border-none bg-blue-300 mt-7">
              <Text
                className="poppins text-white "
              >
                Login Now
              </Text>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
