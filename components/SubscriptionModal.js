import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

export default function SubscriptionModal({ visible, onClose, gameTitle }) {
  return (
    <Modal
      // --- ВИМОГИ ЛАБОРАТОРНОЇ ---
      animationType="slide"      // Анімація виїжджання знизу
      transparent={true}         // Прозорий фон навколо
      visible={visible}          // Стан видимості
      onRequestClose={onClose}   // Для закриття кнопкою "Назад" на Android
    >
      {/* Напівпрозорий фон (Overlay) */}
      <View style={styles.centeredView}>
        
        {/* Саме модальне вікно */}
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Підписка оформлена! ✅</Text>
          <Text style={styles.modalText}>
            Ми повідомимо вас, коли ціна на <Text style={{fontWeight: 'bold'}}>{gameTitle}</Text> впаде ще нижче!
          </Text>

          {/* Кнопка закриття */}
          <Pressable
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.textStyle}>ЗРОЗУМІЛО</Text>
          </Pressable>
        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Темний напівпрозорий фон
  },
  modalView: {
    margin: 20,
    backgroundColor: '#2a475e', // Колір блоків Steam
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#66c0f4',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#66c0f4', // Блакитний заголовок
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#c7d5e0', // Світло-сірий текст
    fontSize: 16,
  },
  closeButton: {
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    backgroundColor: '#66c0f4',
    minWidth: 120,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});