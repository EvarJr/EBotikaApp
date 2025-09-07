import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Screens } from '../../constants';
import { useTranslation } from '../../hooks/useTranslation';
import type { ResidentRecord } from '../../types';
import { TrashIcon } from '../../components/Icons';

const AddResidentRecordModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { addResidentRecord, t } = useAppContext();
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [validIdFile, setValidIdFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !contactNumber.trim() || !address.trim()) {
            alert("Please fill in all fields.");
            return;
        }
        if (!validIdFile) {
            alert(t('register_id_required_alert'));
            return;
        }
        
        const newRecord: Omit<ResidentRecord, 'id'> = {
            name,
            contactNumber,
            address,
            validIdUrl: URL.createObjectURL(validIdFile),
        };

        addResidentRecord(newRecord);
        alert(t('bhw_record_created_alert', { name }));
        onClose();
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setValidIdFile(e.target.files[0]);
        }
    };

    return (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-800">{t('bhw_modal_add_title')}</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t('register_fullname_label')} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" required />
                    <input type="tel" value={contactNumber} onChange={e => setContactNumber(e.target.value)} placeholder={t('register_phone_label')} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" required />
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder={t('register_address_label')} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" required />
                    <div>
                        <label className="block text-xs font-medium text-gray-700">{t('register_valid_id_label')}</label>
                        <p className="text-xs text-gray-500 mb-1">{t('register_valid_id_prompt')}</p>
                        <label htmlFor="id-upload-bhw" className="w-full text-center cursor-pointer bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50">
                            {t('register_upload_button')}
                            <input id="id-upload-bhw" name="id-upload-bhw" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                        </label>
                        <p className="text-xs text-center text-gray-500 mt-1 truncate">
                            {validIdFile ? t('register_file_chosen', { fileName: validIdFile.name }) : t('register_no_file_chosen')}
                        </p>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">{t('guest_modal_cancel')}</button>
                        <button type="submit" className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600">{t('bhw_modal_add_button')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ResidentRecordCard: React.FC<{ record: ResidentRecord }> = ({ record }) => {
    const { deleteResidentRecord, t } = useAppContext();

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm(t('bhw_delete_confirm_text'))) {
            deleteResidentRecord(record.id);
        }
    };

    return (
        <div className="w-full text-left bg-gray-50 p-2 rounded-md flex justify-between items-center text-sm">
            <div>
                <p className="font-semibold text-gray-800">{record.name}</p>
                <p className="text-gray-500">{record.address}</p>
            </div>
            <button
                onClick={handleDelete}
                className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                aria-label={`Delete record for ${record.name}`}
            >
                <TrashIcon />
            </button>
        </div>
    );
};


const BHWDashboard: React.FC = () => {
    const { user, logout, navigateTo, t, residentRecords } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

    return (
        <div className="relative flex flex-col h-full">
            {isModalOpen && <AddResidentRecordModal onClose={() => setIsModalOpen(false)} />}
            <header className="bg-white p-4 shadow-md z-10">
                 <div className="flex justify-between items-center">
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={() => setIsDropdownOpen(prev => !prev)} className="flex-shrink-0 block">
                            {user?.avatarUrl ? (
                                <img src={user.avatarUrl} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                                <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xl font-bold">
                                    {user?.name?.charAt(0) || 'B'}
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
                        <h1 className="text-2xl font-bold text-gray-800">{t('bhw_dashboard_title')}</h1>
                        <p className="text-sm text-gray-500">Welcome, {user?.name || 'BHW'}</p>
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
            </header>
            <main className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4 custom-scrollbar">
                <div className="bg-white p-4 rounded-lg shadow">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow hover:bg-blue-600 transition mb-3"
                    >
                        {t('bhw_add_resident_record_button')}
                    </button>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="font-bold text-lg text-gray-800 mb-2">{t('bhw_resident_record_list_title')} ({residentRecords.length})</h2>
                    <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                        {residentRecords.length > 0 ? (
                            residentRecords.map(record => (
                                <ResidentRecordCard key={record.id} record={record} />
                            ))
                        ) : (
                            <p className="text-center text-sm text-gray-500 py-4">No resident records added yet.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BHWDashboard;