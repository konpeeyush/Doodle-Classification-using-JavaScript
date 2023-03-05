// For Printing the Data
let total = 100;
function printData(category){
    for (let n = 0; n < total; n++) {
        let img = createImage(28, 28);
        let offset = n * len;
    
        img.loadPixels();
        for (let i = 0; i < len; i++) {
            let val = 255 - category.bytes[i + offset];
            img.pixels[i * 4] = val;
            img.pixels[i * 4 + 1] = val;
            img.pixels[i * 4 + 2] = val;
            img.pixels[i * 4 + 3] = 255;
        }
        img.updatePixels();
        let x = (n % 10) * 28;
        let y = floor(n / 10) * 28;
        image(img, x, y);
    }
}
