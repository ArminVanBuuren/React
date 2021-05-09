import isoFetch from 'isomorphic-fetch';

import { loadingAct, loadingSuccessAct, loadingErrorAct } from "./countersAC";

const url = "https://fe.it-academy.by/AjaxStringStorage2.php";

function mailItemsFetchAC( dispatch ) {
    // Как и любой action creator, countriesThunkAC должен вернуть action,
    // только action будет не хэш, а ФУНКЦИЯ.
    // Все middleware стоят ДО редьюсеров, их задача - преобразовывать или фильтровать action-ы.
    // Конкретно middleware "thunk", если обнаруживает что action - функция а не хэш, 
    // ВЫПОЛНЯЕТ эту функцию и не пропускает её дальше, к редьюсерам.
    return function () {
        dispatch( loadingAct() );

        new Promise((resolve, reject) => {
            setTimeout( () => {
                resolve(
[{
account: { id: 1, name: "V.Khovanskiy", mail: "vkhovanskiy@test.com" },
filter: { 
    testing: ["test.com", "testing.com"]
},
items: [{ name: "Inbox", mails: [
{ msgId:1,  dateOfSent:"01.01.2021 05:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good morning, Vlaidimir!<p>Test - 1</p>" },
{ msgId:2,  dateOfSent:"01.01.2021 06:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good morning, Vlaidimir!<p>Test - 2</p>" },
{ msgId:3,  dateOfSent:"01.01.2021 07:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good morning, Vlaidimir!<p>Test - 3</p>" },
{ msgId:4,  dateOfSent:"01.01.2021 08:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good morning, Vlaidimir!<p>Test - 4</p>" },
{ msgId:5,  dateOfSent:"01.01.2021 09:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good morning, Vlaidimir!<p>Test - 5</p>" },
{ msgId:6,  dateOfSent:"01.01.2021 10:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good morning, Vlaidimir!<p>Test - 6</p>" },
{ msgId:7,  dateOfSent:"01.01.2021 11:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good morning, Vlaidimir!<p>Test - 7</p>" },
{ msgId:8,  dateOfSent:"01.01.2021 12:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good afternoon, Vlaidimir!<p>Test - 8</p>" },
{ msgId:9,  dateOfSent:"01.01.2021 13:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good afternoon, Vlaidimir!<p>Test - 9</p>" },
{ msgId:10, dateOfSent:"01.01.2021 14:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good afternoon, Vlaidimir!<p>Test - 10</p>" },
{ msgId:11, dateOfSent:"01.01.2021 15:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good afternoon, Vlaidimir!<p>Test - 11</p>" },
{ msgId:12, dateOfSent:"01.01.2021 16:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good afternoon, Vlaidimir!<p>Test - 12</p>" },
{ msgId:13, dateOfSent:"01.01.2021 17:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good afternoon, Vlaidimir!<p>Test - 13</p>" },
{ msgId:14, dateOfSent:"01.01.2021 18:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good evening, Vlaidimir!<p>Test - 14</p>" },
{ msgId:15, dateOfSent:"01.01.2021 19:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good evening, Vlaidimir!<p>Test - 15</p>" },
{ msgId:16, dateOfSent:"01.01.2021 20:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good evening, Vlaidimir!<p>Test - 16</p>" },
{ msgId:17, dateOfSent:"01.01.2021 21:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good evening, Vlaidimir!<p>Test - 17</p>" },
{ msgId:18, dateOfSent:"01.01.2021 22:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good evening, Vlaidimir!<p>Test - 18</p>" },
{ msgId:19, dateOfSent:"01.01.2021 23:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good night, Vlaidimir!<p>Test - 19</p>" },
{ msgId:20, dateOfSent:"02.01.2021 05:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good night, Vlaidimir!<p>Test - 20</p>" },
{ msgId:21, dateOfSent:"02.01.2021 06:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good night, Vlaidimir!<p>Test - 21</p>" },
]},

{ name: "Outbox", mails: [
{ msgId:1, dateOfSent:"30.04.2021 09:00:00", subject:"test-oubox", from:"vkhovanskiy@test.com", to:"test@test.com", content:"Good morning, Test!" },
]},
    ]
}]               
);
            }, 300);
        })

        // isoFetch( url )
        //     .then( ( response ) => {
                
        //         // response - HTTP-ответ
        //         if ( !response.ok ) {
        //             let Err = new Error( "fetch error " + response.status );
        //             Err.userMessage = "Ошибка связи";
        //             throw Err;
        //         } else {
        //             return response.json();
        //         }
        //     } )

            .then( ( data ) => {
                dispatch( loadingSuccessAct( data ) );
            } )
            .catch( ( error ) => {
                dispatch( loadingErrorAct() );
            } );
    }

}

function mailItemsUpdateAC( dispatch, data ) {
    return function () {
        dispatch( loadingAct() );
        new Promise((resolve, reject) => { setTimeout( () => {resolve()}, 300 ) } )

        // isoFetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then(( response ) => {
        //     if ( !response.ok ) {
        //         let Err = new Error( "fetch error " + response.status );
        //         Err.userMessage = "Ошибка связи";
        //         throw Err;
        //     } else {
        //         return response.json();
        //     }
        // })

        .then(() => {
            dispatch( mailItemsFetchAC( dispatch ) );
        })
        .catch( ( error ) => {
            dispatch( loadingErrorAct() );
        } );
    };
}

export { mailItemsFetchAC, mailItemsUpdateAC };