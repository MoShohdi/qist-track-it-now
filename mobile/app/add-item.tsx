
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';

export default function AddItemScreen() {
  const [itemName, setItemName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [installmentCount, setInstallmentCount] = useState('');
  const [paymentFrequency, setPaymentFrequency] = useState('monthly');

  const calculateMonthlyPayment = () => {
    const total = parseFloat(totalAmount) || 0;
    const down = parseFloat(downPayment) || 0;
    const count = parseInt(installmentCount) || 1;
    const remaining = total - down;
    return remaining / count;
  };

  const handleSave = () => {
    if (!itemName || !storeName || !totalAmount || !installmentCount) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Here you would normally save to your backend
    Alert.alert('Success', 'Item added successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add New Item</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Item Name *</Text>
          <TextInput
            style={styles.input}
            value={itemName}
            onChangeText={setItemName}
            placeholder="e.g., Samsung Galaxy S24"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Store Name *</Text>
          <TextInput
            style={styles.input}
            value={storeName}
            onChangeText={setStoreName}
            placeholder="e.g., Carrefour Egypt"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Total Amount (EGP) *</Text>
          <TextInput
            style={styles.input}
            value={totalAmount}
            onChangeText={setTotalAmount}
            placeholder="e.g., 35000"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Down Payment (EGP)</Text>
          <TextInput
            style={styles.input}
            value={downPayment}
            onChangeText={setDownPayment}
            placeholder="e.g., 5000"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Number of Installments *</Text>
          <TextInput
            style={styles.input}
            value={installmentCount}
            onChangeText={setInstallmentCount}
            placeholder="e.g., 12"
            keyboardType="numeric"
          />
        </View>

        {totalAmount && installmentCount && (
          <View style={styles.calculationCard}>
            <Text style={styles.calculationLabel}>Monthly Payment</Text>
            <Text style={styles.calculationAmount}>
              EGP {calculateMonthlyPayment().toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdfa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#b2f5ea',
  },
  backButton: {
    fontSize: 16,
    color: '#0d9488',
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f766e',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  calculationCard: {
    backgroundColor: '#ecfdf5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  calculationLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  calculationAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f766e',
  },
  saveButton: {
    backgroundColor: '#0d9488',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
