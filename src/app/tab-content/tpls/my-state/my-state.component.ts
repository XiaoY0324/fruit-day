import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-state',
  templateUrl: './my-state.component.html',
  styleUrls: ['./my-state.component.scss']
})
export class MyStateComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}

            /*       定义类装饰器           */

// const Component2 = component => {
//   return (target: any) => {
//     // console.info(target, component);
//     // target         =>         类构造函数(function)
//     // conponent      =>         { selector: "person", template: "person.html" }
//     return componentClass(target, component);
//   }
// }

// // componentClass的实现
// const componentClass = (target: any, component?: any): any => {
//   const original = target; // 原构造函数

//   const construct = (constructor, args) => { // 继承原构造函数的方法 在方法f中调用
//      // constructor = original = target   => 原构造函数
//      // args                              => 构造函数的参数

//     // console.info(this); // this -> window
//     let c: any = function() {
//       // console.info(this); // this -> c
//       return constructor.apply(this, args);
//     }

//     c.prototype = constructor.prototype;

//     return new c; // 继承了原构造函数 返回新的构造函数的实例 此为componentClass方法最终返回的结果
//   }

//   let f: any = (...args) => { // f 为新的构造函数
//     console.log('selector: ' + component.selector);
//     console.log('template: ' + component.template);
//     console.log(`Person: ${ original.name }(${ JSON.stringify(args) })`);
//     return construct(original, args);
//   }

//   f.prototype = original.prototype; // 构造函数的原型链指向原构造函数的原型链
//   return f;
// }

// @Component2({
//   selector: 'person',
//   template: 'person.html'
// })
// class Person {
//   constructor(public a: string, public b: string) {}
// }

// let p = new Person('angular', 'js');
// // my-state.component.ts:43 selector: person
// // my-state.component.ts:44 template: person.html
// // my-state.component.ts:45 Person: Person(["angular","js"])

// console.info(p); //  {a: "angular", b: "js"}


               /*       定义方法装饰器           */

// const log = (target: Object, propertyKey: string, descriptor: TypePropertyDescriptor<any>) => {
//   // target               =>     类的原型对象 { testMethod: ..., constructor: ... }
//   // propertyKey          =>     要装饰的方法的名字  'testMethod'
//   // descriptor           =>     成员属性描述
//   console.info(target, propertyKey, descriptor);
//   let origin = descriptor.value;
// }

//  class TestClass {
//    @log
//    testMethod(arg: string) {
//      return 'logMsg: ' + arg;
//    }
//  }


