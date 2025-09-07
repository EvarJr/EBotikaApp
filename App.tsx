import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { AppContext } from './contexts/AppContext.ts';
import type { Role, User, Screen, Language, Consultation, ForumPost, PrivateChatMessage, Prescription, DoctorProfile, PatientDoctorChatMessage, ConsultationStatus, ResidentRecord } from './types';
import { Screens, CHAT_HISTORY_KEY, SESSION_KEY, MOCK_CONSULTATIONS, MOCK_FORUM_POSTS, MOCK_PRIVATE_CHATS, MOCK_PATIENT_DOCTOR_CHATS, MOCK_PRESCRIPTIONS, MOCK_DOCTORS, MOCK_USERS, MOCK_RESIDENT_RECORDS } from './constants';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PatientHomeScreen from './screens/patient/PatientHomeScreen';
import SymptomCheckScreen from './screens/patient/SymptomCheckScreen';
import ConsultsScreen from './screens/patient/ConsultsScreen';
import PrescriptionsScreen from './screens/patient/PrescriptionsScreen';
import ProfileScreen from './screens/patient/ProfileScreen';
import DoctorDashboard from './screens/doctor/DoctorDashboard';
import DoctorInboxScreen from './screens/doctor/DoctorInboxScreen';
import PrescriptionFormScreen from './screens/doctor/PrescriptionFormScreen';
import PharmacyDashboard from './screens/pharmacy/PharmacyDashboard';
import RHUDashboard from './screens/rhu/RHUDashboard';
import BHWDashboard from './screens/bhw/BHWDashboard';
import ForumScreen from './screens/shared/ForumScreen';
import ProfessionalsDirectoryScreen from './screens/shared/ProfessionalsDirectoryScreen';
import PrivateChatScreen from './screens/shared/PrivateChatScreen';
import ConsultationDetailScreen from './screens/doctor/ConsultationDetailScreen';
import PharmacyScanScreen from './screens/pharmacy/PharmacyScanScreen';
import QRDisplayScreen from './screens/patient/QRDisplayScreen';
import ChatBubbleFAB from './components/ChatBubbleFAB';
import DoctorChatScreen from './screens/patient/DoctorChatScreen';
import PatientConsultationDetailScreen from './screens/patient/PatientConsultationDetailScreen';
import { translations } from './translations';
import ProfessionalProfileEditScreen from './screens/shared/ProfessionalProfileEditScreen';
import PatientDetailScreen from './screens/rhu/PatientDetailScreen';
import { useTranslation } from './hooks/useTranslation';


const getInitialState = () => {
    try {
        const session = localStorage.getItem(SESSION_KEY);
        if (session) {
            const { role, user, screen, activePatientScreen } = JSON.parse(session);
            // Basic validation
            if (role && user && screen) {
                 return { role, user, screen, activePatientScreen };
            }
        }
    } catch (e) {
        console.error("Could not parse session from localStorage", e);
    }
    return {
        role: 'unauthenticated',
        user: null,
        screen: Screens.WELCOME,
        activePatientScreen: Screens.PATIENT_HOME
    };
};

const GuestExitModal = ({ isOpen, onConfirm, onClose, onSaveAndRegister }: { isOpen: boolean; onConfirm: () => void; onClose: () => void; onSaveAndRegister: () => void; }) => {
    const { t } = useTranslation();
    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                <h2 className="text-xl font-bold mb-2 text-gray-800">{t('guest_exit_title')}</h2>
                <p className="text-sm text-gray-600 mb-4">{t('guest_exit_warning')}</p>
                <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-lg text-center mb-6">
                    <p className="font-semibold text-sm">{t('guest_exit_save_prompt')}</p>
                </div>
                <div className="flex flex-col space-y-2">
                     <button onClick={onSaveAndRegister} className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600">
                        {t('guest_exit_save_button')}
                    </button>
                    <button onClick={onConfirm} className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700">
                        {t('guest_exit_confirm_button')}
                    </button>
                    <button onClick={onClose} className="w-full bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">
                        {t('guest_exit_stay_button')}
                    </button>
                </div>
            </div>
        </div>
    );
};


export default function App() {
  const initialState = getInitialState();
  const [role, setRole] = useState<Role>(initialState.role);
  const [user, setUser] = useState<User | null>(initialState.user);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [screen, setScreen] = useState<Screen>(initialState.screen);
  const [activePatientScreen, setActivePatientScreen] = useState<Screen>(initialState.activePatientScreen);
  const [language, setLanguage] = useState<Language>('English');
  const [symptom, setSymptom] = useState<string | null>(null);
  const [consultations, setConsultations] = useState<Consultation[]>(MOCK_CONSULTATIONS);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(MOCK_PRESCRIPTIONS);
  const [activeConsultation, setActiveConsultation] = useState<Consultation | null>(null);
  const [activePrescription, setActivePrescription] = useState<Prescription | null>(null);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(MOCK_FORUM_POSTS);
  const [activePrivateChatRecipient, setActivePrivateChatRecipient] = useState<User | null>(null);
  const [privateChats, setPrivateChats] = useState<{ [conversationId: string]: PrivateChatMessage[] }>(MOCK_PRIVATE_CHATS);
  const [activeDoctorChatRecipient, setActiveDoctorChatRecipient] = useState<DoctorProfile | null>(null);
  const [patientDoctorChats, setPatientDoctorChats] = useState<{ [conversationId: string]: PatientDoctorChatMessage[] }>(MOCK_PATIENT_DOCTOR_CHATS);
  const [doctorProfiles, setDoctorProfiles] = useState<DoctorProfile[]>(MOCK_DOCTORS);
  const [activePatientForManagement, setActivePatientForManagement] = useState<User | null>(null);
  const [isGuestExitModalOpen, setIsGuestExitModalOpen] = useState(false);
  const [isGuestUpgrading, setIsGuestUpgrading] = useState(false);
  const [residentRecords, setResidentRecords] = useState<ResidentRecord[]>(MOCK_RESIDENT_RECORDS);
  const [chatAccess, setChatAccess] = useState<{ [conversationId: string]: number }>({});


  const t = useCallback((key: string, params: { [key: string]: string | number } = {}) => {
    const langKey = language === 'Aklanon' ? 'ak' : 'en';
    let str = translations[langKey][key] || key;
    
    Object.keys(params).forEach(pKey => {
      str = str.replace(`{${pKey}}`, String(params[pKey]));
    });
    
    return str;
  }, [language]);

  useEffect(() => {
    try {
      const session = { role, user, screen, activePatientScreen };
      if (role !== 'unauthenticated' && user) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    } catch (e) {
      console.error("Could not save session to localStorage", e);
    }
  }, [role, user, screen, activePatientScreen]);

  const login = useCallback((userRole: Role, userData: User) => {
    let finalConsultations = consultations;
    let finalPrescriptions = prescriptions;
    
    // Check if we are upgrading a guest
    if (isGuestUpgrading && role === 'guest' && user) {
        const guestId = user.id;
        // Migrate consultations
        finalConsultations = consultations.map(c => 
            c.patient.id === guestId ? { ...c, patient: userData } : c
        );
        // Migrate prescriptions
        finalPrescriptions = prescriptions.map(p => 
            p.patient.id === guestId ? { ...p, patient: userData } : p
        );
    }
    
    // Set the new state
    setConsultations(finalConsultations);
    setPrescriptions(finalPrescriptions);
    setIsGuestUpgrading(false); // Reset the flag

    setRole(userRole);
    setUser(userData);
    switch (userRole) {
      case 'patient':
        setScreen(Screens.PATIENT_HOME);
        setActivePatientScreen(Screens.PATIENT_HOME);
        break;
      case 'doctor':
        setScreen(Screens.DOCTOR_DASHBOARD);
        break;
      case 'pharmacy':
        setScreen(Screens.PHARMACY_DASHBOARD);
        break;
      case 'admin':
        setScreen(Screens.RHU_DASHBOARD);
        break;
      case 'bhw':
        setScreen(Screens.BHW_DASHBOARD);
        break;
      default:
        setScreen(Screens.WELCOME);
    }
  }, [consultations, prescriptions, isGuestUpgrading, role, user]);

  const loginAsGuest = useCallback(() => {
    setRole('guest');
    // Create a temporary guest user object to track their session data
    setUser({
        id: `guest-${Date.now()}`,
        name: 'Guest User',
        email: 'guest@ebotika.ph',
        role: 'guest',
        status: 'active',
    });
    setScreen(Screens.PATIENT_HOME);
    setActivePatientScreen(Screens.PATIENT_HOME);
  }, []);

  const logout = useCallback(() => {
    setRole('unauthenticated');
    setUser(null);
    setScreen(Screens.WELCOME);
    setActiveConsultation(null);
    setActivePrescription(null);
    setActivePrivateChatRecipient(null);
    setActiveDoctorChatRecipient(null);
    setActivePatientForManagement(null);
    setIsGuestUpgrading(false);
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(CHAT_HISTORY_KEY);
  }, []);

  const promptGuestExit = useCallback(() => {
    setIsGuestExitModalOpen(true);
  }, []);

  const handleConfirmGuestExit = useCallback(() => {
    setIsGuestExitModalOpen(false);
    logout();
  }, [logout]);
  
  const handleGuestUpgrade = useCallback(() => {
      setIsGuestUpgrading(true);
      setIsGuestExitModalOpen(false);
      navigateTo(Screens.REGISTER);
  }, []);

  const navigateTo = useCallback((newScreen: Screen) => {
    const patientScreens: Screen[] = [Screens.PATIENT_HOME, Screens.CONSULTATIONS, Screens.PRESCRIPTIONS, Screens.PROFILE];
    if (patientScreens.includes(newScreen)) {
        setActivePatientScreen(newScreen);
    }
    setScreen(newScreen);
  }, []);

  const startSymptomCheck = useCallback((initialSymptom: string) => {
      localStorage.removeItem(CHAT_HISTORY_KEY);
      setSymptom(initialSymptom);
      navigateTo(Screens.SYMPTOM_CHECK);
  }, [navigateTo]);
  
  const updateGuestDetails = useCallback((details: { name: string; contactNumber: string; address: string; validIdFile: File }): User => {
    const guestUser: User = {
      id: user?.id || `guest-${Date.now()}`, // Preserve guest ID
      name: details.name,
      email: `${details.name.split(' ').join('.').toLowerCase()}@guest.ebotika.ph`,
      role: 'patient',
      contactNumber: details.contactNumber,
      address: details.address,
      validIdUrl: URL.createObjectURL(details.validIdFile),
      status: 'active',
    };
    setUser(guestUser);
    setRole('patient');
    return guestUser;
  }, [user]);
  
  const updateUserProfile = useCallback((updatedDetails: Partial<User>) => {
    setUser(prevUser => {
        if (!prevUser) return null;
        const newUser = { ...prevUser, ...updatedDetails };

        // Update the master list of users
        setUsers(prevUsers => prevUsers.map(u => u.id === newUser.id ? newUser : u));
        
        // Also update session storage immediately
        try {
            const currentSession = JSON.parse(localStorage.getItem(SESSION_KEY) || '{}');
            const newSession = { ...currentSession, user: newUser };
            localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
        } catch (e) {
            console.error("Could not save updated session to localStorage", e);
        }
        return newUser;
    });
  }, []);

  const updateUserStatus = useCallback((userId: string, status: 'active' | 'banned') => {
    setUsers(prevUsers => prevUsers.map(u => u.id === userId ? { ...u, status } : u));
    // If the updated user is the current user and they've been banned, log them out.
    if (user?.id === userId && status === 'banned') {
        logout();
    }
  }, [user, logout]);

  const deleteUser = useCallback((userId: string) => {
    setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
    if (user?.id === userId) {
        logout();
    }
  }, [user, logout]);

  const addReportToUser = useCallback((userId: string, report: { doctorId: string; doctorName: string; reason: string; date: string }) => {
    setUsers(prevUsers => prevUsers.map(u => {
        if (u.id === userId) {
            const updatedReports = [...(u.reports || []), report];
            return { ...u, reports: updatedReports };
        }
        return u;
    }));
  }, []);

  const addProfessionalUser = useCallback((newUser: Omit<User, 'id'>) => {
    const userWithId: User = {
      ...newUser,
      id: `${newUser.role.slice(0, 2)}-${Date.now()}`,
      status: 'active',
    };
    setUsers(prev => [...prev, userWithId]);
  }, []);

  const addResidentRecord = useCallback((details: Omit<ResidentRecord, 'id'>) => {
    const newRecord: ResidentRecord = {
      id: `res-${Date.now()}`,
      ...details,
    };
    setResidentRecords(prev => [newRecord, ...prev]);
  }, []);

  const deleteResidentRecord = useCallback((recordId: string) => {
    setResidentRecords(prev => prev.filter(record => record.id !== recordId));
  }, []);

  const addConsultation = useCallback((consultation: Consultation) => {
    setConsultations(prev => [consultation, ...prev]);
  }, []);

  const updateConsultationStatus = useCallback((consultationId: string, status: ConsultationStatus) => {
    setConsultations(prev => prev.map(c =>
        c.id === consultationId
        ? { ...c, status }
        : c
    ));
  }, []);
  
  const addPrescription = useCallback((prescription: Prescription) => {
    setPrescriptions(prev => [prescription, ...prev]);
  }, []);
  
  const updatePrescription = useCallback((prescriptionId: string, details: Partial<Omit<Prescription, 'id'>>) => {
    setPrescriptions(prev => prev.map(p => 
        p.id === prescriptionId 
        ? { ...p, ...details } 
        : p
    ));
  }, []);

  const addForumPost = useCallback((content: string) => {
    if (!user) return;
    const newPost: ForumPost = {
        id: `fp-${Date.now()}`,
        author: user,
        timestamp: new Date().toLocaleString(),
        content,
    };
    setForumPosts(prevPosts => [newPost, ...prevPosts]);
  }, [user]);

  const sendPrivateMessage = useCallback((recipientId: string, content: string) => {
    if (!user) return;
    const newMessage: PrivateChatMessage = {
        id: `pm-${Date.now()}`,
        senderId: user.id,
        recipientId,
        content,
        timestamp: new Date().toLocaleString(),
    };
    
    const conversationId = [user.id, recipientId].sort().join('-');
    
    setPrivateChats(prev => {
        const existingMessages = prev[conversationId] || [];
        return {
            ...prev,
            [conversationId]: [...existingMessages, newMessage]
        };
    });
  }, [user]);

  const sendPatientDoctorMessage = useCallback((doctorId: string, content: string) => {
    if (!user || user.role !== 'patient') return;

    const conversationId = [user.id, doctorId].sort().join('-');

    if (!user.isPremium) {
        const chatStartTime = chatAccess[conversationId];
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        const oneWeek = 7 * oneDay;

        if (!chatStartTime) {
            // First message of a new cycle, start the timer
            setChatAccess(prev => ({ ...prev, [conversationId]: now }));
        } else {
            const elapsed = now - chatStartTime;
            if (elapsed > oneDay && elapsed < oneWeek) {
                // Locked out
                return; 
            } else if (elapsed >= oneWeek) {
                // Cooldown is over, reset the timer
                setChatAccess(prev => ({ ...prev, [conversationId]: now }));
            }
            // Otherwise, user is within the 24-hour window, so we allow the message
        }
    }

    const newMessage: PatientDoctorChatMessage = {
        id: `pdcm-${Date.now()}`,
        sender: 'patient',
        content,
        timestamp: new Date().toLocaleString(),
        readByPatient: true,
        readByDoctor: false,
    };

    setPatientDoctorChats(prev => {
        const existingMessages = prev[conversationId] || [];
        return { ...prev, [conversationId]: [...existingMessages, newMessage] };
    });
  }, [user, chatAccess]);

  const sendDoctorPatientMessage = useCallback((patientId: string, content: string) => {
    if (!user || user.role !== 'doctor') return;

    const conversationId = [user.id, patientId].sort().join('-');
    const newMessage: PatientDoctorChatMessage = {
        id: `pdcm-${Date.now()}`,
        sender: 'doctor',
        content,
        timestamp: new Date().toLocaleString(),
        readByPatient: false,
        readByDoctor: true,
    };

    setPatientDoctorChats(prev => {
        const existingMessages = prev[conversationId] || [];
        return { ...prev, [conversationId]: [...existingMessages, newMessage] };
    });
  }, [user]);
  
  const markDoctorChatAsRead = useCallback((conversationId: string) => {
    setPatientDoctorChats(prev => {
        const currentChat = prev[conversationId];
        if (!currentChat) return prev;
        
        const updatedChat = currentChat.map(msg => 
            msg.sender === 'patient' && !msg.readByDoctor 
            ? { ...msg, readByDoctor: true } 
            : msg
        );
        
        return { ...prev, [conversationId]: updatedChat };
    });
  }, []);

  const updateDoctorAvailability = useCallback((doctorId: string, availability: 'Available' | 'On Leave') => {
    setDoctorProfiles(prev => prev.map(doc => 
        doc.id === doctorId ? { ...doc, availability } : doc
    ));
  }, []);

  const upgradeUserToPremium = useCallback((userId: string) => {
    setUsers(prevUsers => prevUsers.map(u => 
        u.id === userId ? { ...u, isPremium: true } : u
    ));
    setUser(prevUser => {
        if (prevUser && prevUser.id === userId) {
            const upgradedUser = { ...prevUser, isPremium: true };
            try {
                const currentSession = JSON.parse(localStorage.getItem(SESSION_KEY) || '{}');
                const newSession = { ...currentSession, user: upgradedUser };
                localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
            } catch (e) {
                console.error("Could not save upgraded session to localStorage", e);
            }
            return upgradedUser;
        }
        return prevUser;
    });
  }, []);

  const value = useMemo(() => ({
    role,
    user,
    users,
    screen,
    activePatientScreen,
    language,
    t,
    isGuestUpgrading,
    setIsGuestUpgrading,
    login,
    loginAsGuest,
    logout,
    promptGuestExit,
    navigateTo,
    setLanguage,
    startSymptomCheck,
    symptom,
    updateGuestDetails,
    updateUserProfile,
    updateUserStatus,
    deleteUser,
    addReportToUser,
    addProfessionalUser,
    residentRecords,
    addResidentRecord,
    deleteResidentRecord,
    consultations,
    addConsultation,
    updateConsultationStatus,
    prescriptions,
    addPrescription,
    updatePrescription,
    activeConsultation,
    setActiveConsultation,
    activePrescription,
    setActivePrescription,
    activePatientForManagement,
    setActivePatientForManagement,
    forumPosts,
    addForumPost,
    activePrivateChatRecipient,
    setActivePrivateChatRecipient,
    privateChats,
    sendPrivateMessage,
    activeDoctorChatRecipient,
    setActiveDoctorChatRecipient,
    patientDoctorChats,
    sendPatientDoctorMessage,
    sendDoctorPatientMessage,
    markDoctorChatAsRead,
    doctorProfiles,
    updateDoctorAvailability,
    chatAccess,
    upgradeUserToPremium,
  }), [role, user, users, screen, activePatientScreen, language, t, isGuestUpgrading, setIsGuestUpgrading, login, loginAsGuest, logout, promptGuestExit, navigateTo, setLanguage, startSymptomCheck, symptom, updateGuestDetails, updateUserProfile, updateUserStatus, deleteUser, addReportToUser, addProfessionalUser, residentRecords, addResidentRecord, deleteResidentRecord, consultations, addConsultation, updateConsultationStatus, prescriptions, addPrescription, updatePrescription, activeConsultation, setActiveConsultation, activePrescription, setActivePrescription, activePatientForManagement, forumPosts, addForumPost, activePrivateChatRecipient, privateChats, sendPrivateMessage, activeDoctorChatRecipient, patientDoctorChats, sendPatientDoctorMessage, sendDoctorPatientMessage, markDoctorChatAsRead, doctorProfiles, updateDoctorAvailability, chatAccess, upgradeUserToPremium]);

  const renderScreen = () => {
    switch (screen) {
      case Screens.WELCOME:
        return <WelcomeScreen />;
      case Screens.LOGIN:
        return <LoginScreen />;
      case Screens.REGISTER:
        return <RegisterScreen />;
      case Screens.PATIENT_HOME:
      case Screens.CONSULTATIONS:
      case Screens.PRESCRIPTIONS:
      case Screens.PROFILE:
        const PatientScreensMap: { [key: string]: React.ReactElement } = {
          [Screens.PATIENT_HOME]: <PatientHomeScreen />,
          [Screens.CONSULTATIONS]: <ConsultsScreen />,
          [Screens.PRESCRIPTIONS]: <PrescriptionsScreen />,
          [Screens.PROFILE]: <ProfileScreen />,
        };
        return PatientScreensMap[activePatientScreen];
      case Screens.SYMPTOM_CHECK:
          return <SymptomCheckScreen />;
      case Screens.QR_DISPLAY:
          return <QRDisplayScreen />;
      case Screens.DOCTOR_CHAT:
          return <DoctorChatScreen />;
      case Screens.PATIENT_CONSULTATION_DETAIL:
          return <PatientConsultationDetailScreen />;
      case Screens.DOCTOR_DASHBOARD:
        return <DoctorDashboard />;
      case Screens.DOCTOR_INBOX:
        return <DoctorInboxScreen />;
      case Screens.CONSULTATION_DETAIL:
        return <ConsultationDetailScreen />;
      case Screens.PRESCRIPTION_FORM:
        return <PrescriptionFormScreen />;
      case Screens.PHARMACY_DASHBOARD:
        return <PharmacyDashboard />;
      case Screens.PHARMACY_SCAN:
        return <PharmacyScanScreen />;
      case Screens.RHU_DASHBOARD:
        return <RHUDashboard />;
      case Screens.BHW_DASHBOARD:
        return <BHWDashboard />;
      case Screens.PATIENT_DETAIL_MANAGEMENT:
        return <PatientDetailScreen />;
      case Screens.FORUM:
        return <ForumScreen />;
      case Screens.PROFESSIONALS_DIRECTORY:
        return <ProfessionalsDirectoryScreen />;
      case Screens.PRIVATE_CHAT:
        return <PrivateChatScreen />;
      case Screens.PROFESSIONAL_PROFILE_EDIT:
        return <ProfessionalProfileEditScreen />;
      default:
        return <WelcomeScreen />;
    }
  };
  
  const showChatBubble = (role === 'patient' || role === 'guest') && screen === Screens.PATIENT_HOME;

  return (
    <AppContext.Provider value={value}>
      <div className="h-screen w-screen flex items-center justify-center font-sans">
        <div className="relative w-full max-w-sm h-full sm:h-[95vh] sm:max-h-[840px] bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col">
          <GuestExitModal 
            isOpen={isGuestExitModalOpen}
            onConfirm={handleConfirmGuestExit}
            onClose={() => setIsGuestExitModalOpen(false)}
            onSaveAndRegister={handleGuestUpgrade}
          />
          {renderScreen()}
          {showChatBubble && <ChatBubbleFAB />}
        </div>
      </div>
    </AppContext.Provider>
  );
}