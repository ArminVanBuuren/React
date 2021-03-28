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

  function testWhenOnClickButton(condition){
    
    const buttonElem = component.root.find( el => el.type == 'input' && condition(el));
    buttonElem.props.onClick();
    componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  }

  testWhenOnClickButton((el) => el.props.value == 'Активные');
  testWhenOnClickButton((el) => el.props.value == 'Заблокированные');
  testWhenOnClickButton((el) => el.props.value == 'Добавить клиента');
  testWhenOnClickButton((el) => el.props.value == 'OK');

  
  /*
  // можно эмулировать события, передавая в качестве объекта события то что нам нужно:
  wrapper.find('select').simulate('change', {
    target: { value: "hello" },
  });
  */

});

