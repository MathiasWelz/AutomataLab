import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { ThemedText } from '../../components/ThemedText';
import { useState } from 'react';
import { useStore } from '../../lib/store';

export default function PracticeScreen() {
  const [dfaName, setDfaName] = useState('');
  const [states, setStates] = useState('');
  const [alphabet, setAlphabet] = useState('');
  const [initialState, setInitialState] = useState('');
  const [acceptStates, setAcceptStates] = useState('');

  const addAutomata = useStore((state) => state.addAutomata);
  const automata = useStore((state) => state.automata);

  const handleCreateDFA = () => {
    if (!dfaName || !states || !alphabet || !initialState) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const stateList = states.split(',').map((s) => s.trim());
    const alphabetList = alphabet.split(',').map((a) => a.trim());
    const acceptStateList = acceptStates.split(',').map((a) => a.trim()).filter((a) => a);

    const dfa = {
      id: Date.now().toString(),
      name: dfaName,
      states: stateList,
      alphabet: alphabetList,
      initialState: initialState.trim(),
      acceptStates: acceptStateList,
    };

    addAutomata(dfa);
    Alert.alert('Success', 'DFA created successfully!');

    // Reset form
    setDfaName('');
    setStates('');
    setAlphabet('');
    setInitialState('');
    setAcceptStates('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>Create a Deterministic Finite Automaton</ThemedText>

        <View style={styles.section}>
          <ThemedText style={styles.label}>DFA Name *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="e.g., Binary Strings"
            value={dfaName}
            onChangeText={setDfaName}
            placeholderTextColor="#999999"
          />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.label}>States (comma-separated) *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="e.g., q0, q1, q2"
            value={states}
            onChangeText={setStates}
            placeholderTextColor="#999999"
          />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.label}>Alphabet (comma-separated) *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="e.g., 0, 1"
            value={alphabet}
            onChangeText={setAlphabet}
            placeholderTextColor="#999999"
          />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.label}>Initial State *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="e.g., q0"
            value={initialState}
            onChangeText={setInitialState}
            placeholderTextColor="#999999"
          />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.label}>Accept States (comma-separated)</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="e.g., q2"
            value={acceptStates}
            onChangeText={setAcceptStates}
            placeholderTextColor="#999999"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCreateDFA}>
          <ThemedText style={styles.buttonText}>Create DFA</ThemedText>
        </TouchableOpacity>

        {automata.length > 0 && (
          <View style={styles.automataList}>
            <ThemedText style={styles.listTitle}>Your Automata ({automata.length})</ThemedText>
            {automata.map((dfa) => (
              <View key={dfa.id} style={styles.automataCard}>
                <ThemedText style={styles.automataName}>{dfa.name}</ThemedText>
                <ThemedText style={styles.automataDetail}>
                  States: {dfa.states.join(', ')}
                </ThemedText>
                <ThemedText style={styles.automataDetail}>
                  Alphabet: {dfa.alphabet.join(', ')}
                </ThemedText>
                <ThemedText style={styles.automataDetail}>
                  Initial: {dfa.initialState}
                </ThemedText>
                <ThemedText style={styles.automataDetail}>
                  Accept: {dfa.acceptStates.join(', ') || 'none'}
                </ThemedText>
              </View>
            ))}
          </View>
        )}
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
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    color: '#000',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#F9F9F9',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  automataList: {
    marginTop: 32,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  automataCard: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#34C759',
  },
  automataName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  automataDetail: {
    fontSize: 13,
    color: '#333333',
    marginBottom: 4,
    lineHeight: 18,
  },
});
