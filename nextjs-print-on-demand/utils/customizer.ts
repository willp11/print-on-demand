export function getBase64(file: File, returnFile: (file: string)=>string) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        if (typeof reader.result === "string") returnFile(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
}