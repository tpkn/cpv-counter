# CPV Counter
Trigger pixel when video reaches specific time point



### Basic usage
```javascript
var video = document.getElementById('video');
var cpv = new CPVCounter(video, 1, 'http://memory.dataram.com/images/page-images/newlogoheader21.png');
```

### Extended usage
```javascript
var cpv_list = [
   {point: 1, pixel: 'http://default.com/image1.gif'},
   {point: 2, pixel: 'http://default.com/image2.gif'},
   {point: 3, pixel: 'http://default.com/image3.gif'}
]

var video = document.getElementById('video');

for (var i = 0, len = cpv_list.length; i < len; i++) {
   new CPVCounter(video, cpv_list[i].point, cpv_list[i].pixel, function(point, pixel){
      console.log('> ' + pixel + ' triggered at ' + point + 's');
   });
}

```

### Kill counter
```javascript
cpv.kill();

```
