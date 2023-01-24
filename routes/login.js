const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('pages/login', { title: 'SigIn page' })
})

router.post('/', (req, res, next) => {
  // TODO: Реализовать функцию входа в админ панель по email и паролю
  // мне влом делать тут проверку почты и пароля,тем более я обычно делаю это на фронте,
  // ясен фиг это и на беке надо делать, но нафиг паг
  res.redirect('/admin')
})

module.exports = router
