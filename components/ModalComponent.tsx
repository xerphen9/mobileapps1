import React, { Dispatch, SetStateAction, useState, PropsWithChildren } from 'react'
import { Modal, Pressable, StyleSheet, View, Text } from 'react-native'
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
    <ThemedView style={styles.modalContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        style={styles.modalAnimation}
        onRequestClose={() => setShow(false)}>
        <ThemedView style={styles.modalContent}>
          <ThemedView style={styles.modalHeader}>
            <ThemedText type='subtitle' style={styles.subtitle}>{title}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.modalMiddle}>
            {children}
          </ThemedView>
          <ThemedView style={styles.modalFooter}>
            <ButtonComponent 
              type='default'
              style={styles.btnOK}
              onPress={() => setShow(false)}>
              <ThemedText type='buttonText' style={styles.btnText}>NEXT</ThemedText>
            </ButtonComponent>
            {/* <ButtonComponent 
              type='close'
              style={styles.btnClose}
              onPress={() => setShow(false)}>
              <ThemedText type='buttonText' style={styles.btnText}>Close</ThemedText>
            </ButtonComponent> */}
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  modalAnimation: {
    height: '50%',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    opacity: 0.7,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    position: 'absolute',
    padding: 35,
    width: '100%',
    height: '50%',
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
    height: '10%',
  },
  modalMiddle: {
    width: '100%',
    height: '80%',
  },
  modalFooter: {
    width: '100%',
    height: '10%',
  },
  btnOK: {
    borderRadius: 50,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
    bottom: 0,
  },
  subtitle: {
    textAlign: 'center',
  },
  btnText: {
    color: '#fff',
  },
})