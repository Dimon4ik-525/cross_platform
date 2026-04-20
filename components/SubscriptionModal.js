import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Pressable, Platform } from 'react-native';
import { COLORS } from '../theme/colors'; // Підключаємо тему

export default function SubscriptionModal({ visible, onClose, gameTitle }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>ПІДПИСКА ОФОРМЛЕНА ✅</Text>
          <Text style={styles.modalText}>
            Ми повідомимо вас, коли ціна на <Text style={styles.highlight}>{gameTitle}</Text> впаде ще нижче!
          </Text>

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
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Темніше затемнення
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.surfaceDark,
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary, // Неонова рамка
    ...Platform.select({
      ios: { shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10 },
      android: { elevation: 10, shadowColor: COLORS.primary },
      web: { boxShadow: `0px 0px 20px ${COLORS.primary}40` } // Свічення для вебу
    }),
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: 16,
    lineHeight: 22,
  },
  highlight: {
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  closeButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: COLORS.primary,
    ...Platform.select({ web: { cursor: 'pointer' } })
  },
  textStyle: {
    color: COLORS.surfaceDark,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 1,
  },
});