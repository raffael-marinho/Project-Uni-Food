const nodemailer = require('nodemailer');

// Configuração do serviço de e-mail
const transporter = nodemailer.createTransport({
  service: 'gmail', // Pode usar outro serviço como Outlook, SMTP personalizado, etc.
  auth: {
    user: process.env.EMAIL_USER, // Seu e-mail
    pass: process.env.EMAIL_PASS, // Sua senha ou App Password
  },
});

// Função para enviar e-mails
const enviarEmail = async (para, assunto, mensagem) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: para,
      subject: assunto,
      html: mensagem, // Corpo do e-mail em HTML
    });
    console.log(`E-mail enviado para ${para}`);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
};

module.exports = enviarEmail;
