import React, { Dispatch, SetStateAction, useState, PropsWithChildren } from 'react'
import { Modal, Pressable, StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native'

import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'
import { ButtonComponent } from './ButtonComponent';

export type ModalProps = PropsWithChildren & {
  title: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

export default function ModalComponent({ show, setShow, title, children }: ModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}>
      <TouchableWithoutFeedback onPress={() => setShow(false)}>
        <ThemedView style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <ThemedView style={styles.modalContent}>
              <ThemedView style={styles.modalMiddle}>
                <ThemedText type='subtitle' style={styles.subtitle}>{title}</ThemedText>
                {children}
              </ThemedView>
            </ThemedView>
          </TouchableWithoutFeedback>
        </ThemedView>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    position: 'absolute',
    padding: 25,
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    width: '100%',
    height: 'auto',
  },
  modalMiddle: {
    width: '100%',
    height: 'auto',
  },
  modalFooter: {
    width: '100%',
    height: 'auto',
  },
  subtitle: {
    textAlign: 'center',
  },
  btnText: {
    color: '#fff',
  },
})