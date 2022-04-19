const morgan = require('morgan');
const models = require('./models');

const express = require('express');
const app = express();

// 포트 설정
app.set('port', process.env.PORT || 8080);

// 공통 미들웨어
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    models.newCustomer
        .findAll()
        .then((customers) => {
            res.send(customers);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

// READ
app.get('/customer', (req, res) => {
    res.sendFile(__dirname + '/customer.html');
});

// CREATE : promise 사용
app.post('/customer', (req, res) => {
    let body = req.body;

    models.newCustomer
        .create({
            name: body.name,
            age: body.age,
            sex: body.sex,
        })
        .then((result) => {
            console.log('customer created..!');
            res.redirect('/customer');
        })
        .catch((err) => {
            console.log(err);
        });
});

// UPDATE : async/await 사용
app.put('/customer/:id', async (req, res) => {
    const customer = await models.newCustomer.update({
        where: { id: req.params.id },
        name: body.name,
        age: body.age,
        sex: body.sex,
    });
    return res.json(customer);
});

// DELETE : async/await 사용
app.delete('/customer/:id', async (req, res) => {
    const customer = await models.newCustomer.destroy({
        where: { id: req.params.id },
    });
    return res.json(customer);
});

// 서버와 포트 연결
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..');
});

// insert - create()
// select - find() 등
// update - update()
// delete - destroy()
