import type { DoctorProfile, Consultation, Prescription, Medicine, User, ForumPost, PrivateChatMessage, PatientDoctorChatMessage, AISummary, ChatMessage, ResidentRecord } from './types';

export const Screens = {
  WELCOME: 'WELCOME',
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  PATIENT_HOME: 'PATIENT_HOME',
  SYMPTOM_CHECK: 'SYMPTOM_CHECK',
  CONSULTATIONS: 'CONSULTATIONS',
  PRESCRIPTIONS: 'PRESCRIPTIONS',
  PROFILE: 'PROFILE',
  QR_DISPLAY: 'QR_DISPLAY',
  DOCTOR_DASHBOARD: 'DOCTOR_DASHBOARD',
  CONSULTATION_DETAIL: 'CONSULTATION_DETAIL',
  PRESCRIPTION_FORM: 'PRESCRIPTION_FORM',
  PHARMACY_DASHBOARD: 'PHARMACY_DASHBOARD',
  PHARMACY_SCAN: 'PHARMACY_SCAN',
  RHU_DASHBOARD: 'RHU_DASHBOARD',
  BHW_DASHBOARD: 'BHW_DASHBOARD',
  PATIENT_DETAIL_MANAGEMENT: 'PATIENT_DETAIL_MANAGEMENT',
  FORUM: 'FORUM',
  PROFESSIONALS_DIRECTORY: 'PROFESSIONALS_DIRECTORY',
  PRIVATE_CHAT: 'PRIVATE_CHAT',
  DOCTOR_CHAT: 'DOCTOR_CHAT',
  PATIENT_CONSULTATION_DETAIL: 'PATIENT_CONSULTATION_DETAIL',
  PROFESSIONAL_PROFILE_EDIT: 'PROFESSIONAL_PROFILE_EDIT',
} as const;

export const CHAT_HISTORY_KEY = 'ebotikaChatHistory';
export const SESSION_KEY = 'ebotikaSession';

export const MOCK_USERS: User[] = [
    { id: 'p1', name: 'Juan dela Cruz', email: 'patient@ebotika.ph', password: 'password', role: 'patient', contactNumber: '09123456789', address: '123 Rizal Ave, Manila', avatarUrl: 'https://picsum.photos/id/237/200/200', status: 'active' },
    { 
        id: 'p2', name: 'Anna Reyes', email: 'anna@ebotika.ph', password: 'password', role: 'patient', contactNumber: '09987654321', address: '456 Bonifacio St, Cebu', avatarUrl: 'https://picsum.photos/id/338/200/200', 
        status: 'banned',
        reports: [
            { doctorId: 'd1', doctorName: 'Dr. Maria Dela Cruz', reason: 'Abusive language during chat consultation.', date: '2024-07-28' }
        ]
    },
     { id: 'p3', name: 'Pedro Penduko', email: 'pedro@ebotika.ph', password: 'password', role: 'patient', contactNumber: '09178765432', address: '789 Mabini Blvd, Davao', avatarUrl: 'https://picsum.photos/id/433/200/200', status: 'active' },
    { id: 'd1', name: 'Dr. Maria Dela Cruz', email: 'doctor@ebotika.ph', password: 'password', role: 'doctor', avatarUrl: 'https://picsum.photos/id/1027/200/200', isOnline: true, status: 'active' },
    { id: 'd2', name: 'Dr. Jose Rizal', email: 'doctor2@ebotika.ph', password: 'password', role: 'doctor', avatarUrl: 'https://picsum.photos/id/1005/200/200', isOnline: false, status: 'active' },
    { id: 'd3', name: 'Dr. Gabriela Silang', email: 'doctor3@ebotika.ph', password: 'password', role: 'doctor', avatarUrl: 'https://picsum.photos/id/1011/200/200', isOnline: true, status: 'active' },
    { id: 'ph1', name: 'Botika Pharmacist', email: 'pharmacy@ebotika.ph', password: 'password', role: 'pharmacy', avatarUrl: 'https://picsum.photos/id/10/200/200', isOnline: false, status: 'active' },
    { id: 'a1', name: 'RHU Admin', email: 'admin@ebotika.ph', password: 'password', role: 'admin', avatarUrl: 'https://picsum.photos/id/20/200/200', isOnline: true, status: 'active' },
    { id: 'bhw1', name: 'BHW Maria Clara', email: 'bhw@ebotika.ph', password: 'password', role: 'bhw', avatarUrl: 'https://picsum.photos/id/30/200/200', isOnline: true, status: 'active' },
];

export const MOCK_RESIDENT_RECORDS: ResidentRecord[] = [
    { id: 'res-1', name: 'Juan dela Cruz', contactNumber: '09123456789', address: '123 Rizal Ave, Manila' },
    { id: 'res-2', name: 'Anna Reyes', contactNumber: '09987654321', address: '456 Bonifacio St, Cebu' },
    { id: 'res-3', name: 'Pedro Penduko', contactNumber: '09178765432', address: '789 Mabini Blvd, Davao' },
];


export const MOCK_DOCTORS: DoctorProfile[] = [
    { id: '1', userId: 'd1', name: 'Dr. Maria Dela Cruz', specialty: 'specialty_gp', avatarUrl: 'https://picsum.photos/id/1027/200/200', availability: 'Available' },
    { id: '2', userId: 'd2', name: 'Dr. Jose Rizal', specialty: 'specialty_pedia', avatarUrl: 'https://picsum.photos/id/1005/200/200', availability: 'Available' },
    { id: '3', userId: 'd3', name: 'Dr. Gabriela Silang', specialty: 'specialty_cardio', avatarUrl: 'https://picsum.photos/id/1011/200/200', availability: 'On Leave' },
];

export const MOCK_MEDICINES: Medicine[] = [
    { id: 'med1', name: 'Paracetamol 500mg Tablet' },
    { id: 'med2', name: 'Amoxicillin 250mg Capsule' },
    { id: 'med3', name: 'Salbutamol Nebule' },
    { id: 'med4', name: 'Loratadine 10mg Tablet' },
    { id: 'med5', name: 'Mefenamic Acid 500mg' },
    { id: 'med6', name: 'Carbocisteine 500mg' },
];

const MOCK_PATIENT_1: User = MOCK_USERS.find(u => u.id === 'p1')!;
const MOCK_PATIENT_2: User = MOCK_USERS.find(u => u.id === 'p2')!;


export const MOCK_CONSULTATIONS: Consultation[] = [
    { 
        id: 'c1', 
        patient: MOCK_PATIENT_1,
        date: '2024-07-28', 
        symptoms: ['Fever', 'Headache'], 
        aiSummary: {
            diagnosis_suggestion: 'Possible Viral Infection',
            urgency_level: 'Medium',
            recommendation: 'Monitor symptoms and consult a doctor if they worsen.'
        },
        status: 'Pending Doctor',
        chatHistory: [
            { id: 'ch1', sender: 'user', text: 'I have a fever and a headache.', timestamp: new Date('2024-07-28T10:00:00Z') },
            { id: 'ch2', sender: 'ai', text: 'Okay, I understand. Can you tell me more about the symptoms? For example, when did they start?', timestamp: new Date('2024-07-28T10:00:30Z') },
            { id: 'ch3', sender: 'user', text: 'They started this morning. I also feel a bit weak.', timestamp: new Date('2024-07-28T10:01:00Z') },
            { id: 'ch4', sender: 'ai', text: 'Thank you for that information. Are you experiencing any other symptoms, like a fever or body aches?', timestamp: new Date('2024-07-28T10:01:30Z') },
        ]
    },
    { 
        id: 'c2', 
        patient: MOCK_PATIENT_2,
        date: '2024-07-27', 
        symptoms: ['Cough'], 
        aiSummary: {
            diagnosis_suggestion: 'Common Cold',
            urgency_level: 'Low',
            recommendation: 'Rest and stay hydrated.'
        },
        status: 'Completed',
        doctorNotes: 'Agreed with AI. Prescribed paracetamol.'
    },
];

export const MOCK_PRESCRIPTIONS: Prescription[] = [
    { id: 'p1', consultationId: 'c-approved', patient: MOCK_PATIENT_1, medicine: 'Paracetamol 500mg', dosage: '1 tablet every 6 hours', dateIssued: '2024-07-28', doctorName: 'Dr. Maria Dela Cruz', status: 'Approved' },
    { id: 'p2', consultationId: 'c2', patient: MOCK_PATIENT_2, medicine: 'Amoxicillin 250mg', dosage: '1 capsule every 8 hours for 7 days', dateIssued: '2024-07-25', doctorName: 'Dr. Jose Rizal', status: 'Remitted' },
    { id: 'p3', consultationId: 'c1', patient: MOCK_PATIENT_1, dateIssued: '2024-07-29', doctorName: 'Pending Review', status: 'Pending', aiSummary: MOCK_CONSULTATIONS.find(c => c.id === 'c1')?.aiSummary },
    { id: 'p4', consultationId: 'c-denied', patient: MOCK_PATIENT_1, dateIssued: '2024-07-30', doctorName: 'Dr. Maria Dela Cruz', status: 'Denied', aiSummary: { diagnosis_suggestion: 'Allergic Rhinitis', urgency_level: 'Low', recommendation: 'Take antihistamines.'}, doctorNotes: 'Inappropriate suggestion. Patient needs prescription-strength medication.' }
];

export const MOCK_PHARMACY_WEEKLY_VALIDATIONS = [
    { day: 'Mon', count: 8 },
    { day: 'Tue', count: 12 },
    { day: 'Wed', count: 7 },
    { day: 'Thu', count: 15 },
    { day: 'Fri', count: 11 },
    { day: 'Sat', count: 5 },
    { day: 'Sun', count: 2 },
];

export const MOCK_PHARMACY_TOP_MEDS = [
    { name: 'Paracetamol 500mg Tablet', count: 125 },
    { name: 'Amoxicillin 250mg Capsule', count: 98 },
    { name: 'Loratadine 10mg Tablet', count: 76 },
    { name: 'Salbutamol Nebule', count: 65 },
    { name: 'Mefenamic Acid 500mg', count: 52 },
];

const MOCK_DOCTOR_USER = MOCK_USERS.find(u => u.email === 'doctor@ebotika.ph')!;
const MOCK_PHARMACY_USER = MOCK_USERS.find(u => u.role === 'pharmacy')!;
const MOCK_ADMIN_USER = MOCK_USERS.find(u => u.role === 'admin')!;

export const MOCK_FORUM_POSTS: ForumPost[] = [
    {
        id: 'fp1',
        author: MOCK_ADMIN_USER,
        timestamp: '2024-08-01 09:15 AM',
        content: 'Good morning everyone. Just a reminder about the upcoming health seminar on Saturday. Please encourage your patients to attend.'
    },
    {
        id: 'fp2',
        author: MOCK_DOCTOR_USER,
        timestamp: '2024-08-01 09:30 AM',
        content: 'Noted. We are seeing an increase in flu-like symptoms this week. Has anyone else observed this?'
    },
    {
        id: 'fp3',
        author: MOCK_PHARMACY_USER,
        timestamp: '2024-08-01 09:35 AM',
        content: 'Yes, we\'ve had a run on paracetamol and cough syrup. We have just restocked.'
    }
];

export const MOCK_PRIVATE_CHATS: { [key: string]: PrivateChatMessage[] } = {
    'd1-ph1': [
        { id: 'pm1', senderId: 'd1', recipientId: 'ph1', content: 'Hi, just checking if you have stock of Amoxicillin 500mg.', timestamp: '2024-08-02 10:00 AM' },
        { id: 'pm2', senderId: 'ph1', recipientId: 'd1', content: 'Yes, we have plenty. Is this for a new prescription?', timestamp: '2024-08-02 10:01 AM' },
    ],
    'a1-d1': [
        { id: 'pm3', senderId: 'a1', recipientId: 'd1', content: 'Dr. Dela Cruz, can you please send over the weekly report by EOD?', timestamp: '2024-08-02 11:30 AM' },
    ]
};

export const MOCK_PATIENT_DOCTOR_CHATS: { [key: string]: PatientDoctorChatMessage[] } = {
    '1': [ // Corresponds to Dr. Maria Dela Cruz
        { id: 'pdc1', sender: 'patient', content: 'doctor_chat_mock_patient_1', timestamp: new Date('2024-08-03T11:00:00').toLocaleString() },
        { id: 'pdc2', sender: 'doctor', content: 'doctor_chat_mock_doctor_1', timestamp: new Date('2024-08-03T11:01:00').toLocaleString() },
    ],
    '2': [ // Corresponds to Dr. Jose Rizal
        { id: 'pdc3', sender: 'patient', content: 'doctor_chat_mock_patient_2', timestamp: new Date('2024-08-02T17:30:00').toLocaleString() },
    ]
};


export const MOCK_SYMPTOMS: { key: string, emoji: string }[] = [
    { key: 'symptom_headache', emoji: '🤯' },
    { key: 'symptom_fever', emoji: '🤒' },
    { key: 'symptom_cough', emoji: '🤧' },
    { key: 'symptom_sore_throat', emoji: '😷' },
    { key: 'symptom_body_aches', emoji: '🤕' },
    { key: 'symptom_stomachache', emoji: '🤢' }
];

export const MOCK_AVATARS: string[] = [
    'https://picsum.photos/id/237/200/200',
    'https://picsum.photos/id/338/200/200',
    'https://picsum.photos/id/433/200/200',
    'https://picsum.photos/id/553/200/200',
    'https://picsum.photos/id/577/200/200',
    'https://picsum.photos/id/651/200/200',
    'https://picsum.photos/id/888/200/200',
    'https://picsum.photos/id/918/200/200',
];