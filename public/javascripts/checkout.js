Stripe.setPublishableKey('pk_test_TByqpqRxl3UvcAUBnZuhiADr00IxHuwTXZ');

var $form =$('#checkout-form');

$form.submit(function(event){
    $('#charge-error').addClass('hidden');
    $form.find('button').prop('disabled',true);
    Stripe.card.createToken({
        number:$('#card-number').val(),
        cvc:$('#card-cvc').val(),
        card_exp_month:$('#card_exp_month').val(),
        card_exp_year:$('#card-expiry-year').val(),
        name:$('#Cname').val(),
    },stripeResponseHandler);
    return false;
});


function stripeResponseHandler(status,response){
    if(response.error){

        $('#charge-error').text(response.error.message);
        $('#charge-error').removeClass('hidden');
        $form.find('button').prop('disabled',false);
     } else {
         var token = response.id;

         $form.append($('<input type="hidden" name="stripeToken" />').val(token));

         $form.get(0).submit();
     }
}















// var form = document.getElementById('checkout-form');
// form.addEventListener('submit', function(event) {
//   event.preventDefault();

//   stripe.createToken(card).then(function(result) {
//     if (result.error) {
//       // Inform the customer that there was an error.
//       var errorElement = document.getElementById('card-errors');
//       errorElement.textContent = result.error.message;
//     } else {
//       // Send the token to your server.
//       stripeTokenHandler(result.token);
//     }
//   });
// });