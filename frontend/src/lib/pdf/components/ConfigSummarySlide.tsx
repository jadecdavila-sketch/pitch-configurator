import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { ConfigurationState } from '../../../types';

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
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f8b50c',
    width: 180,
  },
  value: {
    fontSize: 14,
    color: '#1a1a1a',
    flex: 1,
  },
});

interface ConfigSummarySlideProps {
  config: ConfigurationState;
}

export function ConfigSummarySlide({ config }: ConfigSummarySlideProps) {
  // Format pricing text
  let pricingText = 'Not specified';
  if (config.pricing) {
    if (config.pricing.type === 'fixed') {
      pricingText = `$${config.pricing.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else if (config.pricing.type === 'per-head') {
      pricingText = `$${config.pricing.pricePerHead.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per employee (minimum ${config.pricing.minimumEmployees} employees)`;
    }
  }

  return (
    <Page size={{ width: 960, height: 540 }} style={styles.page}>
      <View>
        <Text style={styles.title}>Configuration Summary</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Client:</Text>
          <Text style={styles.value}>{config.clientName || 'Not specified'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Stage:</Text>
          <Text style={styles.value}>{config.stage?.name || 'Not selected'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Ambition:</Text>
          <Text style={styles.value}>{config.ambition?.name || 'Not selected'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Facilitation:</Text>
          <Text style={styles.value}>{config.facilitation.charAt(0).toUpperCase() + config.facilitation.slice(1)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Modality:</Text>
          <Text style={styles.value}>{config.modality.charAt(0).toUpperCase() + config.modality.slice(1)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Training Recipes:</Text>
          <Text style={styles.value}>{config.recipes.map(r => r.name).join(', ')}</Text>
        </View>

        {config.caseTiles.length > 0 && (
          <View style={styles.row}>
            <Text style={styles.label}>Case Studies:</Text>
            <Text style={styles.value}>{config.caseTiles.map(c => c.title).join(', ')}</Text>
          </View>
        )}

        <View style={styles.row}>
          <Text style={styles.label}>Pricing:</Text>
          <Text style={styles.value}>{pricingText}</Text>
        </View>
      </View>
    </Page>
  );
}
