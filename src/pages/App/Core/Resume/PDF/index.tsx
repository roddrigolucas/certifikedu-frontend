/* eslint-disable jsx-a11y/alt-text */
import { Document, Image, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import {
  employmentTypeOptions,
  getResumeLabel,
  ICertificateResponse,
  IResumeResponse,
  resumeLanguageLevelOptions,
  workModelOptions,
} from '@/services/entities/app/core/resume/model';
import { IProfileData } from '@/services/entities/app/naturalPerson/profile/model';

import { getImageUrl } from '../../../../../utils/image';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  sectionLeft: {
    width: '33%',
    backgroundColor: '#020617',
    color: 'white',
    padding: 10,
    textAlign: 'left',
  },
  sectionRight: {
    width: '67%',
    padding: 20,
  },
  contactHeader: {
    fontSize: 12,
    marginBottom: 10,
    textDecoration: 'underline',
  },
  contactItem: {
    fontSize: 8,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  resumeTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  experienceItem: {
    marginBottom: 5,
  },
  certificateSection: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  qrCode: {
    marginTop: 20,
    width: 80,
    height: 80,
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
  },
  textObservation: {
    fontSize: 6,
    marginBottom: 3,
    color: 'red',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    marginVertical: 10,
  },
});

const getCertificatesLinks = (certificates: ICertificateResponse[]) => {
  return certificates.map((certificate, index) => (
    <Link
      key={index}
      style={styles.text}
      href={`${import.meta.env.VITE_APPLICATION_URL}/certificates/share/${certificate.hash}`}
    >
      {certificate.name}
    </Link>
  ));
};

const certificatesComponent = (certificates: ICertificateResponse[]) => {
  if (certificates.length === 0) {
    return null;
  }

  return (
    <>
      <Text style={styles.certificateSection}>Certificados associados:</Text>
      <Text style={styles.textObservation}>
        * Clique no link para visualizar o certificado ou veja a lista de certificados no final do
        documento
      </Text>
      {getCertificatesLinks(certificates)}
      <View style={styles.horizontalLine} />
    </>
  );
};

const getAllUniqueCertificates = (certificates: ICertificateResponse[]) => {
  const uniqueCertificates = Array.from(
    new Set(certificates.map((cert) => cert.certificateId)),
  ).map((certificateId) => {
    return certificates.find(
      (cert) => cert.certificateId === certificateId,
    ) as ICertificateResponse;
  });

  const sortedCertificates = uniqueCertificates.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <View break style={{ marginTop: 20 }}>
      <Text style={styles.resumeTitle}>Certificados</Text>
      {sortedCertificates.map((certificate, index) => (
        <View
          style={{ marginBottom: 10, marginTop: 10 }}
          key={index}
          break={index % 2 === 0 && index !== 0}
        >
          <Text style={styles.certificateSection}>{certificate.name}</Text>
          <Text style={{ fontSize: 8, marginBottom: 10 }}>
            Data de emissão: {new Date(certificate.createdAt).toLocaleDateString('pt-BR')}
          </Text>
          <Image key={index} src={getImageUrl(certificate.picture)} style={{ marginBottom: 10 }} />
          <View style={styles.horizontalLine} />
        </View>
      ))}
    </View>
  );
};

export const ResumePDF = ({
  resume,
  profileData,
}: {
  resume: IResumeResponse;
  profileData: IProfileData | null;
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Section */}
        <View style={styles.sectionLeft}>
          <Image
            src={getImageUrl('images/logo_text_color_dark.png')}
            style={{ marginBottom: 20 }}
          />
          <Text style={styles.contactHeader}>Contato</Text>
          <Text style={styles.contactItem}>Nome: {profileData?.naturalPerson.name}</Text>
          <Text style={styles.contactItem}>Email: {profileData?.naturalPerson.email}</Text>
          <Text style={styles.contactItem}>Telefone: {profileData?.naturalPerson.phone}</Text>
          {/* Placeholder for QR Code */}
          {/* <Image style={styles.qrCode} src="/path/to/qr-code.png" /> */}
        </View>

        {/* Right Section */}
        <View style={styles.sectionRight}>
          {/* Resume Title */}
          <Text style={styles.resumeTitle}>{profileData?.naturalPerson.name}</Text>
          <Text style={styles.resumeTitle}>{resume.title}</Text>
          <Text style={styles.sectionTitle}>Sobre</Text>
          <Text style={styles.text}>{resume.description || ''}</Text>
          <View style={styles.horizontalLine} />

          {/* Experience Section */}
          {resume.experiences.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Experiência</Text>
              {resume.experiences.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{exp.title}</Text>
                  <Text style={styles.text}>
                    {getResumeLabel(exp.workModel, workModelOptions)}
                  </Text>{' '}
                  -{' '}
                  <Text style={styles.text}>
                    {getResumeLabel(exp.employmentType, employmentTypeOptions)}
                  </Text>
                  <Text style={styles.text}>{exp.companyName}</Text>
                  <Text style={styles.text}>
                    {exp.startMonth}/{exp.startYear} -{' '}
                    {exp.endYear ? `${exp.endMonth}/${exp.endYear}` : 'Presente'}
                  </Text>
                  <Text style={styles.text}>{exp.companyLocation}</Text>
                  <Text style={styles.text}>{exp.description}</Text>
                  {certificatesComponent(exp.certificates)}
                </View>
              ))}
            </>
          )}

          {/* Education Section */}
          {resume.educations.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
              {resume.educations.map((edu, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{edu.title}</Text>
                  <Text style={styles.text}>{edu.institutionName}</Text>
                  <Text style={styles.text}>
                    {edu.startMonth}/{edu.startYear} -{' '}
                    {edu.endYear ? `${edu.endMonth}/${edu.endYear}` : 'Presente'}
                  </Text>
                  <Text style={styles.text}>{edu.institutionLocation}</Text>
                  <Text style={styles.text}>{edu.description}</Text>

                  {certificatesComponent(edu.certificates)}
                </View>
              ))}
            </>
          )}

          {/* Languages Section */}
          {resume.languages.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Idiomas</Text>
              {resume.languages.map((language, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{language.language}</Text>
                  <Text style={styles.text}>
                    {getResumeLabel(language.level, resumeLanguageLevelOptions)}
                  </Text>

                  {certificatesComponent(language.certificates)}
                  <View style={styles.horizontalLine} />
                </View>
              ))}
            </>
          )}

          {/* Certificates Section */}
          {getAllUniqueCertificates([
            ...resume.experiences.flatMap((exp) => exp.certificates),
            ...resume.educations.flatMap((edu) => edu.certificates),
            ...resume.languages.flatMap((lang) => lang.certificates),
          ])}
        </View>
      </Page>
    </Document>
  );
};
