// Fix: Populated App.tsx with the main app component and screen router.
import React, { useState, useEffect, useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import { Screen } from './types';

import SplashScreen from './components/SplashScreen';
import AuthScreen from './components/AuthScreen';
import HomeScreen from './components/HomeScreen';
import PartyManagementScreen from './components/PartyManagementScreen';
import PartyDetailScreen from './components/PartyDetailScreen';
import DayBookScreen from './components/DayBookScreen';
import StockBookScreen from './components/StockBookScreen';
import ItemListScreen from './components/ItemListScreen';
import ItemFormScreen from './components/ItemFormScreen';
import ItemDetailScreen from './components/ItemDetailScreen';
import StockTransactionFormScreen from './components/StockTransactionFormScreen';
import InvoicesScreen from './components/InvoicesScreen';
import InvoiceDetailScreen from './components/InvoiceDetailScreen';
import EditProfileScreen from './components/EditProfileScreen';
import AboutUsScreen from './components/AboutUsScreen';
import ContactUsScreen from './components/ContactUsScreen';
import PrivacyPolicyScreen from './components/PrivacyPolicyScreen';
import ReportsScreen from './components/ReportsScreen';
import PartyReportScreen from './components/PartyReportScreen';
import StockReportScreen from './components/StockReportScreen';

const AppContent: React.FC = () => {
    const { state, dispatch } = useContext(AppContext);
    const { currentScreen, screenPayload, user } = state;
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        // Splash screen logic
        const splashShown = sessionStorage.getItem('splashShown');
        if (splashShown) {
            setShowSplash(false);
        }

    }, [dispatch]);

    const handleSplashDismiss = () => {
        sessionStorage.setItem('splashShown', 'true');
        setShowSplash(false);
    };
    
    if (showSplash) {
        return <SplashScreen onDismiss={handleSplashDismiss} />;
    }

    if (!user) {
        // If there's registration data in payload, show Privacy Policy screen
        if (currentScreen === Screen.PrivacyPolicy && screenPayload?.name && screenPayload?.email) {
            return <PrivacyPolicyScreen />;
        }
        return <AuthScreen />;
    }

    const screenToRender = (() => {
        switch (currentScreen) {
            case Screen.Home:
                return <HomeScreen />;
            case Screen.Customers:
                return <PartyManagementScreen partyType="Customer" />;
            case Screen.Suppliers:
                return <PartyManagementScreen partyType="Supplier" />;
            case Screen.PartyDetail:
                return <PartyDetailScreen partyId={screenPayload.partyId} />;
            case Screen.DayBook:
                return <DayBookScreen />;
            case Screen.StockBook:
                return <StockBookScreen />;
            case Screen.AllItems:
                return <ItemListScreen filter="all" />;
            case Screen.LowStockItems:
                return <ItemListScreen filter="low" />;
            case Screen.AddItem:
                return <ItemFormScreen />;
            case Screen.EditItem:
                return <ItemFormScreen itemId={screenPayload.itemId} />;
            case Screen.ItemDetail:
                return <ItemDetailScreen itemId={screenPayload.itemId} />;
            case Screen.StockTransaction:
                return <StockTransactionFormScreen itemId={screenPayload.itemId} transactionType={screenPayload.transactionType} transactionId={screenPayload.transactionId} />;
            case Screen.Invoices:
                return <InvoicesScreen />;
            case Screen.InvoiceDetail:
                return <InvoiceDetailScreen billNumber={screenPayload.billNumber} />;
            case Screen.EditProfile:
                return <EditProfileScreen />;
            case Screen.AboutUs:
                return <AboutUsScreen />;
            case Screen.ContactUs:
                return <ContactUsScreen />;
            case Screen.PrivacyPolicy:
                return <PrivacyPolicyScreen />;
            case Screen.PartyReport:
                return <PartyReportScreen partyId={screenPayload.partyId} />;
            case Screen.Reports:
                return <ReportsScreen />;
            case Screen.StockInReport:
                return <StockReportScreen reportType="Buy" />;
            case Screen.StockOutReport:
                return <StockReportScreen reportType="Sell" />;
            default:
                return <HomeScreen />;
        }
    })();
    
    return (
        <>
            {screenToRender}
        </>
    );
};

const App: React.FC = () => {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
};

export default App;
