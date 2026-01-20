require('dotenv').config();

const express = require('express');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;  // alterei a porta aqui

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rota de envio de e-mail
app.post('/send-email', async (req, res) => {
  const { name, email, subject, message, novidades } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Nome, e-mail e mensagem são obrigatórios.',
    });
  }

  try {
    await resend.emails.send({
      from: 'InsideLibras <onboarding@resend.dev>',
      to: ['formulario.insidelibras@gmail.com'], 
      replyTo: email,
      subject: `Contato via site: ${subject || 'Sem assunto'}`,
      html: `
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Opt-in novidades:</strong> ${novidades ? 'Sim' : 'Não'}</p>
        <hr/>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: 'E-mail enviado com sucesso!',
    });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao enviar o e-mail.',
    });
  }
});




// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
