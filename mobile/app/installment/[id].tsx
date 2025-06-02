
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function InstallmentDetailsScreen() {
  const { id } = useLocalSearchParams();

  // Mock data - in real app this would come from your data store
  const installment = {
    id: 1,
    storeName: "Carrefour Egypt",
    itemName: "Samsung Galaxy S24",
    totalAmount: 35000,
    paidAmount: 14000,
    totalInstallments: 12,
    paidInstallments: 4,
    monthlyPayment: 2916,
    nextDueDate: "2025-06-15",
    purchaseDate: "2024-02-15",
    notes: "High-priority item for work"
  };

  const paymentHistory = [
    { id: 1, date: "2024-02-15", amount: 2916, status: "paid" },
    { id: 2, date: "2024-03-15", amount: 2916, status: "paid" },
    { id: 3, date: "2024-04-15", amount: 2916, status: "paid" },
    { id: 4, date: "2024-05-15", amount: 2916, status: "paid" },
    { id: 5, date: "2024-06-15", amount: 2916, status: "upcoming" },
  ];

  const progressPercentage = (installment.paidInstallments / installment.totalInstallments) * 100;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Installment Details</Text>
      </View>

      <View style={styles.content}>
        {/* Item Info Card */}
        <View style={styles.card}>
          <Text style={styles.storeName}>{installment.storeName}</Text>
          <Text style={styles.itemName}>{installment.itemName}</Text>
          
          <View style={styles.progressSection}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {installment.paidInstallments} of {installment.totalInstallments} payments completed
            </Text>
          </View>
        </View>

        {/* Financial Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Financial Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Amount</Text>
            <Text style={styles.summaryValue}>EGP {installment.totalAmount.toLocaleString()}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Amount Paid</Text>
            <Text style={styles.summaryValue}>EGP {installment.paidAmount.toLocaleString()}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Remaining</Text>
            <Text style={[styles.summaryValue, styles.remainingAmount]}>
              EGP {(installment.totalAmount - installment.paidAmount).toLocaleString()}
            </Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Monthly Payment</Text>
            <Text style={[styles.summaryValue, styles.monthlyPayment]}>
              EGP {installment.monthlyPayment.toLocaleString()}
            </Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Next Due Date</Text>
            <Text style={styles.summaryValue}>{installment.nextDueDate}</Text>
          </View>
        </View>

        {/* Payment History */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment History</Text>
          
          {paymentHistory.map((payment) => (
            <View key={payment.id} style={styles.paymentRow}>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentDate}>{payment.date}</Text>
                <Text style={styles.paymentAmount}>EGP {payment.amount.toLocaleString()}</Text>
              </View>
              <View style={[
                styles.statusBadge, 
                payment.status === 'paid' ? styles.paidBadge : styles.upcomingBadge
              ]}>
                <Text style={[
                  styles.statusText,
                  payment.status === 'paid' ? styles.paidText : styles.upcomingText
                ]}>
                  {payment.status === 'paid' ? '✓ Paid' : 'Upcoming'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.markPaidButton}>
            <Text style={styles.markPaidText}>Mark Next Payment as Paid</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Edit Item Details</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storeName: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0d9488',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  remainingAmount: {
    color: '#dc2626',
    fontWeight: '600',
  },
  monthlyPayment: {
    color: '#0d9488',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentDate: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 2,
  },
  paymentAmount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  paidBadge: {
    backgroundColor: '#d1fae5',
  },
  upcomingBadge: {
    backgroundColor: '#fef3c7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  paidText: {
    color: '#065f46',
  },
  upcomingText: {
    color: '#92400e',
  },
  actionButtons: {
    marginTop: 20,
  },
  markPaidButton: {
    backgroundColor: '#0d9488',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 12,
  },
  markPaidText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0d9488',
  },
  editText: {
    color: '#0d9488',
    fontSize: 16,
    fontWeight: '600',
  },
});
