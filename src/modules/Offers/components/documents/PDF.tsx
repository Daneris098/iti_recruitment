import React from 'react';
import { PDFProps } from "@modules/Offers/types";
import header from '@src/assets/job-offers-header.png';
import PoppinsBold from "@shared/assets/fonts/Poppins/Poppins-Bold.ttf"
import { useDropDownOfferedStore } from "@src/modules/Applicants/store";
import PoppinsRegular from '@shared/assets/fonts/Poppins/Poppins-regular.ttf';
import { useDepartmentStore, useApplicantNameStore, usePositionApplied, useChoiceStore, useJobOpeningPositionStore } from "@src/modules/Shared/store";
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
// import { re,  } from "@src/modules/Applicants/store";
// Register the Poppins font
Font.register({
  family: 'Poppins',
  fonts: [
    { src: PoppinsBold, fontWeight: 'bold' },
    { src: PoppinsRegular, fontWeight: 'normal' }
  ],
});

const styles = StyleSheet.create({  // General styles for Generative PDF
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 10,
    display: "flex"
  },
  intellismart_png: {
    fontSize: 13,
    color: "#6D6D6D",
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  section: {
    margin: 10,
    padding: 10,
    flexDirection: 'column',
    flexGrow: 1,
  },
  text_title: {
    fontSize: 11,
    marginBottom: 13,
    fontFamily: 'Poppins',
    color: '#6D6D6D',
    fontWeight: 'semibold'
  },
  text_description: {
    fontSize: 11,
    marginBottom: 13,
    fontFamily: 'Poppins',
    color: '#6D6D6D',
    fontWeight: 'normal'
  },
  image: {
    width: 550,
    height: 80.
  },
  horizonntalDivider1: {
    width: '100%',
    height: 1.5,
    marginVertical: 10,
    backgroundColor: '#5E6670',
    marginBottom: 12,
  },
  horizonntalDivider2: {
    width: '100%',
    height: 0.5,
    marginVertical: 8,
    backgroundColor: '#5E6670',
  },
  salary_note: {
    color: '#6D6D6D',
    fontSize: 9,
    fontFamily: 'Poppins',
    fontWeight: 'normal',
    textAlign: 'left'
  },
  actual_salary: {
    color: '#6D6D6D',
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    textAlign: 'left'
  },
  text_data: {
    color: '#6D6D6D',
    fontSize: 11,
    marginBottom: 13,
    fontFamily: 'Poppins',
    fontWeight: 'normal'

  },
  benefits_text: {
    color: '#6D6D6D',
    fontSize: 9,
    marginBottom: 10,
    fontFamily: 'Poppins',
    fontWeight: 'normal'
  },
  benefits_label: {
    color: '#6D6D6D',
    fontSize: 9,
    marginBottom: 10,
    fontFamily: 'Poppins',
    fontWeight: 'medium'
  },
  leave_text: {
    color: '#6D6D6D',
    fontSize: 10,
    marginBottom: 1,
    fontFamily: 'Poppins',
  },
  merit_text: {
    color: '#6D6D6D',
    fontSize: 10,
    marginBottom: 1,
    fontFamily: 'Poppins',
  },
});

// Create Document Component
const PDFDocument: React.FC<Partial<PDFProps>> = ({
  // applicantName,
  // position,
  // department,
  remarks,
  // salaryMonthly,
  // salaryYearly,
  noteSalary,
  meritIncrease,
  descriptionVL,
  descriptionSL,
  descriptionBL,
  benefitPaternity,
  benefitMaternity,
  descriptionTranspo,
  acknowledgement,
}) => {

  const descriptions = [ // This array will be used later for mapping the type of Leave and Benefit of the user.
    { label: 'Vacation Leave', value: descriptionVL },
    { label: 'Sick Leave', value: descriptionSL },
    { label: 'Bereavement Leave', value: descriptionBL },
    {
      label: 'Maternity/Paternity Leave', value: {
        benefitPaternity, benefitMaternity
      },
    },
    { label: 'Transportation Subsidy', value: descriptionTranspo },
  ];


  const { amount } = useDropDownOfferedStore.getState();
  const annualAmount = amount * 12
  // const departmentName = useDepartmentStore.getState().departmentName;
  const getApplicantName = useApplicantNameStore.getState().applicantName
  const getPosition = usePositionApplied.getState().firstPositionApplied;
  const setSelectedOpening = useJobOpeningPositionStore.getState().selectedOpening?.departmentName
  const transferredPosition = useChoiceStore.getState().transferredPositionName

  const formatPHPNumber = (value: number | string) => {
    const num = Number(value);

    // Guard against non-numeric inputs
    if (Number.isNaN(num)) return "0.00";

    // "en-PH" gives 55,555.00 but *without* the ₱ sign
    return new Intl.NumberFormat("en-PH", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <Document>
      <Page size="LEGAL" style={styles.page}>
        <View style={styles.section}>

          {/* Intellismart PNG header*/}
          <Image src={header} style={styles.image} />
          <Text style={[styles.intellismart_png, { marginLeft: 10 }]}>{"strictly confidential".toUpperCase()}</Text>

          {/* Horizontal Divider */}
          <Text style={styles.horizonntalDivider1}></Text>

          {/* First section: Name, Position, Department, Status */}
          <View style={styles.section}>
            {/* Name */}
            <View style={{ flexDirection: 'row', width: '70%' }}>
              <Text style={[styles.text_title, { flex: 2 }]}>Name</Text>
              <Text style={[styles.text_description, { flex: 0.3 }]}>:</Text>
              <Text style={[styles.text_title, { flex: 3 }]}>{getApplicantName ?? "No Data"}</Text>
            </View>

            {/* Position and Rank */}
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <Text style={[styles.text_title, { flex: 1.5 }]}>Position and Rank</Text>
              <Text style={[styles.text_title, { flex: 0.3 }]}>:</Text>
              <Text
                style={[styles.text_title, { flex: 4 }]}
                wrap={false}
              >
                {`${transferredPosition ?? getPosition}`.slice(0, 50)}

                {/* {`${getPosition} / ${departmentName}`.slice(0, 50)} */}
              </Text>
            </View>

            {/* Department/Division */}
            <View style={{ flexDirection: 'row', width: '70%' }}>
              <Text style={[styles.text_title, { flex: 2 }]}>Department/Division</Text>
              <Text style={[styles.text_title, { flex: 0.3 }]}>:</Text>
              <Text style={[styles.text_title, { flex: 3 }]}>{setSelectedOpening ?? "No Data"}</Text>
            </View>

            {/* Status Upon Hiring */}
            <View style={{ flexDirection: 'row', width: '70%' }}>
              <Text style={[styles.text_title, { flex: 2 }]}>Status Upon Hiring</Text>
              <Text style={[styles.text_title, { flex: 0.3 }]}>:</Text>
              <Text style={[styles.text_title, { flex: 3 }]}>{remarks ?? "No Data"}</Text>
            </View>

            {/* Second Section: Salary  & Merits */}
            <View style={{ paddingTop: 6 }}>

              {/* Actual Salary */}
              <View style={{ flexDirection: 'row', gap: 50, paddingTop: 6 }}>
                {/* Salary with optional note (if needed, re-add noteSalary) */}
                <Text style={[styles.text_title, { marginRight: 50 }]}>
                  Salary {"\n"}
                </Text>

                {/* Monthly Salary */}
                <Text style={styles.text_data}>
                  Monthly: PHP
                  <Text style={styles.actual_salary}>
                    {amount != null ? ` ${formatPHPNumber(amount)}` : " No Data"}
                  </Text>
                </Text>

                {/* Annual Salary */}
                <Text style={styles.text_data}>
                  Annual: PHP
                  <Text style={styles.actual_salary}>
                    {annualAmount != null ? ` ${formatPHPNumber(annualAmount)} (Gross)` : " No Data"}
                  </Text>
                </Text>

              </View>
              <Text style={[styles.text_title, { marginLeft: 139 }]}>
                <Text style={styles.salary_note}>{noteSalary ?? "No Data"}</Text>
              </Text>

              {/* Merit Increase */}
              <View style={{ paddingTop: 6, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.text_title, { paddingRight: 62 }]}>Merit Increase</Text>
                <Text style={styles.salary_note}>{meritIncrease ?? "No Data"}</Text>
              </View>
            </View>

            {/* Third section: Benefits */}
            <View style={{ width: '100%', marginTop: 12 }}>

              {/* Header Row */}
              <View style={{ flexDirection: 'row', width: '100%', marginBottom: 1, alignItems: 'center' }}>
                <Text style={[styles.text_title, { flex: 4, fontWeight: 'bold', }]}>Benefits</Text>
                <Text style={[styles.text_title, { flex: 9, fontWeight: 'bold', textAlign: 'center' }]}>Description</Text>
              </View>

              <View>
                {descriptions.map((description, index) => // Mapping through the array of Benefits based on key-value pair.
                  description.value ? (
                    // Ternary operation is used here so that future programmers won't be confused by nested if-else statements or nested IIFE.
                    // Also, it's more cleaner and readable.

                    <View key={index} style={{ flexDirection: 'row', width: '100%', marginBottom: 3 }}>

                      {/* Label */}
                      <Text style={[styles.benefits_label, { flex: 3, fontWeight: 'bold' }]}>{description.label}</Text>
                      <Text style={[styles.benefits_label, { flex: 1, textAlign: 'center' }]}>:</Text>

                      {/* Value */}
                      {
                        (() => {  // This is IIFE (Immediately Invoked Function Expression).
                          //  It is used instead of another ternary operation to avoid complexibilty issues
                          //  and better readablity.
                          // The purpose of this call is to check whether the descriptions array consists of Maternity/Paternity Leave. 
                          // Another way to read it is (function(){expressions})

                          if (typeof description.value === "object") {
                            return (
                              <View style={{ flex: 9 }}>

                                {/* Headers: Maternity & Paternity Leave */}
                                <View style={{ flexDirection: 'row' }}>
                                  <Text style={[styles.benefits_label, { flex: 8, fontWeight: 'bold', textAlign: 'left' }]}>
                                    Maternity Leave Benefit:
                                  </Text>
                                  <Text style={[styles.benefits_label, { flex: 8, fontWeight: 'bold', textAlign: 'left' }]}>
                                    Paternity Leave Benefit:
                                  </Text>
                                </View>

                                {/* Details: Maternity & Paternity Leave */}
                                <View style={{ flexDirection: 'row', paddingBottom: 10 }}>

                                  {/* Maternity Leave Details */}
                                  <View style={{ flex: 8 }}>
                                    {description.value.benefitMaternity?.split("\n").map((line, idx) => (
                                      <Text key={idx} style={styles.leave_text}>{line}</Text>
                                    ))}
                                  </View>

                                  {/* Paternity Leave Details */}
                                  <View style={{ flex: 8 }}>
                                    <Text style={styles.benefits_text}>{description.value.benefitPaternity}</Text>
                                  </View>
                                </View>
                              </View>
                            );
                          } else {

                            // If descriptions returns proper value, and there are no Maternity/Paternity key-value pair; then proceed to 
                            // render the remaining values from MyDocuments Interface.
                            return <Text style={[styles.benefits_text, { flex: 9 }]}>{description.value}</Text>;
                          }
                        })() // End of IIFE
                      }
                    </View>
                  ) : "No Data" // If the descriptions array returns null, then display "No Data"
                )}
              </View>
            </View>

            {/* Second Horizontal Divider */}
            <Text style={styles.horizonntalDivider2}></Text>

            {/* Fourth section: Acknowledgement */}
            <View>
              <Text style={[styles.benefits_text, { textAlign: "center" }]}>
                {acknowledgement ?? "No Data"}
              </Text>
            </View>

            {/* Third Horizontal Divider */}
            <Text style={styles.horizonntalDivider2}></Text>

            {/* Fifth Section: Agreement */}
            <View style={[{ flexDirection: "row", width: "100%", justifyContent: "space-between" }, styles.text_data]}>

              {/* First Column */}
              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: 9, fontSize: 10 }}>
                  Prepared by:
                </Text>
                <Text style={{ marginBottom: 9, fontSize: 10 }}>
                  Noted by:
                </Text>
                <Text style={{ marginBottom: 9, fontSize: 10 }}>
                  Approved by:
                </Text>
                <Text style={{ marginBottom: 9, fontSize: 10 }}>
                  ePRF No.
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Text style={{ fontSize: 10, marginRight: 14 }}>Nature of Vacancy:</Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
                    <Text style={{ marginLeft: 50 }}>New</Text>
                    <View style={{ backgroundColor: 'black', paddingHorizontal: 8, paddingVertical: 2, marginLeft: 34 }}>
                      <Text style={{ color: 'white', fontSize: 10 }}>⬛</Text>
                    </View>
                  </View>


                  {/* <Text style={{ marginRight: 80, marginLeft: 120 }}>Additional</Text> */}
                  <Text style={{ marginLeft: 150 }}>Additional</Text>
                  <Text style={{ marginLeft: 130 }}> Replacement</Text>

                </View>

              </View>

              {/* Second Column */}
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Text style={{ marginBottom: 9, marginLeft: 26, fontSize: 10 }}>
                  Conforme:
                </Text>
                <Text style={{ marginBottom: 9, marginLeft: 26, fontSize: 10 }}>
                  Date Signed:
                </Text>
                <Text style={{ marginBottom: 9, marginLeft: 26, fontSize: 10 }}>
                  Reporting Date:
                </Text>
                <Text style={{ marginBottom: 0, marginLeft: 26, fontSize: 10 }}>
                  Cost Center:
                </Text>
              </View>
            </View>

          </View>
        </View>
      </Page>
    </Document >
  );
};

export default PDFDocument;
