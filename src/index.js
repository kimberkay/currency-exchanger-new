import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import  ExchangeRateAPI from './js/ExchangeAPI.js';



function clearFields() {
  $('#amount').val("");
  $('#showErrors').text("");
  $('.showConversion').text("");
}

function entryError(usDollars,currency) {
  if (NaN(usDollars) === true) {
    $("#showErrors1").text(`"Error: please enter just a number, no $"`);
  } 
  if (currency === !currency) {
    $('#showErrors2').text("Error: currency selected is not available");
  }
}

$(document).ready(function() {
  $('#form-convert').submit(function(event) {
    event.preventDefault();
    let usDollars = $("#amount").val();
    let currency = $("#pickCurrency").val();
    clearFields();
    let promise = ExchangeRateAPI.getRate(currency);
    promise.then(function(response) {
      const result = JSON.parse(response); 
      function conversion() {
        return Math.round(result.conversion_rate * usDollars * 100)/100;
      }
      $('#showConversion').text(`$${usDollars} USD converts to $${conversion()} ${currency}`);
    }, function(error) {
      $("#showError").text(`There was an error processing your request: ${error}`);
    });
    entryError();
  });
});

