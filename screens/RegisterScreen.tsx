import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screens } from '../constants';
import type { User } from '../types';
import { ArrowLeftIcon, LogoIcon } from '../components/Icons';
import { useTranslation } from '../hooks/useTranslation';

const RegisterScreen: React.FC = () => {
    const { login, navigateTo, t, isGuestUpgrading } = useAppContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !password.trim() || !phoneNumber.trim() || !address.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        const newUser: User = {
            id: `user-${Date.now()}`,
            name,
            email,
            contactNumber: phoneNumber,
            address,
            role: 'patient',
            status: 'active',
        };

        // In a real app, you would have a registration API call here.
        // After successful registration, you'd log the user in.
        alert(`Registration successful for ${name}! Welcome.`);
        login('patient', newUser);
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <header className="bg-white p-4 shadow-md z-10 flex items-center">
                <button onClick={() => navigateTo(Screens.WELCOME)} className="text-gray-600 hover:text-gray-800 mr-4">
                    <ArrowLeftIcon />
                </button>
                <h1 className="text-xl font-bold text-gray-800">{t('register_title')}</h1>
            </header>
            <main className="flex-1 overflow-y-auto p-6 flex flex-col items-center custom-scrollbar">
                {isGuestUpgrading && (
                    <div className="w-full bg-blue-100 text-blue-800 p-3 rounded-md text-center mb-6 text-sm">
                        {t('register_guest_upgrade_message')}
                    </div>
                )}
                <LogoIcon />
                <h2 className="text-2xl font-bold text-gray-800 mt-4">{t('register_greeting')}</h2>
                <form onSubmit={handleSubmit} className="w-full space-y-4 mt-8">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('register_fullname_label')}</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('login_email_label')}</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t('register_phone_label')}</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">{t('register_address_label')}</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t('login_password_label')}</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                            required
                        />
                    </div>
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300"
                        >
                            {t('welcome_register_button')}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default RegisterScreen;