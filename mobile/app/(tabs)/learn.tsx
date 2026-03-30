import { StyleSheet, View, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api';

interface Lesson {
  id: string;
  title: string;
  body: string;
}

export default function LearnScreen() {
  const { data: lessons, isLoading, error } = useQuery({
    queryKey: ['lessons'],
    queryFn: async () => {
      const response = await apiClient.get('/api/lessons');
      return response.data.lessons || [];
    },
  });

  const defaultLessons: Lesson[] = [
    {
      id: '1',
      title: 'Introduction to Finite Automata',
      body: 'Learn the basics of deterministic finite automata (DFA) and nondeterministic finite automata (NFA).',
    },
    {
      id: '2',
      title: 'Regular Languages',
      body: 'Understand regular languages and their properties as defined by Linz.',
    },
    {
      id: '3',
      title: 'Context-Free Grammars',
      body: 'Explore context-free grammars, parse trees, and derivations.',
    },
    {
      id: '4',
      title: 'Pushdown Automata',
      body: 'Learn how pushdown automata recognize context-free languages.',
    },
    {
      id: '5',
      title: 'Turing Machines',
      body: 'Discover Turing machines and their role in computability theory.',
    },
    {
      id: '6',
      title: 'Recursively Enumerable Languages',
      body: 'Understand languages that can be recognized by Turing machines.',
    },
  ];

  const renderLesson = ({ item }: { item: Lesson }) => (
    <View style={styles.lessonCard}>
      <ThemedText style={styles.lessonTitle}>{item.title}</ThemedText>
      <ThemedText style={styles.lessonBody}>{item.body}</ThemedText>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const lessonList = (lessons && lessons.length > 0) ? lessons : defaultLessons;

  return (
    <View style={styles.container}>
      <FlatList
        data={lessonList}
        renderItem={renderLesson}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    padding: 16,
  },
  lessonCard: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  lessonBody: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 21,
  },
});
