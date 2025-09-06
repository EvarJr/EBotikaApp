import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screens } from '../constants';
import { ArrowLeftIcon, LogoIcon } from '../components/Icons';
import { useTranslation } from '../hooks/useTranslation';

const LoginScreen: React.FC = () => {
    const { login, navigateTo, users } = useAppContext();
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const userToLogin = users.find(
            user => user.email === email && user.password === password
        );

        if (userToLogin) {
            if (userToLogin.status === 'banned') {
                setError(t('login_banned_error'));
                return;
            }
            login(userToLogin.role, userToLogin);
        } else {
            setError(t('login_error'));
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <header className="bg-white p-4 shadow-md z-10 flex items-center">
                <button onClick={() => navigateTo(Screens.WELCOME)} className="text-gray-600 hover:text-gray-800 mr-4">
                    <ArrowLeftIcon />
                </button>
                <h1 className="text-xl font-bold text-gray-800">{t('login_title')}</h1>
            </header>
            <main className="flex-1 overflow-y-auto p-6 flex flex-col items-center custom-scrollbar">
                <LogoIcon />
                <h2 className="text-2xl font-bold text-gray-800 mt-4">{t('login_greeting')}</h2>
                <form onSubmit={handleSubmit} className="w-full space-y-4 mt-8">
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
                    
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300"
                        >
                            {t('welcome_login_button')}
                        </button>
                    </div>
                </form>
                 <div className="text-xs text-gray-400 mt-4 text-center">
                    <p>{t('login_hint')}</p>
                    <p>{t('login_hint_example')}</p>
                </div>
            </main>
        </div>
    );
};

export default LoginScreen;