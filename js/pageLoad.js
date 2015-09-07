$(document).ready(function(){

    // Reset the form to original values
    $(document).on('click', '.reset', function(e) {
        $('.inputF')[0].reset();
        $('#schedule').empty();
        $('.sendEmail').prop('checked', false);
        $('.emailTD').hide();
        return false;
    });

    // submit the form
    $(document).on('click', '.submit', function(e) {
        var userName = $('.userName').val();
        var projName = $('.projName').val();
        var contact = $('.contact').val();
        var contact_company = $('.contact_company').val();
        var contact_email = $('.contact_email').val();
        var contact_phone = $('.contact_phone').val();
        var priceHome = $('.priceHome').val() == '' ? 0 : $('.priceHome').val();
        var priceWork = $('.priceWork').val() == '' ? 0 : $('.priceWork').val();
        var priceGoodWill = $('.priceGoodWill').val() == '' ? 0 : $('.priceGoodWill').val();
        var priceInventory = $('.priceInventory').val() == '' ? 0 : $('.priceInventory').val();
        var priceFFE = $('.priceFFE').val() == '' ? 0 : $('.priceFFE').val();
        var priceOther = $('.priceOther').val() == '' ? 0 : $('.priceOther').val();
        var interest = 6;
        var type = 'getCalc';
        var email = 'yes';
        var eAddress = $('.email').val();

        // Materialize.toast(message, displayLength, className, completeCallback);
        Materialize.toast('', 1, 'customtoast');

        //data validation
        if(userName == '') {
            
            $('html, body').animate({
                scrollTop: $("#userName").offset().top - 90
            }, 700);
            
            // Materialize.toast(message, displayLength, className, completeCallback);
            Materialize.toast('Please enter Your Name!', 2000, 'customtoast');

            $("#userName").addClass('invalid');
            $("#userName").focus();

        } else if(eAddress == '') {
            
            $('html, body').animate({
                scrollTop: $("#email").offset().top - 90
            }, 700);
            
            // Materialize.toast(message, displayLength, className, completeCallback);
            Materialize.toast('Please enter a valid email Id!', 2000, 'customtoast');

            $("#email").addClass('invalid');
            $("#email").focus();

        } else if(priceHome == 0 && priceWork == 0 && priceGoodWill == 0 && priceInventory == 0 && priceFFE == 0 && priceOther == 0) {

            // Materialize.toast(message, displayLength, className, completeCallback);
            Materialize.toast('Please Enter Project cost details', 2000, 'customtoast');

        } else {

            //$('#modal2').openModal();

            // Materialize.toast(message, displayLength, className, completeCallback);
            Materialize.toast('Please wait!', 2000, 'customtoast1');

            var dataString = "type=" + type + "&priceHome=" + priceHome + "&priceWork=" + priceWork + "&priceGoodWill=" + priceGoodWill  
                       + "&priceInventory=" + priceInventory + "&priceFFE=" + priceFFE + "&priceOther=" + priceOther + "&interest="
                       + interest + "&email=" + email + "&projName=" + projName + "&userName=" + userName + "&contact=" + contact 
                       + "&contact_company=" + contact_company + "&contact_email=" + contact_email + "&contact_phone=" + contact_phone 
                       + "&eAddress=" + eAddress;
                
            $.ajax({
                type: "GET",
                url: 'http://www.yoursba.com/pages/Appypie/calc-ws.php',  
                dataType: 'jsonp',                 // Using jsonp to avoid crossdomain problems e.g. www.site.com vs site.com
                data: dataString,  
                success: function(response) {
                    if(response) {
                        if(response.error == 1) {  // handle errors
                            modal.open({content: response.message});
                            hideLoading();
                            //alert(response.message);

                        } else {
                            /*var data = '<div class="innerContent" style="margin: 10px 6px;"><h5>ESTIMATED SOURCE OF FUNDS WORKSHEET</h5>';
                            data += '<h6 style="color:#004A9C;">Loan Details</h6>'
                                     + '<p><strong>Requested By: </strong><strong style="color: #00AD73">' + userName + '</strong></p>'
                                     + '<p><strong>Prepared for: </strong><strong style="color: #00AD73">' + projName + '</strong></p>'
                                     + '<p><strong>Contact Details of Seller or Broker: </strong><strong style="color: #00AD73">' + contact + '</strong></p>'
                                     + '<table class="firstTable bordered">'
                                     + '<tbody>';
                            var i = 0;
                            $.each(response.firstTable, function(key, val) {
                                if (i % 2 == 0) {
                                    data += '<tr class="evenRow" name="evenRow">';
                                } else {
                                    data += '<tr class="oddRow" name="oddRow">';
                                }
                                if (i>0 && i<7) {
                                    data += '<td>&nbsp;&nbsp;&nbsp;&nbsp;' + val.name + '</td><td>' + val.value + '</td></tr>';
                                } else {
                                    data += '<td>' + val.name + '</td><td>' + val.value + '</td></tr>';
                                }
                                i++;
                            });
                            data += '</tbody></table>';
                            
                            data += '<h6 style="color:#004A9C;">Estimated Closing Costs</h6>'
                                     + '<table class="firstTable bordered">'
                                     + '<tbody>';
                            var i = 0;
                            $.each(response.thirdTable, function(key, val) {
                                if (i % 2 == 0) {
                                    data += '<tr class="evenRow" name="evenRow">';
                                } else {
                                    data += '<tr class="oddRow" name="oddRow">';
                                }
                                data += '<td>' + val.name + '</td><td>' + val.value + '</td></tr>';
                                i++;
                            });
                            data += '</tbody></table><br><br>';
                            
                            data += '</div>';

                            //Add content to the modal and open it
                            $('#modal2').closeModal();

                            $('.modal-content').html(data);
                            $('#modal1').openModal();*/

                            // Materialize.toast(message, displayLength, className, completeCallback);
                            Materialize.toast('The Email has been sent!', 2000, 'customtoast1');
                            return false;
                        }
                    }
                },
                error: function(xhr){
                    alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
                }
            });// End of Ajax
        }

        //showLoading();
        return false;
    });//End of onclick 'Submit'

});