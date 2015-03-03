$(document).ready(function() {
    $("#simplify-payment-form").on("submit", function() {
        // Disable the submit button
        console.log("some shit is happening brah");
        $("#process-payment-btn").attr("disabled", "disabled");
        // Generate a card token & handle the response
        SimplifyCommerce.generateToken({
            //sandbox API key sbpb_ZT...
            key: "sbpb_ZTg3OWIwY2QtZTcyMi00YTA4LWJiOTctMzFjMmQzYjcwMzEw",
            card: {
                number: $("#cc-number").val(),
                cvc: $("#cc-cvc").val(),
                expMonth: $("#cc-exp-month").val(),
                expYear: $("#cc-exp-year").val()
            }
        }, simplifyResponseHandler);
        // Prevent the form from submitting
        return false;
    });
});


function simplifyResponseHandler(data) {
    console.log("some shit is happening dude");
    var $paymentForm = $("#simplify-payment-form");
    // Remove all previous errors
    $(".error").remove();
    // Check for errors
    if (data.error) {
        console.log("some shit is happening error");
        // Show any validation errors
        if (data.error.code == "validation") {
            var fieldErrors = data.error.fieldErrors,
                fieldErrorsLength = fieldErrors.length,
                errorList = "";
            for (var i = 0; i < fieldErrorsLength; i++) {
                errorList += "<div class='error'>Field: '" + fieldErrors[i].field +
                             "' is invalid - " + fieldErrors[i].message + "</div>";
            }
            // Display the errors
            $paymentForm.after(errorList);
        }
        // Re-enable the submit button
        $("#process-payment-btn").removeAttr("disabled");
    } else {
        // The token contains id, last4, and card type
        var token = data["id"];
        // Insert the token into the form so it gets submitted to the server
        $paymentForm.append("<input type='hidden' name='simplifyToken' value='" + token + "' />");
        // Submit the form to the server
        $paymentForm.get(0).submit();
        console.log("some shit is happening brah");
    }
}