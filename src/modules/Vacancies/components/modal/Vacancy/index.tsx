import "@mantine/tiptap/styles.css";
import { useEffect, useRef, useState } from "react";
import { Modal, Divider, Button, Select, TextInput, MultiSelect, Flex, Popover, Text } from "@mantine/core";
import { IconCalendarMonth, IconCaretDownFilled, IconX } from "@tabler/icons-react";
import { useEditor } from "@tiptap/react";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { VacancyStore } from "@modules/Vacancies/store";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

import { AlertType, ActionTitle, ActionButtonTitle, Action } from "@modules/Vacancies/types";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { selectedDataVal } from "@src/modules/Vacancies/values";
import { vacancyFormInitialData } from "@src/modules/HiringSettings/values";
import axiosInstance from "@src/api";
import { useQueryClient } from "@tanstack/react-query";
import { useFormDataResponse } from "@src/modules/Vacancies/hooks/useFetchData";

export default function index() {
  const {
    action,
    setAction,
    setAlert,
    setSelectedVacancy,
    selectedVacancy,
    setSelectedCompanyId,
    setSelectedBranchId,
    setSelectedDivisionId,
    setSelectedDepartmentId,
    selectedCompanyId,
    selectedBranchId,
    selectedDivisionId,
    selectedDepartmentId,
  } = VacancyStore();
  const [vacancyDuration, setVacancyDuration] = useState<[Date | null, Date | null]>([null, null]);
  const formRef = useRef<HTMLFormElement>(null);
  const [mustHaveSkills, setMustHaveSkills] = useState<string[]>([]);
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const queryClient = useQueryClient();
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (vacancyDuration[0] != null && vacancyDuration[1] != null) {
      setOpened(false);
      setOpened2(false);
    }
  }, [vacancyDuration]);
  const myRef = useRef(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: vacancyFormInitialData,
    validate: {
      positionTitle: (value: string) => (value.length === 0 ? "Position Title is required" : null),
      company: (value: string) => (value.length === 0 ? "Company is required" : null),
      branch: (value: string) => (value.length === 0 ? "Branch is required" : null),
      division: (value: string) => (value.length === 0 ? "Division is required" : null),
      department: (value: string) => (value.length === 0 ? "Department is required" : null),
      section: (value: string) => (value.length === 0 ? "Section is required" : null),
      employmentType: (value: string) => (value.length === 0 ? "Employment Type is required" : null),
      workplaceType: (value: string) => (value.length === 0 ? "Work Type is required" : null),
      vacancyType: (value: string) => (value.length === 0 ? "Vacancy Type is required" : null),
      experienceLevel: (value: string) => (value.length === 0 ? "Experience Level is required" : null),
      duration: {
        start: (value: string) => (value.length === 0 ? "Start date is required" : null),
        end: (value: string) => (value.length === 0 ? "End date is required" : null),
      },
      noOfOpenPosition: (value: number) => (value <= 0 ? "Number of open position must be greater than 0" : null),
      jobDescription: (value: string) => (value == "<p>Write Job Description Here</p>" || value === "<p></p>" || value == "" ? "Job Description is required" : null),
      mustHaveSkills: (value: string[]) => (value.length === 0 ? "Must have skills is required" : null),
      qualification: (value: string) => (value == "<p>Write Qualification here</p>" || value === "<p></p>" || value == "" ? "Qualification is required" : null),
    },
  });

  const handleChange = (value: any) => {
    setMustHaveSkills(value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && event.target.value) {
      const newValue = event.target.value.trim();
      if (!mustHaveSkills.includes(newValue)) {
        setMustHaveSkills((prev) => [...prev, newValue]);
        (myRef as any).current.value = "";
      }
      event.preventDefault();
    }
  };

  useEffect(() => {
    form.setFieldValue("mustHaveSkills", mustHaveSkills);
  }, [mustHaveSkills]);

  const editor = useEditor({
    extensions: [
      TextStyle,
      Color,
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: action == "Edit" ? selectedVacancy.jobDescription : `<p>Write Job Description Here</p>`,
    onUpdate: ({ editor }) => {
      form.setFieldValue("jobDescription", editor.getHTML());
    },
  });

  const editor2 = useEditor({
    extensions: [
      TextStyle,
      Color,
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: action == "Edit" ? selectedVacancy.qualification : `<p>Write Qualification here</p>`,
    onUpdate: ({ editor }) => {
      form.setFieldValue("qualification", editor.getHTML());
    },
  });

  useEffect(() => {
    refetchLookup();
  }, [selectedCompanyId]);

  useEffect(() => {
    if (selectedVacancy == selectedDataVal || action === Action.Null) {
      return;
    }
    setFirstLoad(true);
    const startDate = new Date(selectedVacancy.vacancyDuration.start);
    const formattedDate = startDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const endDate = new Date(selectedVacancy.vacancyDuration.end);
    const formattedDate2 = endDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    if (action == "Edit") {
      form.setFieldValue("positionTitle", selectedVacancy.position);
      setSelectedCompanyId(String((companies.data?.items.find((item: any) => item.name === selectedVacancy.company) as any).id));
      form.setFieldValue("company", String((companies.data?.items.find((item: any) => item.name === selectedVacancy.company) as any).id));
      form.setFieldValue("branch", String(selectedVacancy.branchObj[0].value));
      form.setFieldValue("division", String(selectedVacancy.divisionObj[0].value));
      form.setFieldValue("department", String(selectedVacancy.departmentObj[0].value));
      form.setFieldValue("section", String(selectedVacancy.sectionObj[0].value));
      form.setFieldValue("employmentType", String((employmentType.data?.items.find((item: any) => item.name === selectedVacancy.employmentType) as any).id));
      form.setFieldValue("workplaceType", String((workPlaces.data?.items.find((item: any) => item.name === selectedVacancy.workplace) as any).id));
      form.setFieldValue("vacancyType", String((vacancyTypes.data?.items.find((item: any) => item.name === selectedVacancy.vacancyType) as any).id));
      form.setFieldValue("experienceLevel", String((experienceLevel.data?.items.find((item: any) => item.name === selectedVacancy.experienceLevel) as any).id));
      form.setFieldValue("duration.start", formattedDate);
      form.setFieldValue("duration.end", formattedDate2);
      form.setFieldValue("noOfOpenPosition", selectedVacancy.quantity);

      form.setFieldValue("jobDescription", selectedVacancy.jobDescription);
      form.setFieldValue("qualification", (selectedVacancy as any)?.qualifications?.[0]?.keyword ?? "");

      editor?.commands.setContent(selectedVacancy.jobDescription);
      setMustHaveSkills(
        selectedVacancy.skills.map((item: any) => {
          return item.keyword;
        })
      );
      editor2?.commands.setContent((selectedVacancy as any)?.qualifications?.[0]?.keyword ?? "");
    } else {
      form.setValues(vacancyFormInitialData);
      editor?.commands.setContent("<p>Write Job Description Here</p>");
      setMustHaveSkills(
        selectedVacancy.skills.map((item: any) => {
          return item.keyword;
        })
      );
      editor2?.commands.setContent("<p>Write Qualification here</p>");
    }
  }, [action, selectedVacancy]);

  const toPHISOString = (date: Date | string) => {
    const d = new Date(date);
    const offsetDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000 + 8 * 60 * 60000);
    return offsetDate.toISOString();
  };

  const onSubmit = async (form: any) => {
    formRef.current?.requestSubmit();
    console.log("form: ", form);
    let mappedForm = {};
    if (action == Action.New) {
      mappedForm = {
        position: form.positionTitle,
        company: {
          id: form.company,
        },
        branch: {
          id: form.branch,
        },
        division: {
          id: form.division,
        },
        department: {
          id: form.department,
        },
        section: {
          id: form.section,
        },
        employmentType: {
          id: form.employmentType,
        },
        workplaceType: {
          id: form.workplaceType,
        },
        vacancyType: {
          id: form.vacancyType,
        },
        experienceLevel: {
          id: form.experienceLevel,
        },
        vacancyDuration: {
          dateStart: toPHISOString(form.duration.start),
          dateEnd: toPHISOString(form.duration.end),
        },
        availableSlot: parseInt(form.noOfOpenPosition.replace(/[^\d]/g, "")) || 0,
        jobDescription: form.jobDescription, // Remove HTML tags
        skills: form.mustHaveSkills.map((skill: string) => ({
          id: 0,
          keyword: skill,
          isDeleted: false,
        })),
        qualifications: [
          {
            id: 0,
            keyword: form.qualification,
          },
        ],
      };
    } else if (action == Action.Edit) {
      let updatedSkills: any[] = [];

      // Create a Set for quick lookup of selected keywords
      const selectedKeywordsSet = new Set(form.mustHaveSkills.map((k: string) => k.toLowerCase()));

      // Go through all existing skills in the vacancy
      (selectedVacancy as any).skills.forEach((skill: any) => {
        const isStillSelected = selectedKeywordsSet.has(skill.keyword.toLowerCase());

        updatedSkills.push({
          id: skill.id,
          keyword: skill.keyword,
          isDeleted: !isStillSelected,
        });
      });

      // Handle any new skills that are in the form but not in the vacancy
      form.mustHaveSkills.forEach((skillKeyword: string) => {
        const alreadyExists = (selectedVacancy as any).skills.some((skill: any) => skill.keyword.toLowerCase() === skillKeyword.toLowerCase());

        if (!alreadyExists) {
          updatedSkills.push({
            id: 0, // Or 'new' if you want
            keyword: skillKeyword,
            isDeleted: false,
          });
        }
      });
      mappedForm = {
        id: selectedVacancy.id,
        position: form.positionTitle,
        company: {
          id: form.company,
        },
        branch: {
          id: form.branch,
        },
        division: {
          id: form.division,
        },
        department: {
          id: form.department,
        },
        section: {
          id: form.section,
        },
        employmentType: {
          id: form.employmentType,
        },
        workplaceType: {
          id: form.workplaceType,
        },
        vacancyType: {
          id: form.vacancyType,
        },
        experienceLevel: {
          id: form.experienceLevel,
        },
        vacancyDuration: {
          dateStart: new Date(form.duration.start).toISOString(),
          dateEnd: new Date(form.duration.end).toISOString(),
        },
        availableSlot: form.noOfOpenPosition || 0,
        jobDescription: form.jobDescription,
        skills: updatedSkills,
        qualifications: [
          {
            id: 1,
            keyword: form.qualification,
          },
        ],
      };
    }
    submit(mappedForm);
    setAlert(action === Action.Edit ? AlertType.updateSuccessfully : AlertType.vacancyAddedSuccesfull);
    setAction(Action.Null);
    setSelectedVacancy(selectedDataVal);
  };

  const resetVacancy = () => {
    setAction(Action.Null);
    setSelectedVacancy(selectedDataVal);
    setMustHaveSkills([]);
    form.reset();
    form.setInitialValues(vacancyFormInitialData);
    editor?.commands.setContent("<p>Write Qualification here</p>");
    editor2?.commands.setContent("<p>Write Qualification here</p>");
  };

  const submit = async (payload: any) => {
    if (action == Action.New) {
      await axiosInstance
        .post("recruitment/vacancies", payload)
        .then(async (response) => {
          if (response.status === 201) {
            queryClient.refetchQueries({ queryKey: ["recruitment/vacancies"] });
            resetVacancy();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (action == Action.Edit) {
      await axiosInstance
        .post("recruitment/vacancies/" + selectedVacancy.id, payload)
        .then(async (response) => {
          if (response.status === 201) {
            queryClient.refetchQueries({ queryKey: ["recruitment/vacancies"] });
            resetVacancy();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    form.setValues(vacancyFormInitialData);
    setAlert(action === Action.Edit ? AlertType.updateSuccessfully : AlertType.vacancyAddedSuccesfull);
  };

  const { companies, branches, divisions, departments, sections, workPlaces, employmentType, vacancyTypes, experienceLevel } = useFormDataResponse();
  const refetchLookup = () => {
    queryClient.refetchQueries({ queryKey: ["branches"], type: "active" });
    queryClient.refetchQueries({ queryKey: ["divisions"], type: "active" });
    queryClient.refetchQueries({ queryKey: ["departments"], type: "active" });
    queryClient.refetchQueries({ queryKey: ["sections"], type: "active" });
  };

  useEffect(() => {
    refetchLookup();
  }, [selectedCompanyId, selectedBranchId, selectedDivisionId, selectedDepartmentId]);

  useEffect(() => {
    if (action != Action.Edit && firstLoad) {
      form.setFieldValue("branch", "");
      form.setFieldValue("division", "");
      form.setFieldValue("department", "");
      form.setFieldValue("section", "");
    }
  }, [form.getValues().company]);

  useEffect(() => {
    if (action != Action.Edit && firstLoad) {
      form.setFieldValue("division", "");
      form.setFieldValue("department", "");
      form.setFieldValue("section", "");
    }
  }, [form.getValues().branch]);

  useEffect(() => {
    if (action != Action.Edit && firstLoad) {
      form.setFieldValue("department", "");
      form.setFieldValue("section", "");
    }
  }, [form.getValues().division]);

  useEffect(() => {
    if (action != Action.Edit && firstLoad) {
      form.setFieldValue("section", "");
    }
  }, [form.getValues().department]);

  return (
    <Modal
      radius="lg"
      size={"80%"}
      opened={action != Action.Null}
      withCloseButton={false}
      centered
      onClose={() => resetVacancy()}
      className="text-[#559CDA] scrollbar "
      classNames={{ content: "scrollbar" }}
      styles={{ header: { width: "95%" }, title: { color: "#559CDA", fontSize: 22, fontWeight: 600 }, body: { padding: "0" } }}>
      <div className="poppins h-[85vh] flex flex-col gap-3 py-3 text-[#6D6D6D]">
        {/* header */}
        <div className="px-10 top-0 z-50 sticky  pt-4">
          <div className="flex justify-between">
            <p className="text-[#559CDA] text-[22px] font-bold py-2">{ActionTitle[action as keyof typeof ActionTitle]}</p>
            <IconX
              size={30}
              className="text-[#6D6D6D] cursor-pointer"
              onClick={() => {
                resetVacancy();
              }}
            />
          </div>
          <Divider size={1} opacity={"60%"} color="#6D6D6D" className="w-full py-2" />
        </div>

        {/* body */}
        <div className="px-10 h-[80%] overflow-y-auto scrollbar2 relative">
          <form ref={formRef} onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-5  w-full">
            <TextInput
              key={form.key("positionTitle")}
              classNames={{ input: "poppins text-[#6D6D6D]" }}
              {...form.getInputProps("positionTitle")}
              radius="md"
              size="lg"
              label="Position Title"
              placeholder={"Type Position Title"}
            />
            <Select
              key={form.key("company")}
              {...form.getInputProps("company")}
              label="Company"
              placeholder={"Select Company"}
              radius={8}
              data={companies.data?.items.map((company: any) => ({
                id: company.id,
                value: String(company.id),
                label: company.name,
              }))}
              rightSection={<IconCaretDownFilled size="18" />}
              className="border-none w-full text-sm"
              classNames={{ label: "p-1", input: "poppins text-[#6D6D6D] ", dropdown: "poppins text-[#6D6D6D]" }}
              styles={{ label: { color: "#6d6d6d" } }}
              size="lg"
              onChange={(val) => {
                form.setFieldValue("company", String(val));
                setSelectedCompanyId(String(val));
              }}
            />

            <div className="flex flex-col lg:flex-row gap-4  w-full">
              <Select
                {...form.getInputProps("branch")}
                key={form.key("branch")}
                label="Branch"
                placeholder={"Select Branch"}
                radius={8}
                data={
                  action === Action.Edit && firstLoad
                    ? selectedVacancy.branchObj?.map((branch: any) => ({
                      id: branch.id,
                      value: String(branch.id),
                      label: branch.name,
                    })) || []
                    : branches.data?.items.map((branch: any) => ({
                      id: branch.id,
                      value: String(branch.id),
                      label: branch.name,
                    }))
                }
                rightSection={<IconCaretDownFilled size="18" />}
                className="border-none w-full text-sm"
                classNames={{ label: "p-1", input: "poppins text-[#6D6D6D] ", dropdown: "poppins text-[#6D6D6D]" }}
                styles={{ label: { color: "#6d6d6d" } }}
                size="lg"
                onClick={() => {
                  setFirstLoad(false);
                  setSelectedCompanyId(form.getValues().company);
                  refetchLookup();
                }}
                onChange={(val) => {
                  console.log(val);
                  form.setFieldValue("branch", String(val));
                  setSelectedBranchId(String(val));
                }}
              />
              <Select
                {...form.getInputProps("division")}
                key={form.key("division")}
                label="Division"
                placeholder={"Select Division"}
                radius={8}
                data={
                  action === Action.Edit && firstLoad
                    ? selectedVacancy.divisionObj?.map((division: any) => ({
                      id: division.id,
                      value: String(division.id),
                      label: division.name,
                    })) || []
                    : divisions.data?.items.map((division: any) => ({
                      id: division.id,
                      value: String(division.id),
                      label: division.name,
                    }))
                }
                rightSection={<IconCaretDownFilled size="18" />}
                className="border-none w-full text-sm "
                classNames={{ label: "p-1", input: "poppins text-[#6D6D6D] ", dropdown: "poppins text-[#6D6D6D]" }}
                styles={{ label: { color: "#6d6d6d" } }}
                size="lg"
                onChange={(val) => {
                  form.setFieldValue("division", String(val));
                  setSelectedDivisionId(String(val));
                }}
              />
            </div>

            <div className="flex gap-4  w-full flex-col sm:flex-row">
              <Select
                {...form.getInputProps("department")}
                key={form.key("department")}
                label="Department"
                placeholder={"Select Department"}
                radius={8}
                data={
                  action === Action.Edit && firstLoad
                    ? selectedVacancy.departmentObj?.map((department: any) => ({
                      id: department.id,
                      value: String(department.id),
                      label: department.name,
                    })) || []
                    : departments.data?.items.map((department: any) => ({
                      id: department.id,
                      value: String(department.id),
                      label: department.name,
                    }))
                }
                rightSection={<IconCaretDownFilled size="18" />}
                className="border-none w-full text-sm"
                classNames={{ label: "p-1", input: "poppins text-[#6D6D6D] ", dropdown: "poppins text-[#6D6D6D]" }}
                styles={{ label: { color: "#6d6d6d" } }}
                size="lg"
                onChange={(val) => {
                  form.setFieldValue("department", String(val));
                  setSelectedDepartmentId(String(val));
                }}
              />
              <Select
                {...form.getInputProps("section")}
                key={form.key("section")}
                label="Section"
                placeholder={"Select Section"}
                radius={8}
                data={
                  action === Action.Edit && firstLoad
                    ? selectedVacancy.sectionObj?.map((section: any) => ({
                      id: section.id,
                      value: String(section.id),
                      label: section.name,
                    })) || []
                    : sections.data?.items.map((section: any) => ({
                      id: section.id,
                      value: String(section.id),
                      label: section.name,
                    }))
                }
                rightSection={<IconCaretDownFilled size="18" />}
                className="border-none w-full text-sm"
                classNames={{ label: "p-1", input: "poppins text-[#6D6D6D] ", dropdown: "poppins text-[#6D6D6D]" }}
                styles={{ label: { color: "#6d6d6d" } }}
                size="lg"
              />
            </div>

            <div className="flex gap-4  w-full flex-col sm:flex-row">
              <Select
                {...form.getInputProps("employmentType")}
                key={form.key("employmentType")}
                label="Employment Type"
                placeholder={"Select Employment Type"}
                radius={8}
                data={employmentType.data?.items.map((empType: any) => ({
                  id: empType.id,
                  value: String(empType.id),
                  label: empType.name,
                }))}
                rightSection={<IconCaretDownFilled size="18" />}
                className="border-none w-full text-sm"
                classNames={{ label: "p-1", input: "poppins text-[#6D6D6D] ", dropdown: "poppins text-[#6D6D6D]" }}
                styles={{ label: { color: "#6d6d6d" } }}
                size="lg"
              />
              <Select
                {...form.getInputProps("workplaceType")}
                key={form.key("workplaceType")}
                label="Workplace Type"
                placeholder={"Select Workplace Type"}
                radius={8}
                data={workPlaces.data?.items.map((workPlace: any) => ({
                  id: workPlace.id,
                  value: String(workPlace.id),
                  label: workPlace.name,
                }))}
                rightSection={<IconCaretDownFilled size="18" />}
                className="border-none w-full text-sm"
                classNames={{ label: "p-1", input: "poppins text-[#6D6D6D] ", dropdown: "poppins text-[#6D6D6D]" }}
                styles={{ label: { color: "#6d6d6d" } }}
                size="lg"
              />
            </div>

            <div className="flex gap-4 flex-col sm:flex-row">
              <Select
                {...form.getInputProps("vacancyType")}
                key={form.key("vacancyType")}
                label="Vacancy Type"
                placeholder={"Select Vacancy Type"}
                radius={8}
                data={vacancyTypes.data?.items.map((vactype: any) => ({
                  id: vactype.id,
                  value: String(vactype.id),
                  label: vactype.name,
                }))}
                rightSection={<IconCaretDownFilled size="18" />}
                className="border-none w-full text-sm"
                classNames={{ label: "p-1", input: "poppins text-[#6D6D6D] ", dropdown: "poppins text-[#6D6D6D]" }}
                styles={{ label: { color: "#6d6d6d" } }}
                size="lg"
              />
              <Select
                {...form.getInputProps("experienceLevel")}
                key={form.key("experienceLevel")}
                label="Experience Level"
                placeholder={"Select Experience Level"}
                radius={8}
                data={experienceLevel.data?.items.map((expLevel: any) => ({
                  id: expLevel.id,
                  value: String(expLevel.id),
                  label: expLevel.name,
                }))}
                rightSection={<IconCaretDownFilled size="18" />}
                className="border-none w-full text-sm"
                classNames={{ label: "p-1", input: "poppins text-[#6D6D6D] ", dropdown: "poppins text-[#6D6D6D]" }}
                styles={{ label: { color: "#6d6d6d" } }}
                size="lg"
              />
            </div>

            <div className="flex gap-4 items-end">
              <div className="w-1/2">
                <Flex direction="row" justify="space-between" gap={12} className="w-full items-end">
                  <Popover opened={opened} position="bottom" shadow="md" trapFocus={true} returnFocus={true}>
                    <Popover.Target>
                      <TextInput
                        radius="md"
                        size={"lg"}
                        readOnly
                        label="Vacancy Duration"
                        placeholder="Start Date"
                        className="w-full cursor-default"
                        classNames={{ label: "p-1", input: "poppins text-[#6D6D6D] " }}
                        rightSection={
                          <IconCalendarMonth
                            className="cursor-pointer"
                            onClick={() => {
                              setOpened((o) => !o);
                              setOpened2((o) => (o ? false : o));
                            }}
                          />
                        }
                        styles={{ label: { color: "#6d6d6d" } }}
                        {...form.getInputProps("duration.start")}
                        key={form.key("duration.start")}
                        onClick={() => {
                          setOpened((o) => !o);
                          setOpened2((o) => (o ? false : o));
                        }}
                      />
                    </Popover.Target>
                    <Popover.Dropdown className="w-full">
                      <DatePicker
                        firstDayOfWeek={0}
                        numberOfColumns={2}
                        type="range"
                        value={vacancyDuration}
                        onChange={(e) => {
                          if (e[0] != null) form.setFieldValue("duration.start", DateTimeUtils.dayWithDate(`${e[0]?.toString()}`));
                          if (e[1] != null) form.setFieldValue("duration.end", DateTimeUtils.dayWithDate(`${e[1]?.toString()}`));
                          setVacancyDuration(e);
                        }}
                      />
                    </Popover.Dropdown>
                  </Popover>
                  <Popover opened={opened2} position="bottom" shadow="md">
                    <Popover.Target>
                      <TextInput
                        radius="md"
                        size={"lg"}
                        readOnly
                        label={""}
                        placeholder="End Date"
                        rightSection={
                          <IconCalendarMonth
                            className="cursor-pointer"
                            onClick={() => {
                              setOpened((o) => (o ? false : o));
                              setOpened2((o) => !o);
                            }}
                          />
                        }
                        className="w-full"
                        classNames={{ label: "p-1", input: "poppins text-[#6D6D6D] " }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        {...form.getInputProps("duration.end")}
                        key={form.key("duration.end")}
                        onClick={() => {
                          setOpened((o) => (o ? false : o));
                          setOpened2((o) => !o);
                        }}
                      />
                    </Popover.Target>
                    <Popover.Dropdown>
                      <DatePicker
                        numberOfColumns={2}
                        type="range"
                        value={vacancyDuration}
                        onChange={(e) => {
                          if (e[0] != null) form.setFieldValue("duration.start", DateTimeUtils.dayWithDate(`${e[0]?.toString()}`));
                          if (e[1] != null) form.setFieldValue("duration.end", DateTimeUtils.dayWithDate(`${e[1]?.toString()}`));
                          setVacancyDuration(e);
                        }}
                      />
                    </Popover.Dropdown>
                  </Popover>
                </Flex>
              </div>
              <TextInput
                className="w-1/2 text-[#6D6D6D]"
                classNames={{ input: "poppins text-[#6D6D6D]" }}
                key={form.key("noOfOpenPosition")}
                {...form.getInputProps("noOfOpenPosition")}
                radius="md"
                size="lg"
                label="No. of Open Positions"
                placeholder="Specify the number of open position here."
              />
            </div>
            <p className="poppins text-[#6D6D6D] p-1 m_8fdc1311 mantine-InputWrapper-label mantine-TextInput-label text-lg">
              Job Description <span className="text-red-400">*</span>
            </p>
            {/* <p className='text-[#6D6D6D] ' >Job Description</p> */}
            <div className={`border ${form.errors.jobDescription ? "border-red-500" : "border-gray-300"} rounded-md transition-colors duration-200 relative`}>
              <RichTextEditor editor={editor}>
                <RichTextEditor.Toolbar sticky>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Code />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                    <RichTextEditor.Subscript />
                    <RichTextEditor.Superscript />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Undo />
                    <RichTextEditor.Redo />
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content className={`rte border ${form.errors.jobDescription ? "text-red-500" : ""}`} />
              </RichTextEditor>
              {form.errors.jobDescription && (
                <Text className="absolute" color="red" size="sm">
                  {form.errors.jobDescription}
                </Text>
              )}
            </div>

            <MultiSelect
              radius="md"
              size="lg"
              label="Must-have Skills"
              ref={myRef}
              {...form.getInputProps("mustHaveSkills")}
              key={form.key("mustHaveSkills")}
              classNames={{ dropdown: "hidden", input: "poppins text-[#6D6D6D]", pill: "poppins text-[#6D6D6D]" }}
              className="w-full"
              placeholder="Type keyword to set required skills."
              data={[]}
              searchable
              value={mustHaveSkills}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              rightSection={<IconCalendarMonth color="transparent" />}
            />

            <p className="poppins text-[#6D6D6D] p-1 m_8fdc1311 mantine-InputWrapper-label mantine-TextInput-label text-lg">
              Qualification <span className="text-red-400">*</span>
            </p>
            <div className={`border ${form.errors.qualification ? "border-red-500" : "border-gray-300"} rounded-md transition-colors duration-200 relative`}>
              <RichTextEditor editor={editor2}>
                <RichTextEditor.Toolbar sticky>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Code />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                    <RichTextEditor.Subscript />
                    <RichTextEditor.Superscript />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Undo />
                    <RichTextEditor.Redo />
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content className={`rte border ${form.errors.jobDescription ? "text-red-500" : ""}`} />
              </RichTextEditor>
              {form.errors.qualification && (
                <Text className="absolute" color="red" size="sm">
                  {form.errors.qualification}
                </Text>
              )}
            </div>
          </form>
        </div>

        {/* footer */}
        <div className="flex justify-end z-40 px-10 items-center  py-3 ">
          <Button onClick={() => formRef.current?.requestSubmit()} color="white" className=" br-gradient2 border-none w-[10%] " variant="transparent" radius={10}>
            {ActionButtonTitle[action as keyof typeof ActionButtonTitle]}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
