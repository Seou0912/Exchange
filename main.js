//1. 박스 2개 만들기
//2. 드랍다운 리스트 만들기
//3. 환율정보 들고오기
//4. 금액을 입력하면 환전이 돤다.
//5. 드롭다운 리스트로 바꾸면 다시 그단위 기준으로 환전됨.
//6. 숫자를 한국어로 읽는 법.
//7. 반대로 밑에 박스에서 숫자를 바꿔도 위에 박스에 환

const currencyRatio = {
  NZD: {
    USD: 0.62,
    KRW: 820.4,
    NZD: 1,
    unit: "뉴질랜드달러",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg",
  },
  USD: {
    USD: 1,
    KRW: 1314.75,
    NZD: 1.6,
    unit: "달러",
    img: "https://cdn-icons-png.flaticon.com/512/555/555526.png",
  },
  KRW: {
    USD: 0.000876,
    KRW: 1,
    NZD: 0.0012,
    unit: "원",
    img: "https://cdn.countryflags.com/thumbs/south-korea/flag-400.png",
  },
};
var unitWords = ["", "만", "억", "조", "경"];
var splitUnit = 10000;
let toButton = document.getElementById("to-button");
let fromButton = document.getElementById("from-button");
let toCurrency = "USD";
let fromCurrency = "USD";

document.querySelectorAll("#from-currency-list li").forEach(function (item) {
  item.addEventListener("click", function () {
    fromCurrency = this.id;
    fromButton.innerHTML = `<img class="flag-img"src="${currencyRatio[fromCurrency].img}"/>${fromCurrency}`;
    convert("from");
  });
});

document.querySelectorAll("#to-currency-list li").forEach(function (item) {
  item.addEventListener("click", function () {
    toCurrency = this.id;
    toButton.innerHTML = `<img class="flag-img"src="${currencyRatio[toCurrency].img}"/>${toCurrency}`;
    convert("from");
  });
});

function convert(type) {
  console.log("here");
  let amount = 0;
  if (type == "from") {
    // 입력값 받기
    amount = document.getElementById("fromAmount").value.replace(/,/g, "");
    // 환전하기
    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
    // 환전한값 보여주기
    document.getElementById("toAmount").value =
      convertedAmount.toLocaleString();
    //환전한값 한국어로
    renderKoreanNumber(amount, convertedAmount);
  } else {
    amount = document.getElementById("toAmount").value.replace(/,/g, "");
    let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
    document.getElementById("fromAmount").value =
      convertedAmount.toLocaleString();
    renderKoreanNumber(convertedAmount, amount);
  }
}

function renderKoreanNumber(from, to) {
  document.getElementById("fromNumToKorea").textContent =
    readNum(from) + currencyRatio[fromCurrency].unit;
  document.getElementById("toNumToKorea").textContent =
    readNum(to) + currencyRatio[toCurrency].unit;
}

function readNum(num) {
  let resultString = "";
  let resultArray = [];
  for (let i = 0; i < unitWords.length; i++) {
    let unitResult =
      (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }
  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString =
      String(resultArray[i]).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      unitWords[i] +
      resultString;
  }
  return resultString;
}
