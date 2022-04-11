// 구조 분해 할당 : 객체나 배열을 변수로 간편하게 분해해주는 문법
const animal = ['dog', 'cat'];

let [first, second] = animal;

console.log(typeof first); // string
console.log(typeof second); // string

console.log(first); // dog
console.log(second); // cat
