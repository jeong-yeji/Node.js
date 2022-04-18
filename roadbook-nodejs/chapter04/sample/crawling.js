const axios = require('axios');
const cheerio = require('cheerio');

// html 데이터를 가져온 뒤, cheerio로 데이터를 가공해야됨
// => async/await와 promise.then() 사용

const getHtml = async () => {
    try {
        // 페이지의 html 가져오기
        return await axios.get(
            'https://roadbook.co.kr/category/%EC%8B%A0%EA%B0%84%EC%86%8C%EA%B0%9C'
        );
    } catch (error) {
        console.error(error);
    }
};

// 받아온 데이터 가공 using cheerio
getHtml()
    .then((html) => {
        let ulList = [];
        // load() : html 문자열을 cheerio 객체로 반환
        const $ = cheerio.load(html.data);
        // children() : html selector를 파라미터로 받은 뒤 cheerio 객체에서 선택된 html 문자열에 해당하는 모든 태그 반환
        const $bodyList = $('div#searchList ol').children('li');

        $bodyList.each(function (i, elem) {
            ulList[i] = {
                // find() : html selector를 문자열로 받아 해당 태그 반환
                // text() : 태그 내 텍스트만 뽑기
                bookList: $(this).find('a').text(),
                // attr() : 속성 안의 텍스트 뽑기
                url: $(this).find('a').attr('href'),
            };
        });

        const data = ulList.filter((n) => n.bookList);
        return data;
    })
    .then((res) => console.log(res)); // 만들어준 ulList 콘솔 출력
