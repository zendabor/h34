const express = require('express');
const router = express.Router();
const {readFile,writeFile,mkdir,rename} = require("fs/promises");
const fs = require('fs')
const path = require("path");
const formidable = require('formidable')




router.get('/', (req, res, next) => {
  // TODO: Реализовать, подстановку в поля ввода формы 'Счетчики'
    // я не буду это делать, можете не засчитывать выполнение дз, но я манал этот чертов паг с его хреновой табуляцией
    // я пытался добавить в паг значения из скилов и он без конца ругался на отступы, стоило их добавить
    // как он просто отказывался видеть уже обьект и просто рендерил страницу без инпутов
    // как его дебажить я даже гуглить не хочу,настолько не удобная хрень,что нет никакого желания
  res.render('pages/admin', { title: 'Admin page' })
})

router.post('/skills',  async (req, res, next) => {
    const file = path.join(process.cwd(), 'data.json');
    const json1 = await readFile(file,'utf-8');
    const json2 = await JSON.parse(json1);
    json2.skills[0].number = req.body.age;
    json2.skills[1].number = req.body.concerts;
    json2.skills[2].number = req.body.cities;
    json2.skills[3].number = req.body.years;
    const json3 = JSON.stringify(json2);
    await writeFile(file, json3);
    res.render('pages/admin', { title: 'Admin page' })
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
                throw err.message
            }
        }
    });
    const filej = path.join(process.cwd(), 'data.json');
    const json1 = await readFile(filej, 'utf-8');
    const json2 = await JSON.parse(json1);
    json2.products.push({src: path.join('./uploads',`./${fileN.fileName}`),name:fileN.name,price:fileN.price});
    const json3 = JSON.stringify(json2);
    await writeFile(filej, json3);
    res.render('pages/admin', { title: 'Admin page' });
})

module.exports = router


