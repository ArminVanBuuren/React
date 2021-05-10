"use strict";

import React from 'react';
import * as renderer from 'react-test-renderer';

import MainPage from '../src/core/MainPage.jsx';
import ControlHeader from '../src/components/ControlHeader.jsx';

function whenPromise(description, delay, func) {
  return new Promise((resolve, reject) => {
    let result = func();
    setTimeout( () => {
      resolve(result);
    }, delay);
  });
}

function clickButton(buttonId){
  const buttonElem = component.root.findAll( btn => btn.id === buttonId )[0];
  buttonElem.props.onClick();
}

test('работа MainPage', () => {

  const ddd = renderer.create( <MainPage /> );
  //console.log(ddd);

  // whenPromise("Получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась", 1000, () => { 
  //   return renderer.create( <MainPage /> );
  // })
  // .then((component) => {
  //   let componentTree = component.toJSON();
  //   expect(componentTree).toMatchSnapshot();

  //   return whenPromise("Нажимаем на кнопку создать", 200, () => {
  //     clickButton("createButton");
  //     return component;
  //   });
  // })
  // .then((component) => {
  //   let componentCreate = component.toJSON();
  //   expect(componentCreate).toMatchSnapshot(); 

  //   return whenPromise("Нажимаем на кнопку обновить", 1000, () => {
  //     clickButton("reloadButton");
  //     return component;
  //   });
  // })
  // then((component) => {
  //   let componentTree = component.toJSON();
  //   expect(componentTree).toMatchSnapshot();
  //   return null;
  // });

  
  /*
  // можно эмулировать события, передавая в качестве объекта события то что нам нужно:
  wrapper.find('select').simulate('change', {
    target: { value: "hello" },
  });
  */

});

