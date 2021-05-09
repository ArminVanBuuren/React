"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import MobileCompany from '../components/MobileCompany';

test('работа MobileCompany', () => {
  
  let data = require('../data.json');

  // создаём тестовую версию компонента
  const component = renderer.create(
    <MobileCompany data={data} />
  );

  // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  function testWhenOnClickButton(buttonName){
    const buttonElem = component.root.findAll( el => el.type == 'input' && el.props.value && el.props.value == buttonName)[0];
    buttonElem.props.onClick();
    componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  }

  testWhenOnClickButton('Активные');
  testWhenOnClickButton('Заблокированные');
  testWhenOnClickButton('Все');
  testWhenOnClickButton('Удалить');
  testWhenOnClickButton('Редактировать');
  testWhenOnClickButton('Добавить клиента');
  testWhenOnClickButton('OK');
  
  /*
  // можно эмулировать события, передавая в качестве объекта события то что нам нужно:
  wrapper.find('select').simulate('change', {
    target: { value: "hello" },
  });
  */

});

