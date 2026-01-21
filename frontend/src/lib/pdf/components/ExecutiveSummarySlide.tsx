import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 30,
    borderBottom: '3px solid #f8b50c',
    paddingBottom: 15,
  },
  content: {
    fontSize: 13,
    color: '#1a1a1a',
    lineHeight: 1.6,
  },
});

interface ExecutiveSummarySlideProps {
  content: string;
}

export function ExecutiveSummarySlide({ content }: ExecutiveSummarySlideProps) {
  return (
    <Page size={{ width: 960, height: 540 }} style={styles.page}>
      <View>
        <Text style={styles.title}>Executive Summary</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </Page>
  );
}
