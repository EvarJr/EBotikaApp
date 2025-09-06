import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { MockChart, StatCard } from '../../components/Dashboard';
import { Screens } from '../../constants';
import { useTranslation } from '../../hooks/useTranslation';
import type { User } from '../../types';
import { ChevronDownIcon } from '../../components/Icons';

const AddUserModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { addProfessionalUser, t } = useAppContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'doctor' | 'pharmacy'>('doctor');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !password.trim()) {
            alert("Please fill in all fields.");
            return;
        }
        const newUser: Omit<User, 'id' | 'status'> = {
            name,
            email,
            password,
            role,
        };
        addProfessionalUser(newUser);
        alert(t('rhu_user_created_alert', { name }));
        onClose();
    };

    return (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-800">{t('rhu_modal_title')}</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label htmlFor="name" className="block text-xs font-medium text-gray-700">{t('register_fullname_label')}</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-xs font-medium text-gray-700">{t('login_email_label')}</label>
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-xs font-medium text-gray-700">{t('login_password_label')}</label>
                        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm" required />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-xs font-medium text-gray-700">{t('rhu_modal_role_label')}</label>
                        <select id="role" value={role} onChange={e => setRole(e.target.value as 'doctor' | 'pharmacy')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm">
                            <option value="doctor">{t('rhu_modal_role_doctor')}</option>
                            <option value="pharmacy">{t('rhu_modal_role_pharmacy')}</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">{t('guest_modal_cancel')}</button>
                        <button type="submit" className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600">{t('rhu_modal_create_button')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const PatientCard: React.FC<{ patient: User }> = ({ patient }) => {
    const { navigateTo, setActivePatientForManagement, t } = useAppContext();

    const handleReview = () => {
        setActivePatientForManagement(patient);
        navigateTo(Screens.PATIENT_DETAIL_MANAGEMENT);
    };

    const isBanned = patient.status === 'banned';

    return (
        <button 
            onClick={handleReview}
            className={`w-full text-left bg-gray-50 p-2 rounded-md flex justify-between items-center text-sm hover:bg-gray-100 transition ${isBanned ? 'opacity-60' : ''}`}
        >
            <div className="flex items-center space-x-2">
                <img src={patient.avatarUrl || `https://ui-avatars.com/api/?name=${patient.name.replace(' ', '+')}&background=random`} alt={patient.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                    <p className="font-semibold text-gray-800">{patient.name}</p>
                    <p className="text-gray-500">{patient.email}</p>
                </div>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isBanned ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                {isBanned ? t('patient_status_banned') : t('patient_status_active')}
            </span>
        </button>
    );
};


const RHUDashboard: React.FC = () => {
    const { user, logout, navigateTo, t, users, consultations, prescriptions } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [isManagementVisible, setIsManagementVisible] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const weeklyConsultationsData = [
        {name: 'Mon', uv: 10}, 
        {name: 'Tue', uv: 15}, 
        {name: 'Wed', uv: 8}, 
        {name: 'Thu', uv: 22}, 
        {name: 'Fri', uv: 18},
        {name: 'Sat', uv: 9},
        {name: 'Sun', uv: 4},
    ];
    const urgencyData = [{name: 'Urgent', count: 25}, {name: 'Non-Urgent', count: 75}];
    const professionalUsers = users.filter(u => u.role === 'doctor' || u.role === 'pharmacy');
    const patientUsers = users.filter(u => u.role === 'patient');

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleExport = () => {
        setIsExporting(true);
    
        const escapeCsvCell = (cellData: string | undefined | null): string => {
            if (cellData === null || cellData === undefined) {
                return '';
            }
            const str = String(cellData);
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
        };
    
        const headers = [
            'Consultation ID', 'Patient Name', 'Date', 'Symptoms', 
            'AI Diagnosis Suggestion', 'AI Urgency Level', 'AI Recommendation', 'Status',
            'Prescribed Medicine', 'Dosage'
        ];
    
        const rows = consultations.map(c => {
            const prescription = prescriptions.find(p => p.consultationId === c.id);
            
            let medicine = 'N/A';
            let dosage = 'N/A';

            if (prescription) {
                if (prescription.status === 'Approved' || prescription.status === 'Remitted') {
                    medicine = prescription.medicine || 'N/A';
                    dosage = prescription.dosage || 'N/A';
                } else if (prescription.status === 'Pending') {
                    medicine = 'Pending Doctor Review';
                } else if (prescription.status === 'Denied') {
                    medicine = 'Prescription Denied';
                }
            }

            return [
                escapeCsvCell(c.id),
                escapeCsvCell(c.patient.name),
                escapeCsvCell(c.date),
                escapeCsvCell(c.symptoms.join('; ')),
                escapeCsvCell(c.aiSummary?.diagnosis_suggestion),
                escapeCsvCell(c.aiSummary?.urgency_level),
                escapeCsvCell(c.aiSummary?.recommendation),
                escapeCsvCell(c.status),
                escapeCsvCell(medicine),
                escapeCsvCell(dosage)
            ].join(',');
        });
    
        const csvContent = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'ebotika_consultations_export.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setTimeout(() => setIsExporting(false), 1000);
    };

    return (
        <div className="relative flex flex-col h-full">
            {isModalOpen && <AddUserModal onClose={() => setIsModalOpen(false)} />}
            <header className="bg-white p-4 shadow-md z-10">
                 <div className="flex justify-between items-center">
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={() => setIsDropdownOpen(prev => !prev)} className="flex-shrink-0 block">
                            {user?.avatarUrl ? (
                                <img src={user.avatarUrl} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                                <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xl font-bold">
                                    {user?.name?.charAt(0) || 'A'}
                                </div>
                            )}
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-100">
                                <button
                                    onClick={() => {
                                        navigateTo(Screens.PROFESSIONAL_PROFILE_EDIT);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    {t('profile_edit_button')}
                                </button>
                                <button
                                    onClick={logout}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    {t('profile_logout_button')}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="text-right">
                        <h1 className="text-2xl font-bold text-gray-800">RHU Dashboard</h1>
                        <p className="text-sm text-gray-500">Welcome, {user?.name || 'Admin'}</p>
                    </div>
                </div>
                 <div className="mt-3 grid grid-cols-2 gap-2">
                    <button 
                        onClick={() => navigateTo(Screens.FORUM)}
                        className="w-full bg-teal-500 text-white text-sm font-bold py-2 px-4 rounded-lg shadow hover:bg-teal-600 transition"
                    >
                        Professionals Forum
                    </button>
                     <button 
                        onClick={() => navigateTo(Screens.PROFESSIONALS_DIRECTORY)}
                        className="w-full bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
                    >
                        Private Chat
                    </button>
                 </div>
                 <div className="border-t border-gray-200 mt-3 pt-3">
                    <button
                        onClick={() => setIsManagementVisible(prev => !prev)}
                        className="w-full flex justify-between items-center text-left text-sm font-semibold text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100 transition"
                    >
                        <span>{isManagementVisible ? t('rhu_hide_management_button') : t('rhu_show_management_button')}</span>
                        <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isManagementVisible ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4 custom-scrollbar">
                 <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isManagementVisible ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="space-y-4 pb-4">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="font-bold text-lg text-gray-800 mb-2">{t('rhu_user_management_title')}</h2>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition mb-3"
                            >
                                {t('rhu_add_user_button')}
                            </button>
                            <h3 className="font-semibold text-gray-700 text-sm mb-2">{t('rhu_user_list_title')} ({professionalUsers.length})</h3>
                            <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                                {professionalUsers.map(prof => (
                                    <div key={prof.id} className="bg-gray-50 p-2 rounded-md flex justify-between items-center text-sm">
                                        <div>
                                            <p className="font-semibold text-gray-800">{prof.name}</p>
                                            <p className="text-gray-500">{prof.email}</p>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${prof.role === 'doctor' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                            {prof.role}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="font-bold text-lg text-gray-800 mb-2">{t('rhu_patient_management_title')}</h2>
                            <h3 className="font-semibold text-gray-700 text-sm mb-2">{t('rhu_patient_list_title')} ({patientUsers.length})</h3>
                            <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                                {patientUsers.map(patient => (
                                    <PatientCard key={patient.id} patient={patient} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <StatCard title="Consultations" value={86} subtitle="This Week" />
                    <StatCard title="Prescriptions" value={62} subtitle="This Week" />
                </div>
                
                <MockChart data={weeklyConsultationsData} title="Weekly Consultations" />
                <MockChart data={urgencyData} title="Urgency Breakdown" />

                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold text-gray-700 mb-2">Top 5 Prescribed Medicines</h3>
                    <ol className="list-decimal list-inside text-gray-600 text-sm space-y-1">
                        <li>Paracetamol</li>
                        <li>Amoxicillin</li>
                        <li>Salbutamol</li>
                        <li>Loratadine</li>
                        <li>Mefenamic Acid</li>
                    </ol>
                </div>

                <button 
                    onClick={handleExport}
                    disabled={isExporting}
                    className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-green-700 transition disabled:bg-green-400"
                >
                    {isExporting ? t('rhu_exporting_button') : t('rhu_export_button')}
                </button>
            </main>
        </div>
    );
};

export default RHUDashboard;