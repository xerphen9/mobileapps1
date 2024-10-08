import React, { Dispatch, SetStateAction } from 'react'
import { StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { DropDown } from '@/app/types';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { IconComponent } from './IconComponent';

export type DropDownProps = {
    data: any[],
    defaultSelected: string,
    setSelected: Dispatch<SetStateAction<string>>;
}

export default function DropDownComponent({
    data,
    defaultSelected,
    setSelected
}: DropDownProps) {
    return (
        <SelectDropdown
            data={data}
            onSelect={(selectedItem, index) => {
                setSelected(selectedItem['name'])
            }}
            renderButton={(selectedItem, isOpened) => {
                return (
                    <ThemedView style={styles.dropdownButtonStyle}>
                                {selectedItem && (
                                    <IconComponent name={selectedItem.icon === null ? '' : selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                                )}
                                <ThemedText style={styles.dropdownButtonTxtStyle}>
                                    {(selectedItem && selectedItem.name) || `${defaultSelected}`}
                                </ThemedText>
                        <IconComponent name={isOpened ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} style={styles.dropdownButtonArrowStyle} />
                    </ThemedView>
                );
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    <ThemedView style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#ffb0b0' }) }}>
                        <IconComponent name={item.icon} style={styles.dropdownItemIconStyle} />
                        <ThemedText style={styles.dropdownItemTxtStyle}>{typeof item.name === 'string' ? item?.name.toUpperCase() : item.name}</ThemedText>
                    </ThemedView>
                );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
        />
    )
}

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: '100%',
        height: 40,
        marginBottom: 20,
        backgroundColor: '#E9ECEF',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        width: '60%',
        backgroundColor: '#E9ECEF',
        borderRadius: 20,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});