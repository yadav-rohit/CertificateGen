"use client";
import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import "./CertificateGenerator.css";
import logo from "./hailabs_logo.svg";
import nunito from "./fonts/Nunito.ttf"
// Register the font families



Font.register({
  family: "Nunito",
  src: './fonts/Nunito_all.ttf',
  fontWeight: 800,
});
Font.register({
  family: "Nunitobold",
  src: './fonts/Nunito_bold.ttf',
  fontWeight: 800,
});
Font.register({
  family: "Nunitosbold",
  src: './fonts/NunitoSemiBold.ttf',
  fontWeight: 800,
});

interface CertificateData {
  candidate: string;
  Achievement: string;
  Author: string;
  Date: string;
  Signature: File | string;
  Authority: string;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
    padding: "2cm",
  },
  section: {
    marginBottom: "1cm",
  },
});



// Main component for the certificate generator
const CertificateGenerator: React.FC = () => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      // backgroundColor: '#ffffff',
      // padding: '2cm',
    },
    section: {
      // marginBottom: '1cm',
      flex: 1,
      // justifyContent: 'center',
      alignItems: "center",
    },
    title: {
      fontFamily: "Times-Roman",
      fontSize: "46pt",
      color: "#3D3D3D",
      fontWeight: "extrabold",
      marginBottom: "2.2cm",
    },
    subtitle: {
      fontSize: "18pt",
      marginBottom: "1cm",
      marginTop: "0.2cm",
      color: "grey",
      // fontFamily: 'Pacifico',
    },

    underline: {
      textDecoration: "underline",
      textDecorationColor: "#FAA51F",
      // textDecorationStyle: "solid 2px", // Disable default underline
      // textUnderlineOffset: "2cm",
      color: "#575353",
      fontSize: "22pt",
      fontWeight: "extrabold",
      fontFamily: 'Nunitosbold',
      // fontWeight: "extrabold",
    },
    text: {
      fontFamily: "Times-Roman",
      fontSize: "28pt",
      marginBottom: "0.2cm",
    },
    date: {
      fontFamily: "Times-Roman",
      fontSize: "28pt",
      marginBottom: "0.2cm",
      color: "#3D3D3D",
    },
  });

  const [name, setName] = useState("");
  const [achievement, setAchievement] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [signature, setSignature] = useState("");
  const [background, setBackground] = useState<File | null>(null);
  const [authority, setAuthority] = useState("Manager");
  const [Provider, setProvider] = useState<File | null>(null);
  const [certificateData, setCertificateData] = useState<CertificateData>({
    candidate: "",
    Achievement: "",
    Author: "",
    Date: "",
    Signature: "",
    Authority: "",
  });

  const creator = process.env.NEXT_PUBLIC_CREATOR;
  const author_pdf = process.env.NEXT_PUBLIC_AUTHOR;

  const updateCertificate = (
    name: string,
    achievement: string,
    author: string,
    date: string,
    signature: string,
    authority: string
  ) => {
    setCertificateData((prevData) => ({
      candidate: name,
      Achievement: achievement,
      Author: author,
      Date: date,
      Signature: selectedImage
        ? URL.createObjectURL(selectedImage)
        : "no signature",
      Authority: authority,
    }));
    // console.log(creator , author_pdf)
  };

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // Handle image selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleBackgroundSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBackground(e.target.files[0]);
    }
  };

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleAchievementChange = (event: any) => {
    setAchievement(event.target.value);
  };

  const generateCertificate = () => {
    // Logic to generate the certificate
  };

  return (
    <section className="Certificate_gen ">
      <aside className="Certificate_gen_setup">
        <h1
          style={{
            marginBlock: "1em",
            fontFamily: "monospace",
            fontSize: "1.5em",
            letterSpacing: "1px",
            color: "white",
            fontWeight: "700",
          }}
        >
          SETUP
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateCertificate(
              name,
              achievement,
              author,
              date,
              signature,
              authority
            );
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="Certificate_gen_inputs">
            <label>
              Name :{" "}
              <input
                type="text"
                placeholder="Name"
                onChange={handleNameChange}
              ></input>
            </label>
            <label>
              Level :{" "}
              <input
                type="number"
                placeholder="Achievment"
                onChange={handleAchievementChange}
              ></input>
            </label>
            {/* <label>
              Author :{" "}
              <input
                type="text"
                placeholder="Author"
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
              ></input>
            </label>
            <label>
              Date :{" "}
              <input
                type="date"
                placeholder="Date"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              ></input>
            </label>
            <label>
              Sign:{" "}
              <input
                type="file"
                accept="image/*"
                alt="signature"
                placeholder="Signature"
                onChange={handleImageSelect}
              ></input>
            </label>
            <label>
              Background:{" "}
              <input
                type="file"
                accept="image/*"
                alt="background"
                placeholder="background"
                onChange={handleBackgroundSelect}
              ></input>
            </label>
            <label>
              Company:{" "}
              <input
                type="file"
                accept="image/*"
                alt="Comapny"
                placeholder="Company"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setProvider(e.target.files[0]);
                  }
                }}
              ></input>
            </label> */}
            <label>
              Topic :{" "}
              <input
                type="text"
                placeholder="Authority"
                onChange={(e) => {
                  setAuthority(e.target.value);
                }}
              ></input>
            </label>
          </div>
          <button className="Certificate_gen_button" type="submit">
            Generate
          </button>
        </form>
      </aside>
      <div className="Certificate_gen_preview">
        {certificateData.candidate && certificateData.Achievement && (
          <PDFViewer width="100%" height="100%" className="pdf_viewer">
            <Document author={author_pdf} creator={creator}>
              <Page size="A4" style={styles.page} orientation="landscape">
                <View style={styles.section}>
                  <Image
                    style={{
                      width: "100.25%",
                      height: "100.25%",
                      position: "absolute",
                      left: "0%",
                      bottom: "0%",
                    }}
                    src={
                      background ? URL.createObjectURL(background) : "./bg.png"
                    }
                  ></Image>
                  <div style={{ height: "4cm" }}></div>
                  <Image
                    style={{
                      width: "3cm",
                      height: "3cm",
                      position: "absolute",
                      left: "2%",
                      top: "2%",
                      // boxShadow: "0px 12px 24px -12px rgba(0, 0, 0, 0.5)",
                    }}
                    src="./bigwin.png"
                  ></Image>
                  <Text
                    style={{
                      padding: "0.4cm",
                      borderRadius: "5px",
                      position: "absolute",
                      left: "48%",
                      transform: "translate(-100%)",
                      backgroundColor: "#A6DA63",
                      color: "white",
                      fontSize: "30pt",
                      fontFamily: "Nunitobold",
                      fontWeight: "extrabold",
                      top: "5%",
                      //  fontFamily: "monospace",
                    }}
                  >
                    Congratulations
                  </Text>
                  <Text
                    style={{
                      fontSize: "24pt",
                      color: "#FAA51F",
                      fontFamily: "Nunitobold",
                      fontWeight: "ultrabold",
                      marginLeft: "2.5cm",
                      marginBottom: "2.2cm",
                    }}
                  >
                    Level Completion Certificate
                  </Text>
                  <Text
                    style={{
                      // fontFamily: "Times-Roman",
                      color: "#575353",
                      fontSize: "22pt",
                      marginBottom: "0.2cm",
                      // width: '70%',
                      width: "100%",
                      paddingVertical: "1cm",
                      paddingHorizontal: "15%",
                      lineHeight: "2.5",
                      fontWeight: "bold",
                      letterSpacing: "1px",
                      textAlign: "center",
                      backgroundColor: "#5780B521",
                    }}
                  >
                    This is to certify that{" "}
                    <Text style={styles.underline}>
                      {certificateData.candidate}
                    </Text>{" "}
                    completed level{" "}
                    <Text style={styles.underline}>
                      {certificateData.Achievement}
                    </Text>
                    {"\n"} and gained practicle insight on{" "}
                    <Text style={{
                         textDecoration: "underline",
                         textDecorationColor: "#FAA51F",
                         textDecorationStyle: "solid 2px", // Disable default underline
                        //  textUnderlineOffset: "2cm",
                         color: "#575353",
                         fontSize: "22pt",
                         fontWeight: "light",
                         fontFamily: 'Nunitobold',
                    }}>{authority}</Text>{" "}
                  </Text>
                  {/* <Text style={styles.subtitle}>Name</Text> */}

                  <Image
                    style={{
                      width: "2.5cm",
                      height: "2.5cm",
                      position: "absolute",
                      left: "55%",
                      bottom: "15%",
                      // boxShadow: "0px 12px 24px -12px rgba(0, 0, 0, 0.5)",
                    }}
                    src="./star.png"
                  ></Image>
                  <Image
                    style={{
                      width: "4cm",
                      height: "4cm",
                      position: "absolute",
                      left: "75%",
                      bottom: "12%",
                      // boxShadow: "0px 12px 24px -12px rgba(0, 0, 0, 0.5)",
                    }}
                    src="./stem.png"
                  ></Image>
                  <Image
                    // alt="provider"
                    style={{
                      width: "8cm",
                      height: "3cm",
                      position: "absolute",
                      left: "20%",
                      bottom: "15%",
                      // boxShadow: "0px 12px 24px -12px rgba(0, 0, 0, 0.5)",
                    }}
                    src={
                      Provider ? URL.createObjectURL(Provider) : "./hailabs.png"
                    }
                  ></Image>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        )}
      </div>
    </section>
  );
};

export default CertificateGenerator;
