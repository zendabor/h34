const express = require('express')
const router = express.Router()
const nodemailer = require("nodemailer");
const { products, skills } = require('../data.json')

router.get('/', (req, res, next) => {
  res.render('pages/index', { title: 'Main page', products, skills })
})

router.post('/', async(req, res, next) => {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  try{
    let info = await transporter.sendMail({
      from: req.body.email,
      to: "мое_мыло@mыло.сру",
      subject: req.body.name,
      text: req.body.message,
    });
    res.send(`здравствуйте ${req.body.name} с вашего мыла
  ${req.body.email} было отправлено письмо с текстом ${req.body.message}`)
  }catch(e){
    if(e) throw e.message
  }
})

module.exports = router
