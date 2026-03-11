import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Keyboard, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { db } from '../firebaseConfig'; 
import { collection, addDoc, serverTimestamp, query, onSnapshot, orderBy, deleteDoc, doc } from "firebase/firestore";
import { COLORS } from '../theme/colors';
import { UserContext } from '../context/UserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function FirebaseScreen() {
  //userName тут завжди актуальний з профілю
  const { userName, userId } = useContext(UserContext);
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    try {
      const q = query(collection(db, "wishlist"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const taskList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTasks(taskList);
      });
      return () => unsubscribe();
    } catch (e) {
      console.error("Помилка підключення:", e);
    }
  }, []);

  const saveToFirebase = async () => {
    if (!title.trim()) return;
    try {
      await addDoc(collection(db, "wishlist"), {
        title: title,
        authorName: userName,
        authorId: userId,
        createdAt: serverTimestamp()
      });
      setTitle('');
      Keyboard.dismiss();
    } catch (e) {
      alert("Помилка запису");
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backText}>НАЗАД</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ХМАРНІ НОТАТКИ</Text>
        <View style={{ width: 60 }} /> 
      </View>

      <View style={styles.content}>
        <View style={styles.formContainer}>
          <TextInput 
            placeholder="Назва гри..." 
            placeholderTextColor={COLORS.textMuted}
            value={title}
            onChangeText={setTitle} 
            style={styles.input} 
          />
          <TouchableOpacity style={styles.saveBtn} onPress={saveToFirebase}>
            <Text style={styles.saveBtnText}>💾 ДОДАТИ У ВІШЛІСТ</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => {
            // Перевіряємо, чи цей пост належить поточному юзеру
            const isMyPost = item.authorId === userId;

            return (
              <View style={[styles.itemCard, isMyPost && styles.myPostCard]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  
                  {/* МАГІЯ: якщо пост мій - показуємоuserName з контексту, інакше - те, що в базі */}
                  <Text style={styles.authorText}>
                    Додав: {isMyPost ? `${userName} (Ви)` : item.authorName}
                  </Text>
                </View>
                
                {isMyPost && (
                  <TouchableOpacity onPress={() => deleteDoc(doc(db, "wishlist", item.id))}>
                    <Ionicons name="trash-outline" size={22} color={COLORS.danger} />
                  </TouchableOpacity>
                )}
              </View>
            );
          }}
          ListEmptyComponent={<Text style={styles.emptyText}>Список порожній...</Text>}
        />
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  navBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backText: { color: COLORS.primary, fontWeight: 'bold', marginLeft: 5 },
  headerTitle: { color: COLORS.textPrimary, fontSize: 18, fontWeight: 'bold', letterSpacing: 1 },
  
  content: { flex: 1, paddingHorizontal: 20 },
  formContainer: { paddingVertical: 20 },
  input: { backgroundColor: COLORS.surface, color: COLORS.textPrimary, padding: 15, borderRadius: 5, borderWidth: 1, borderColor: COLORS.border, marginBottom: 10 },
  saveBtn: { backgroundColor: COLORS.primary, paddingVertical: 15, borderRadius: 5, alignItems: 'center' },
  saveBtnText: { color: COLORS.surfaceDark, fontWeight: 'bold' },
  
  itemCard: { flexDirection: 'row', backgroundColor: COLORS.surfaceDark, padding: 15, borderRadius: 10, marginBottom: 10, alignItems: 'center', borderWidth: 1, borderColor: COLORS.surface },
  myPostCard: { borderColor: COLORS.primary },
  itemTitle: { color: COLORS.textPrimary, fontWeight: 'bold', fontSize: 16 },
  authorText: { color: COLORS.textMuted, fontSize: 12 },
  emptyText: { color: COLORS.textMuted, textAlign: 'center', marginTop: 20 }
});