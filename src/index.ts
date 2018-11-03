import * as _ from 'lodash'
// 可以安装@types/lodash 声明文件
// 通过typings 安装lodash，并在tsconfig.json里面配置
// @types/lodash可以检查代码是否错误

let space = _.chunk(['a', 'b', 'c', 'd'], 2);
console.log(space);

let someArray = [1, "string", false];

for (let entry of someArray) {
    console.log(entry); // 1, "string", false
}

class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");

console.log(greeter.greet());