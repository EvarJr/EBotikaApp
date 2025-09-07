import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { QRIcon } from '../../components/Icons';
import { MockChart } from '../../components/Dashboard';
import { MOCK_PHARMACY_WEEKLY_VALIDATIONS, MOCK_PHARMACY_TOP_MEDS, Screens } from '../../constants';
import { useTranslation } from '../../hooks/useTranslation';

const PharmacyDashboard: React.FC = () => {
    const { user, logout, navigateTo, prescriptions } = useAppContext();
    const { t } = useTranslation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

        const remittedPrescriptions = prescriptions.filter(p => p.status === 'Remitted');

        const escapeCsvCell = (cellData: string | undefined | null): string => {
            if (cellData === null || cellData === undefined) return '';
            const str = String(cellData);
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
        };

        const headers = [
            'Prescription ID', 'Date Remitted', 'Patient Name', 
            'Medicine', 'Dosage', 'Issuing Doctor'
        ];

        const rows = remittedPrescriptions.map(p => [
            escapeCsvCell(p.id),
            escapeCsvCell(p.dateIssued), // Assuming dateIssued is the date of remission for this mock
            escapeCsvCell(p.patient.name),
            escapeCsvCell(p.medicine),
            escapeCsvCell(p.dosage),
            escapeCsvCell(p.doctorName),
        ].join(','));

        const csvContent = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'ebotika_pharmacy_remitted_export.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setTimeout(() => setIsExporting(false), 1000);
    };

    return (
        <div className="flex flex-col h-full">
            <header className="bg-white p-4 shadow-md z-10">
                 <div className="flex justify-between items-center">
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={() => setIsDropdownOpen(prev => !prev)} className="flex-shrink-0 block">
                            {user?.avatarUrl ? (
                                <img src={user.avatarUrl} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                                <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xl font-bold">
                                    {user?.name?.charAt(0) || 'P'}
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
                        <h1 className="text-2xl font-bold text-gray-800">Pharmacy Dashboard</h1>
                        <p className="text-sm text-gray-500">Welcome, {user?.name || 'Pharmacist'}</p>
                    </div>
                </div>
                 <div className="mt-2 grid grid-cols-2 gap-2">
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
            </header>
            <main className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-6 custom-scrollbar">
                <button
                    onClick={() => navigateTo(Screens.PHARMACY_SCAN)}
                    className="w-full flex items-center justify-center bg-blue-500 text-white font-bold py-4 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition"
                >
                    <QRIcon />
                    <span className="ml-3 text-lg">Scan Prescription QR</span>
                </button>
                
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-3">Portal Analytics & Activity</h2>
                    
                    <div className="space-y-4">
                        <MockChart data={MOCK_PHARMACY_WEEKLY_VALIDATIONS} title="Weekly Validations" />

                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="font-bold text-gray-700 mb-2">Top 5 Dispensed Medicines</h3>
                            <ol className="list-decimal list-inside text-gray-600 text-sm space-y-1">
                                {MOCK_PHARMACY_TOP_MEDS.map(med => (
                                    <li key={med.name}><span className="font-semibold">{med.name}</span> - {med.count} dispensed</li>
                                ))}
                            </ol>
                        </div>
                    
                        <div className="bg-white p-3 rounded-lg shadow">
                             <h3 className="font-bold text-gray-700 mb-2">Recent Activity</h3>
                            <div className="space-y-2 text-sm">
                                <p>✅ Validated: Paracetamol for J. Cruz</p>
                                <p>❌ Invalid Scan Attempt</p>
                                <p>✅ Validated: Amoxicillin for A. Reyes</p>
                            </div>
                        </div>
                    </div>
                </div>
                 <button 
                    onClick={handleExport}
                    disabled={isExporting}
                    className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-green-700 transition disabled:bg-green-400"
                >
                    {isExporting ? t('pharmacy_exporting_button') : t('pharmacy_export_button')}
                </button>
            </main>
        </div>
    );
};

export default PharmacyDashboard;