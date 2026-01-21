import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { COVER_SLIDE_IMAGE } from '../slideMapping';

const styles = StyleSheet.create({
  page: {
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 60,
    left: 40,
    right: 40,
  },
  clientText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8b50c', // Gold
    textAlign: 'center',
  },
});

interface CoverSlideProps {
  clientName?: string;
}

export function CoverSlide({ clientName }: CoverSlideProps) {
  return (
    <Page size={{ width: 960, height: 540 }} style={styles.page}>
      <Image src={COVER_SLIDE_IMAGE} style={styles.backgroundImage} />
      {clientName && (
        <View style={styles.overlay}>
          <Text style={styles.clientText}>Prepared for: {clientName}</Text>
        </View>
      )}
    </Page>
  );
}
