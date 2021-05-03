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
    items: {
        inbox: [
            { msgId:1,  dateOfSent:"01.01.2021 05:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good morning, Vlaidimir!" },
            { msgId:2,  dateOfSent:"01.01.2021 06:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good morning, Vlaidimir!" },
            { msgId:3,  dateOfSent:"01.01.2021 07:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good morning, Vlaidimir!" },
            { msgId:4,  dateOfSent:"01.01.2021 08:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good morning, Vlaidimir!" },
            { msgId:5,  dateOfSent:"01.01.2021 09:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good morning, Vlaidimir!" },
            { msgId:6,  dateOfSent:"01.01.2021 10:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good morning, Vlaidimir!" },
            { msgId:7,  dateOfSent:"01.01.2021 11:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good morning, Vlaidimir!" },
            { msgId:8,  dateOfSent:"01.01.2021 12:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good afternoon, Vlaidimir!" },
            { msgId:9,  dateOfSent:"01.01.2021 13:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good afternoon, Vlaidimir!" },
            { msgId:10, dateOfSent:"01.01.2021 14:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good afternoon, Vlaidimir!" },
            { msgId:11, dateOfSent:"01.01.2021 15:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good afternoon, Vlaidimir!" },
            { msgId:12, dateOfSent:"01.01.2021 16:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good afternoon, Vlaidimir!" },
            { msgId:13, dateOfSent:"01.01.2021 17:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good afternoon, Vlaidimir!" },
            { msgId:14, dateOfSent:"01.01.2021 18:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good evening, Vlaidimir!" },
            { msgId:15, dateOfSent:"01.01.2021 19:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good evening, Vlaidimir!" },
            { msgId:16, dateOfSent:"01.01.2021 20:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good evening, Vlaidimir!" },
            { msgId:17, dateOfSent:"01.01.2021 21:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good evening, Vlaidimir!" },
            { msgId:18, dateOfSent:"01.01.2021 22:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good evening, Vlaidimir!" },
            { msgId:19, dateOfSent:"01.01.2021 23:00:00", subject:"test-subject", from:"test@test.com", to:"vkhovanskiy@test.com", content:"Good night, Vlaidimir!" },
        ],
        outbox: [
            { msgId:1, dateOfSent:"30.04.2021 09:00:00", subject:"test-oubox", from:"vkhovanskiy@test.com", to:"test@test.com", content:"Good morning, Test!" },
        ],
    }                    
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