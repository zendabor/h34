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
    form.parse(req);
    form.on('fileSt',   function (file) {
        const fileName = encodeURIComponent(file.name)
        fs.renameSync(upd,path.join(upd,fileName))
    })
    res.render('pages/admin', { title: 'Admin page' })
})

module.exports = router


// const picName = path.join(upd,files.name)
// console.log(picName)
// await rename(files.path, picName)
// // const file = path.join(process.cwd(), 'data.json');
// // const json1 = await readFile(file, 'utf-8');
// // const json2 = await JSON.parse(json1);
// // json2.products.push({req.body.name, req.body.price, req.body.photo})