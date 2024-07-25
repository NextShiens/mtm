import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Bell } from 'lucide-react-native';

const AlertBanner = ({ title, message, duration = 5000, onHide }) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    showAlert();
  }, [title, message]);

  const showAlert = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();

    const timer = setTimeout(() => {
      hideAlert();
    }, duration);

    return () => clearTimeout(timer);
  };

  const hideAlert = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      if (onHide) {
        onHide();
      }
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          top: slideAnim,
          opacity: fadeAnim,
        }
      ]}
    >
      <View style={styles.iconContainer}>
        <Bell color="#FF9800" size={24} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title || 'New Notification'}</Text>
        <Text style={styles.message}>{message || 'You have a new message'}</Text>
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={hideAlert}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#FF9800',
    fontWeight: 'bold',
  },
});

export default AlertBanner;