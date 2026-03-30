import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { ThemedText } from '../../components/ThemedText';
import { useStore } from '../../lib/store';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ProfileScreen() {
  const automata = useStore((state) => state.automata);
  const clearAutomata = useStore((state) => state.clearAutomata);

  const handleClear = () => {
    clearAutomata();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <FontAwesome name="user-circle" size={64} color="#007AFF" />
          </View>
          <ThemedText style={styles.username}>Student</ThemedText>
          <ThemedText style={styles.email}>learning@automatalab.com</ThemedText>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <ThemedText style={styles.statNumber}>{automata.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Automata Created</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statNumber}>0</ThemedText>
            <ThemedText style={styles.statLabel}>Lessons Completed</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statNumber}>0</ThemedText>
            <ThemedText style={styles.statLabel}>Test Passed</ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Recent Automata</ThemedText>
          {automata.length > 0 ? (
            automata.slice(-3).map((dfa) => (
              <View key={dfa.id} style={styles.automataItem}>
                <FontAwesome name="cog" size={16} color="#007AFF" />
                <ThemedText style={styles.automataItemText}>{dfa.name}</ThemedText>
              </View>
            ))
          ) : (
            <ThemedText style={styles.emptyText}>No automata created yet</ThemedText>
          )}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Progress</ThemedText>
          <View style={styles.progressItem}>
            <ThemedText style={styles.progressLabel}>Formal Languages</ThemedText>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '40%' }]} />
            </View>
            <ThemedText style={styles.progressPercent}>40%</ThemedText>
          </View>
          <View style={styles.progressItem}>
            <ThemedText style={styles.progressLabel}>Automata Theory</ThemedText>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '25%' }]} />
            </View>
            <ThemedText style={styles.progressPercent}>25%</ThemedText>
          </View>
          <View style={styles.progressItem}>
            <ThemedText style={styles.progressLabel}>Computability</ThemedText>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '10%' }]} />
            </View>
            <ThemedText style={styles.progressPercent}>10%</ThemedText>
          </View>
        </View>

        <TouchableOpacity style={styles.dangerButton} onPress={handleClear}>
          <FontAwesome name="trash" size={16} color="#FFFFFF" />
          <ThemedText style={styles.dangerButtonText}>Clear All Automata</ThemedText>
        </TouchableOpacity>

        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>AutomataLab v1.0.0</ThemedText>
          <ThemedText style={styles.footerText}>Based on Peter Linz's Textbook</ThemedText>
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
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
  },
  avatar: {
    marginBottom: 12,
  },
  username: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#999999',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  automataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 8,
  },
  automataItemText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 10,
    flex: 1,
  },
  emptyText: {
    fontSize: 14,
    color: '#999999',
    fontStyle: 'italic',
  },
  progressItem: {
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  progressPercent: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'right',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 24,
  },
  dangerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
});
