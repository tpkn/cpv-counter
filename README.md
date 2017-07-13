# CPV Counter




### Basic usage
```javascript
var video = document.getElementById('video');
var cpv = new CPVCounter(video, 1, 'http://domain.test/i.gif');
```

### Extended usage
```javascript
var cpv_list = [
   {time: 1, pixel: 'http://domain.test/i1.gif'},
   {time: 2, pixel: 'http://domain.test/i2.gif'},
   {time: 3, pixel: 'http://domain.test/i3.gif'}
]

var video = document.getElementById('video');

for (var i = 0, len = cpv_list.length; i < len; i++) {
   new CPVCounter(video, cpv_list[i].time, cpv_list[i].pixel, function(time, pixel){
      console.log('> ' + pixel + ' triggered at ' + time + 's');
   });
}

```

### Kill counter
```javascript
cpv.kill();

```
