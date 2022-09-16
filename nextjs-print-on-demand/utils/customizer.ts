export function getBase64(file: File, returnFile: (file: string)=>string) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        if (typeof reader.result === "string") returnFile(reader.result);
        let img = new Image;
        img.onload = function() {
            console.log(img.width, img.height);
        }
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
}