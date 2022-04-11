var people = {
    name: 'gildong',
    say: function () {
        console.log(this);
    },
};

people.say(); // people이 say 호출 => this는 people 객체

var sayPeople = people.say;
sayPeople(); // global이 호출한 주체 => this는 global 객체
