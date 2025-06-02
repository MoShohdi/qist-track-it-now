
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function CalendarScreen() {
  const upcomingPayments = [
    {
      id: 1,
      date: '2025-06-05',
      storeName: 'IKEA Egypt',
      itemName: 'Living Room Furniture Set',
      amount: 3000,
      isOverdue: true,
    },
    {
      id: 2,
      date: '2025-06-15',
      storeName: 'Carrefour Egypt',
      itemName: 'Samsung Galaxy S24',
      amount: 2916,
      isOverdue: false,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment Calendar</Text>
        <Text style={styles.subtitle}>Upcoming payments</Text>
      </View>

      <View style={styles.content}>
        {upcomingPayments.map((payment) => (
          <View key={payment.id} style={[
            styles.paymentCard,
            payment.isOverdue && styles.overdueCard
          ]}>
            <View style={styles.dateSection}>
              <Text style={styles.date}>{payment.date}</Text>
              {payment.isOverdue && (
                <Text style={styles.overdueLabel}>OVERDUE</Text>
              )}
            </View>
            
            <View style={styles.paymentInfo}>
              <Text style={styles.storeName}>{payment.storeName}</Text>
              <Text style={styles.itemName}>{payment.itemName}</Text>
              <Text style={styles.amount}>EGP {payment.amount.toLocaleString()}</Text>
            </View>
          </View>
        ))}
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
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#b2f5ea',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f766e',
  },
  subtitle: {
    fontSize: 14,
    color: '#0d9488',
  },
  content: {
    padding: 20,
  },
  paymentCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overdueCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  dateSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f766e',
  },
  overdueLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ef4444',
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  paymentInfo: {
    gap: 4,
  },
  storeName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  itemName: {
    fontSize: 12,
    color: '#6b7280',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f766e',
    marginTop: 4,
  },
});
