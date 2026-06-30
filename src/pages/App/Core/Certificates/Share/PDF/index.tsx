/* eslint-disable jsx-a11y/alt-text */
import { Key } from 'react';

import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  // Wrapper to hold image and text together
  pageContent: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  certificateImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  // Styles for the text overlay on the back
  backContent: {
    marginHorizontal: 40,
    marginTop: 80, // Adjust based on your image design
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    marginBottom: 20,
    color: '#333',
    lineHeight: 1.5,
  },
  ability: {
    fontSize: 12,
    marginBottom: 5,
    color: '#333',
    lineHeight: 1.5,
  },
  category: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
    lineHeight: 1.5,
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    fontSize: 12,
  },
  certificateCodeStyle: {
    fontSize: 10,
    position: 'absolute',
    bottom: 10,
    right: 10,
    color: '#555',
  },
});

interface CertificatePDFProps {
  certificateImageUrl: string;
  certificateCode: string;
  inverseImageUrl?: string;
  description?: string;
  hoursWorkload?: number;
  dataAbilities?: any;
}

const BULLET = '\u2022';

const CertificatePDF = ({
  certificateImageUrl,
  certificateCode,
  inverseImageUrl,
  description,
  hoursWorkload,
  dataAbilities,
}: CertificatePDFProps) => {
  const convertHoursToHHMM = (decimalHours: number) => {
    const hours = Math.floor(decimalHours);
    const decimalPart = decimalHours - hours;

    const minutes = Math.round(decimalPart * 60);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  };

  return (
    <Document>
      {/* PAGE 1: FRONT */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.pageContent}>
          <Image src={certificateImageUrl} style={styles.certificateImage} />
          <Text style={styles.certificateCodeStyle}>Código de validação: {certificateCode}</Text>
        </View>
      </Page>

      {/* PAGE 2: BACK (Only renders if inverseImageUrl exists) */}
      {inverseImageUrl && (
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.pageContent}>
            {/* The Back Image (Background) */}
            <Image src={inverseImageUrl} style={styles.certificateImage} />

            {/* Content Overlay - Adjust styles.backContent to position text correctly */}
            <View style={styles.backContent}>
              {dataAbilities && dataAbilities.length > 0 && (
                <View>
                  <Text style={styles.title}>Competências/Habilidades</Text>

                  {dataAbilities.map(
                    (abilitie: { ability: string }, index: Key | null | undefined) => {
                      const abilityItems = abilitie.ability.split('\n');

                      const limitedAbilityItems = abilityItems.slice(0, 7);

                      return (
                        <View key={index} style={{ marginBottom: 10 }}>
                          {limitedAbilityItems.map((item, i) => (
                            <View
                              key={i}
                              style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15 }}
                            >
                              <Text
                                style={{
                                  ...styles.ability,
                                  width: 15,
                                  lineHeight: styles.ability.lineHeight,
                                }}
                              >
                                {BULLET}
                              </Text>

                              <Text style={{ ...styles.ability, flexGrow: 1, paddingRight: 5 }}>
                                {item.trim()}
                              </Text>
                            </View>
                          ))}
                        </View>
                      );
                    },
                  )}
                </View>
              )}

              {description && (
                <View>
                  <Text style={styles.title}>Conteúdo Programático / Descrição</Text>
                  <Text style={styles.description}>{description}</Text>
                </View>
              )}

              {hoursWorkload !== undefined && hoursWorkload > 0 && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Carga Horária:</Text>
                  <Text style={styles.value}>{convertHoursToHHMM(hoursWorkload)} horas</Text>
                </View>
              )}
            </View>

            <Text style={styles.certificateCodeStyle}>Código de validação: {certificateCode}</Text>
          </View>
        </Page>
      )}
    </Document>
  );
};

export default CertificatePDF;
