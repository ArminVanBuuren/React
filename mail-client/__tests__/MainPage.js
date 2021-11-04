"use strict";

import React from 'react';
import * as renderer from 'react-test-renderer';
import { URLSearchParams } from 'url';

import MainPage from '../src/core/MainPage.jsx';
import ControlHeader from '../src/components/ControlHeader.jsx';

global.URLSearchParams = URLSearchParams;
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};


// console.log(`Start:[${formatDateTime(new Date())}]`);
// it('mock setTimeout test', (done) => {
//   setTimeout(() => {
//     done();
//     console.log(`End:[${formatDateTime(new Date())}]`);
//   }, 1000);
// });

// it('mock setTimeout test', (done) => {
//   setTimeout(() => {
//     done();
//     console.log(`End:[${formatDateTime(new Date())}]`);
//   }, 1000);
// });



function clickButton(component, buttonId){
  const buttonElem = component.root.findAll( btn => btn.id === buttonId )[0];
  console.log(`${buttonId} finded=${buttonElem != null && buttonElem != undefined}`);
  buttonElem.props.onClick();
}

function formatDateTime(dt) {
  var year = dt.getFullYear();
  var month = dt.getMonth()+1;
  var day = dt.getDate();
  var hours = dt.getHours();
  var minutes = dt.getMinutes();
  var seconds = dt.getSeconds();
  return str0l(day, 2) + '.' + str0l(month, 2) + '.' + year + ' ' + str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2);
}

function str0l(val, len) {
  var strVal=val.toString();
  while ( strVal.length < len )
      strVal='0'+strVal;
  return strVal;
}

test('работа MainPage', async () => {
  let component = renderer.create( <MainPage emulation={true} />);
  console.log(`Start:[${formatDateTime(new Date())}]`);
  await new Promise((r) => setTimeout(r, 2000));
  console.log(`End:[${formatDateTime(new Date())}]`);
  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // clickButton(component, "createButton");
  // await new Promise((r) => setTimeout(r, 1000));
  // let componentCreate = component.toJSON();
  // expect(componentCreate).toMatchSnapshot();
});



function whenPromise(description, delay, func) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`Start:[${formatDateTime(new Date())}]=${description}`);
      let result = func();

      jest.useRealTimers();
      setTimeout(() => {
        console.log(`End:[${formatDateTime(new Date())}]`);
        resolve(result);
      }, delay);
      jest.runAllTimers();

      //await new Promise((r) => setTimeout(r, delay));
      // console.log(`End:[${formatDateTime(new Date())}]`);
      // resolve(result);
    }
    catch (error) {
      console.error(`error=${error}`);
      reject(error);
    }
  });
}

test('работа MainPage', () => {
  return;

  whenPromise("Получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась", 5000, function () { 
    return renderer.create( <MainPage emulation={true} /> );
  })
  .then((component) => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();

    return whenPromise("Нажимаем на кнопку создать", 2000, () => {
      clickButton(component, "createButton");
      return component;
    });
  })
  .then((component) => {
    let componentCreate = component.toJSON();
    expect(componentCreate).toMatchSnapshot(); 

    return whenPromise("Нажимаем на кнопку обновить", 1000, () => {
      clickButton("reloadButton");
      return component;
    });
  })
  .then((component) => {
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
    return null;
  })
  .catch((error) =>{
    console.log(error);
  });

  
  /*
  // можно эмулировать события, передавая в качестве объекта события то что нам нужно:
  wrapper.find('select').simulate('change', {
    target: { value: "hello" },
  });
  */

});

