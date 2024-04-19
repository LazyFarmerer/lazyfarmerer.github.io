## 대충 자바스크립트 모듈 사용 방법

### 1번

a.js
```javascript
export default function a() {
    console.log("a 에서 실행된 a 함수");
}
```
b.js
```javascript
import a from './a.js';
a();
```
결과:

<samp>a 에서 실행된 a 함수</samp>

### 2번

a.js
```javascript
const a = function() {
    console.log("a 에서 실행된 a 함수");
}
const b = function() {
    console.log("a 에서 실행된 b 함수");
}
export default {a, b}
```
b.js
```javascript
import a from './a.js';
a.a();
a.b();
```
결과:

<samp>a 에서 실행된 a 함수</samp>

<samp>a 에서 실행된 b 함수</samp>

### 3번

a.js
```javascript
import  ip6  from 'https://cdn.jsdelivr.net/gh/elgs/ip6/ip6.js';
console.log(ip6.normalize("::1"));
```
결과:

<samp>0000:0000:0000:0000:0000:0000:0000:0001</samp>

이런식으로 url을 통해서도 가져오기 가능