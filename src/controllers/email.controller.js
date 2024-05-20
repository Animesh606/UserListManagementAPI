import sendEmails from '../services/email.service.js';

const sendEmail = async (req, res) => {
    try {
        const { listId } = req.params;
        const { emailTemplate } = req.body;
        await sendEmails(listId, emailTemplate);
        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
        console.log('Server error', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

export {
    sendEmail
}