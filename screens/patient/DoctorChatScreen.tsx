import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Screens } from '../../constants';
import type { PatientDoctorChatMessage } from '../../types';
import { ArrowLeftIcon, SendIcon } from '../../components/Icons';
import { useTranslation } from '../../hooks/useTranslation';

const ChatBubble: React.FC<{ message: PatientDoctorChatMessage }> = ({ message }) => {
  const { t } = useTranslation();
  const isPatient = message.sender === 'patient';
  return (
    <div className={`flex ${isPatient ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${
          isPatient
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        <p className="whitespace-pre-wrap">{t(message.content)}</p>
        <p className={`text-xs mt-1 ${isPatient ? 'text-blue-100' : 'text-gray-500'} text-right`}>
            {message.timestamp.substring(message.timestamp.indexOf(',') + 2)}
        </p>
      </div>
    </div>
  );
};


const DoctorChatScreen: React.FC = () => {
    const { 
        navigateTo, 
        activeDoctorChatRecipient, 
        patientDoctorChats, 
        sendPatientDoctorMessage, 
        setActiveDoctorChatRecipient 
    } = useAppContext();
    const { t } = useTranslation();
    const [newMessage, setNewMessage] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    const messages = activeDoctorChatRecipient ? patientDoctorChats[activeDoctorChatRecipient.id] || [] : [];
    
    useEffect(scrollToBottom, [messages]);
    
    const handleBack = () => {
        setActiveDoctorChatRecipient(null); // Clear the recipient when leaving
        navigateTo(Screens.PATIENT_HOME);
    };
    
    const handleSend = () => {
        if (!newMessage.trim() || !activeDoctorChatRecipient) return;
        sendPatientDoctorMessage(activeDoctorChatRecipient.id, newMessage);
        setNewMessage('');
    };
    
    if (!activeDoctorChatRecipient) {
        return (
             <div className="flex flex-col h-full items-center justify-center">
                <p className="text-red-500">{t('doctor_chat_error_title')}</p>
                <button onClick={handleBack} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
                    {t('doctor_chat_error_button')}
                </button>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col h-full bg-gray-100">
            <header className="bg-white p-4 shadow-md z-10 flex items-center">
                <button onClick={handleBack} className="text-gray-600 hover:text-gray-800 mr-4">
                    <ArrowLeftIcon />
                </button>
                <img src={activeDoctorChatRecipient.avatarUrl} alt={activeDoctorChatRecipient.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <h1 className="text-xl font-bold text-gray-800">{activeDoctorChatRecipient.name}</h1>
                    <p className="text-xs text-gray-500 capitalize">{t(activeDoctorChatRecipient.specialty)}</p>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                 <div className="space-y-4">
                    {messages.map(msg => <ChatBubble key={msg.id} message={msg} />)}
                    <div ref={chatEndRef} />
                 </div>
            </main>
            <footer className="bg-white p-2 border-t border-gray-200">
                 <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={t('doctor_chat_placeholder', { name: activeDoctorChatRecipient.name })}
                        className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!newMessage.trim()}
                        className="bg-teal-500 text-white rounded-full p-3 disabled:bg-gray-300 hover:bg-teal-600 transition"
                    >
                        <SendIcon />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default DoctorChatScreen;