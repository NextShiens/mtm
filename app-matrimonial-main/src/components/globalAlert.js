import React from 'react';
import { Text } from 'react-native';
import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, STYLES, TYPOGRAPHY } from '../assets/theme';


const AppText = React.memo(({
    onPress = () => { },
    extraStyle = {},
    variant = 'body2',
    color = COLORS.dark.black,
    title = '',
    alignSelf = 'center',
    numberOfLines,
    ellipsizeMode,
    textTransform = 'none',
    ...props
}) => {
    return (
        <Text
            {...props}
            ellipsizeMode={ellipsizeMode}
            numberOfLines={numberOfLines}
            style={[
                TYPOGRAPHY[variant],
                STYLES.fontSize(TYPOGRAPHY[variant]?.fontSize || 12),
                STYLES.color(color),
                { alignSelf, textTransform },
                extraStyle,
            ]}
            onPress={onPress}>
            {title}
        </Text>
    );
});

const CustomAlert = ({ visible, title, message, onClose }) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.alertContainer}>
          <View style={styles.alertHeader}>
            <AppText title={title} variant="h4" color="#FFFFFF" />
          </View>
          <View style={styles.alertBody}>
            <AppText title={message} variant="body" color="#333333" />
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AppText title="OK" variant="button" color="#FF9800" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '80%',
    maxWidth: 300,
    overflow: 'hidden',
  },
  alertHeader: {
    backgroundColor: '#FF9800',
    padding: 15,
    alignItems: 'center',
  },
  alertBody: {
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    padding: 15,
    alignItems: 'center',
  },
});

export default CustomAlert;