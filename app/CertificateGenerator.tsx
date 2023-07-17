"use client"
import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image, PDFViewer, Font } from '@react-pdf/renderer';
import './CertificateGenerator.css';
import logo from './hailabs_logo.svg';


// Register the font families

Font.register({
  family: 'Pacifico',
  src: 'https://fonts.gstatic.com/s/pacifico/v17/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.ttf',
});
  

  Font.registerHyphenationCallback(word => [word]); // Optional: For hyphenation support
  Font.registerEmojiSource({
    format: 'png',
    url: 'https://twemoji.maxcdn.com/v/latest/72x72/',
  });
  Font.registerEmojiSource({
    format: 'svg',
    url: 'https://twemoji.maxcdn.com/v/latest/svg/',
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
        backgroundColor: 'white',
        color: 'black',
        padding: '2cm',
      },
      section: {
        marginBottom: '1cm',
      },
   
  });

// Main component for the certificate generator
const CertificateGenerator: React.FC = () => {
    
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      // backgroundColor: '#ffffff',
      // padding: '2cm',
    },
    section: {
      // marginBottom: '1cm',
      flex: 1,
      // justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontFamily: 'Times-Roman',
      fontSize: '46pt',
      color: '#3D3D3D',
      fontWeight: 'extrabold',
      marginBottom: '2.2cm',
    },
    subtitle: {
      fontSize: '18pt',
      marginBottom: '1cm',
      marginTop: '0.2cm',
      color: 'grey',
      // fontFamily: 'Pacifico',
    },
    text: {
      fontFamily: 'Times-Roman',
      fontSize: '28pt',
      marginBottom: '0.2cm',
    },
    date: {
      fontFamily: 'Times-Roman',
      fontSize: '28pt',
      marginBottom: '0.2cm',
      color: '#3D3D3D',
    }
  });

   
  
    const [name, setName] = useState('');
    const [achievement, setAchievement] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [signature, setSignature] = useState('');
    const [background , setBackground] = useState<File | null>(null);
    const [authority, setAuthority] = useState('Manager');
   const [Provider , setProvider] = useState<File | null>(null);
    const [certificateData, setCertificateData] = useState<CertificateData>({
      candidate: '',
      Achievement: '',
      Author: '',
      Date: '',
      Signature: '',
      Authority: '',
    });


        const creator = process.env.NEXT_PUBLIC_CREATOR ;
    const author_pdf = process.env.NEXT_PUBLIC_AUTHOR ;


    const updateCertificate = (name: string , achievement: string , author:string , date: string , signature: string , authority: string) => {
      setCertificateData(prevData => ({
        candidate: name,
        Achievement: achievement,
        Author: author,
        Date: date,
        Signature: selectedImage ? URL.createObjectURL(selectedImage) : 'no signature',
        Authority: authority ,
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
      }};

    const handleNameChange = (event) => {
      setName(event.target.value);
    };
  
    const handleAchievementChange = (event) => {
      setAchievement(event.target.value);
    };
  
    const generateCertificate = () => {
     
      // Logic to generate the certificate
    };   

    return(
  <section className='Certificate_gen'>
    <aside className='Certificate_gen_setup'>
        <h1 style={{ marginBlock: '1em' , fontFamily: 'monospace' , fontSize: '1.5em' , letterSpacing: '1px' , color: 'white' , fontWeight: '700'}} >SETUP</h1>
        <form onSubmit={
          (e) => {
            e.preventDefault();
            updateCertificate(name , achievement , author , date , signature , authority);
          }
        } style={{display: 'flex' , flexDirection: 'column' , justifyContent: 'space-between' , width: '100%' , height: '100%'}}>
        <div className='Certificate_gen_inputs'>
        <label>Name : <input type='text' placeholder='Name' onChange={handleNameChange}></input></label>
        <label>Achievment : <input type='text' placeholder='Achievment' onChange={handleAchievementChange}></input></label>
        <label>Author : <input type='text' placeholder='Author' onChange={
          (e) => {
            setAuthor(e.target.value);
          }
        }></input></label>
        <label>Date : <input type='date' placeholder='Date' onChange={
          (e) => {
            setDate(e.target.value);
          }
        }></input></label>
        <label>Sign: <input type='file' accept='image/*' alt='signature' placeholder='Signature'
        onChange={handleImageSelect}></input></label>
        <label>Background: <input type='file' accept='image/*' alt='background' placeholder='background'
        onChange={handleBackgroundSelect}></input></label>
        <label>Company: <input type='file' accept='image/*' alt='Comapny' placeholder='Company'
        onChange={
          (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
              setProvider(e.target.files[0]);
            }}
        }></input></label>
        <label>Authority : <input type='text' placeholder='Authority'
        onChange={
          (e) => {
            setAuthority(e.target.value);
          }
        }
        ></input></label>
        </div>
        <button className='Certificate_gen_button' type='submit'>Generate</button>
        </form>
    </aside>
    <div className='Certificate_gen_preview'>

        {certificateData.candidate && certificateData.Achievement && (
          <PDFViewer width="100%" height="100%" className='pdf_viewer'>
            <Document author={author_pdf} creator={creator}>
              <Page size="A4" style={styles.page} orientation='landscape'>
                <View style={styles.section}>
                <Image style={{width: '100%' , height: '100%' , position: 'absolute' , left: '0%' , bottom: '0%'}} src={background?URL.createObjectURL(background):"./bg.png"}></Image>
                <div style={{height: '4cm'}}></div>
                <Text style={styles.text}>{certificateData.candidate}</Text>
                 <hr style={{width: '22%' , height: '1px' , backgroundColor: 'black' }}></hr>
                <Text style={styles.subtitle}>Name</Text>
                  <Text style={styles.title}>{certificateData.Achievement}</Text>
                  <div style={{display: 'flex' , width: '80%', padding: '0.3cm' , flexDirection: 'row' , justifyContent: 'space-between' , alignItems:'center'}}>
                    <div style={{display: 'flex' , flexDirection: 'column' , width: '50%' , justifyContent:  'center' , alignItems:'center'}}>
                  {/* <Text style={styles.text}>{certificateData.Signature}</Text> */}
                  <Image style={{width: '3.7cm' , height: '1.5cm' , boxShadow: '0px 12px 24px -12px rgba(0, 0, 0, 0.5)'}} src={certificateData.Signature}></Image>
                 <hr style={{width: '50%' , height: '1px' , backgroundColor: 'black' }}></hr>
                <Text style={{
                  fontSize: '14pt',
                  marginBottom: '1cm',
                  marginTop: '0.2cm',
                  color: 'grey',
                }}>{authority}</Text>
                </div>
                <div style={{display: 'flex' , flexDirection: 'column' , width: '50%' , justifyContent:  'center' , alignItems:'center'}}>
                  <Text style={styles.date}>{certificateData.Date}</Text>
                 <hr style={{width: '50%' , height: '1px' , backgroundColor: 'black' }}></hr>
                <Text style={styles.subtitle}>Date</Text>
                </div>
                </div>
                <Image style={{width: '3.5cm' , height: '5cm' , position: 'absolute' , left: '50%' , bottom: '1%' , boxShadow: '0px 12px 24px -12px rgba(0, 0, 0, 0.5)'}} src="./badge.png"></Image>
                <Image style={{width: '7cm' , height: '1.8cm' , position: 'absolute' , left: '4%' , bottom: '7%' , boxShadow: '0px 12px 24px -12px rgba(0, 0, 0, 0.5)'}} src={Provider? URL.createObjectURL(Provider) :"./hlabwhite.png"}></Image>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        )}
     
        </div>
        
  </section>
)};

export default CertificateGenerator;
