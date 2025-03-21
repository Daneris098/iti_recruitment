import { Divider, Radio } from "@mantine/core";
import { useEffect, useState } from "react";
import { ApplicationStore, HomeStore } from "../store";
import { AlertType, EducationBackground, Step } from "../types";
import axiosInstance from "@src/api";
export default function Index() {
    const [consent, setConsent] = useState('');
    const { applicationForm, submit, activeStepper, setSubmit, setActiveStepper } = ApplicationStore();
    const { setApplicationFormModal, setAlert } = HomeStore();

    useEffect(() => {
        if (submit === true && activeStepper === Step.Oath && consent != '') {
            if (consent === 'true') {
                console.log('applicationForm: ', applicationForm);
                // setApplicationFormModal(false);
                // setActiveStepper(Step.GeneralInformation);
                // setAlert(AlertType.applicationSuccesfull);

                (async () => {
                    try {
                        const formData = new FormData();

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
                            name: applicationForm.generalInformation.personalInformation.fullname,
                            birthDate: applicationForm.generalInformation.personalInformation.dateOfBirth,
                            birthPlace: applicationForm.generalInformation.personalInformation.placeOfBirth,
                            height: 160,
                            weight: 50,
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
                                    name: applicationForm.familyBackground.father.fullname,
                                    age: applicationForm.familyBackground.father.age,
                                    contactNo: applicationForm.familyBackground.father.contactNumber,
                                    occupation: applicationForm.familyBackground.father.occupation,
                                },
                                mother: {
                                    name: applicationForm.familyBackground.mother.fullname,
                                    age: applicationForm.familyBackground.mother.age,
                                    contactNo: applicationForm.familyBackground.mother.contactNumber,
                                    occupation: applicationForm.familyBackground.mother.occupation,
                                },
                                spouse: {
                                    name: applicationForm.familyBackground.spouse?.fullname,
                                    age: applicationForm.familyBackground.spouse?.age,
                                    contactNo: applicationForm.familyBackground.spouse?.contactNumber,
                                    occupation: applicationForm.familyBackground.spouse?.occupation,
                                },
                                siblings: applicationForm.familyBackground.siblings.map((item) => {
                                    return {
                                        name: item.fullname,
                                        age: item.age,
                                        contactNo: item.contactNumber,
                                        occupation: item.occupation,
                                    }
                                }),
                                // siblings: [
                                //     {
                                //         name: 'Yuji',
                                //         age: 17,
                                //         contactNo: '09871423',
                                //         occupation: 'TEST ING',
                                //     },
                                //     {
                                //         name: 'MEGUMI',
                                //         age: 18,
                                //         contactNo: '09981233412',
                                //         occupation: 'TEST GIN',
                                //     },
                                // ],
                                childCount: applicationForm.familyBackground.children.numberOfChildren,
                                childAgeRangeFrom: 1,
                                childAgeRangeTo: 2,
                            },
                            postingType: {
                                fromEmployeeReferral: false,
                                fromHeadHunter: false,
                                fromJobPosting: true,
                                fromWordOfMouth: false,
                                walkIn: false,
                                others: false,
                                description: 'test',
                            },
                            religion: {
                                id: 1,
                                name: 'Catholic',
                            },
                            characterReferences: [
                                {
                                    name: 'Satoru Gojo',
                                    company: 'TEST',
                                    position: 'Developer',
                                    contactNo: '90878123',
                                    isEmploymentReference: true,
                                },
                                {
                                    name: 'Yuta',
                                    company: 'TEST',
                                    position: 'Developer',
                                    contactNo: '097889189271',
                                    isEmploymentReference: false,
                                },
                            ],
                            addresses: [
                                {
                                    unitNo: '12',
                                    houseNo: '15',
                                    street: 'Catanduanes',
                                    subdivision: 'bgg',
                                    barangay: 'brgy',
                                    city: { id: 1, name: 'Caloocan' },
                                    arrangement: { id: 1, name: 'Stay-IN' },
                                    isPermanent: true,
                                    zipCode: { id: 1, name: 'National Capital Region' },
                                },
                            ],
                            positions: [
                                {
                                    id: 1,
                                    name: 'Developer',
                                    salary: 15000,
                                    choice: { id: 1, name: 'First Choice' },
                                    availableDateStart: '2025-03-30',
                                },
                                {
                                    id: 2,
                                    name: 'QA',
                                    salary: 15000,
                                    choice: { id: 2, name: 'Second Choice' },
                                    availableDateStart: '2025-03-30',
                                },
                            ],
                            questionnaires: [
                                { id: 1, Question: 'Have you ever been convicted of a crime?', Answer: 'NO' },
                                { id: 2, Question: 'Have you ever been hospitalized?', Answer: 'NO' },
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
                            skills: applicationForm.familyBackground.otherInformation.specialTechnicalSkills.split(',').map((item) => {
                                return { keyword: item }
                            }),
                        });

                        const response = await axiosInstance.post('/recruitment/applicants/application-form', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        })
                        console.log('response: ', response);
                    } catch (error) {
                        console.error('Error in submitting the form:', error);
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
                <Divider size="md" color="black" className="opacity-30 p-2" />
                <p className="font-bold text-xl">OATH OF APPLICATION</p>
                <Divider size="md" color="#6D6D6D" className="opacity-30 p-2" />
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
