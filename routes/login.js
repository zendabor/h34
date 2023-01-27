const express = require('express')
const router = express.Router()
const db = require("../DB")

router.get('/', (req, res, next) => {
  res.render('pages/login', { title: 'SigIn page'})
})

router.post('/', (req, res, next) => {
  if(db.get("Auth").value().email === req.body.email.trim() && db.get("Auth").value().password === req.body.password.trim()){
    res.redirect('/admin')
  }else {
    db.get("Auth").value().email = req.body.email;
    db.get("Auth").value().password = req.body.password;
    db.write();
    res.render('pages/login', { title: 'SigIn page',msgemail:req.flash('login', "вы успешно добавлены в базу данных,авторизуйтесь пожалуйста снова")})
  }
})

module.exports = router
