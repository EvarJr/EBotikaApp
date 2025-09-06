type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

export const translations: Translations = {
  en: {
    // Welcome Screen
    welcome_tagline: 'Your Community Health Partner',
    welcome_guest_button: 'Continue as Guest',
    welcome_login_button: 'Login',
    welcome_register_button: 'Register',
    welcome_language_label: 'Language',
    
    // Login Screen
    login_title: 'Login',
    login_greeting: 'Welcome Back',
    login_email_label: 'Email Address',
    login_password_label: 'Password',
    login_error: 'Invalid email or password. Please try again.',
    login_banned_error: 'This account has been banned.',
    login_hint: "Hint: Use 'password' for all mock user passwords.",
    login_hint_example: "E.g., doctor@ebotika.ph, pharmacy@ebotika.ph",

    // Register Screen
    register_title: 'Register New Account',
    register_greeting: 'Create your account',
    register_fullname_label: 'Full Name',
    register_phone_label: 'Phone Number',
    register_address_label: 'Address',
    register_guest_upgrade_message: 'Create your account to save your current guest session.',
    
    // Layout & Navigation
    nav_home: 'Home',
    nav_consults: 'Consults',
    nav_rx: 'RX',
    nav_profile: 'Profile',
    exit_button: 'Exit',
    
    // Home Screen
    greeting_user: 'Hello, {name}!',
    greeting_guest: 'Welcome, Guest!',
    dashboard_title: 'Your Dashboard',
    dashboard_recent_rx: 'Recent Prescription',
    dashboard_view_qr: 'View QR',
    dashboard_last_consult: 'Last Consultation',
    dashboard_no_activity: 'No recent activity.',
    dashboard_no_activity_prompt: 'Start a symptom check to begin.',
    symptoms_title: 'What are you feeling?',
    doctors_title: 'Consult a Doctor',
    doctor_chat_button: 'Chat',
    doctor_status_available: 'Available',
    doctor_status_on_leave: 'On Leave',
    symptom_headache: 'Headache',
    symptom_fever: 'Fever',
    symptom_cough: 'Cough',
    symptom_sore_throat: 'Sore Throat',
    symptom_body_aches: 'Body Aches',
    symptom_stomachache: 'Stomachache',

    // Symptom Check
    symptom_check_title: 'AI Symptom Check',
    symptom_check_placeholder: 'Describe your symptoms...',
    symptom_check_send_to_doctor: 'Send to Doctor for Review',
    guest_modal_title: 'Complete Your Profile',
    guest_modal_prompt: 'Please provide your details to send this consultation to a doctor.',
    guest_modal_contact_label: 'Contact Number',
    guest_modal_address_label: 'Address',
    guest_modal_cancel: 'Cancel',
    guest_modal_save: 'Save & Continue',
    consultation_sent_alert: 'Your AI summary has been sent to a doctor for review. You can track the status in your Consultations and Prescriptions lists.',

    // Consultations Screen
    consultations_title: 'My Consultations',
    consultations_empty: 'You have no consultations yet.',
    consultations_empty_prompt: 'Start an AI Symptom Check from the Home screen.',
    consultation_card_ai_suggestion: 'AI Suggestion: {suggestion}',
    consultation_status_pending: 'Pending Doctor',
    consultation_status_completed: 'Completed',

    // Prescriptions Screen
    prescriptions_title: 'My Prescriptions',
    prescriptions_tab_approved: 'Approved',
    prescriptions_tab_pending: 'Pending',
    prescriptions_tab_denied: 'Denied',
    prescriptions_tab_remitted: 'Remitted',
    prescriptions_guest_empty_title: "Waiting for Doctor's Review",
    prescriptions_guest_empty_prompt: 'Your prescriptions will appear here once a doctor has reviewed your AI consultation and issued a prescription.',
    prescriptions_guest_empty_next_step: 'You can check the status of your consultation in the "Consults" tab. Once approved, you will be able to view and save the prescription QR code from this screen.',
    prescriptions_empty: 'No prescriptions in this category.',
    prescription_card_denial_reason: 'Reason for denial:',
    prescription_card_issued_by: 'Issued by {name} on {date}',

    // Profile Screen
    profile_title: 'My Profile',
    profile_guest_form_title: 'Complete Your Profile',
    profile_guest_form_prompt: 'Please provide your details to be able to receive prescriptions.',
    profile_guest_form_save_button: 'Save Details',
    profile_details_saved_alert: 'Your details have been saved!',
    profile_info_title: 'Personal Information',
    profile_info_not_set: 'Not set',
    profile_settings_title: 'Settings',
    profile_settings_language: 'Language',
    profile_settings_notifications: 'Notifications',
    profile_logout_button: 'Logout',
    profile_edit_button: 'Edit Profile',
    profile_save_button: 'Save Changes',
    profile_cancel_button: 'Cancel',
    profile_change_avatar_button: 'Change',
    profile_updated_alert: 'Your profile has been updated successfully.',
    
    // AI Summary Card
    ai_summary_title: 'AI Triage Summary',
    ai_summary_suggestion: 'Suggestion',
    ai_summary_urgency: 'Urgency Level',
    ai_summary_recommendation: 'Recommendation',
    
    // Patient Consultation Detail
    patient_consult_detail_title: 'Consultation Details',
    patient_consult_detail_info_title: 'Consultation Info',
    patient_consult_detail_date: 'Date',
    patient_consult_detail_status: 'Status',
    patient_consult_detail_symptoms_title: 'Reported Symptoms',
    
    // QR Display Screen
    qr_display_title: 'Prescription Details',
    qr_display_status: 'Status',
    qr_display_patient: 'Patient',
    qr_display_dosage: 'Dosage & Instructions',
    qr_display_doctor: 'Issuing Doctor',
    qr_display_date: 'Date Issued',
    qr_display_download_button: 'Download Prescription',
    qr_display_downloading_button: 'Downloading...',

    // Doctor Chat
    doctor_chat_placeholder: 'Message {name}',
    
    // Doctor Dashboard
    doctor_dashboard_queue: 'Queue',
    doctor_dashboard_history: 'History',
    doctor_status_label: 'Your Status:',
    ai_chat_transcript_title: 'AI Chat Transcript',
    deny_modal_title: "Provide Reason for Denial",
    deny_modal_prompt: "Please provide your diagnosis or reason for denying the AI's suggestion. This will be shared with the patient.",
    deny_modal_placeholder: "Enter your notes here...",
    deny_modal_submit_button: "Submit Denial",
    prescription_form_generate_button: 'Generate Prescription & QR Code',
    prescription_form_generating_button: 'Generating...',
    final_outcome_title: "Final Outcome",
    final_outcome_action_taken: "Action Taken",
    final_outcome_rx_issued: "Prescription Issued",
    final_outcome_suggestion_denied: "Suggestion Denied",
    final_outcome_medicine: "Medicine",
    final_outcome_dosage: "Dosage",
    final_outcome_doctor_notes: "Doctor's Notes",
    doctor_report_patient_button: "Report Patient",
    report_modal_title: "Report Patient",
    report_modal_prompt: "Please provide a reason for reporting this patient. This will be sent to the RHU administrator for review.",
    report_modal_placeholder: "e.g., Abusive language, suspicious activity...",
    report_modal_submit_button: "Submit Report",
    report_success_alert: "Patient has been reported. The RHU administrator will review the case.",

    // Floating Action Button
    fab_chat_with_bot: 'Chat with Ebo',

    // RHU Dashboard - User Management
    rhu_user_management_title: 'Professional User Management',
    rhu_add_user_button: 'Add Professional User',
    rhu_modal_title: 'Create Professional Account',
    rhu_modal_role_label: 'Role',
    rhu_modal_role_doctor: 'Doctor',
    rhu_modal_role_pharmacy: 'Pharmacy',
    rhu_modal_create_button: 'Create User',
    rhu_user_created_alert: 'User {name} has been created successfully.',
    rhu_user_list_title: 'Registered Professionals',
    rhu_patient_management_title: 'Patient Account Management',
    rhu_patient_list_title: 'Registered Patients',
    rhu_export_button: 'Export as CSV',
    rhu_exporting_button: 'Exporting...',
    rhu_show_management_button: 'Show User Management',
    rhu_hide_management_button: 'Hide User Management',

    // RHU Patient Detail Management
    patient_detail_title: "Patient Account Details",
    patient_detail_info: "Account Information",
    patient_detail_reports: "Doctor Reports",
    patient_detail_no_reports: "No reports have been filed for this patient.",
    patient_detail_report_by: "Report by {name} on {date}",
    patient_detail_actions: "Account Actions",
    patient_detail_ban_button: "Ban User",
    patient_detail_unban_button: "Unban User",
    patient_detail_prescriptions_received: "Prescriptions Received",
    patient_detail_ban_confirm_title: "Confirm Ban",
    patient_detail_ban_confirm_text: "Are you sure you want to ban this user? They will no longer be able to log in.",
    patient_detail_unban_confirm_title: "Confirm Unban",
    patient_detail_unban_confirm_text: "Are you sure you want to unban this user? They will regain access to their account.",
    patient_detail_delete_button: "Delete Account",
    patient_detail_delete_confirm_title: "Confirm Deletion",
    patient_detail_delete_confirm_text: "Are you sure you want to permanently delete this account? This action cannot be undone.",
    patient_status_active: 'Active',
    patient_status_banned: 'Banned',
    confirm: "Confirm",
    cancel: "Cancel",

    // Professional Profile Edit
    professional_edit_profile_title: 'Edit Profile',

    // Professional Status
    status_online: 'Online',
    status_offline: 'Offline',

    // Guest Exit Modal
    guest_exit_title: "Are you sure?",
    guest_exit_warning: "Your current session, including any chat history and pending consultations, will be lost.",
    guest_exit_save_prompt: "Want to save your history? Create an account to keep your consultation and prescription data.",
    guest_exit_stay_button: "Stay",
    guest_exit_confirm_button: "Exit Anyway",
    guest_exit_save_button: "Save & Register",
  },
  ak: {
    // Welcome Screen
    welcome_tagline: 'Imong Kaibahan sa Panglawas it Komunidad',
    welcome_guest_button: 'Magpadayon bilang Bisita',
    welcome_login_button: 'Mag-login',
    welcome_register_button: 'Magrehistro',
    welcome_language_label: 'Hambae',

    // Login Screen
    login_title: 'Mag-login',
    login_greeting: 'Malipayong Pagbalik',
    login_email_label: 'Email Address',
    login_password_label: 'Password',
    login_error: 'Sala nga email o password. Palihog, testingan uman.',
    login_banned_error: 'Raya nga account hay na-ban.',
    login_hint: "Pahiwatig: Gamiton ro 'password' sa tanan nga mock user.",
    login_hint_example: "Hal., doctor@ebotika.ph, pharmacy@ebotika.ph",

    // Register Screen
    register_title: 'Magrehistro it Bag-ong Account',
    register_greeting: 'Himuon ro imong account',
    register_fullname_label: 'Kabilugan nga Ngaean',
    register_phone_label: 'Numero it Telepono',
    register_address_label: 'Adres',
    register_guest_upgrade_message: 'Himuon ro imong account para ma-save ro imong kasamtangan nga sesyon bilang bisita.',

    // Layout & Navigation
    nav_home: 'Balay',
    nav_consults: 'Mga Konsulta',
    nav_rx: 'Mga Reseta',
    nav_profile: 'Propayl',
    exit_button: 'Guwa',

    // Home Screen
    greeting_user: 'Kumusta, {name}!',
    greeting_guest: 'Malipayong pag-abot, Bisita!',
    dashboard_title: 'Imong Dashboard',
    dashboard_recent_rx: 'Pinakabag-ong Reseta',
    dashboard_view_qr: 'Ipakita ro QR',
    dashboard_last_consult: 'Ulihing Konsultasyon',
    dashboard_no_activity: 'Owa pa it bag-ong aktibidad.',
    dashboard_no_activity_prompt: 'Mag-umpisa it symptom check.',
    symptoms_title: 'Ano ro imong nabatyagan?',
    doctors_title: 'Magpakonsulta sa Doktor',
    doctor_chat_button: 'Chat',
    doctor_status_available: 'Available',
    doctor_status_on_leave: 'On Leave',
    symptom_headache: 'Sakit it Ueo',
    symptom_fever: 'Lagnat',
    symptom_cough: 'Ubo',
    symptom_sore_throat: 'Sakit it Tutunlan',
    symptom_body_aches: 'Sakit it Kalawasan',
    symptom_stomachache: 'Sakit it Tiyan',

    // Symptom Check
    symptom_check_title: 'AI Symptom Check',
    symptom_check_placeholder: 'Isaysay ro imong mga sintomas...',
    symptom_check_send_to_doctor: 'Ipadara sa Doktor para sa Review',
    guest_modal_title: 'Kumpletuhon ro Propayl',
    guest_modal_prompt: 'Palihog, ibutang ro imong mga detalye para maipadara ro konsultasyon sa doktor.',
    guest_modal_contact_label: 'Numero it Telepono',
    guest_modal_address_label: 'Adres',
    guest_modal_cancel: 'Kanselahon',
    guest_modal_save: 'I-save ag Magpadayon',
    consultation_sent_alert: 'Ro imong AI summary hay naipadara eon sa doktor para sa review. Pwede mong masubaybayan ro status sa imong listahan it Konsultasyon ag Reseta.',

    // Consultations Screen
    consultations_title: 'Akong mga Konsulta',
    consultations_empty: 'Owa ka pa it mga konsultasyon.',
    consultations_empty_prompt: 'Mag-umpisa it AI Symptom Check sa Home screen.',
    consultation_card_ai_suggestion: 'Suhestiyon it AI: {suggestion}',
    consultation_status_pending: 'Nagahueat sa Doktor',
    consultation_status_completed: 'Kumpleto',
    
    // Prescriptions Screen
    prescriptions_title: 'Akong mga Reseta',
    prescriptions_tab_approved: 'Aprobado',
    prescriptions_tab_pending: 'Nagahueat',
    prescriptions_tab_denied: 'Gindinay',
    prescriptions_tab_remitted: 'Nagamit',
    prescriptions_guest_empty_title: "Nagahueat sa Review it Doktor",
    prescriptions_guest_empty_prompt: 'Ro imong mga reseta hay magaguwa iya kung ma-review eon it doktor ro imong AI consultation.',
    prescriptions_guest_empty_next_step: 'Pwede mong makita ro status sa "Mga Konsulta" nga tab. Kung ma-aprobahan, pwede mo eon makita ag i-save ro QR code it reseta sa screen nga raya.',
    prescriptions_empty: 'Owa it reseta sa kategoryang raya.',
    prescription_card_denial_reason: 'Rason sa pagdinay:',
    prescription_card_issued_by: 'Gin-isyu ni {name} ku {date}',
    
    // Profile Screen
    profile_title: 'Akong Propayl',
    profile_guest_form_title: 'Kumpletuhon ro Imong Propayl',
    profile_guest_form_prompt: 'Palihog, ihatag ro imong mga detalye para makabaton it reseta.',
    profile_guest_form_save_button: 'I-save ro mga Detalye',
    profile_details_saved_alert: 'Ro imong mga detalye hay na-save eon!',
    profile_info_title: 'Personal nga Impormasyon',
    profile_info_not_set: 'Owa pa nabutang',
    profile_settings_title: 'Mga Setting',
    profile_settings_language: 'Hambae',
    profile_settings_notifications: 'Mga Notipikasyon',
    profile_logout_button: 'Mag-logout',
    profile_edit_button: 'I-edit ro Propayl',
    profile_save_button: 'I-save ro mga Pagbag-o',
    profile_cancel_button: 'Kanselahon',
    profile_change_avatar_button: 'Bag-uhon',
    profile_updated_alert: 'Ro imong propayl hay madinaeag-on nga na-update.',
    
    // AI Summary Card
    ai_summary_title: 'AI Triage Summary',
    ai_summary_suggestion: 'Suhestiyon',
    ai_summary_urgency: 'Lebel it Pagka-apurado',
    ai_summary_recommendation: 'Rekomendasyon',
    
    // Patient Consultation Detail
    patient_consult_detail_title: 'Mga Detalye it Konsultasyon',
    patient_consult_detail_info_title: 'Impormasyon sa Konsultasyon',
    patient_consult_detail_date: 'Petsa',
    patient_consult_detail_status: 'Status',
    patient_consult_detail_symptoms_title: 'Mga Ginsugid nga Sintomas',
    
    // QR Display Screen
    qr_display_title: 'Mga Detalye it Reseta',
    qr_display_status: 'Status',
    qr_display_patient: 'Pasyente',
    qr_display_dosage: 'Dosage ag mga Instruksyon',
    qr_display_doctor: 'Doktor nga Nag-isyu',
    qr_display_date: 'Petsa nga Gin-isyu',
    qr_display_download_button: 'I-download ro Reseta',
    qr_display_downloading_button: 'Gina-download...',

    // Doctor Chat
    doctor_chat_placeholder: 'Mensahe kay {name}',

    // Doctor Dashboard
    doctor_dashboard_queue: 'Pila',
    doctor_dashboard_history: 'Kasaysayan',
    doctor_status_label: 'Imong Status:',
    ai_chat_transcript_title: 'Transcript it Chat sa AI',
    deny_modal_title: "Maghatag it Rason sa Pagdinay",
    deny_modal_prompt: "Palihog, ihatag ro imong diagnosis o rason sa pagdinay sa suhestiyon it AI. Raya hay ipaabot sa pasyente.",
    deny_modal_placeholder: "Isueat ro imong mga nota iya...",
    deny_modal_submit_button: "I-submit ro Pagdinay",
    prescription_form_generate_button: 'Maghimo it Reseta ag QR Code',
    prescription_form_generating_button: 'Ginahimo...',
    final_outcome_title: "Katapusan nga Resulta",
    final_outcome_action_taken: "Ginhimo nga Aksyon",
    final_outcome_rx_issued: "Reseta Gin-isyu",
    final_outcome_suggestion_denied: "Suhestiyon Gindinay",
    final_outcome_medicine: "Bulong",
    final_outcome_dosage: "Dosage",
    final_outcome_doctor_notes: "Mga Nota it Doktor",
    doctor_report_patient_button: "I-report ro Pasyente",
    report_modal_title: "I-report ro Pasyente",
    report_modal_prompt: "Palihog, maghatag it rason sa pag-report sa pasyente nga raya. Raya hay ipadaea sa RHU administrator para sa review.",
    report_modal_placeholder: "Hal., Malain nga paghambae, nagaduda nga aktibidad...",
    report_modal_submit_button: "I-submit ro Report",
    report_success_alert: "Ro pasyente hay na-report eon. Pagareviewhon it RHU administrator ro kaso.",

    // Floating Action Button
    fab_chat_with_bot: 'Makig-chat kay Ebo',
    
    // RHU Dashboard - User Management
    rhu_user_management_title: 'Pagdumaea it Propesyonal nga Gumagamit',
    rhu_add_user_button: 'Magdugang it Propesyonal nga Gumagamit',
    rhu_modal_title: 'Maghimo it Propesyonal nga Account',
    rhu_modal_role_label: 'Katungdanan',
    rhu_modal_role_doctor: 'Doktor',
    rhu_modal_role_pharmacy: 'Parmasya',
    rhu_modal_create_button: 'Maghimo it Gumagamit',
    rhu_user_created_alert: 'Ro gumagamit {name} hay madinaeag-on nga nahimo.',
    rhu_user_list_title: 'Mga Rehistradong Propesyonal',
    rhu_patient_management_title: 'Pagdumaea it Account it Pasyente',
    rhu_patient_list_title: 'Mga Rehistradong Pasyente',
    rhu_export_button: 'I-export bilang CSV',
    rhu_exporting_button: 'Gina-export...',
    rhu_show_management_button: 'Ipakita ro Pagdumaea',
    rhu_hide_management_button: 'Taguon ro Pagdumaea',

    // RHU Patient Detail Management
    patient_detail_title: "Mga Detalye it Account it Pasyente",
    patient_detail_info: "Impormasyon it Account",
    patient_detail_reports: "Mga Report it Doktor",
    patient_detail_no_reports: "Owa pa it report nga na-file para sa pasyente nga raya.",
    patient_detail_report_by: "Report ni {name} ku {date}",
    patient_detail_actions: "Mga Aksyon sa Account",
    patient_detail_ban_button: "I-ban ro Gumagamit",
    patient_detail_unban_button: "I-unban ro Gumagamit",
    patient_detail_prescriptions_received: "Mga Nabatun nga Reseta",
    patient_detail_ban_confirm_title: "Kumpirmahon ro Pag-ban",
    patient_detail_ban_confirm_text: "Sigurado ka gid bala nga gusto mong i-ban ro gumagamit nga raya? Indi eon sanda makalog-in.",
    patient_detail_unban_confirm_title: "Kumpirmahon ro Pag-unban",
    patient_detail_unban_confirm_text: "Sigurado ka gid bala nga gusto mong i-unban ro gumagamit nga raya? Makabalik sanda sa andang account.",
    patient_detail_delete_button: "Panason ro Account",
    patient_detail_delete_confirm_title: "Kumpirmahon ro Pagpanas",
    patient_detail_delete_confirm_text: "Sigurado ka gid bala nga gusto mong permanenteng panason ro account nga raya? Indi eon raya mabawi.",
    patient_status_active: 'Aktibo',
    patient_status_banned: 'Na-ban',
    confirm: "Kumpirmahon",
    cancel: "Kanselahon",

    // Professional Profile Edit
    professional_edit_profile_title: 'I-edit ro Propayl',

    // Professional Status
    status_online: 'Online',
    status_offline: 'Offline',
    
    // Guest Exit Modal
    guest_exit_title: "Sigurado ka?",
    guest_exit_warning: "Ro imong kasamtangan nga sesyon, kaibahan ro kasaysayan it chat ag mga nagahueat nga konsultasyon, hay maduea.",
    guest_exit_save_prompt: "Gusto mo i-save ro imong kasaysayan? Maghimo it account para matago ro imong datos sa konsultasyon ag reseta.",
    guest_exit_stay_button: "Magpabilin",
    guest_exit_confirm_button: "Guwa Gihapon",
    guest_exit_save_button: "I-save ag Magrehistro",
  },
};