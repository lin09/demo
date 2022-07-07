const maxImgSize = 1024 * 1024





export class Qrcode {
  width
  height
  imageData
  debug = false

  constructor(canvas: HTMLCanvasElement) {
    this.width = canvas.width
    this.height = canvas.height
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    this.imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    this.process(ctx)
  }
  getPixel(x: number, y: number) {
    if (this.width < x) {
      throw "point error"
    }
    if (this.height < y) {
      throw "point error"
    }
    const point = (x * 4) + (y * this.width * 4)
    return (this.imageData.data[point] * 33 + this.imageData.data[point + 1] * 34 + this.imageData.data[point + 2] * 33) / 100
  }
  getMiddleBrightnessPerArea(image: Uint8Array) {
    const numSqrtArea = 4
    const areaWidth = Math.floor(this.width / numSqrtArea)
    const areaHeight = Math.floor(this.height / numSqrtArea)
    const minmax = new Array(numSqrtArea)

    for (let i = 0; i < numSqrtArea; i++) {
      minmax[i] = new Array(numSqrtArea)
      for (let i2 = 0; i2 < numSqrtArea; i2++) {
        minmax[i][i2] = new Array(0,0)
      }
    }

    for (let ay = 0; ay < numSqrtArea; ay++) {
      for (let ax = 0; ax < numSqrtArea; ax++) {
        minmax[ax][ay][0] = 0xFF
        for (let dy = 0; dy < areaHeight; dy++) {
          for (let dx = 0; dx < areaWidth; dx++) {
            const target = image[areaWidth * ax + dx + (areaHeight * ay + dy) * this.width]
            if (target < minmax[ax][ay][0])
                minmax[ax][ay][0] = target
            if (target > minmax[ax][ay][1])
                minmax[ax][ay][1] = target
          }
        }
      }
    }

    const middle = new Array(numSqrtArea)
    for (let i3 = 0; i3 < numSqrtArea; i3++) {
      middle[i3] = new Array(numSqrtArea)
    }
    for (let ay = 0; ay < numSqrtArea; ay++) {
      for (let ax = 0; ax < numSqrtArea; ax++) {
        middle[ax][ay] = Math.floor((minmax[ax][ay][0] + minmax[ax][ay][1]) / 2)
      }
    }

    return middle
  }

  grayScaleToBitmap(grayScale: Uint8Array) {
    const middle = this.getMiddleBrightnessPerArea(grayScale)
    const sqrtNumArea = middle.length
    const areaWidth = Math.floor(this.width / sqrtNumArea)
    const areaHeight = Math.floor(this.height / sqrtNumArea)

    const buff = new ArrayBuffer(this.width * this.height)
    const bitmap = new Uint8Array(buff)

    for (var ay = 0; ay < sqrtNumArea; ay++) {
      for (var ax = 0; ax < sqrtNumArea; ax++) {
        for (var dy = 0; dy < areaHeight; dy++) {
          for (var dx = 0; dx < areaWidth; dx++) {
            // bitmap[areaWidth * ax + dx + (areaHeight * ay + dy) * width] = (grayScale[areaWidth * ax + dx+ (areaHeight * ay + dy) * width] < middle[ax][ay]) ? true : false
            bitmap[areaWidth * ax + dx + (areaHeight * ay + dy) * this.width] = (grayScale[areaWidth * ax + dx+ (areaHeight * ay + dy) * this.width] < middle[ax][ay]) ? 1 : 0
          }
        }
      }
    }
    return bitmap
  }
  grayscale() {
    var buff = new ArrayBuffer(this.width * this.height)
    var res = new Uint8Array(buff)

    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var gray = this.getPixel(x, y)

        res[x+y*this.width] = gray
      }
    }
    return res
  }
  process(ctx: CanvasRenderingContext2D) {
    var start = new Date().getTime()

    var image = this.grayScaleToBitmap(this.grayscale())

    if (this.debug) {
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var point = (x * 4) + (y * this.width * 4);
            this.imageData.data[point] = image[x+y*this.width]?0:0;
            this.imageData.data[point+1] = image[x+y*this.width]?0:0;
            this.imageData.data[point+2] = image[x+y*this.width]?255:0;
        }
      }
      ctx.putImageData(this.imageData, 0, 0);
    }

    //var finderPatternInfo = new FinderPatternFinder().findFinderPattern(image);

    var detector = new Detector(image);

    var qRCodeMatrix = detector.detect();

    if(qrcode.debug)
    {
        for (var y = 0; y < qRCodeMatrix.bits.Height; y++)
        {
            for (var x = 0; x < qRCodeMatrix.bits.Width; x++)
            {
                var point = (x * 4*2) + (y*2 * qrcode.width * 4);
                qrcode.imagedata.data[point] = qRCodeMatrix.bits.get_Renamed(x,y)?0:0;
                qrcode.imagedata.data[point+1] = qRCodeMatrix.bits.get_Renamed(x,y)?0:0;
                qrcode.imagedata.data[point+2] = qRCodeMatrix.bits.get_Renamed(x,y)?255:0;
            }
        }
        ctx.putImageData(qrcode.imagedata, 0, 0);
    }


    var reader = Decoder.decode(qRCodeMatrix.bits);
    var data = reader.DataByte;
    var str="";
    for(var i=0;i<data.length;i++)
    {
        for(var j=0;j<data[i].length;j++)
            str+=String.fromCharCode(data[i][j]);
    }

    var end = new Date().getTime();
    var time = end - start;
    console.log(time);

    return qrcode.decode_utf8(str);
    //alert("Time:" + time + " Code: "+str);
  }
}

export const decode = (src: string) => {
  const image = new Image()
  image.onload = () => {
      const canvas_qr = document.createElement('canvas')
      const context = canvas_qr.getContext('2d') as CanvasRenderingContext2D
      let nHeight = image.height
      let nWidth = image.width
      if(image.width * image.height > maxImgSize) {
          const ir = image.width / image.height
          nHeight = Math.sqrt(maxImgSize / ir)
          nWidth = ir * nHeight;
      }

      canvas_qr.width = nWidth
      canvas_qr.height = nHeight

      context.drawImage(image, 0, 0, canvas_qr.width, canvas_qr.height)
      qrcode.width = canvas_qr.width;
      qrcode.height = canvas_qr.height;

      try{
          qrcode.imagedata = context.getImageData(0, 0, canvas_qr.width, canvas_qr.height);
      }catch(e){
          qrcode.result = "Cross domain image reading not supported in your browser! Save it to your computer then drag and drop the file!";
          if(qrcode.callback!=null)
              qrcode.callback(qrcode.result);
          return;
      }

      try
      {
          qrcode.result = qrcode.process(context);
      }
      catch(e)
      {
          console.log(e);
          qrcode.result = "error decoding QR Code";
      }
      if(qrcode.callback!=null)
          qrcode.callback(qrcode.result);
  }
  image.onerror = function ()
  {
      if(qrcode.callback!=null)
          qrcode.callback("Failed to load the image");
  }
  image.src = src;
}
