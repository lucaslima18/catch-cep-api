"use strict";

Parse.Cloud.define('cep', (request, response) => {
    const cep = request.params['cep'];
    const cepRegex = RegExp('^\\d{5}\-?\\d{3}$');

    if (cep.match(cepRegex)) {
        Parse.Cloud.httpRequest({
            url: `http://viacep.com.br/ws/${cep}/json/`  
        }).then((httpResponse) => {
            if (httpResponse.text === "{\n  \"erro\": true\n}") {
                response.error({'valid': false});
            } else {
                response.success(httpResponse.data);
            }
        }, (httpResponse) => {
            response.error(httpResponse.status);
        });
    } else {
        response.error({'valid': false});
    }
});
