jQuery(document).ready(function ($) {

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  $(".pdf-report-btn").on('click', function() {
    $('#pdf-report').modal({
      fadeDuration: 250,
      fadeDelay: 0.20
    });
  })

  $("#send-pdf-report").on('click', function(e) {
    e.preventDefault();
    var calculator_data = $("div.fuel-savings-calculator-wrapper").attr("data-calculator");
    calculator_data = JSON.parse(decodeURIComponent(calculator_data));
    
    var name = $("#pdf-report").find("#name").val();
    var email = $("#pdf-report").find("#email").val();

    if (name === "" || email === "") 
      toastr.info('Name and Email are required.')
    else if (!validateEmail(email))
      toastr.info('The email is invalid.')
    else {
      // Display loader
      $('#pdf-report').find('img').show();
      jQuery.ajax({
          url         :   "/wp-admin/admin-ajax.php",
          type        :   "POST",
          data        :   { action : "fscs_generate_pdf", name, email, calculator_data },
          dataType    :   "json"
      })
      .done(function (data, textStatus, jqXHR) {
        
        if(data.status === 'success')
          toastr.info('Email sent')

          // Hide loader
          $('#pdf-report').find('img').hide();

          // Reload page after sending the auto generated pdf
          setTimeout(function() {
            location.reload();
          }, 1000);
          
      })
      .fail(function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR)
        $('#pdf-report').find('img').hide();
      });
    }
      
  })
});