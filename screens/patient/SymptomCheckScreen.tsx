import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { streamChatResponse } from '../../services/geminiService';
import type { ChatMessage, AISummary, Consultation, User, Prescription } from '../../types';
import { SendIcon, ArrowLeftIcon } from '../../components/Icons';
import { Screens, CHAT_HISTORY_KEY } from '../../constants';
import { AISummaryCard } from '../../components/AISummaryCard';
import { useTranslation } from '../../hooks/useTranslation';

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-teal-500 text-white rounded-bl-none'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};

const GuestDetailsModal: React.FC<{ onClose: () => void; onSubmit: (details: { name: string, contactNumber: string, address: string, validIdFile: File }) => void; }> = ({ onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [validIdFile, setValidIdFile] = useState<File | null>(null);
    const { t } = useTranslation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !contactNumber.trim() || !address.trim()) {
            alert("Please fill in all details.");
            return;
        }
        if (!validIdFile) {
            alert(t('guest_modal_id_required_alert'));
            return;
        }
        onSubmit({ name, contactNumber, address, validIdFile });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setValidIdFile(e.target.files[0]);
        }
    };

    return (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                <h2 className="text-xl font-bold mb-2 text-gray-800">{t('guest_modal_title')}</h2>
                <p className="text-sm text-gray-600 mb-4">{t('guest_modal_prompt')}</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label htmlFor="name" className="block text-xs font-medium text-gray-700">{t('register_fullname_label')}</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm" required />
                    </div>
                    <div>
                        <label htmlFor="contact" className="block text-xs font-medium text-gray-700">{t('guest_modal_contact_label')}</label>
                        <input type="tel" id="contact" value={contactNumber} onChange={e => setContactNumber(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm" required />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-xs font-medium text-gray-700">{t('guest_modal_address_label')}</label>
                        <input id="address" value={address} onChange={e => setAddress(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm" required />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700">{t('register_valid_id_label')}</label>
                         <p className="text-xs text-gray-500 mb-1">{t('register_valid_id_prompt')}</p>
                        <label htmlFor="id-upload-modal" className="w-full text-center cursor-pointer bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50">
                            {t('register_upload_button')}
                            <input id="id-upload-modal" name="id-upload-modal" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                        </label>
                        <p className="text-xs text-center text-gray-500 mt-1 truncate">
                            {validIdFile ? t('register_file_chosen', { fileName: validIdFile.name }) : t('register_no_file_chosen')}
                        </p>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">{t('guest_modal_cancel')}</button>
                        <button type="submit" className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600">{t('guest_modal_save')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const SymptomCheckScreen: React.FC = () => {
    const { navigateTo, symptom, user, role, updateGuestDetails, addConsultation, addPrescription, language, residentRecords, useConsultationCredit } = useAppContext();
    const { t } = useTranslation();
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
    
    const [messages, setMessages] = useState<ChatMessage[]>(() => {
        try {
            const saved = localStorage.getItem(CHAT_HISTORY_KEY);
            return saved ? JSON.parse(saved).messages || [] : [];
        } catch (e) { return []; }
    });
    const [summary, setSummary] = useState<AISummary | null>(() => {
        try {
            const saved = localStorage.getItem(CHAT_HISTORY_KEY);
            return saved ? JSON.parse(saved).summary || null : null;
        } catch (e) { return null; }
    });
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    useEffect(() => {
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify({ messages, summary }));
    }, [messages, summary]);

    useEffect(scrollToBottom, [messages, isLoading, summary]);
    
    useEffect(() => {
        if(symptom && messages.length === 0) {
            handleSend(symptom);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const createAndSubmitConsultation = (currentUser: User) => {
        if (!summary) return;
        
        const timestamp = Date.now();
        const newConsultation: Consultation = {
            id: `consult-${timestamp}`,
            patient: currentUser,
            date: new Date().toISOString().split('T')[0],
            symptoms: messages.filter(m => m.sender === 'user').map(m => m.text),
            aiSummary: summary,
            status: 'Pending Doctor',
            chatHistory: messages, // Save the full chat history
        };
        addConsultation(newConsultation);

        const newPrescription: Prescription = {
            id: `rx-${timestamp}`,
            consultationId: newConsultation.id,
            patient: currentUser,
            aiSummary: summary,
            dateIssued: new Date().toISOString().split('T')[0],
            doctorName: 'Pending Review',
            status: 'Pending',
        };
        addPrescription(newPrescription);

        alert(t('consultation_sent_alert'));
        navigateTo(Screens.CONSULTATIONS);
    };

    const handleSendToDoctor = () => {
        if (role === 'guest') {
            setIsGuestModalOpen(true);
            return;
        }

        if (user) {
            if (!user.isPremium) {
                alert(t('upgrade_for_consultation_alert_non_premium'));
                return;
            }
            if (user.isPremium && (user.monthlyConsultationCredits || 0) <= 0) {
                alert(t('upgrade_for_consultation_alert_no_credits'));
                return;
            }

            // If premium and has credits, proceed
            useConsultationCredit(user.id);
            createAndSubmitConsultation(user);
        }
    };

    const handleGuestSubmit = (details: { name: string; contactNumber: string; address: string; validIdFile: File }) => {
        const isVerified = residentRecords.some(record =>
            record.name.trim().toLowerCase() === details.name.trim().toLowerCase()
        );

        if (!isVerified) {
            alert(t('guest_not_verified_error'));
            return;
        }
        
        // For guests, upgrading is the only path to consult a doctor.
        // This UX can be improved later, but for now, we alert them.
        alert(t('upgrade_for_consultation_alert_non_premium'));
        const newPatientUser = updateGuestDetails(details);
        setIsGuestModalOpen(false);
        // We don't submit the consultation, just save their details and let them upgrade from profile.
        navigateTo(Screens.PROFILE);
    };

    const handleSend = async (prefilledSymptom?: string) => {
        const textToSend = prefilledSymptom || input;
        if (!textToSend.trim() || isLoading) return;
        const newUserMessage: ChatMessage = { id: `user-${Date.now()}`, text: textToSend, sender: 'user', timestamp: new Date() };
        const updatedMessages = [...messages, newUserMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        const aiMessageId = `ai-${Date.now()}`;
        setMessages(prev => [...prev, { id: aiMessageId, text: '...', sender: 'ai', timestamp: new Date() }]);
        
        let aiResponseText = '';
        try {
            const stream = streamChatResponse(updatedMessages, language);
            for await (const chunk of stream) {
                aiResponseText += chunk;
                setMessages(prev => prev.map(m => m.id === aiMessageId ? {...m, text: aiResponseText} : m));
            }

            try {
                const parsedSummary = JSON.parse(aiResponseText);
                if (parsedSummary.diagnosis_suggestion) {
                    setSummary(parsedSummary);
                    setMessages(prev => prev.filter(m => m.id !== aiMessageId));
                }
            } catch (e) { /* Not a JSON summary */ }

        } catch (error) {
            setMessages(prev => prev.map(m => m.id === aiMessageId ? {...m, text: 'Sorry, I encountered an error.'} : m));
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="relative flex flex-col h-full bg-gray-50">
        {isGuestModalOpen && <GuestDetailsModal onClose={() => setIsGuestModalOpen(false)} onSubmit={handleGuestSubmit} />}
        <header className="bg-white p-4 shadow-md z-10 flex items-center">
            <button onClick={() => navigateTo(Screens.PATIENT_HOME)} className="text-gray-600 hover:text-gray-800 mr-4">
                <ArrowLeftIcon />
            </button>
            <h1 className="text-xl font-bold text-gray-800">{t('symptom_check_title')}</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className="space-y-4">
                {messages.map((msg) => <ChatBubble key={msg.id} message={msg} />)}
                {summary && <AISummaryCard summary={summary} />}
                <div ref={chatEndRef} />
            </div>
        </main>
        <footer className="bg-white p-2 border-t border-gray-200">
            {summary ? (
                <button
                    onClick={handleSendToDoctor}
                    className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-orange-600 transition duration-300"
                >
                    {t('symptom_check_send_to_doctor')}
                </button>
            ) : (
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={t('symptom_check_placeholder')}
                        className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                        disabled={isLoading}
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={isLoading || !input.trim()}
                        className="bg-teal-500 text-white rounded-full p-3 disabled:bg-gray-300 hover:bg-teal-600 transition"
                    >
                        <SendIcon />
                    </button>
                </div>
            )}
        </footer>
    </div>
  );
};

export default SymptomCheckScreen;