import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import header from '@src/assets/intellismart-header.png';
// import PoppinsRegular from '@shared/assets/fonts/Poppins/Poppins-regular.ttf';
// import PoppinsBold from '@shared/assets/fonts/Poppins/Poppins-Bold.ttf'\
import PoppinsBold from "@shared/assets/fonts/Poppins/Poppins-Bold.ttf"
import { PDFProps } from "@modules/Offers/types"

// Register the Poppins font
Font.register({
  family: 'Poppins',
  fonts: [
    // { src: PoppinsRegular, fontWeight: 'normal' }, // Regular weight
    { src: PoppinsBold, fontWeight: 'bold' }, // Regular weight
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
  image: {
    width: 207,
    height: 30,
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
    fontSize: 11,
    fontFamily: 'Poppins',
    fontWeight: 'normal',
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
});





// Create Document Component
const PDFDocument: React.FC<Partial<PDFProps>> = ({
  Applicant_Name,               
  Position,
  Department,
  Remarks,
  Note_Salary,
  Salary_Monthly,
  Salary_Yearly,
  Merit_Increase,
  Description_SL,
  Description_VL,
  Description_BL,       // Importing props from MyDocumentProps interface
  Description_Transpo,
  Benefit_Paternity,
  Benefit_Maternity,
  Acknowledgement,
}) => {

  const descriptions = [ // This array will be used later for mapping the type of Leave and Benefit of the user.
    { label: 'Vacation Leave', value: Description_VL },
    { label: 'Sick Leave', value: Description_SL },
    { label: 'Bereavement Leave', value: Description_BL },
    {
      label: 'Maternity/Paternity Leave', value: {
        Benefit_Paternity, Benefit_Maternity
      },
    },
    { label: 'Transportation Subsidy', value: Description_Transpo },
  ];

  return (
    <Document>
      <Page size="LEGAL" style={styles.page}>
        <View style={styles.section}>

          {/* Intellismart PNG header*/}
          <Image src={header} style={styles.image} />
          <Text style={styles.intellismart_png}>{"strictly confidential".toUpperCase()}</Text>

          {/* Horizontal Divider */}
          <Text style={styles.horizonntalDivider1}></Text>

          {/* First section: Name, Position, Department, Status */}
          <View style={styles.section}>
            {/* Name */}
            <View style={{ flexDirection: 'row', width: '70%' }}>
              <Text style={[styles.text_title, { flex: 2 }]}>Name</Text>
              <Text style={[styles.text_title, { flex: 0.3 }]}>:</Text>
              <Text style={[styles.text_data, { flex: 3 }]}>{Applicant_Name ?? "No Data"}</Text>
            </View>

            {/* Position and Rank */}
            <View style={{ flexDirection: 'row', width: '70%' }}>
              <Text style={[styles.text_title, { flex: 2 }]}>Position and Rank</Text>
              <Text style={[styles.text_title, { flex: 0.3 }]}>:</Text>
              <Text style={[styles.text_data, { flex: 3 }]}>{Position ?? "No Data"}</Text>
            </View>

            {/* Department/Division */}
            <View style={{ flexDirection: 'row', width: '70%' }}>
              <Text style={[styles.text_title, { flex: 2 }]}>Department/Division</Text>
              <Text style={[styles.text_title, { flex: 0.3 }]}>:</Text>
              <Text style={[styles.text_data, { flex: 3 }]}>{Department ?? "No Data"}</Text>
            </View>

            {/* Status Upon Hiring */}
            <View style={{ flexDirection: 'row', width: '70%' }}>
              <Text style={[styles.text_title, { flex: 2 }]}>Status Upon Hiring</Text>
              <Text style={[styles.text_title, { flex: 0.3 }]}>:</Text>
              <Text style={[styles.text_data, { flex: 3 }]}>{Remarks ?? "No Data"}</Text>
            </View>

            {/* Second Section: Salary  & Merits */}
            <View style={{ paddingTop: 6 }}>
              <Text style={styles.text_title}>
                Salary {"\n"} <Text style={styles.salary_note}>{Note_Salary ?? "No Data"}</Text>
              </Text>

              {/* Actual Salary */}
              <View style={{ flexDirection: 'row', gap: 100, paddingTop: 6 }}>
                {/* Monthly */}
                <Text style={styles.text_title}>
                  Salary (Monthly) {"\n"}
                  <Text style={styles.actual_salary}>{Salary_Monthly ?? "No Data"}</Text>
                </Text>

                {/* Annual */}
                <Text style={styles.text_title}>
                  Salary (Annual) {"\n"}
                  <Text style={styles.actual_salary}>{Salary_Yearly ?? "No Data"}</Text>
                </Text>
              </View>

              {/* Merit Increase */}
              <View style={{ paddingTop: 6 }}>
                <Text style={styles.text_title}>
                  Merit Increase {"\n"}
                  <Text style={styles.salary_note}>{Merit_Increase ?? "No Data"}</Text>
                </Text>
              </View>
            </View>

            {/* Third section: Benefits */}
            <View style={{ width: '100%', marginTop: 12 }}>

              {/* Header Row */}
              <View style={{ flexDirection: 'row', width: '100%', marginBottom: 1, alignItems: 'center' }}>
                <Text style={[styles.text_title, { flex: 4, fontWeight: 'bold' }]}>Benefits</Text>
                <Text style={[styles.text_title, { flex: 9, fontWeight: 'bold' }]}>Description</Text>
              </View>

              <View>
                {descriptions.map((description, index) => // Mapping through the array of Benefits based on key-value pair.
                  description.value ? (
                    // Ternary operation is used here so that future programmers won't be confused by nested if-else statements or nested IIFE.
                    // Also, it's more cleaner and readable.

                    <View key={index} style={{ flexDirection: 'row', width: '100%', marginBottom: 3 }}>

                      {/* Label */}
                      <Text style={[styles.benefits_label, { flex: 3 }]}>{description.label}</Text>
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
                                    Maternity Leave Benefit
                                  </Text>
                                  <Text style={[styles.benefits_label, { flex: 5, fontWeight: 'bold', textAlign: 'left' }]}>
                                    Paternity Leave Benefit
                                  </Text>
                                </View>

                                {/* Details: Maternity & Paternity Leave */}
                                <View style={{ flexDirection: 'row', paddingBottom: 10 }}>

                                  {/* Maternity Leave Details */}
                                  <View style={{ flex: 8 }}>
                                    {description.value.Benefit_Maternity?.split("\n").map((line, idx) => (
                                      <Text key={idx} style={styles.leave_text}>{line}</Text>
                                    ))}
                                  </View>

                                  {/* Paternity Leave Details */}
                                  <View style={{ flex: 5 }}>
                                    <Text style={styles.benefits_text}>{description.value.Benefit_Paternity}</Text>
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
                {Acknowledgement ?? "No Data"}
              </Text>
            </View>

            {/* Third Horizontal Divider */}
            <Text style={styles.horizonntalDivider2}></Text>

            {/* Fifth Section: Agreement */}
            <View style={[{ flexDirection: "row", width: "100%", justifyContent: "space-between" }, styles.text_data]}>

              {/* First Column */}
              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: 28, fontSize: 10 }}>
                  Prepared by:
                </Text>
                <Text style={{ marginBottom: 28, fontSize: 10 }}>
                  Noted by:
                </Text>
                <Text style={{ marginBottom: 28, fontSize: 10 }}>
                  Approved by:
                </Text>
                <Text style={{ marginBottom: 28, fontSize: 10 }}>
                  Nature of Vacancy:
                </Text>
                <Text style={{ marginBottom: 0, fontSize: 10 }}>
                  ePRF No.
                </Text>
              </View>

              {/* Second Column */}
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Text style={{ marginBottom: 28, marginLeft: 26, fontSize: 10 }}>
                  Conforme:
                </Text>
                <Text style={{ marginBottom: 28, marginLeft: 26, fontSize: 10 }}>
                  Date Signed:
                </Text>
                <Text style={{ marginBottom: 70, marginLeft: 26, fontSize: 10 }}>
                  Date Signed:
                </Text>
                <Text style={{ marginBottom: 0, marginLeft: 26, fontSize: 10 }}>
                  Cost Center:
                </Text>
              </View>
            </View>

          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
