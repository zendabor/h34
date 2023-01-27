const express = require('express');
const router = express.Router();
const {mkdir,rename} = require("fs/promises");
const fs = require('fs')
const path = require("path");
const formidable = require('formidable')
const db = require('../DB')



router.get('/', (req, res, next) => {

  res.render('pages/admin', {title: 'Admin page',msgskill: req.flash('data')[0],msgfile:req.flash('file')[0]})
})

router.post('/skills',  async (req, res, next) => {
    if(req.body.years || req.body.age || req.body.concerts || req.body.cities){
        db.get('skills').value()[0].number = req.body.age;
        db.get('skills').value()[1].number = req.body.concerts;
        db.get('skills').value()[2].number = req.body.cities;
        db.get('skills').value()[3].number = req.body.years;
        db.write()
        req.flash('data',"данные обновлены")
        res.redirect('/admin')
    }else {
        req.flash('data',"что-то пошло не так или вы не внесли изменений" )
        res.redirect('/admin')
    }
})

router.post('/upload', async (req, res, next) => {
    const form = new formidable.IncomingForm();
    const upd = path.join(process.cwd(),'uploads')
    if(!fs.existsSync(upd)){
        await mkdir(upd)
    }
    form.uploadDir = upd;
    const fileN = await new Promise((resolve, reject) => {
        try {
            form.parse(req,async (err, fields, files) => {
                if (err) {
                    throw err.message
                }
                await rename(files.photo.filepath,path.join(form.uploadDir, files.photo.originalFilename));
                resolve({fileName:files.photo.originalFilename,...fields})
            });
        }catch (err){
            if (err){
                reject(err.message)
            }
        }
    });
    if(req.body.photo && req.body.name && req.body.price){
        db.get('products').value().push({src: fileN.fileName,name:fileN.name,price:fileN.price})
        db.write()
        req.flash('file',"данные успешно загружены")
        res.redirect('/admin');
    }else {
        req.flash('file',"чет пошло не так")
        res.redirect('/admin');
    }
})

module.exports = router


