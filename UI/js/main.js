const showImage = ()=> {
        let images = (input, imgPreview) => {
    
            if (input.files) {
                let numberOfFiles = input.files.length;
                for (i = 0; i <= numberOfFiles; i += 1) {
                    let reader = new FileReader();
    
                    reader.onload = (data)=> {

                        $($.parseHTML("<img class='pic'display='flex' width='100px' margin-right='2rem' margin-bottom='0.5em' >")).attr('src', data.target.result).appendTo(imgPreview);
                    }
                     reader.readAsDataURL(input.files[i]);
                }
            }
    
        };

        $('#img').on('change', function() {
            let previewElement = document.querySelector('#modal');
            previewElement.style.display = 'flex';
            images(this, '#previews');
        });
            
  }
