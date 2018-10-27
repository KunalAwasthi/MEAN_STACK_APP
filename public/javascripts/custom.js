$(document).ready(function(){
    $('#rating-spinner').change(function(e){
        $(this).siblings('.select-wrap').html($(this).val());
    });
    $('#rating-spinner').change();
});