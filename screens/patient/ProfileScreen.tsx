import React, { useState } from 'react';
import { PatientLayout } from '../../components/Layout';
import { useAppContext } from '../../hooks/useAppContext';
import { LogoutIcon, EditIcon, PhoneIcon, MapPinIcon, UserIcon, UsersIcon, CheckIcon } from '../../components/Icons';
import { Screens, MOCK_AVATARS } from '../../constants';
import { useTranslation } from '../../hooks/useTranslation';

const GuestProfileForm: React.FC = () => {
    const { updateGuestDetails, navigateTo } = useAppContext();
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [validIdFile, setValidIdFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setValidIdFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!name.trim() || !contactNumber.trim() || !address.trim()){
            alert("Please fill in all details.");
            return;
        }
        if (!validIdFile) {
            alert(t('register_id_required_alert'));
            return;
        }
        updateGuestDetails({ name, contactNumber, address, validIdFile });
        alert(t('profile_details_saved_alert'));
        navigateTo(Screens.PATIENT_HOME);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800">{t('profile_guest_form_title')}</h2>
            <p className="text-sm text-gray-600 mb-4">{t('profile_guest_form_prompt')}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('register_fullname_label')}</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" required />
                </div>
                <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700">{t('guest_modal_contact_label')}</label>
                    <input type="tel" id="contact" value={contactNumber} onChange={e => setContactNumber(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" required />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">{t('guest_modal_address_label')}</label>
                    <textarea id="address" rows={3} value={address} onChange={e => setAddress(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('register_valid_id_label')}</label>
                    <p className="text-xs text-gray-500 mb-2">{t('register_valid_id_prompt')}</p>
                    <label htmlFor="id-upload-profile" className="w-full text-center cursor-pointer bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50">
                        {t('register_upload_button')}
                        <input id="id-upload-profile" name="id-upload-profile" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                    </label>
                    <p className="text-xs text-center text-gray-500 mt-1">
                        {validIdFile ? t('register_file_chosen', { fileName: validIdFile.name }) : t('register_no_file_chosen')}
                    </p>
                </div>
                <button type="submit" className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300">
                    {t('profile_guest_form_save_button')}
                </button>
            </form>
        </div>
    );
};

const SettingRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="flex justify-between items-center py-3">
        <span className="text-gray-700">{label}</span>
        {children}
    </div>
);

const InfoRow: React.FC<{ 
    icon: React.ReactNode; 
    value: string | undefined; 
    label: string;
    isEditing: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
}> = ({ icon, value, isEditing, onChange, name, label }) => {
    const { t } = useTranslation();
    return (
        <div className="flex justify-between items-center py-3">
            <div className="flex items-center w-full">
                <div className="text-gray-500">{icon}</div>
                {isEditing ? (
                    <input 
                        type={name === 'contactNumber' ? 'tel' : 'text'}
                        name={name}
                        value={value || ''} 
                        onChange={onChange}
                        aria-label={label}
                        className="ml-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-md px-2 py-1 w-full"
                    />
                ) : (
                    <span className="ml-3 text-gray-800 truncate">{value || t('profile_info_not_set')}</span>
                )}
            </div>
        </div>
    );
};

const AvatarSelectionModal: React.FC<{ onSelect: (url: string) => void; onClose: () => void; }> = ({ onSelect, onClose }) => (
    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">Select an Avatar</h3>
            <div className="grid grid-cols-4 gap-4">
                {MOCK_AVATARS.map(url => (
                    <button key={url} onClick={() => onSelect(url)} className="rounded-full overflow-hidden w-16 h-16 ring-2 ring-transparent hover:ring-teal-500 transition">
                        <img src={url} alt="Avatar option" className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    </div>
);

const PaymentModal: React.FC<{
    onClose: () => void;
    onPaymentSuccess: (plan: 'individual' | 'family') => void;
    plan: 'individual' | 'family';
    price: number;
}> = ({ onClose, onPaymentSuccess, plan, price }) => {
    const { t } = useTranslation();
    const [isProcessing, setIsProcessing] = useState(false);
    const [gcashNumber, setGcashNumber] = useState('');

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!/^(09)\d{9}$/.test(gcashNumber)) {
            alert('Please enter a valid 11-digit mobile number starting with 09.');
            return;
        }
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            alert(t('payment_success_alert'));
            onPaymentSuccess(plan);
            onClose();
        }, 2000);
    };
    
    const GcashLogo = () => (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#0070FF"/>
            <path d="M12 17.5C9.51472 17.5 7.5 15.4853 7.5 13V11C7.5 8.51472 9.51472 6.5 12 6.5C14.4853 6.5 16.5 8.51472 16.5 11V11.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M14.5 13.5L12 11.5L9.5 13.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    return (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-center mb-2">
                    <GcashLogo />
                </div>
                <h2 className="text-xl font-bold text-gray-800 text-center">{t('payment_modal_title')}</h2>
                <p className="text-sm text-gray-600 mt-1 text-center capitalize">{plan} Plan</p>
                <div className="my-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-lg text-center">
                    <p className="font-semibold text-blue-800">{t('payment_modal_price', { price })}</p>
                </div>
                <form onSubmit={handlePayment} className="space-y-3">
                    <div>
                        <label htmlFor="gcashNumber" className="block text-xs font-medium text-gray-700">{t('payment_modal_gcash_number_label')}</label>
                        <input 
                            type="tel" 
                            id="gcashNumber" 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" 
                            required 
                            placeholder="09XXXXXXXXX"
                            value={gcashNumber}
                            onChange={(e) => setGcashNumber(e.target.value)}
                        />
                    </div>
                    
                    <div className="pt-2">
                        <button type="submit" disabled={isProcessing} className="w-full bg-blue-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300">
                            {isProcessing ? t('payment_modal_processing_button') : t('payment_modal_pay_button_gcash', { price })}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const UserProfileView: React.FC = () => {
    const { logout, user, users, language, setLanguage, updateUserProfile, upgradeUserSubscription } = useAppContext();
    const { t } = useTranslation();
    
    const [isEditing, setIsEditing] = useState(false);
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const [paymentPlan, setPaymentPlan] = useState<'individual' | 'family' | null>(null);
    const [editableUser, setEditableUser] = useState(user!);

    if (!user) return null;
    
    const familyMembers = user.familyId ? users.filter(u => u.familyId === user.familyId && u.id !== user.id) : [];

    const handleEdit = () => {
        setEditableUser(user);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = () => {
        updateUserProfile(editableUser);
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditableUser(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarSelect = (url: string) => {
        setEditableUser(prev => ({ ...prev, avatarUrl: url }));
        setIsAvatarModalOpen(false);
    };
    
    const handleUpgradeSuccess = (plan: 'individual' | 'family') => {
        upgradeUserSubscription(user.id, plan);
    };

    const handleUpgradeClick = (plan: 'individual' | 'family') => {
        setPaymentPlan(plan);
    };

    const SubscriptionPlanCard: React.FC<{
        plan: 'individual' | 'family';
        price: number;
        titleKey: string;
        featureKeys: string[];
        icon: React.ReactNode;
        isRecommended?: boolean;
    }> = ({ plan, price, titleKey, featureKeys, icon, isRecommended = false }) => (
        <div className={`relative border-2 rounded-xl p-5 flex flex-col ${isRecommended ? 'border-teal-500 bg-teal-50/50' : 'border-gray-200 bg-white'}`}>
            {isRecommended && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {t('best_value_banner')}
                </div>
            )}
            <div className="flex items-center">
                <div className={`p-2 rounded-lg ${isRecommended ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-600'}`}>
                    {icon}
                </div>
                <h4 className="font-bold text-lg text-gray-800 ml-3">{t(titleKey)}</h4>
            </div>

            <p className="font-extrabold text-4xl text-gray-800 my-4 text-center">
                ₱{price}<span className="text-base font-medium text-gray-500">/mo</span>
            </p>

            <ul className="space-y-2 text-sm text-gray-600 flex-grow mb-5">
                {featureKeys.map((key) => (
                    <li key={key} className="flex items-center">
                        <CheckIcon />
                        <span>{t(key)}</span>
                    </li>
                ))}
            </ul>

            <button 
                onClick={() => handleUpgradeClick(plan)} 
                className={`mt-auto w-full font-bold py-3 px-4 rounded-lg transition ${isRecommended ? 'bg-teal-500 text-white hover:bg-teal-600 shadow-md' : 'bg-white text-teal-500 border-2 border-teal-500 hover:bg-teal-50'}`}
            >
                {t('profile_upgrade_button')}
            </button>
        </div>
    );


    const ToggleSwitch = () => (
        <label htmlFor="toggle" className="flex items-center cursor-pointer">
            <div className="relative">
                <input type="checkbox" id="toggle" className="sr-only peer" defaultChecked />
                <div className="block bg-gray-200 w-12 h-7 rounded-full peer-checked:bg-teal-500 transition"></div>
                <div className="dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition transform peer-checked:translate-x-full"></div>
            </div>
        </label>
    );
    
    const currentUserForDisplay = isEditing ? editableUser : user;

    return (
        <div className="space-y-6">
            {isAvatarModalOpen && <AvatarSelectionModal onSelect={handleAvatarSelect} onClose={() => setIsAvatarModalOpen(false)} />}
            {paymentPlan && (
                <PaymentModal 
                    onClose={() => setPaymentPlan(null)} 
                    onPaymentSuccess={handleUpgradeSuccess}
                    plan={paymentPlan}
                    price={paymentPlan === 'individual' ? 49 : 199}
                />
            )}
            <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="relative w-24 h-24 mx-auto">
                    {currentUserForDisplay.avatarUrl ? (
                         <img src={currentUserForDisplay.avatarUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover ring-4 ring-white" />
                    ) : (
                        <div className="w-24 h-24 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-4xl font-bold ring-4 ring-white">
                            {currentUserForDisplay.name.charAt(0)}
                        </div>
                    )}
                    {isEditing && (
                        <button 
                            onClick={() => setIsAvatarModalOpen(true)}
                            className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white text-xs font-bold hover:bg-opacity-60 transition"
                        >
                            {t('profile_change_avatar_button')}
                        </button>
                    )}
                </div>
                
                {isEditing ? (
                    <div className="mt-4 space-y-2 max-w-xs mx-auto">
                        <input
                            type="text"
                            name="name"
                            value={editableUser.name}
                            onChange={handleChange}
                            className="text-2xl font-bold text-gray-800 text-center w-full bg-gray-50 border rounded-md p-1"
                            aria-label="Full Name"
                        />
                        <input
                            type="email"
                            name="email"
                            value={editableUser.email}
                            onChange={handleChange}
                            className="text-gray-500 text-center w-full bg-gray-50 border rounded-md p-1"
                            aria-label="Email Address"
                        />
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mt-4 text-gray-800">{user.name}</h2>
                        <p className="text-gray-500">{user.email}</p>
                    </>
                )}
                 {user.isPremium && (
                    <div className="mt-2 inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded-full capitalize">
                        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        {user.subscriptionType} Plan
                    </div>
                )}
            </div>

            {user.isPremium && (
                <div className="bg-white p-4 rounded-lg shadow text-center">
                    <div className="text-center bg-teal-50 border border-teal-200 text-teal-800 text-sm font-semibold px-2.5 py-2 rounded-lg">
                        <p>{t('profile_consultation_credits', { count: user.monthlyConsultationCredits || 0 })}</p>
                    </div>
                </div>
            )}
            
             {user.subscriptionType === 'family' && (
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold text-lg text-gray-800">{t('family_management_title')}</h3>
                    <p className="text-sm text-gray-500 mb-3">{t('family_members_list')}:</p>
                    <div className="space-y-2">
                        {familyMembers.length > 0 ? familyMembers.map(member => (
                            <div key={member.id} className="bg-gray-50 p-2 rounded-md flex items-center space-x-2">
                                <img src={member.avatarUrl} alt={member.name} className="w-8 h-8 rounded-full object-cover"/>
                                <span className="text-gray-700 font-medium">{member.name}</span>
                            </div>
                        )) : (
                            <p className="text-sm text-gray-500 text-center">No other members in your family plan yet.</p>
                        )}
                    </div>
                </div>
            )}

            {!user.isPremium && (
                 <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold text-lg text-gray-800 text-center">{t('profile_upgrade_prompt_title')}</h3>
                    <div className="mt-4 grid grid-cols-1 gap-6">
                        <SubscriptionPlanCard 
                            plan="individual"
                            price={49}
                            titleKey="individual_plan_title"
                            icon={<UserIcon />}
                            featureKeys={[
                                'individual_plan_feature_1',
                                'individual_plan_feature_2'
                            ]}
                        />
                        <SubscriptionPlanCard 
                            plan="family"
                            price={199}
                            titleKey="family_plan_title"
                            icon={<UsersIcon />}
                            featureKeys={[
                                'family_plan_feature_1',
                                'family_plan_feature_2',
                                'family_plan_feature_3',
                            ]}
                            isRecommended={true}
                        />
                    </div>
                </div>
            )}

            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-1 text-gray-800 px-2">{t('profile_info_title')}</h3>
                <div className="divide-y divide-gray-100 px-2">
                    <InfoRow 
                        icon={<PhoneIcon />} 
                        value={editableUser.contactNumber} 
                        isEditing={isEditing} 
                        onChange={handleChange} 
                        name="contactNumber"
                        label={t('guest_modal_contact_label')}
                    />
                    <InfoRow 
                        icon={<MapPinIcon />} 
                        value={editableUser.address} 
                        isEditing={isEditing}
                        onChange={handleChange}
                        name="address"
                        label={t('guest_modal_address_label')}
                    />
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-1 text-gray-800 px-2">{t('profile_settings_title')}</h3>
                <div className="divide-y divide-gray-100 px-2">
                    <SettingRow label={t('profile_settings_language')}>
                        <select
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as 'English' | 'Aklanon')}
                            className="border-gray-300 rounded-md p-1 focus:ring-teal-500 focus:border-teal-500 text-sm"
                        >
                            <option>English</option>
                            <option>Aklanon</option>
                        </select>
                    </SettingRow>
                    <SettingRow label={t('profile_settings_notifications')}>
                        <ToggleSwitch />
                    </SettingRow>
                </div>
            </div>
            
            {isEditing ? (
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={handleCancel}
                        className="w-full flex items-center justify-center bg-white text-gray-700 font-bold py-3 px-4 rounded-lg shadow hover:bg-gray-100 transition border"
                    >
                        {t('profile_cancel_button')}
                    </button>
                    <button
                        onClick={handleSave}
                        className="w-full flex items-center justify-center bg-teal-500 text-white font-bold py-3 px-4 rounded-lg shadow hover:bg-teal-600 transition"
                    >
                        {t('profile_save_button')}
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                     <button
                        onClick={handleEdit}
                        className="w-full flex items-center justify-center bg-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow hover:bg-blue-600 transition"
                    >
                        <EditIcon />
                        <span className="ml-2">{t('profile_edit_button')}</span>
                    </button>
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center bg-white text-red-500 font-bold py-3 px-4 rounded-lg shadow hover:bg-red-50 transition duration-300 border border-red-100"
                    >
                        <LogoutIcon />
                        <span className="ml-2">{t('profile_logout_button')}</span>
                    </button>
                </div>
            )}
        </div>
    );
}


const ProfileScreen: React.FC = () => {
    const { role } = useAppContext();
    const { t } = useTranslation();
    
  return (
    <PatientLayout title={t('profile_title')}>
        {role === 'patient' ? <UserProfileView /> : <GuestProfileForm />}
    </PatientLayout>
  );
};

export default ProfileScreen;