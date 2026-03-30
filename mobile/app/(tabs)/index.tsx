import { StyleSheet, View, ScrollView } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api';

export default function HomeScreen() {
  const { data: healthData, isLoading, error } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const response = await apiClient.get('/api/health');
      return response.data;
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>Welcome to AutomataLab</ThemedText>
        <ThemedText style={styles.subtitle}>
          Learn formal languages and automata theory based on Peter Linz's textbook
        </ThemedText>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>What You'll Learn</ThemedText>
          <ThemedText style={styles.sectionContent}>
            • Deterministic Finite Automata (DFA){'\n'}
            • Nondeterministic Finite Automata (NFA){'\n'}
            • Regular Languages{'\n'}
            • Context-Free Grammars{'\n'}
            • Pushdown Automata{'\n'}
            • Turing Machines
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Backend Status</ThemedText>
          {isLoading ? (
            <ThemedText style={styles.sectionContent}>Checking connection...</ThemedText>
          ) : error ? (
            <ThemedText style={[styles.sectionContent, styles.error]}>
              Connection Error: Backend unavailable
            </ThemedText>
          ) : (
            <ThemedText style={[styles.sectionContent, styles.success]}>
              ✓ Backend Connected ({healthData?.version})
            </ThemedText>
          )}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Getting Started</ThemedText>
          <ThemedText style={styles.sectionContent}>
            1. Start with the Learn tab to review automata theory fundamentals{'\n'}
            2. Use the Practice tab to build and test your own automata{'\n'}
            3. Track your progress in your Profile
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  sectionContent: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 22,
  },
  success: {
    color: '#34C759',
  },
  error: {
    color: '#FF3B30',
  },
});
