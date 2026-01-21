import { Page, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

interface TemplateSlideProps {
  imagePath: string;
}

export function TemplateSlide({ imagePath }: TemplateSlideProps) {
  return (
    <Page size={{ width: 960, height: 540 }} style={styles.page}>
      <Image src={imagePath} style={styles.image} />
    </Page>
  );
}
