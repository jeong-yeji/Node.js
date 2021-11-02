# Chapter 02

## 2.1 ES2015+

### const, let

**var vs const, let**

var가 아닌 const와 let 사용

var : **함수 스코프** ⇒ if문과 같은 블록에 상관없이 접근 가능

const, let : **블록 스코프** ⇒ 블록 밖에서는 변수에 접근 불가

⇒ 호이스팅과 같은 문제도 해결되고 코드 관리도 수월해짐

```jsx
if (true) {
    var x = 3;
}
console.log(x); // 3

if (true) {
    const y = 3;
}
console.log(y); // Uncaught ReferenceError : y is not defined
```

**const vs let**

const : **상수**, 한 번 값을 할당하면 다른 값 할당 불가하고 초기화할 때 값을 할당하지 않으면 에러 발생

⇒ 자바스크립트에서 한 번 초기화했던 변수에 다른 값을 할당하는 경우는 적으므로 기본적으로 const를 사용하고, 다른 값을 할당해야 하는 경우 let 사용

```jsx
const a = 0;
a = 1; // Uncaught TypeError : Assignment to constant variable.

let b = 0;
b = 1; //1

const c; // Uncaught SyntaxError : Missing initializer in const declaration
```

### 템플릿 문자열

`` : 문자열 안에 변수를 넣을 수 있는 템플릿 문자열

```jsx
// ES5
var num1 = 1;
var num2 = 2;
var result = 3;
var string1 = num1 + ' 더하기 ' + num2 + "는 '" + result + "'";
console.log(string1);

// ES6
const num3 = 1;
const num4 = 2;
const result2 = 3;
const string2 = `${num3} 더하기 ${num4}는 '${result2}'`;
console.log(string2);
```

### 객체 리터럴

1. 객체의 메서드에 함수 연결 시 콜론과 function을 붙이지 않아도 됨
2. 속성명과 변수명이 동일한 경우, 한 번만 써도 됨
3. 객체의 속성명은 동적으로 생성 가능. 객체 리터럴 안에 동적 속성 선언해도 됨

```jsx
var sayNode = function () {
    console.log('Node');
};
var es = 'ES';

// ES5
var oldObject = {
    sayJS: function () {
        console.log('JS');
    },
    sayNode: sayNode,
};
oldObject[es + 6] = 'Fantastic';
oldObject.sayNode(); // Node
oldObject.sayJS(); // JS
console.log(oldObject.ES6); // Fantastic

// ES6
const newObject = {
    sayJS() {
        // 1번
        console.log('JS');
    },
    sayNode, // 2번
    [es + 6]: 'Fantastic', // 3번
};
newObject.sayNode(); // Node
newObject.sayJS(); // JS
console.log(newObject.ES6); // Fantastic
```

### 화살표 함수(arrow function)

화살표 함수 추가, 기존 function() {}도 사용 가능

```jsx
// add1, add2, add3, add4는 모두 같은 함수
function add1(x, y) {
    return x + y;
}

const add2 = (x, y) => {
    return x + y;
};

// 변수에 대입하여 재사용 가능
const add3 = (x, y) => x + y;

const add4 = (x, y) => x + y;
```

달라진 this 바인드 방식

```jsx
// ES5
var relationship1 = {
	name: 'zero',
	friends: ['nero', 'hero', 'xero'],
	logFriends: function () {
		var that = this; // relationship1을 가리키는 this를 that에 저장
		this.friends.forEach(function (friend) {
			// relationship1.logFriends()와 function 선언문은 각자 다른 함수 스코프의 this를 가짐
			// => that을 이용하여 relatinoship1에 간접적으로 접근
			console.log(that.name, friend);
		});
	},
};
relationship1.logFriends();

// ES6
const relationship2 = {
	name: 'zero'
	friends: ['nero', 'hero', 'xero'],
	logFriends() {
		this.friends.forEach(friend => {
			// 화살표 함수는 상위 스코프의 this를 그대로 물려받음
			console.log(this.name, friend);
		});
	},
};
relationship2.logFriends();
```

⇒ 기본적으로 화살표 함수를 사용하되, this를 사용해야 하는 경우에는 화살표 함수와 함수 선언문(function) 중 고르면 됨

### 구조분해 할당

구조분해 할당을 사용해 객체와 배열로부터 속성이나 요소를 쉽게 꺼낼 수 있음

함수에 대한 구조분해 할당 문법

```jsx
// 객체의 속성을 같은 이름의 변수에 대입하는 코드

// ES5
var candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy: function () {
        this.status.count--;
        return this.status.count;
    },
};
var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count;

// ES6
const candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy() {
        this.status.count--;
        return this.status.count;
    },
};
const {
    getCandy,
    status: { count },
} = candyMachine;
```

배열에 대한 구조분해 할당 문법

```jsx
// ES5
var array = ['nodejs', {}, 10, true];
var node = array[0];
var obj = array[1];
var bool = array[3];

// ES6
const array = ['nodejs', {}, 10, true];
const [node, obj, , bool] = array;
```

## 클래스

클래스 문법이 추가되었으나, 다른 언어처럼 클래스 기반으로 작동하는 것이 아니라 여전히 **프로토타입 기반**으로 작동

```jsx
// ES5
var Human = function(type) {
	this.type = type || 'human';
};

Human.isHuman = function(human) {
	return human instanceof Human;
}

Human.prototype.breathe = function() {
	alert('h-a-a-a-m');
};

var Zero = function(type, firstName, lastName) {
	Human.apply(this, arguments); // 상속
	this.firstName = firstName;
	this.lastName = lastName;
};

Zero.prototype = Object.create(Human.prototype); // 상속
Zero.prototype.constructor = Zero; // 상속하는 부분
Zero.prototype.sayName = function() {
	alert(this.firstName + ' ' + this.lastName);
};
var oldZero = new Zero('human', 'Zero', 'Cho');
Human.isHuman(oldZero); // true

// ES6: 클래스 기반 코드
class Human {
	constructor(type = 'human') { // 생성자
		this.type = type;
	}

	static isHuman(human) {
		return human instanceof Human;
	}

	breathe() {
		alert('h-a-a-a-m');
	}
}

class Zero extends Human { // 상속
	constructor(type, firstName, lastName) { // 생성자 함수
		super(type);
		this.firstName = firstName;
		this.lastName = lastName;
	}

	sayName() {
		super.breathe();
		alert.(`${this.firstName} ${this.lastName}`);
	}
}

const newZero = new Zero('human', 'Zero', 'Cho');
Human.isHuman(newZero); // true
```

### 프로미스

프로미스 : 실행은 바로 하되, 결과값은 나중에 받는 객체. new Promise는 바로 실행되지만 결과값은 실행 완료 후 then이나 catch 메소드를 통해 받음

```jsx
const condition = true; // true면 resolve, false면 reject
const promise = new Promise((resolve, reject) => {
    if (condition) {
        resoleve('성공');
    } else {
        reject('실패');
    }
});
// 다른 코드가 들어갈 수 있음
promise
    .then((message) => {
        console.log(message); // 성공(resolve)한 경우 실행
    })
    .catch((error) => {
        // 실패(reject)한 경우 실행
        console.error(error);
    })
    .finally(() => {
        // 끝나면 무조건 실행
        console.log('무조건');
    });
```

then/catch에서 다시 다른 then/catch를 붙이면 이전 then의 return 값을 다음 then의 매개변수로 넘김. 프로미스를 return하면 프로미스 수행 후 다음 then/catch 호출

```jsx
promise
    .then((message) => {
        // then에서 return new Promise를 해야 다음 then에서 받을 수 있음
        return new Promise((resolve, reject) => {
            resolve(message);
        });
    })
    .then((message2) => {
        console.log(message2);
        return new Promise((resolve, reject) => {
            resolve(message2);
        });
    })
    .then((message3) => {
        console.log(message3);
    })
    .catch((error) => {
        console.error(error);
    });
```

콜백을 프로미스로 바꾸기(메소드가 프로미스 방식을 지원해야 변경 가능)

```jsx
// callback
function findAndSaveUser(Users) {
    Users.findOne({}, (err, user) => {
        // first callback
        if (err) {
            return console.error(err);
        }
        user.name = 'zero';
        user.save((err) => {
            // second callback
            if (err) {
                return console.error(err);
            }
            Users.findOne({ gender: 'm' }, (err, user) => {
                // third callback
                // 생략
            });
        });
    });
}

// promise : findOne(), save()가 내부적으로 프로미스 객체를 가지고 있다고 가정
function findAndSaveUser(Users) {
    Users.findOne({})
        .then((user) => {
            user.name = 'zero';
            return user.save();
        })
        .then((user) => {
            return Users.findOne({ gender: 'm' });
        })
        .then((user) => {
            // 생략
        })
        .catch((err) => {
            console.error(err);
        });
}
```

프로미스 여러 개를 한번에 실행

```jsx
// 즉시 resolve하는 promise 생성 => Promise.resolve()
// Promise.reject()도 있음
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');

// 모두 resolve 될 때까지 기다렸다가 then으로 넘어감. 하나라도 reject되면 catch
Promise.all([promise1, promise2])
    .then((result) => {
        console.log(result); // ['성공1', '성공2'];
    })
    .catch((error) => {
        console.error(error);
    });
```

### async/await

장황한 프로미스 코드를 간단하게 줄일 수 있음

```jsx
// Promise
function findAndSaveUser(Users) {
    Users.findOne({})
        .then((user) => {
            user.name = 'zero';
            return user.save();
        })
        .then((user) => {
            return Users.findOne({ gender: 'm' });
        })
        .then((user) => {
            // 생략
        })
        .catch((err) => {
            console.error(err);
        });
}

// async/await : 프로미스가 resolve될 때까지 기다린 뒤 다음 로직으로 넘어감
async function findAndSaveUser(Users) {
    // 일반 함수가 아닌 async function으로 선언
    try {
        let user = await Users.findOne({}); // promise 앞에 await 선언
        user.name = 'zero';
        user = await user.save();
        user = await Users.findOne({ gender: 'm' });
        // 생략
    } catch (error) {
        console.error(error);
    }
}
```

async/await의 다양한 사용

```jsx
// 화살표 함수와 async/await의 사용
const findAndSaveUser = async (Users) => {
    // 생략
};

// for문과 async/await의 사용 => 프로미스의 순차적 실행
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
(async () => {
    // for await of를 통해 프로미스 배열 순위
    for await (promise of [promise1, promise2]) {
        console.log(promise);
    }
})();

// async 함수의 반환값은 항상 Promise로 감싸짐
// 1. 실행 후 then 붙이기
async function findAndSaveUser(Users) {
    // 생략
}
findAndSaveUser().then(() => {
    /* 생략 */
});
// 2. 또 다른 async 함수 안에서 await 붙여서 처리
async function other() {
    const result = await findAndSaveUser();
}
```

---

## 2.2 프런트엔드 자바스크립트

### AJAX(Asynchoronous Javascript And XML)

**페이지 이동 없이** 서버에 요청을 보내고 응답을 받는 기술

AJAX 요청은 보통 jQuery, axios와 같은 라이브러리를 이용해서 보냄

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    // 코드 작성
    // GET 요청 : axios.get은 내부에 new Promise가 들어있으므로 then, catch 사용 가능
    axios
        .get('https://www.zerocho.com/api/get')
        .then((result) => {
            console.log(result);
            consolg.log(result.data); // {}
        })
        .catch((error) => {
            console.error(error);
        });

    // GET 요청 : Promise -> async/await
    // 익명함수라 즉시 실행을 위해 코드를 소괄호로 감싸서 호출
    (async () => {
        try {
            const result = await axios.get('https://www.zerocho.com/api/get');
            console.log(result);
            console.log(result.data); // {}
        } catch (error) {
            console.error(error);
        }
    })();

    // POST 요청
    (async () => {
        try {
            const result = await axios.post('https://www.zerocho.com/api/post/json', {
                name: 'zerocho',
                birth: 1994,
            }); // 두번째 인수로 데이터를 넣어서 보냄
            console.log(result);
            console.log(result.data); // {}
        } catch (error) {
            console.error(error);
        }
    })();
</script>
```

### FormData

HTML form tag의 데이터를 동적으로 제어할 수 있는 기능으로 주로 AJAX와 함께 사용

```jsx
const formData = new FormData();

// append() : key-value 형식으로 데이터 저장
formData.append('name', 'zerocho');
formData.append('item', 'orange');
formData.append('item', 'melon');
formData.append('test', ['hi', 'zero']);

// has() : 주어진 키에 대한 값 존재 여부
formData.has('item'); // true
formData.has('money'); // false

// get() : 주어진 키에 해당하는 값 하나 가져옴
formData.get('item'); // orange
formData.get('test'); // hi, zero
// getAll() : 주어진 키에 해당하는 모든 값 가져옴
formData.getAll('item'); // ['orange', 'melon']

// delete() : 현재 키 제거
formData.delete('test');
formData.get(test); // null

// set() : 현재 키 수정
formData.set('item', 'apple');
formData.getAll('item'); // ['apple']
```

폼 데이터를 서버에 보낼 대는 `await axios.post()` 의 두번째 인자에 데이터를 넣어 보냄 `const result = await axios.post('https://www.zerocho.com/api/post/formdata', formData);`

### encodeURIComponent, decodeURIComponent

AJAX 요청을 보낼 때 주소에 한글이 들어가는 경우 서버에 따라 한글 주소를 이해하지 못할 수 있음 ⇒ encodeURIComponent(), decodeURIComponent() 사용

보낼 때 ⇒ window 객체의 메소드인 encodeURIComponent 메소드 이용하여 한글 주소 부분만 감싸서 전달 `const result = await axios.get(`https://www.zerocho.com/api/search/${encodeURIComponent('노드')}`);`

받을 때 ⇒ decodeURIComponent() 사용

### 데이터 속성과 dataset

보안과 무관한 데이터들을 프론트엔드로 보낼 때 **데이터 속성(data attribute)**를 통해 보냄

데이터 속성 : data-로 시작. 자바스크립트로 쉽게 접근할 수 있으며, dataset에 데이터를 넣어도 HTML 태그에 반영된다는 장점이 있음(속성 이름의 경우 data-user-job ⇒ userJob 으로 변경)

```html
<ul>
    <li data-id="1" data-user-job="programmer">Zero</li>
    <li data-id="2" data-user-job="designer">Nero</li>
    <li data-id="3" data-user-job="programmer">Hero</li>
    <li data-id="4" data-user-job="ceo">Kero</li>
</ul>
<script>
    console.log(document.querySelector('li').dataset);
    // { id: '1', userJob: 'programmer' }
</script>
```
