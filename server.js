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
  console.log('Recebido:', req.body);

  try {
    console.log('ANTES DO RESEND');

    const result = await resend.emails.send({
      from: 'InsideLibras <onboarding@resend.dev>',
      to: ['mateusgamer626@gmail.com'],
      subject: 'Teste Resend',
      html: '<p>Teste</p>',
    });

    console.log('DEPOIS DO RESEND', result);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('ERRO NO RESEND:', error);
    return res.status(500).json({ success: false });
  }
});




// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
