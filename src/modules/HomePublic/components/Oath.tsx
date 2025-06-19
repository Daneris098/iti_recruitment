import { Radio } from "@mantine/core";
import { useEffect, useState } from "react";
import { ApplicationStore, HomeStore } from "../store";
import { AlertType, EducationBackground, Step } from "../types";
import axiosInstance from "@src/api";
import { useVacancies } from "@modules/HomePublic/hooks/useVacancies";
import { ApplicationFormVal } from "../values/cleanState";

export default function Index() {
    const [consent, setConsent] = useState('');
    const { applicationForm, submit, activeStepper, setSubmit, setActiveStepper, setApplicationForm, setSubmitLoading } = ApplicationStore();
    const { setApplicationFormModal, setAlert, setAlertBody } = HomeStore();
    const { data: vacanciesData } = useVacancies();
    const [cities, setCities] = useState([
        { id: 1, value: 'MANILA', label: 'MANILA' },
    ]);
    const fetchCities = async () => {
        await axiosInstance
            .get("/general/cities")
            .then((response) => {
                const seen = new Set();
                const map = response.data.items
                    .filter((item: any) => {
                        if (seen.has(item.name)) return false;
                        seen.add(item.name);
                        return true;
                    })
                    .map((item: any) => ({
                        id: item.id,
                        value: `${item.id}`,
                        label: item.name,
                    }));
                setCities(map);
            })
            .catch((error) => {
                const message = error.response.data.errors[0].message;
                console.error(message)
            });
    };

    useEffect(() => {
        fetchCities()
    }, [])

    useEffect(() => {
        if (submit === true && activeStepper === Step.Oath && consent != '') {
            if (consent === 'true') {
                setSubmitLoading(true);
                (async () => {
                    try {
                        const formData = new FormData();
                        const split = applicationForm.photo.split('/');
                        const mimeToExtension = (mimeType: string): string => {
                            const mimeTypesMap: { [key: string]: string } = {
                                'image/jpeg': '.jpg',
                                'image/png': '.png',
                                'image/gif': '.gif',
                                'image/webp': '.webp',
                                'image/bmp': '.bmp',
                                'image/tiff': '.tiff',
                                // Add other mime types if needed
                            };
                            return mimeTypesMap[mimeType] || ''; // Default to empty if not found
                        };

                        // Fetch the image, convert it to a file, and add extension
                        const fileUri = applicationForm.photo; // path or URL to the photo
                        const fileName = split[split.length - 1];
                        const file = await fetch(fileUri)
                            .then(res => res.blob())
                            .then(blob => {
                                const fileExtension = mimeToExtension(blob.type); // Get file extension from MIME type
                                const updatedFileName = `${fileName}${fileExtension}`; // Add the extension to the file name
                                return new File([blob], updatedFileName, { type: blob.type });
                            });

                        const appendFormData = (data: any, parentKey?: string) => {
                            if (data && typeof data === 'object' && !(data instanceof File)) {
                                Object.keys(data).forEach(key => {
                                    const propName = parentKey ? `${parentKey}[${key}]` : key;
                                    appendFormData(data[key], propName);
                                });
                            } else {
                                if (data !== undefined && data !== null) {
                                    formData.append(parentKey!, data);
                                }
                            }
                        };


                        appendFormData({
                            name: {
                                firstName: applicationForm.generalInformation.personalInformation.fullname.firstName,
                                middleName: applicationForm.generalInformation.personalInformation.fullname.middleName?.trim() || 'N/A',
                                lastName: applicationForm.generalInformation.personalInformation.fullname.lastName,
                                suffix: applicationForm.generalInformation.personalInformation.fullname.suffix?.trim() || 'N/A',
                            },
                            Photo: file,
                            birthDate: applicationForm.generalInformation.personalInformation.dateOfBirth,
                            birthPlace: applicationForm.generalInformation.personalInformation.placeOfBirth,
                            height: applicationForm.generalInformation.personalInformation.height || 1,
                            weight: applicationForm.generalInformation.personalInformation.weight || 1,
                            identification: {
                                sssNo: applicationForm.generalInformation.personalInformation.governmentIdOrNumber.sssNo,
                                hdmfNo: '',
                                phicNo: applicationForm.generalInformation.personalInformation.governmentIdOrNumber.philhealthNo,
                                tinNo: applicationForm.generalInformation.personalInformation.governmentIdOrNumber.tinNo,
                                driversLicenseNo: applicationForm.generalInformation.personalInformation.governmentIdOrNumber.driversLicense,
                                gsisNo: applicationForm.generalInformation.personalInformation.governmentIdOrNumber.gsisNo,
                                passportNo: applicationForm.generalInformation.personalInformation.governmentIdOrNumber.passport,
                                rdoCode: applicationForm.generalInformation.personalInformation.governmentIdOrNumber.rdoCode,
                            },
                            gender: {
                                id: 1,
                                name: applicationForm.generalInformation.personalInformation.gender,
                            },
                            contact: {
                                mobileNo: applicationForm.generalInformation.personalInformation.mobileNumber,
                                landLineNo: applicationForm.generalInformation.personalInformation.landlineNumber,
                                emailAddress: applicationForm.generalInformation.personalInformation.workingEmailAddress,
                            },
                            civilStatus: {
                                id: 1,
                                name: applicationForm.generalInformation.personalInformation.civilStatus,
                            },
                            family: {
                                father: {
                                    name: applicationForm.familyBackground.father.fullname?.trim() || 'N/A',
                                    age: applicationForm.familyBackground.father.age || 0,
                                    contactNo: applicationForm.familyBackground.father.contactNumber?.toString()?.trim() || 'N/A',
                                    occupation: applicationForm.familyBackground.father.occupation?.trim() || 'N/A',
                                },
                                mother: {
                                    name: applicationForm.familyBackground.mother.fullname?.trim() || 'N/A',
                                    age: applicationForm.familyBackground.mother.age || 0,
                                    contactNo: applicationForm.familyBackground.mother.contactNumber?.toString()?.trim() || 'N/A',
                                    occupation: applicationForm.familyBackground.mother.occupation?.trim() || 'N/A',
                                },
                                ...(applicationForm.familyBackground.spouse?.fullname?.trim()
                                    ? {
                                        spouse: {
                                            name: applicationForm.familyBackground.spouse.fullname,
                                            age: applicationForm.familyBackground.spouse.age,
                                            contactNo: applicationForm.familyBackground.spouse.contactNumber,
                                            occupation: applicationForm.familyBackground.spouse.occupation,
                                        }
                                    }
                                    : {}),
                                siblings: applicationForm.familyBackground.siblings
                                    .filter(item => !(item.fullname === '' && item.age === 0 && item.occupation === '' && item.contactNumber === ''))
                                    .map(item => ({
                                        name: item.fullname,
                                        age: item.age,
                                        contactNo: item.contactNumber,
                                        occupation: item.occupation,
                                    })),
                                childCount: applicationForm.familyBackground.children.numberOfChildren,
                                childAgeRangeFrom: 1,
                                childAgeRangeTo: 2,
                            },
                            postingType: {
                                fromEmployeeReferral: applicationForm.reference.applicationSource.employeeReferal,
                                fromHeadHunter: applicationForm.reference.applicationSource.headHunter,
                                fromJobPosting: applicationForm.reference.applicationSource.jobStreet,
                                fromWordOfMouth: applicationForm.reference.applicationSource.wordOfMouth,
                                walkIn: applicationForm.reference.applicationSource.walkin,
                                others: applicationForm.reference.applicationSource.others,
                                description: applicationForm.reference.applicationSource.description,
                            },
                            religion: {
                                id: 1,
                                name: applicationForm.generalInformation.personalInformation.religion?.trim() || 'N/A',
                            },
                            characterReferences: [
                                ((applicationForm.reference.employmentReference).length > 0
                                    ? [...applicationForm.reference.employmentReference.map((item) => {
                                        return {
                                            name: item.fullname,
                                            company: item.company,
                                            contactNo: item.ContactNo,
                                            position: item.positionHeld,
                                            isEmploymentReference: true
                                        };
                                    }),]
                                    : []),

                                ...applicationForm.reference.characterReference.map((item) => {
                                    return {
                                        name: item.fullname,
                                        company: item.company,
                                        contactNo: item.ContactNo,
                                        position: item.positionHeld,
                                        isEmploymentReference: false
                                    };
                                })
                            ],
                            addresses: [
                                {
                                    unitNo: applicationForm.generalInformation.personalInformation.permanentAddress.unitNo?.trim() || 'N/A',
                                    houseNo: applicationForm.generalInformation.personalInformation.permanentAddress.houseNo,
                                    street: applicationForm.generalInformation.personalInformation.permanentAddress.street,
                                    subdivision: applicationForm.generalInformation.personalInformation.permanentAddress.subdivision?.trim() || 'N/A',
                                    barangay: applicationForm.generalInformation.personalInformation.permanentAddress.barangay,
                                    city: { id: (cities.find((item) => item.label == applicationForm.generalInformation.personalInformation.permanentAddress.city)?.id), name: applicationForm.generalInformation.personalInformation.permanentAddress.city },
                                    arrangement: { id: 1, name: applicationForm.generalInformation.personalInformation.permanentAddress.livingArrangement.trim() || 'N/A' },
                                    isPermanent: true,
                                    zipCode: { id: 1, name: applicationForm.generalInformation.personalInformation.permanentAddress.zipCode.trim() || 'N/A' },
                                },
                                {
                                    unitNo: applicationForm.generalInformation.personalInformation.presentAddress.unitNo?.trim() || 'N/A',
                                    houseNo: applicationForm.generalInformation.personalInformation.presentAddress.houseNo,
                                    street: applicationForm.generalInformation.personalInformation.presentAddress.street,
                                    subdivision: applicationForm.generalInformation.personalInformation.presentAddress.subdivision?.trim() || 'N/A',
                                    barangay: applicationForm.generalInformation.personalInformation.presentAddress.barangay,
                                    city: { id: (cities.find((item) => item.label == applicationForm.generalInformation.personalInformation.presentAddress.city)?.id), name: applicationForm.generalInformation.personalInformation.presentAddress.city },
                                    arrangement: { id: 1, name: applicationForm.generalInformation.personalInformation.presentAddress.livingArrangement.trim() || 'N/A' },
                                    isPermanent: false,
                                    zipCode: { id: 1, name: applicationForm.generalInformation.personalInformation.presentAddress.zipCode.trim() || 'N/A' },
                                }
                            ],
                            positions: [
                                {
                                    id: (vacanciesData?.find((item) => item.position == (applicationForm.generalInformation.firstChoice)) as any).id,
                                    companyId: (vacanciesData?.find((item) => item.position == (applicationForm.generalInformation.firstChoice)) as any).companyDetails.id,
                                    name: (vacanciesData?.find((item) => item.position == (applicationForm.generalInformation.firstChoice)) as any).position,
                                    salary: applicationForm.generalInformation.desiredSalary,
                                    choice: { id: 1, name: 'First Choice' },
                                    availableDateStart: applicationForm.generalInformation.startDateAvailability,
                                    departmentId: (vacanciesData?.find((item) => item.position == (applicationForm.generalInformation.firstChoice)) as any).departmentDetails.id,
                                },
                                ((applicationForm.generalInformation.secondChoice) != ''
                                    ? {
                                        id: (vacanciesData?.find((item) => item.position == applicationForm.generalInformation.secondChoice) as any).id,
                                        companyId: (vacanciesData?.find((item) => item.position == applicationForm.generalInformation.secondChoice) as any).companyDetails.id,
                                        name: (vacanciesData?.find((item) => item.position == applicationForm.generalInformation.secondChoice) as any).position,
                                        salary: applicationForm.generalInformation.desiredSalary,
                                        choice: { id: 2, name: 'Second Choice' },
                                        availableDateStart: applicationForm.generalInformation.startDateAvailability,
                                        departmentId: (vacanciesData?.find((item) => item.position == applicationForm.generalInformation.secondChoice) as any).departmentDetails.id,
                                    }
                                    : []),
                            ],
                            questionnaires: [
                                { id: 1, Question: 'Have you ever been convicted of a crime?', Answer: applicationForm.familyBackground.otherInformation.isConvictedCrimeDetails },
                                { id: 2, Question: 'Have you ever been hospitalized?', Answer: applicationForm.familyBackground.otherInformation.isBeenHospitalizedDetails },
                                { id: 3, Question: 'Do you have any medical condition that may prevent you from performing certain types of jobs?', Answer: applicationForm.familyBackground.otherInformation.medicalConditionDetails },
                                { id: 4, Question: 'Do you have any relatives/family/people in a relationship with you, who are working with us?F', Answer: applicationForm.familyBackground.otherInformation.relativeWorkingWithUsDetails },
                            ],
                            educations: applicationForm.educationAndEmployment.educationBackground.map((item: EducationBackground, index) => {
                                const formatDate = (date: any) => {
                                    const d = new Date(date);
                                    return d.toISOString().split('T')[0];
                                };
                                return {
                                    school: item.nameOfSchool,
                                    level: { id: index + 1, name: item.educationalLevel },
                                    course: item.course,
                                    yearFrom: formatDate(item.yearsAttended.from),
                                    yearTo: formatDate(item.yearsAttended.to)
                                }
                            }),

                            ...(applicationForm.educationAndEmployment.employmentRecord.some(item => item.employerCompany?.trim())
                                ? {
                                    previousEmployments: applicationForm.educationAndEmployment.employmentRecord.map((item) => {
                                        const formatDate = (date: any) => {
                                            const d = new Date(date);
                                            return d.toISOString().split('T')[0];
                                        };
                                        return {
                                            company: item.employerCompany,
                                            location: item.location,
                                            position: item.positionHeld,
                                            dateFrom: formatDate(item.inclusiveDate.from),
                                            dateTo: formatDate(item.inclusiveDate.to),
                                            salary: item.salary,
                                            reason: item.reasonForLeaving

                                        }
                                    }),
                                }
                                : {}),

                            skills: applicationForm.familyBackground.otherInformation.specialTechnicalSkills.split(',').map((item) => {
                                return { keyword: item }
                            }),
                        });
                        const response = await axiosInstance.post('/recruitment/applicants/application-form', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        })
                        if (response.status == 201) {
                            setApplicationForm(ApplicationFormVal)
                            setApplicationFormModal(false);
                            setActiveStepper(Step.GeneralInformation);
                            setAlert(AlertType.applicationSuccesfull);
                        }
                    } catch (error: any) {
                        console.log(error)
                        setAlert(AlertType.submitResponse);
                        const errorText = JSON.parse(error.request.responseText);
                        const errorTitle = errorText.title;
                        setAlertBody(errorTitle);
                    }
                    finally {
                        setSubmitLoading(false);
                    }
                })();


            }
            else {
                setAlert(AlertType.cancelApplication);
            }
        }
        return () => setSubmit(false);
    }, [submit]);

    return (
        <div className="text-center text-[#6D6D6D] flex flex-col gap-7">
            <div className="flex flex-col gap-1">
                <p className="font-bold text-xl">OATH OF APPLICATION</p>
            </div>
            <p>
                I certify that all the information I voluntarily provided in the application form is factual and true to the best of my knowledge. I understand that any misrepresentation or omission may result in termination of my employment with the company. I also give the company authority to contact schools, employers, references, and others for any background check related to my potential employment with Intellismart Technology, Inc., and I hereby release and hold the company harmless from any liability as a result of such investigation. Additionally, I acknowledge that I am allowing the company to retain all information and data regarding my employment record for filing purposes.
            </p>
            <Radio.Group value={consent} onChange={setConsent}>
                <div className="flex flex-col gap-2 mb-2">
                    <Radio value="true" label="I consent." />
                    <Radio value="false" label="I do not consent to this." />
                </div>
            </Radio.Group>
        </div>
    );
}
