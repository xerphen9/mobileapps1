import React, { Dispatch, SetStateAction, useState, PropsWithChildren } from 'react'
import { Modal, Pressable, StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'

import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'
import { IconComponent } from './IconComponent';
import { ButtonComponent } from './ButtonComponent'

export type ModalProps = PropsWithChildren & {
  title: string;
  show: boolean;
  step: number;
  setShow: Dispatch<SetStateAction<boolean>>;
  onBack?: Dispatch<SetStateAction<number>>;
};

export default function ModalComponent({ show, setShow, step, title, onBack, children }: ModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}>
      <TouchableWithoutFeedback onPress={() => setShow(false)}>
        <ThemedView style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <ThemedView style={styles.modalContent} >
              <ThemedView style={styles.modalHeader}>
                {
                  step !== 0 ?
                    <ThemedText style={styles.iconBack}>
                      <IconComponent 
                        name='arrow-back-ios' 
                        onPress={() => onBack?.(step-1)}/>
                    </ThemedText>
                  : 
                    null
                }
                <ThemedText type='subtitle' style={styles.subtitle}>{title}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.modalMiddle}>
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
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
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
    height: 50,
    justifyContent: 'center',
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
    width: '50%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  btnText: {
    color: '#fff',
  },
  iconBack: {
    position: 'absolute',
  }
})