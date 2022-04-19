const mongoose = require('mongoose');

// connecting
mongoose
    .connect('mongodb://127.0.0.1:27017/roadbook', {
        // 몽구스 버전이 6.0이상이라면 항상
        // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false로 실행
        // => 주석 처리
        // useNewUrlParser: true,
        // useCreateIndex: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

// defining schema
const customerSchema = mongoose.Schema(
    {
        name: 'string',
        age: 'number',
        sex: 'string',
    },
    {
        collection: 'newCustomer',
    }
);

// Schema -> Model
const Customer = mongoose.model('Schema', customerSchema);

// generate instance
const customer1 = new Customer({ name: '홍길동', age: 30, sex: '남' });

// CREATE : Model.save()
// save data into MongoDB
customer1
    .save()
    .then(() => {
        console.log(customer1);
    })
    .catch((err) => {
        console.log('Error : ' + err);
    });

// READ : Model.find()
Customer.find((err, customer) => {
    console.log('READ : Model.find()');
    if (err) {
        console.log(err);
    } else {
        console.log(customer);
    }
});

// UPDATE : Model.findById()
Customer.findById({ _id: '625ea2cc2b71b8eb67df28cf' }, (err, customer) => {
    console.log('UPDATE : Model.findById()');
    if (err) {
        console.log(err);
    } else {
        customer.name = 'modified';
        customer.save((err, modified_customer) => {
            if (error) {
                console.log(error);
            } else {
                console.log(modified_customer);
            }
        });
    }
});

// DELETE : Model.remove()
Customer.remove({ _id: '625ea2cc2b71b8eb67df28cf' }, (err, output) => {
    console.log('DELETE : Model.remove()');
    if (err) {
        console.log(err);
    } else {
        console.log('Data Deleted');
    }
});
