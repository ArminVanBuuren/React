import isoFetch from 'isomorphic-fetch';

import { loadingAct, loadingSuccessAct, loadingErrorAct } from "./countersAC";

const url = "https://fe.it-academy.by/AjaxStringStorage2.php";
const projectName = "VKHOVANSKIY_REACT";

function mailItemsFetchAC( dispatch, emulation ) {
    // Как и любой action creator, countriesThunkAC должен вернуть action,
    // только action будет не хэш, а ФУНКЦИЯ.
    // Все middleware стоят ДО редьюсеров, их задача - преобразовывать или фильтровать action-ы.
    // Конкретно middleware "thunk", если обнаруживает что action - функция а не хэш, 
    // ВЫПОЛНЯЕТ эту функцию и не пропускает её дальше, к редьюсерам.
    return function () {
        dispatch( loadingAct(emulation) );

        let result;
        if (emulation){
            result = new Promise((resolve, reject) => {
            setTimeout( () => {
                resolve(
[{
account: { id: 1, name: "V.Khovanskiy", mail: "vkhovanskiy@test.com" },
filter: { 
    testing: ["test.com", "testing.com"]
},
items: [{ name: "Inbox", mails: [
{ msgId:1,  dateOfSent:"01.01.2021 05:00:00", subject:"Hi from Test", from:"test@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good morning!</h2><p>Test - 1</p>" },
{ msgId:2,  dateOfSent:"01.01.2021 06:00:00", subject:"Hi from Stepanov", from:"stepanov@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good morning!</h2><p>Test - 2</p>" },
{ msgId:3,  dateOfSent:"01.01.2021 07:00:00", subject:"Hi from Petrov", from:"petrov@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good morning!</h2><p>Test - 3</p>" },
{ msgId:4,  dateOfSent:"01.01.2021 08:00:00", subject:"Hi from Sidorov", from:"sidorov@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good morning!</h2><p>Test - 4</p>" },
{ msgId:5,  dateOfSent:"01.01.2021 09:00:00", subject:"Hi from Ivanov", from:"ivanov@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good morning!</h2><p>Test - 5</p>" },
{ msgId:6,  dateOfSent:"01.01.2021 10:00:00", subject:"Hi from Smirnov", from:"smirnov@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good morning!</h2><p>Test - 6</p>" },
{ msgId:7,  dateOfSent:"01.01.2021 11:00:00", subject:"Hi from Vasilev", from:"vasilev@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good morning!</h2><p>Test - 7</p>" },
{ msgId:8,  dateOfSent:"01.01.2021 12:00:00", subject:"Hi from Semenov", from:"semenov@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good afternoon!</h2><p>Test - 8</p>" },
{ msgId:9,  dateOfSent:"01.01.2021 13:00:00", subject:"Hi from Zaharov", from:"zaharov@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good afternoon!</h2>Test - 9</p>" },
{ msgId:10, dateOfSent:"01.01.2021 14:00:00", subject:"Hi from Morozov", from:"morozov@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good afternoon!</h2>Test - 10</p>" },
{ msgId:11, dateOfSent:"01.01.2021 15:00:00", subject:"Hi from Sokolov", from:"sokolov@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good afternoon!</h2>Test - 11</p>" },
{ msgId:12, dateOfSent:"01.01.2021 16:00:00", subject:"Hi from Kuznecov", from:"kuznecov@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good afternoon!</h2>Test - 12</p>" },
{ msgId:13, dateOfSent:"01.01.2021 17:00:00", subject:"Hi from Nikolaev", from:"nikolaev@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good afternoon!</h2>Test - 13</p>" },
{ msgId:14, dateOfSent:"01.01.2021 18:00:00", subject:"Hi from Egorov", from:"egorov@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good evening!</h2><p>Test - 14</p>" },
{ msgId:15, dateOfSent:"01.01.2021 19:00:00", subject:"Hi from Lebedev", from:"lebedev@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good evening!</h2><p>Test - 15</p>" },
{ msgId:16, dateOfSent:"01.01.2021 20:00:00", subject:"Hi from Volkov", from:"volkov@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good evening!</h2><p>Test - 16</p>" },
{ msgId:17, dateOfSent:"01.01.2021 21:00:00", subject:"Hi from Makarov", from:"makarov@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good evening!</h2><p>Test - 17</p>" },
{ msgId:18, dateOfSent:"01.01.2021 22:00:00", subject:"Hi from Fedorov", from:"fedorov@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good evening!</h2><p>Test - 18</p>" },
{ msgId:19, dateOfSent:"01.01.2021 23:00:00", subject:"Hi from Alekseev", from:"alekseev@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good night!</h2><p>Test - 19</p>" },
{ msgId:20, dateOfSent:"02.01.2021 05:00:00", subject:"Hi from Kozlov", from:"kozlov@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good night!</h2><p>Test - 20</p>" },
{ msgId:21, dateOfSent:"02.01.2021 06:00:00", subject:"Hi from Pavlov", from:"pavlov@test.com", to:"vkhovanskiy@test.com", content:"<h2>Good night!</h2><p>Test - 21</p>" },
]},

{ name: "Outbox", mails: [
{ msgId:1, dateOfSent:"30.04.2021 09:00:00", subject:"test-outbox", from:"vkhovanskiy@test.com", to:"test@test.com", content:"Good morning, Test!" },
]},
    ]
}]               
);
            }, 300);
        })
        .then( ( data ) => {
            dispatch( loadingSuccessAct( data ) );
        } );

        }
        else {

            let sp = new URLSearchParams();
            sp.append('f', 'READ');
            sp.append('n', projectName);
            
            result = isoFetch( url,  { method: 'post', body: sp } )
            .then( ( response ) => {
                
                if ( !response.ok ) {
                    let Err = new Error( "fetch error " + response.status );
                    Err.userMessage = "Ошибка связи";
                    throw Err;
                } else {
                    return response.json();
                }
            } )
            .then( ( data ) => {
                dispatch( loadingSuccessAct( JSON.parse(data.result) ) );
            } );

        }

        result.catch( ( error ) => {
            console.error(error);
            dispatch( loadingErrorAct() );
        } );
    }

}

function mailItemsSyncAC( dispatch, mailData, emulation ) {
    return function () {
        dispatch( loadingAct() );

        let result;
        if (emulation){
            result = Promise.resolve();
        }
        else { 
            let password = Math.random();
            let sp = new URLSearchParams();
            sp.append('f', 'LOCKGET');
            sp.append('n', projectName);
            sp.append('p', password);
    
            result = isoFetch(url, {
                method: 'POST',
                body: sp
            })
            .then(( response ) => {
                if ( !response.ok ) {
                    let Err = new Error( "fetch error " + response.status );
                    Err.userMessage = "Ошибка связи";
                    throw Err;
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                pullData(dispatch, mailData, password);
            });
        }

        result.catch( ( error ) => {
            console.error(error);
            dispatch( loadingErrorAct() );
        } );
    };
}

function pullData(dispatch, mailData, password){

    let sp = new URLSearchParams();
    sp.append('f', 'UPDATE');
    sp.append('n', projectName);
    sp.append('v', JSON.stringify(mailData));
    sp.append('p', password);

    isoFetch(url, {
        method: 'POST',
        body: sp
    })
    .then(( response ) => {
        if ( !response.ok ) {
            let Err = new Error( "fetch error " + response.status );
            Err.userMessage = "Ошибка связи";
            throw Err;
        } else {
            return response.json();
        }
    })
    .then((data) => {
        dispatch( mailItemsFetchAC( dispatch ) );
    })
    .catch( ( error ) => {
        console.error(error);
        dispatch( loadingErrorAct() );
    } );

}

export { mailItemsFetchAC, mailItemsSyncAC };