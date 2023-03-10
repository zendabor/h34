const express = require('express')
const router = express.Router()
const db = require("../DB")

router.get('/', (req, res, next) => {
  res.render('pages/login', { title: 'SigIn page',msglogin:req.flash('login')[0]})
})

router.post('/', (req, res, next) => {
  if(db.get("Auth").value().email === req.body.email.trim() && db.get("Auth").value().password === req.body.password.trim()){
    res.redirect('/admin')
  }else {
    db.get("Auth").value().email = req.body.email;
    db.get("Auth").value().password = req.body.password;
    db.write();
    req.flash('login','вы успешно добавлены в базу данных,авторизуйтесь пожалуйста снова')
    res.redirect('/login')
  }
})

module.exports = router
