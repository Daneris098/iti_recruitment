import { useForm } from "@mantine/form";
import { Text, Button, PasswordInput, TextInput } from "@mantine/core";
import axiosInstance from "@src/api";
import Swal from "sweetalert2";

export default function Register() {
  interface FormData {
    username: string;
    name: string;
    email: string;
    password: string;
  }

  const form = useForm({
    initialValues: { username: "", password: "", name: "", email: "" },
    validate: {
      username: (value: string) => {
        if (value.length <= 0) {
          return "Username can not be empty";
        } else if (value.length < 3) {
          return "Username must have at least 3 characters";
        }
      },
      email: (value: string) => {
        if (value.length <= 0) {
          return "email can not be empty";
        }
      },
      name: (value: string) => {
        if (value.length <= 0) {
          return "name can not be empty";
        } else if (value.length < 3) {
          return "name must have at least 3 characters";
        }
      },
      password: (value: string) => {
        if (value.length <= 0) {
          return "Password can not be empty";
        } else if (value.length < 8) {
          return "Password must have at least 8 characters";
        }
      },
    },
  });

  const onSubmit = async (params: FormData) => {
    console.log(params)
    const payload = {
      username: params.username,
      email: params.email,
      name: params.name,
      password: params.password,

    };
    await axiosInstance
      .post("createUser", payload)
      .then((response) => {
        console.log('status: ', response.status)
        if (response.status === 201) {
          console.log("Before reset: ", form.values);
          form.reset();
          console.log("After reset: ", form.values);
          setTimeout(() => {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Registration successful!",
            });
          }, 1000);
        }
      })
      .catch((error) => {
        console.log('err: ', error.response.status)
        if (error.response.status === 401 || error.response.status === 404) {
          const message = error.response.data.message;
          console.error(message);
          return;
        }
        if (error.response.status === 409) {
          const message = error.response.data.message;
          Swal.fire({
            icon: "error",
            title: "Registration failed",
            text: message,
          });
        }
      });
  };

  return (
    <>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <title>Register</title>
        <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col gap-4 bg-white p-12 sm:p-16 rounded-lg shadow-md shadow-blue-300">
            <p className="text-center font-semibold poppins text-2xl">LOGO</p>
            <Text
              size="md"
              className="text-center font-bold poppins mt-6"
              style={{ color: "#559CDA" }}
            >
              Create your account.
            </Text>
            <div className="w-full text-start text-slate-700 mt-6">
              <Text size="md" className="poppins">
                Username
              </Text>
              <TextInput
                variant="filled"
                size="md"
                radius="md"
                placeholder="Enter your username"
                {...form.getInputProps("username")}
              />
            </div>
            <div className="w-full text-start text-slate-700">
              <Text size="md" className="poppins">
                Name
              </Text>
              <TextInput
                variant="filled"
                size="md"
                radius="md"
                placeholder="Enter your name"
                {...form.getInputProps("name")}
              />
            </div>
            <div className="w-full text-start text-slate-700">
              <Text size="md" className="poppins">
                Email
              </Text>
              <TextInput
                variant="filled"
                size="md"
                radius="md"
                placeholder="Enter your email"
                {...form.getInputProps("email")}
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
                {...form.getInputProps("password")}
              />
            </div>
            <Button type="submit" className="border-none bg-blue-300 mt-7">
              <Text className="poppins text-white">Register Now</Text>
            </Button>
          </div>
        </div>
      </form>
    </>
  );

}
