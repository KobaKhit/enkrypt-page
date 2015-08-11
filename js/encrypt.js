
// algorithm input and output 
var in_alg = 'Text';
var out_alg = 'Text';


// Display images
function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#steg-in-img')
                    .attr('src', e.target.result)
                    // .width(150)
                    // .height(200);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

// Decrypt tea.js
function tea_dec(msg,sec){
    try{
        return Tea.decrypt(msg,sec)
    }catch(err){
        return "нопревию"
    }
}

// Steganography funcs
function stega_enc(msg,img){
    return steg.encode(msg, img, {"width": img.width, "height": img.height})
}

function stega_dec(img){
    return steg.decode(img)
}

// Encrypt 
function encryp(msg,sec){

    var encs = {
        'Text':msg,
        'AES':CryptoJS.AES.encrypt(msg, sec),
        'DES':CryptoJS.DES.encrypt(msg, sec),
        'Triple DES':CryptoJS.TripleDES.encrypt(msg, sec),
        'Rabbit':CryptoJS.Rabbit.encrypt(msg, sec),
        'RC4':CryptoJS.RC4.encrypt(msg,sec),
        'RC4Drop':CryptoJS.RC4Drop.encrypt(msg,sec),
        'TEA':Tea.encrypt(msg,sec),
        'Steganography':'Encode/decode a message in an image. Upload an image and click on open lock to decode the message. Click on a lock to get the image with the encoded message which you can download.',
        'MD5':CryptoJS.HmacMD5(msg,sec),
        'SHA-1':CryptoJS.HmacSHA1(msg,sec),
        'SHA-2 (256 bit)':CryptoJS.HmacSHA256(msg,sec),
        'SHA-2 (512 bit)':CryptoJS.HmacSHA512(msg,sec),
        'SHA-3':CryptoJS.HmacSHA3(msg,sec),
        'RIPEMD160':CryptoJS.HmacRIPEMD160(msg,sec)
    }

    // If msg empty display "Message empty"
    if(!msg || msg == "нопревию"){
        $.each(encs,function(i){
            encs[i] = "NO PREVIEW [:ж]"
        })
    }
    return encs

}

// Decrypt 
function decryp(msg,sec,alg){
    

    var encs = {
            'AES':CryptoJS.AES.decrypt(msg, sec),
            'DES':CryptoJS.DES.decrypt(msg, sec),
            'Triple DES':CryptoJS.TripleDES.decrypt(msg, sec),
            'Rabbit': CryptoJS.Rabbit.decrypt(msg, sec),
            'RC4':CryptoJS.RC4.decrypt(msg,sec),
            'RC4Drop':CryptoJS.RC4Drop.decrypt(msg,sec),
            'TEA': tea_dec(msg,sec),
            'Steganography':'Encode/decode a message in an image. Upload an image and click on the open lock to decode the message. Click on the closed lock to get the image with the encoded message which you can download.'
            }


    try {
        return encs[alg].toString(CryptoJS.enc.Utf8)
    }
    catch(err) {
        $.each(encs,function(i){
            encs[i] = "нопревию"
        })

        $(this).closest('div').find('textarea#input').val('NO PREVIEW [:ж]')
        return encs[alg]
    }
}

// Create #out list
function crList(encs){
    // Dynamic out list
        var cList = $('ul#out')
        cList.empty()
        $.each(encs,function(i){
            var li = $('<li/>')
                .addClass('ui-menu-item')
                .attr('role', 'menuitem')
                .appendTo(cList);
            var aaa = $('<span/>')
                .addClass('ui-all bo')
                .html("<span class = 'enc-item blue-back'>" + i + '</span>' + " " + encs[i])
                .appendTo(li);
        })
}

// On algo list item click
$(".listu").on('click','li.ui-menu-item',function(){  

	// add link to info glyph
	var links = {
    	'Text':'https://en.wikipedia.org/wiki/ASCII',
    	'AES':'https://en.wikipedia.org/wiki/Advanced_Encryption_Standard',
    	'DES':'https://en.wikipedia.org/wiki/Data_Encryption_Standard',
    	'Triple DES':'https://en.wikipedia.org/wiki/Triple_DES',
    	'Rabbit':'https://en.wikipedia.org/wiki/Rabbit_%28cipher%29',
    	'RC4':'https://en.wikipedia.org/wiki/RC4',
    	'RC4Drop':'https://en.wikipedia.org/wiki/RC4#RC4_variants',
    	'TEA':'https://en.wikipedia.org/wiki/Tiny_Encryption_Algorithm',
    	'Steganography':'https://en.wikipedia.org/wiki/Steganography',
    	'MD5':'https://en.wikipedia.org/wiki/MD5',
    	'SHA-1':'https://en.wikipedia.org/wiki/SHA-1',
    	'SHA-2 (256 bit)':'https://en.wikipedia.org/wiki/SHA-2',
    	'SHA-2 (512 bit)':'https://en.wikipedia.org/wiki/SHA-2',
    	'SHA-3':'https://en.wikipedia.org/wiki/SHA-3',
    	'RIPEMD160':'https://en.wikipedia.org/wiki/RIPEMD'
    }

    $('.textarea-ic a').attr('href',links[$(this).find('.enc-item').text()])

	// Show selected algorithm in menu
	$(this).closest('div').find("button h4").text($(this).find('.enc-item').text())

	if($(this).find('.enc-item').text() != 'Steganography'){ 

	  // Toggle output box and list display
	  $(this).closest('div').find('.textmsg, .textsec,.textarea-ic').css('display','inline')
	  $(this).parent().toggle()

	  $(this).closest('div').find('#input, #secret').addClass('togg')
	  $(this).closest('div').find('.to').removeClass('togg')

      $(this).closest('div').find('textarea#input').val('Type your secret message here ...')

	  if($(this).closest('.col-lg-5').find('#in').length){
			$('#encode').css('display','none')
		}

	}else{
		// Toggle image box and list display
		$(this).closest('div').find('.textmsg,.textarea-ic').css('display','block')
		$(this).closest('div').find('.textsec').css('display','none')
		$(this).closest('div').find('.hid').css('display','block')

		$(this).closest('div').find('#secret').removeClass('togg')
	    $(this).closest('div').find('.to').addClass('togg')

		if($(this).closest('.col-lg-5').find('#in').length){
			$('#encode').css('display','inherit')
		}
		$(this).parent().toggle()

        // Add steganography instructions
        $(this).closest('div').find('textarea#input').val('Encode/decode a message in an image. Upload an image and click on the open lock to decode the message. Click on the closed lock to get the image with the encoded message which you can download.\n\nType your secret message here ...')
	}

  // Toggle down arrow menu
	$(this).closest("div").find('.arrow').toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up')

});


$("#in").on('click','li.ui-menu-item',function(){  
    // Toggle lock/unlock button
	if($(this).find('.enc-item').text() !='Text'){
		$('#encrypt i').removeClass('fa fa-lock fa-4x').addClass('fa fa-unlock-alt fa-4x')
	}else{$('#encrypt i').removeClass('fa fa-unlock-alt fa-4x').addClass('fa fa-lock fa-4x')}
	
	// Get in algorithm value
	in_alg = $('#in').find(this).find('.enc-item').text()

})

$("#out").on('click','li.ui-menu-item',function(){  
	// Show selected value in textarea 
	$('textarea#output').val($.trim($(this).children('.ui-all').clone().children().remove().end().text()));

    // Get out algorithm value
	out_alg = $('#out').find(this).find('.enc-item').text()
});


// Dropdaown button 1 logic
$('#dropdownMenu1').on('click', function(){
    $(this).parents('.col-lg-5').children('.listu').toggle()
    $(this).parents('.col-lg-5').children('.togg').toggle()

    $(this).find('.arrow').toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up');
})

// Dropdaown button 2 logic
$('#dropdownMenu2').on('click', function(){
    $(this).parents('.col-lg-5').children('.listu,.textarea-ic,#download').toggle()
    $(this).parents('.col-lg-5').children('.togg').toggle()

	$(this).find('.arrow').toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up');

	// Hide output box and hid class when algo list is visible
	if($(this).closest('.col-lg-5').find('.listu').css('display')!='none'){
		$(this).closest('.col-lg-5').find('.hid, #output,.textarea-ic').css('display','none')
	}

})

$('#encode').on('click', function () {
	var msg = $('textarea#input').val()
    var img = $('#steg-in-img').attr('src')

    var ef = steg.encode(msg,img)
    $('#steg-out-img').attr('src',ef)
    $('#download').attr('href',ef)
    $('#out').css('display','none')
    $('#steg-out-img').parent().css('display','block')
    $('#steg-out-img, textarea#output,.textarea-ic,#download').css('display','block')
    $('#steg-out-img').parent().addClass('togg')
    $('textarea#output').val('Encode/decode a message in an image. Upload an image and click on open lock to decode the message. Click on a lock to get the image with the encoded message which you can download.')
    // Show selected algorithm in menu
    $('#dropdownMenu2 h4').text('Steganography')
})

// On encrypt/decrypt click
$('#encrypt').on('click', function () {

	var msg = $('textarea#input').val()
    var sec = $('textarea#secret').val()
    var img = $('#steg-in-img').attr('src')

	if(in_alg === 'Text'){
    	var encs = encryp(msg,sec)
    }else if (in_alg === 'Steganography'){
    	msg = steg.decode(img)
    	var encs = encryp(msg,sec)

    	$('textarea#output').val(msg)
    	$('textarea#output,.textarea-ic,#steg-out-img,#download').css('display','none')
    	$('#out').css('display','block')
    }
    else{
    	var msg = decryp(msg,sec,in_alg)
    	var encs = encryp(msg,sec)
    }

    crList(encs)

    // fill output box
     if(msg.length===0){$('textarea#output').val("");}
     else{$('textarea#output').val(encs[out_alg])}
     
});

// On doc ready encrypt default text
$( document ).ready(function() {
	$('textarea#input').val("Type your secret message here ...")
	$('textarea#secret').val("Enter a secret key here")
    
    var msg = $('textarea#input').val()

    var encs = {
    	'Text':msg,
    	'AES':'U2FsdGVkX1+3H/GHf7m/LES8fvCwRi6UGWotbX2NiMWqCyA6/aDWbFiHl+YVz/1PnQ3LZgbCyh8qwzQK9M5i3A==',
    	'DES':'U2FsdGVkX1+l65jCg/AxY3Y7xbzq9c9dwsRIGmZV6P4RDm9wsOPqHxPjo1jtlxyFpgGcnwUTSxQ=',
    	'Triple DES':'U2FsdGVkX1/winRciTIM0LZMZ50phzPBUqFqsLJ/FrBEG2Nf6VaIPL5bXm7sxELWxD9HJljrj7M=',
    	'Rabbit':'U2FsdGVkX19yUD14CPtWVSof3QOJG/XF1o0d+8nDsXIdmJ7PPcBoWVdG4pxN3r9j5z4=',
    	'RC4':'U2FsdGVkX1/ECeCIhJvN/78tpsDTSziUqhWf7rUWZ9xQdpD3vyiHpcWgAokyCVOb7+8=',
    	'RC4Drop':'U2FsdGVkX18QkBLlqJszyu4l3rqVCI4QPxjYw7a4zXGTY1nu4sKJFOqXqpfLTo4X6yc=',
    	'TEA':'zjmWHo+3KWQTbM3ZdQ84GP0K+t8OeIiPpeKnLKZkd9TNvdKa',
    	'Steganography':'Encode/decode a message in an image. Upload an image and click on the open lock to decode the message. Click on the closed lock to get the image with the encoded message which you can download.',
    	'MD5':'4e2e66b658baa36cf8c09f33c20be484',
    	'SHA-1':'a04e40d08e1f857b5d5edefe61717947a859856d',
    	'SHA-2 (256 bit)':'d904fe528c3f20320c565044352c75c74fafc16db6cf9b1c4603db59cc13ad93',
    	'SHA-2 (512 bit)':'bd334a454eeb7ec62c4131db240b284e272e6489a28a179159e33cb7b214b7999446deec49a12ad662d93e5f8f10f1a23cc383a2d017025591cf5f4774612d68',
    	'SHA-3':'367266165e116bac516d545036dd981488ea714dd580b5649ee95f1adcd5272e561b28ad0e4dd7afabb752f36acf220ddb07dd54148846fd8a4f75b4e7ce53a6',
    	'RIPEMD160':'2fe8517234f132326e1f2e557652276f1f13e488'
    }

    // Dynamic out list
    crList(encs)

    // Static in list
    var cList = $('ul#in')
    cList.empty()
    $.each(encs,function(i){
        if(['Text','AES','DES','Triple DES','Rabbit','RC4','RC4Drop','TEA','Steganography'].indexOf(i) > -1){
    	var li = $('<li/>')
	        .addClass('ui-menu-item')
	        .attr('role', 'menuitem')
	        .appendTo(cList);
	    	var aaa = $('<span/>')
		        .addClass('ui-all bo')
		        .html("<span class = 'enc-item green-back'><strong>" + i + '</strong></span>' + " " + encs[i])
		        .appendTo(li);
	    } 
    })

    // fill output box
     if(msg.length===0){$('textarea#output').val("");}
     else{$('textarea#output').val(encs[out_alg])}
});



