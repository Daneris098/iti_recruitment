import { useForm } from "@mantine/form";
import { Text, Button, PasswordInput, TextInput } from "@mantine/core";
import { IconEye, IconEyeOff, IconMail, IconShieldLock } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import loginBg from "@assets/loginBg.png";
import axiosInstance from "@src/api/authApi";
import { jwtDecode } from "jwt-decode";
import { useUserDataStore } from "@src/global/store/auth";
import { JWTPayload } from "@src/global/types/auth";
import { useState } from "react";
import { divide } from "lodash";

export default function Login() {
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { username: "", password: "" },
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

  const { setData } = useUserDataStore();

  const onSubmit = async (formVal: any) => {
    const payload = {
      username: formVal.username,
      password: formVal.password,
    };
    await axiosInstance
      .post("auth/login", payload)
      .then((response) => {
        if (response.status === 200) {
          const { refreshToken, accessToken } = response.data;
          sessionStorage.setItem("accessToken", accessToken);
          const decodedToken: JWTPayload = jwtDecode(accessToken);
          setData(decodedToken);
          document.cookie = `refreshToken=${refreshToken}; path=/; secure; SameSite=Strict`;
          navigate("/home");
        }
      })
      .catch((error) => {
        const message = error.response.data.errors[0].message;
        form.setErrors({ username: " ", password: message });
      });
  };

  const [visible, setVisible] = useState<boolean | null>(null);

  const handleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className=" h-full flex">
      <title>Login</title>
      <div className="bg-cover  w-1/2 hidden sm:block">
        <div style={{ backgroundImage: `url(${loginBg})` }} className="bg-cover h-full w-full flex flex-col p-4 ">
          <div className="flex flex-col gap-10 sm:h-[45%] sm:w-[80%] m-auto p-4 sm:p-0">
            <p className="text-white text-7xl font-bold text-center">Welcome Aboard!</p>
            <p className="text-white text-center text-xl w-[80%] self-center">To access the HRDotNet Recruitment and Onboarding Platform, please log-in with your credentials.</p>
          </div>
        </div>
      </div>
      <div className=" w-full sm:w-1/2">
        <div className="h-full w-full flex flex-col">
          <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-4 sm:h-[55%] sm:w-[65%] m-auto p-4 sm:p-0">
            <div className="w-full flex justify-center items-center">
              <img src="logoword.png" className="cursor-pointer w-80" alt="bg" onClick={() => navigate("/")} />
            </div>
            <p className=" text-center font-medium poppins text-sm text-[#6d6d6d] w-full">HRDotNet isn't just a software: it's a commitment to better HR management.</p>

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
                classNames={{ input: "poppins text-[#6D6D6D] pr-10" }}
                variant="default"
                size="md"
                radius="md"
                placeholder="Enter your password"
                onVisibilityChange={() => setVisible((v) => !v)}
                visible={visible!}
                rightSection={
                  <div className="flex flex-row items-center gap-3 pr-7">
                    <div className=" cursor-pointer">{visible ? <IconEyeOff size={16} onClick={handleVisible} /> : <IconEye size={16} onClick={handleVisible} />}</div>
                    <div className="bg-[#ED8028] p-2 rounded-lg text-white">
                      <IconShieldLock />
                    </div>
                  </div>
                }
                {...form.getInputProps("password")}
              />
            </div>

            <Button type="submit" size="lg" className="br-gradient border-none bg-blue-300 mt-7">
              <Text className="poppins text-white ">Login Now</Text>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
