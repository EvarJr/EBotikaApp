import { createContext } from 'react';
import type { IAppContext } from '../types';
import { Screens, MOCK_USERS } from '../constants';

export const initialAppContext: IAppContext = {
  role: 'unauthenticated',
  user: null,
  users: [],
  screen: Screens.WELCOME,
  activePatientScreen: Screens.PATIENT_HOME,
  language: 'English',
  t: (key: string) => key, // Placeholder translation function
  isGuestUpgrading: false,
  setIsGuestUpgrading: () => console.warn('setIsGuestUpgrading not yet initialized'),
  login: () => console.warn('login function not yet initialized'),
  loginAsGuest: () => console.warn('loginAsGuest function not yet initialized'),
  logout: () => console.warn('logout function not yet initialized'),
  promptGuestExit: () => console.warn('promptGuestExit function not yet initialized'),
  navigateTo: () => console.warn('navigateTo function not yet initialized'),
  setLanguage: () => console.warn('setLanguage function not yet initialized'),
  startSymptomCheck: () => console.warn('startSymptomCheck function not yet initialized'),
  symptom: null,
  updateGuestDetails: () => { 
    console.warn('updateGuestDetails function not yet initialized');
    return MOCK_USERS.find(u => u.role === 'patient')!;
  },
  updateUserProfile: () => console.warn('updateUserProfile function not yet initialized'),
  addProfessionalUser: () => console.warn('addProfessionalUser function not yet initialized'),
  updateUserStatus: () => console.warn('updateUserStatus function not yet initialized'),
  deleteUser: () => console.warn('deleteUser function not yet initialized'),
  addReportToUser: () => console.warn('addReportToUser function not yet initialized'),
  activeConsultation: null,
  setActiveConsultation: () => console.warn('setActiveConsultation function not yet initialized'),
  consultations: [],
  addConsultation: () => console.warn('addConsultation function not yet initialized'),
  updateConsultationStatus: () => console.warn('updateConsultationStatus function not yet initialized'),
  activePrescription: null,
  setActivePrescription: () => console.warn('setActivePrescription function not yet initialized'),
  prescriptions: [],
  addPrescription: () => console.warn('addPrescription function not yet initialized'),
  updatePrescription: () => console.warn('updatePrescription function not yet initialized'),
  activePatientForManagement: null,
  setActivePatientForManagement: () => console.warn('setActivePatientForManagement not yet initialized'),
  forumPosts: [],
  addForumPost: () => console.warn('addForumPost function not yet initialized'),
  activePrivateChatRecipient: null,
  setActivePrivateChatRecipient: () => console.warn('setActivePrivateChatRecipient not yet initialized'),
  privateChats: {},
  sendPrivateMessage: () => console.warn('sendPrivateMessage not yet initialized'),
  activeDoctorChatRecipient: null,
  setActiveDoctorChatRecipient: () => console.warn('setActiveDoctorChatRecipient not yet initialized'),
  patientDoctorChats: {},
  sendPatientDoctorMessage: () => console.warn('sendPatientDoctorMessage not yet initialized'),
  doctorProfiles: [],
  updateDoctorAvailability: () => console.warn('updateDoctorAvailability function not yet initialized'),
};

export const AppContext = createContext<IAppContext>(initialAppContext);