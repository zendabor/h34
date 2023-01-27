const express = require('express')
const router = express.Router()
const nodemailer = require("nodemailer");
const db = require('../DB')
const info = {
  skills: db.get('skills').value(),
  products:db.get('products').value()
}
router.get('/', (req, res, next) => {
  res.render('pages/index', { title: 'Main page', ...info ,msgemail:req.flash('mail')[0]})
})

router.post('/', async(req, res, next) => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  try{
     await transporter.sendMail({
      from: req.body.email,
      to: "мое_мыло@mыло.сру",
      subject: req.body.name,
      text: req.body.message,
    });
  }catch(e){
    if(e) throw e.message
  }
  if(req.body.email && req.body.name && req.body.message){
    req.flash('mail',`здравствуйте ${req.body.name} с вашего мыла ${req.body.email} было отправлено письмо с текстом ${req.body.message}`)
    res.redirect('/#mail')
  }else {
    req.flash('mail'," поля заполнены не корректно или ваше письмо не удалось отправить")
    res.redirect('/#mail')
  }

})

module.exports = router
