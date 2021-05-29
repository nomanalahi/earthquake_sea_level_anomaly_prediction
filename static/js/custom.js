$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                let result = JSON.parse(data);
                let sentence = '<i class="fa fa-check"></i><p>Next three earthquakes (magnitude >= 5.5)</p><p></p>'
                sentence  += '<p>Quarter of the year: '+ result.eq1_quarter + ',  Month: ' + result.eq1_month + ' </p>';
                sentence  += '<p>Quarter of the year: '+ result.eq2_quarter + ', Month: ' + result.eq2_month + ' </p>';
                sentence  += '<p>Quarter of the year: '+ result.eq3_quarter + ', Month: ' + result.eq3_month + ' </p>';
                
                sentence += '<i class="fa fa-check"></i><p>Sea level anomaly</p><p></p>';
                sentence     += '<p>January: '+ result.sla1 + ' meter</p>';
                sentence     += '<p>February: '+ result.sla2 + ' meter</p>';
                sentence     += '<p>March: '+ result.sla3 + ' meter</p>';
                sentence     += '<p>April: '+ result.sla4 + ' meter</p>';
                sentence     += '<p>May: '+ result.sla5 + ' meter</p>';
                sentence     += '<p>June: '+ result.sla6 + ' meter</p>';
                sentence     += '<p>July: '+ result.sla7 + ' meter</p>';
                sentence     += '<p>August: '+ result.sla8 + ' meter</p>';
                sentence     += '<p>September: '+ result.sla9 + ' meter</p>';
                sentence     += '<p>October: '+ result.sla10 + ' meter</p>';
                sentence     += '<p>November: '+ result.sla11 + ' meter</p>';
                sentence     += '<p>December: '+ result.sla12 + ' meter</p>';

                //sentence     += '<i class="fa fa-check"></i><p>Total cost per year: $'+ result.cost + ' million</p>';
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);

                $('#result').html(' ' + sentence);
                console.log('Success!');
            },
        });
    });

});
