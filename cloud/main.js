Parse.Cloud.define('cep', (request, response) => {
    const { Cep } = request.params;
    const cepRegex = RegExp('^\\d{5}\-?\\d{3}$');//regex for Cep

    if(Cep.match(cepRegex)){
        //call the api
        Parse.Cloud.httpRequest({
        url: `http://viacep.com.br/ws/${ Cep }/json/`  
      })
      .then(function(httpResponse) {
        //success call back
        let myJSON = httpResponse.text;

        if(myJSON == "{\n  \"erro\": true\n}"){
          //Error to verficate the existence of the CEP
          console.log(httpResponse.text);
          console.log("This CEP dont exist :(");
          myJSON = {"valid": false};
          console.log(myJSON);
        }

        else{
          //Success to find the CEP
          console.log(httpResponse.text);
        }
      },  
      function(httpResponse) {
        //Error call back
        'response code ' + httpResponse.status;
      });
    }

      else{
        //Error to validate the CEP
        let myJSON = {"valid": false}; 
        console.log(myJSON);
        console.log('this Cep is not valid :(')
      }   
    
});