import { Divider, NumberInput, Select, TextInput } from "@mantine/core";
import { IconCaretDownFilled, IconCircleMinus, IconCirclePlus } from "@tabler/icons-react";
import { AccountSetupStore } from "@modules/AccountSetup/store";
import Dropzone from "@modules/AccountSetup/components/Dropzone";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useForm } from "@mantine/form";
import { AlertType, Step } from "../types";
const Hiring = forwardRef((_, ref) => {
  const { accountSetupForm, activeStepper, setActiveStepper, setAlert } = AccountSetupStore();
  const formRef = useRef<HTMLFormElement>(null);

  // const addFieldStage = () => {
  //   const updatedinterviewStages = [...accountSetupForm.hiring.interviewStages, { id: Date.now(), name: "" }];
  //   setAccountSetupForm({ ...accountSetupForm, hiring: { ...accountSetupForm.hiring, interviewStages: updatedinterviewStages } });
  // };

  // const removeFieldStage = (id: number) => {
  //   const updatedinterviewStages = accountSetupForm.hiring.interviewStages.filter((interviewStages) => interviewStages.id !== id);
  //   setAccountSetupForm({ ...accountSetupForm, hiring: { ...accountSetupForm.hiring, interviewStages: updatedinterviewStages } });
  // };

  // const addFieldInterviewer = () => {
  //   const updatedinterviewer = [...accountSetupForm.hiring.interviewers, { id: Date.now(), name: "" }];
  //   setAccountSetupForm({ ...accountSetupForm, hiring: { ...accountSetupForm.hiring, interviewers: updatedinterviewer } });
  // };

  // const removeFieldInterviewer = (id: number) => {
  //   const updatedinterviewer = accountSetupForm.hiring.interviewers.filter((interviewer) => interviewer.id !== id);
  //   setAccountSetupForm({ ...accountSetupForm, hiring: { ...accountSetupForm.hiring, interviewers: updatedinterviewer } });
  // };

  const settings = AccountSetupStore((state) => state.getForm("otherSettingsSetup"));
  const interview = AccountSetupStore((state) => state.getForm("interviewStageSetup"));
  const interviewer = AccountSetupStore((state) => state.getForm("interviewerSetup"));

  const form = useForm({
    initialValues: {
      otherSettings: {
        offerResponsePeriodInDays: settings?.offerResponsePeriodInDays ?? 0,
        allowReApply: settings?.allowReApply ?? true,
        reApplyInMonths: settings?.reApplyInMonths ?? 0,
      },
      interviewStage: { name: interview?.name ?? "", sequenceNo: interview?.sequenceNo ?? 1, isActive: interview?.isActive ?? true },
      interviewer: { name: interviewer?.name ?? "", isActive: interviewer?.isActive ?? true },
    },
    validate: {
      otherSettings: {
        offerResponsePeriodInDays: (value) => (value === 0 ? "Number of Days is Required" : null),
        reApplyInMonths: (value) => (value === 0 ? "Number of Days is Required" : null),
      },
      interviewStage: {
        name: (value) => (value === "" ? "Interviewer Stage Name is required" : null),
      },
      interviewer: {
        name: (value) => (value === "" ? "Interviewer Name is required" : null),
      },
    },
  });

  useEffect(() => {
    const validations = form.validate();
    if (!validations.hasErrors) {
      console.log(validations.errors);
    } else {
      console.log(validations.errors);
    }
  }, []);

  useImperativeHandle(ref, () => ({ submit }));

  const submit = () => {
    formRef.current?.requestSubmit();
  };
  useEffect(() => {
    const validations = form.validate();
    console.log(validations.errors);
    console.log(form.values);
  }, [form.values]);

  const onSubmit = async (values: typeof form.values) => {
    const validation = form.validate();

    if (!validation.hasErrors) {
      AccountSetupStore.getState().updateForm("otherSettingsSetup", values.otherSettings);
      AccountSetupStore.getState().updateForm("interviewStageSetup", values.interviewStage);
      AccountSetupStore.getState().updateForm("interviewerSetup", values.interviewer);

      if (activeStepper < Object.keys(Step).length / 2 - 1) setActiveStepper(activeStepper + 1);
      else setAlert(AlertType.save);
    }
  };

  return (
    <form ref={formRef} onSubmit={form.onSubmit(onSubmit)}>
      <div className="w-[75%] mx-auto flex flex-col gap-2 md:gap-10  text-[#6D6D6D]">
        <div className="flex flex-col gap-6">
          <p className="text-center font-semibold">OFFER RESPONSE PERIOD</p>
          <Divider size={3} color="#ebe5e5" />
          <p>
            Establish the maximum number days for applicants to sign the job offer issued. Once this limit is reached, the job offer automatically marked as declined, and the
            applicant's status will be updated to Archived.
          </p>
          <NumberInput
            withAsterisk
            {...form.getInputProps(`otherSettings.offerResponsePeriodInDays`)}
            classNames={{ input: "poppins text-[#6D6D6D] " }}
            radius={"md"}
            size="md"
            label="Number of Days"
            placeholder="Input Number of Days"
            className="w-full"
            suffix=" Days"
            min={1}
          />
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-center font-semibold">APPLICATION SETTINGS</p>
          <Divider size={3} color="#ebe5e5" />
          <p>
            Customize your hiring process according to your preferences, including the option to allow applicants to reapply after not advancing to the final stage of the hiring
            pipeline.
          </p>
          <div className="flex gap-4">
            <Select
              withAsterisk
              classNames={{ input: "poppins text-[#6D6D6D] ", dropdown: "poppins text-[#6D6D6D] " }}
              {...form.getInputProps(`otherSettings.allowReApply`)}
              radius={8}
              data={[
                { value: String(1), label: "Yes" },
                { value: String(0), label: "No" },
              ]}
              className="w-full sm:w-1/2"
              size="md"
              label="Allow Applicants to Re-apply"
              placeholder="Select if Yes or No"
              rightSection={<IconCaretDownFilled size="18" />}
              value={form.values.otherSettings.allowReApply ? "1" : "0"}
              // onChange={(value) => {
              //   form.setFieldValue("otherSettings.allowReApply", value === "Yes");
              // }}
            />
            <NumberInput
              withAsterisk
              classNames={{ input: "poppins text-[#6D6D6D] " }}
              {...form.getInputProps(`otherSettings.reApplyInMonths`)}
              hideControls
              radius={"md"}
              size="md"
              label="Allow Re-apply after"
              placeholder="Input Number of Months"
              className="w-1/2"
              suffix=" Months"
              min={1}
              max={12}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-center font-semibold">INTERVIEW STAGES</p>
          <Divider size={3} color="#ebe5e5" />
          <p>Customize your interview stages to align with your organization's specific recruitment process.</p>
          <div className="flex flex-col gap-6">
            {accountSetupForm.hiring.interviewStages.map((interview, index) => (
              <div className="relative " key={interview.id}>
                {/* {index != 0 && (
                  <IconCircleMinus
                    size={35}
                    className="cursor-pointer absolute right-[-3%] bottom-[0%]"
                    onClick={() => {
                      removeFieldStage(interview.id);
                    }}
                  />
                )} */}
                <TextInput
                  withAsterisk
                  classNames={{ input: "poppins text-[#6D6D6D] " }}
                  radius={"md"}
                  {...form.getInputProps(`interviewStage.name`)}
                  size="md"
                  label="Interview Stage Name"
                  placeholder="Type Name"
                  className="w-full"
                  min={1}
                />
                {/* {index === accountSetupForm.hiring.interviewStages.length - 1 && (
                  <p
                    className="w-36 text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2 my-5 absolute"
                    onClick={() => {
                      addFieldStage();
                    }}>
                    <IconCirclePlus size={20} />
                    ADD STAGE
                  </p>
                )} */}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-center font-semibold">INTERVIEWER</p>
          <Divider size={3} color="#ebe5e5" />
          <p>List individuals authorized to conduct interview for applicants.</p>
          <div className="flex flex-col gap-6">
            {accountSetupForm.hiring.interviewers.map((interviewer, index) => (
              <div className="relative " key={interviewer.id}>
                {/* {index != 0 && (
                  <IconCircleMinus
                    size={35}
                    className="cursor-pointer absolute right-[-3%] bottom-[0%]"
                    onClick={() => {
                      removeFieldInterviewer(interviewer.id);
                    }}
                  />
                )} */}
                <TextInput
                  withAsterisk
                  classNames={{ input: "poppins text-[#6D6D6D] " }}
                  {...form.getInputProps(`interviewer.name`)}
                  radius={"md"}
                  size="md"
                  label="Interviewer Name"
                  placeholder="Type Name"
                  className="w-full"
                  min={1}
                />
                {/* {index === accountSetupForm.hiring.interviewers.length - 1 && (
                  <p
                    className="w-44 text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2 my-5 absolute"
                    onClick={() => {
                      addFieldInterviewer();
                    }}>
                    <IconCirclePlus size={20} />
                    ADD INTERVIEWER
                  </p>
                )} */}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-center font-semibold">JOB OFFER TEMPLATE</p>
          <Divider size={3} color="#ebe5e5" />
        </div>

        <p className="text-[#6D6D6D]">
          Click to <span className="text-[#559CDA] cursor-pointer underline font-semibold">GENERATE AND DOWNLOAD TEMPLATE</span>. Customize the benefits, then upload the updated
          Job Offer Template for use during Job Offer Generation.
        </p>
        <Dropzone />
      </div>
    </form>
  );
});

export default Hiring;
