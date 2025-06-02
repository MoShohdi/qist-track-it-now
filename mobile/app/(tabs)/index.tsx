
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';

interface Installment {
  id: number;
  storeName: string;
  itemName: string;
  totalAmount: number;
  paidAmount: number;
  totalInstallments: number;
  paidInstallments: number;
  monthlyPayment: number;
  nextDueDate: string;
  isOverdue: boolean;
  daysUntilDue?: number;
  daysOverdue?: number;
}

export default function HomeScreen() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [installments, setInstallments] = useState<Installment[]>([
    {
      id: 1,
      storeName: "Carrefour Egypt",
      itemName: "Samsung Galaxy S24",
      totalAmount: 35000,
      paidAmount: 14000,
      totalInstallments: 12,
      paidInstallments: 4,
      monthlyPayment: 2916,
      nextDueDate: "2025-06-15",
      isOverdue: false,
      daysUntilDue: 14
    },
    {
      id: 2,
      storeName: "IKEA Egypt",
      itemName: "Living Room Furniture Set",
      totalAmount: 18000,
      paidAmount: 9000,
      totalInstallments: 6,
      paidInstallments: 3,
      monthlyPayment: 3000,
      nextDueDate: "2025-06-05",
      isOverdue: true,
      daysOverdue: 4
    }
  ]);

  useEffect(() => {
    const hasSeenOnboarding = false; // You can implement AsyncStorage later
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const totalMonthlyPayment = installments.reduce((sum, item) => sum + item.monthlyPayment, 0);
  const totalOutstanding = installments.reduce((sum, item) => sum + (item.totalAmount - item.paidAmount), 0);
  const overdueCount = installments.filter(item => item.isOverdue).length;

  const handleMarkAsPaid = (id: number) => {
    setInstallments(prev => 
      prev.map(item => {
        if (item.id === id && item.paidInstallments < item.totalInstallments) {
          const newPaidInstallments = item.paidInstallments + 1;
          const newPaidAmount = newPaidInstallments * item.monthlyPayment;
          return {
            ...item,
            paidInstallments: newPaidInstallments,
            paidAmount: newPaidAmount,
            isOverdue: false
          };
        }
        return item;
      })
    );
  };

  const handleInstallmentPress = (id: number) => {
    router.push(`/installment/${id}`);
  };

  if (showOnboarding) {
    return (
      <View style={styles.onboardingContainer}>
        <Text style={styles.onboardingTitle}>Welcome to Qist!</Text>
        <Text style={styles.onboardingText}>Track your installment payments easily</Text>
        <TouchableOpacity 
          style={styles.onboardingButton}
          onPress={() => setShowOnboarding(false)}
        >
          <Text style={styles.onboardingButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Qist</Text>
          <Text style={styles.subtitle}>Payment Tracker</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationText}>🔔</Text>
          {overdueCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{overdueCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>This Month</Text>
          <Text style={styles.summaryAmount}>EGP {totalMonthlyPayment.toLocaleString()}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Outstanding</Text>
          <Text style={styles.summaryAmount}>EGP {totalOutstanding.toLocaleString()}</Text>
        </View>
      </View>

      {/* Installments Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Installments</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => router.push('/add-item')}
          >
            <Text style={styles.addButtonText}>+ Add Item</Text>
          </TouchableOpacity>
        </View>

        {installments.length > 0 ? (
          <View style={styles.installmentsList}>
            <Text style={styles.tipText}>💡 Tip: Tap to view details, long press to mark as paid</Text>
            {installments.map((installment) => (
              <TouchableOpacity
                key={installment.id}
                style={[
                  styles.installmentCard,
                  installment.isOverdue && styles.overdueCard
                ]}
                onPress={() => handleInstallmentPress(installment.id)}
                onLongPress={() => {
                  Alert.alert(
                    'Mark as Paid',
                    `Mark payment for ${installment.itemName} as paid?`,
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Mark Paid', onPress: () => handleMarkAsPaid(installment.id) }
                    ]
                  );
                }}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.storeName}>{installment.storeName}</Text>
                  <Text style={styles.dueDate}>
                    {installment.isOverdue 
                      ? `${installment.daysOverdue} days overdue`
                      : `Due in ${installment.daysUntilDue} days`
                    }
                  </Text>
                </View>
                <Text style={styles.itemName}>{installment.itemName}</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${(installment.paidInstallments / installment.totalInstallments) * 100}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {installment.paidInstallments} of {installment.totalInstallments} paid
                  </Text>
                </View>
                <Text style={styles.paymentAmount}>EGP {installment.monthlyPayment.toLocaleString()}/month</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>💳</Text>
            <Text style={styles.emptyTitle}>No installments yet</Text>
            <Text style={styles.emptyText}>
              Start tracking your installment payments by adding your first item.
            </Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={() => router.push('/add-item')}
            >
              <Text style={styles.emptyButtonText}>Add Your First Item</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdfa',
  },
  onboardingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0fdfa',
    padding: 20,
  },
  onboardingTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0f766e',
    marginBottom: 10,
  },
  onboardingText: {
    fontSize: 18,
    color: '#0d9488',
    textAlign: 'center',
    marginBottom: 30,
  },
  onboardingButton: {
    backgroundColor: '#0d9488',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  onboardingButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationText: {
    fontSize: 20,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  summaryContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f766e',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f766e',
  },
  addButton: {
    backgroundColor: '#0d9488',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  installmentsList: {
    gap: 12,
  },
  tipText: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 15,
  },
  installmentCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f766e',
  },
  dueDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  itemName: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 12,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0d9488',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f766e',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#b2f5ea',
    borderStyle: 'dashed',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  emptyButton: {
    backgroundColor: '#0d9488',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  emptyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
