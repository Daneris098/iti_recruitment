import { Button, PasswordInput, Tabs, TextInput } from "@mantine/core";
import avatar from "@assets/avatar.png"; // Default avatar image
import "@modules/ProfileSettings/style.css";
import Modals from "@modules/ProfileSettings/modal";
import { ProfileSettingsStore } from "@modules/ProfileSettings/store";
import { AlertType } from "./types";
import bg2 from "@assets/bg2.png";
import { useRef, useEffect, useState } from "react";
import { IconCamera } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { GlobalStore } from "@src/utils/GlobalStore";
import axiosInstance from "@src/api/authApi";

export const ProfileSettings = () => {
  const { setAlert, activePanel, setActivePanel } = ProfileSettingsStore();
  const { userDetails } = GlobalStore();
  const formRef = useRef<HTMLFormElement>(null);
  const formRef2 = useRef<HTMLFormElement>(null);
  // State to hold the uploaded image
  const [image, setImage] = useState<string>("");
  // Create refs for both tabs
  const profileDetailsTabRef = useRef(null);
  const changePasswordTabRef = useRef(null);
  const [username, setUsername] = useState("");
  // Function to switch to Profile Details tab
  const switchToProfileDetails = () => {
    if (profileDetailsTabRef.current) {
      (profileDetailsTabRef.current as any).click(); // Simulates a click
    }
  };
  // Function to switch to Change Password tab
  const switchToChangePassword = () => {
    if (changePasswordTabRef.current) {
      (changePasswordTabRef.current as any).click(); // Simulates a click
    }
  };

  useEffect(() => {
    if (activePanel === "profileDetails") {
      switchToProfileDetails();
    } else if (activePanel === "changePassword") {
      switchToChangePassword();
    }
  }, [activePanel]);

  // Handle file upload and image change
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the uploaded image as the new source
        if (reader.result) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const base64ToBlob = (base64: string, contentType: string): Blob => {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  const value = {
    firstName: "",
    lastName: "",
    middleName: "",
    nameExtension: "",
    email: "",
    username: "",
  };

  const value2 = {
    currentPassword: "",
    newPassword: "",
    rePassword: "",
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: value,
    validate: {
      firstName: (value: string) => (value === null || value === "" ? "First Name is required" : null),
      lastName: (value: string) => (value === null || value === "" ? "Last Name is required" : null),
      email: (value: string) => {
        if (value === null || value === "") return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? "Invalid email format" : null;
      },
      username: (value: string) => (value === null || value === "" ? "Username is required" : null),
    },
  });

  const form2 = useForm({
    mode: "uncontrolled",
    initialValues: value2,
    validate: {
      currentPassword: (value: string) => (value === null || value === "" ? "Current Password is required" : null),
      newPassword: (value: string) => (value === null || value === "" ? "New Password is required" : null),
      rePassword: (value: string) => (value === null || value === "" ? "Confirm Password is required" : null),
    },
  });

  const onSubmit = async (form: any) => {
    const formData = new FormData();
    formData.append("LastName", form.lastName);
    formData.append("FirstName", form.firstName);
    formData.append("MiddleName", form.middleName);
    formData.append("Extension", form.extension);

    if (image && image.startsWith("data:image/")) {
      const contentType = image.substring(image.indexOf(":") + 1, image.indexOf(";")); // e.g. "image/jpeg"
      const blob = base64ToBlob(image, contentType);
      const file = new File([blob], "profile.jpg", { type: contentType });
      formData.append("Photo", file);
    }
    try {
      await axiosInstance.post("user-management/users/me/profile", formData);
      setAlert(AlertType.saved);

      const { data } = await axiosInstance.get("user-management/users/me/profile");
      let parsedPhotoPath = null;
      try {
        const parsedPhotoArray = JSON.parse(data.photo);
        parsedPhotoPath = parsedPhotoArray?.[0]?.path || null;
      } catch (err) {
        console.error("Failed to parse photo field:", err);
      }
      GlobalStore.getState().setUserDetails({ ...data, photo: parsedPhotoPath });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit2 = async (form: any) => {
    const payload = {
      username: username,
      currentPassword: form.currentPassword,
      password: form.newPassword,
      rePassword: form.rePassword,
    };
    await axiosInstance
      .post("user-management/users/me/change-password", payload)
      .then(() => {
        setAlert(AlertType.saved);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (userDetails.firstName != "") {
      setUsername(userDetails.username);
      form.setFieldValue("lastName", userDetails.lastName);
      form.setFieldValue("firstName", userDetails.firstName);
      form.setFieldValue("middleName", userDetails.middleName);
      form.setFieldValue("nameExtension", userDetails.extension);
      form.setFieldValue("email", userDetails.email);
      form.setFieldValue("username", userDetails.username);
      const photoVal = `${import.meta.env.VITE_AUTH_BASE_URL}Uploads/photo/${userDetails.photo}`;
      setImage(photoVal === "" ? avatar : photoVal);
    }
  }, [userDetails]);

  return (
    <div className="bg-white h-full rounded-md">
      <Modals />
      <div style={{ backgroundImage: `url(${bg2})` }} className="bg-cover bg-center h-[15%] br-gradient rounded-t-md flex flex-col items-center">
        <div className=" flex items-center gap-4 sm:gap-0 sm:justify-between w-[90%] m-auto">
          <div className="flex flex-col">
            <p className="sm:text-3xl text-white font-bold">Profile Settings</p>
            <p className="sm:text-xl text-white">Customize your profile.</p>
          </div>
          <div className="flex gap-2 sm:w-[15%]">
            <Button
              className="text-xs rounded-md w-[52%]"
              onClick={() => {
                setAlert(AlertType.cancel);
              }}
              color="white"
              variant="outline">
              Cancel
            </Button>
            <Button
              className="text-xs rounded-md w-[48%]"
              onClick={() => {
                if (activePanel == "profileDetails" || activePanel == "") {
                  formRef.current?.requestSubmit();
                } else if (activePanel === "changePassword") {
                  formRef2.current?.requestSubmit();
                }
              }}>
              Save
            </Button>
          </div>
        </div>
      </div>
      <Tabs
        defaultValue="profileDetails"
        variant="default"
        className="h-[75%] p-2"
        onChange={(val) => {
          setActivePanel(`${val}`);
        }}>
        <Tabs.List className="px-4">
          <Tabs.Tab value="profileDetails" className={`${activePanel === "profileDetails" ? "text-[#559CDA]" : "text-gray-500"}`} ref={profileDetailsTabRef}>
            Profile Details
          </Tabs.Tab>
          <Tabs.Tab value="changePassword" className={`${activePanel === "changePassword" ? "text-[#559CDA]" : "text-gray-500"}`} ref={changePasswordTabRef}>
            Change Password
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="profileDetails" className="border-[2px] border-blue-300 rounded-md px-4 m-4 h-full p-4 sm:p-8 overflow-auto flex flex-col gap-8">
          <div>
            <div className="text-[#559CDA] font-bold">Profile Details</div>
            <p className="text-md text-[#6D6D6D]">Modify your name, username, and email to keep your details up to date. All fields must not be empty.</p>
          </div>

          <div className="place-self-center bg-gray-300 w-40 h-40 rounded-full overflow-hidden flex items-center justify-center relative">
            <img src={image} alt="Profile Avatar" className="cursor-pointer h-full w-full object-cover" />
            <Button className="absolute bottom-2 right-2 text-xs bg-[#559CDA] text-white rounded-full" onClick={() => document.getElementById("image-upload")?.click()}>
              <IconCamera />
            </Button>
            <input type="file" id="image-upload" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </div>

          <form ref={formRef} onSubmit={form.onSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 flex-col sm:flex-row">
                <TextInput
                  {...form.getInputProps("lastName")}
                  key={form.key("lastName")}
                  className="sm:w-[25%]"
                  radius="md"
                  label="Last Name"
                  classNames={{ label: "p-1 text-[#6d6d6d]", input: "poppins text-[#6D6D6D]" }}
                />
                <TextInput
                  {...form.getInputProps("firstName")}
                  key={form.key("firstName")}
                  className="sm:w-[25%]"
                  radius="md"
                  label="First Name"
                  classNames={{ label: "p-1 text-[#6d6d6d]", input: "poppins text-[#6D6D6D]" }}
                />
                <TextInput
                  {...form.getInputProps("middleName")}
                  key={form.key("middleName")}
                  className="sm:w-[25%]"
                  radius="md"
                  label="Middle Name"
                  classNames={{ label: "p-1 text-[#6d6d6d]", input: "poppins text-[#6D6D6D]" }}
                />
                <TextInput
                  {...form.getInputProps("nameExtension")}
                  key={form.key("nameExtension")}
                  className="sm:w-[25%]"
                  radius="md"
                  label="Name Extension"
                  classNames={{ label: "p-1 text-[#6d6d6d]", input: "poppins text-[#6D6D6D]" }}
                />
              </div>
              <div className="flex gap-2 flex-col sm:flex-row">
                <TextInput
                  disabled
                  {...form.getInputProps("email")}
                  className="sm:w-[50%]"
                  radius="md"
                  label="Email"
                  classNames={{ label: "p-1 text-[#6d6d6d]", input: "poppins text-[#6D6D6D]" }}
                />
                <TextInput
                  disabled
                  {...form.getInputProps("username")}
                  className="sm:w-[50%]"
                  radius="md"
                  label="Username"
                  classNames={{ label: "p-1 text-[#6d6d6d]", input: "poppins text-[#6D6D6D]" }}
                />
              </div>
            </div>
          </form>
        </Tabs.Panel>

        <Tabs.Panel value="changePassword" className="border-[2px] border-blue-300 rounded-md px-4 m-4 p-4 sm:p-8 h-full flex flex-col gap-8">
          <div>
            <div className="text-[#559CDA] font-bold">Change Password</div>
            <p className="text-md text-[#6D6D6D]">Passwords should contain at least one capital letter, a number, and a special character.</p>
          </div>

          <form ref={formRef2} onSubmit={form2.onSubmit(onSubmit2)}>
            <div className="flex gap-2 items-end">
              <PasswordInput
                {...form2.getInputProps("currentPassword")}
                key={form2.key("currentPassword")}
                label="Current Password"
                className="w-[33%]"
                radius="md"
                classNames={{ label: "p-1 text-[#6d6d6d]", input: "poppins text-[#6D6D6D]" }}
              />
              <PasswordInput
                {...form2.getInputProps("newPassword")}
                key={form2.key("newPassword")}
                label="New Password"
                className="w-[33%]"
                radius="md"
                classNames={{ label: "p-1 text-[#6d6d6d]", input: "poppins text-[#6D6D6D]" }}
              />
              <PasswordInput
                {...form2.getInputProps("rePassword")}
                key={form2.key("rePassword")}
                label="Confirm Password"
                className="w-[33%]"
                radius="md"
                classNames={{ label: "p-1 text-[#6d6d6d]", input: "poppins text-[#6D6D6D]" }}
              />
            </div>
          </form>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default ProfileSettings;
