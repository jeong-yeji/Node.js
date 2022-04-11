var people = {
    name: 'gildong',
    say: function () {
        console.log(this);
    },
};

people.say();

// this를 객체로 고정시키기 위해 bind(this로 고정시킬 객체) 함수 사용
var sayPeople = people.say.bind(people);
sayPeople();
