typeof one=="undefined"&&(one={include:function(){}}),function(){var a=Function,b=parseInt,c=parseFloat,d=Math.round,e=[],f=/\s*(\.\d+|\d+(?:\.\d+)?)(%)?\s*/,g=/\s*(\.\d+|\d+(?:\.\d+)?)\s*/,h=new RegExp("^(rgb|hsl|hsv)a?\\("+f.source+","+f.source+","+f.source+"(?:,"+g.source+")?"+"\\)$","i"),i=one.color=function(a){if(Object.prototype.toString.apply(a)==="[object Array]")return a[0].length===4?new i.RGB(a[0]/255,a[1]/255,a[2]/255,a[3]/255):new i[a[0]](a.slice(1,a.length));if(a.charCodeAt){i.namedColors&&i.namedColors[a]&&(a=i.namedColors[a]);var d=a.match(h);if(d){var e=d[1].toUpperCase(),f=typeof d[8]=="undefined"?d[8]:c(d[8]),g=e[0]==="H",j=d[3]?100:g?360:255,k=d[5]||g?100:255,l=d[7]||g?100:255;if(typeof i[e]=="undefined")throw new Error("one.color."+e+" is not installed.");return new i[e](c(d[2])/j,c(d[4])/k,c(d[6])/l,f)}a.length<6&&(a=a.replace(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i,"$1$1$2$2$3$3"));var m=a.match(/^#?([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/i);if(m)return new i.RGB(b(m[1],16)/255,b(m[2],16)/255,b(m[3],16)/255)}else{if(typeof a=="object"&&a.isColor)return a;if(!isNaN(a))return new i.RGB((a&255)/255,((a&65280)>>8)/255,((a&16711680)>>16)/255)}return!1};i.installColorSpace=function(b,c,d){function j(b,c){var d={};d[c.toLowerCase()]=new a("return this.rgb()."+c.toLowerCase()+"();"),i[c].propertyNames.forEach(function(b,e){d[b]=new a("value","isDelta","return this."+c.toLowerCase()+"()."+b+"(value, isDelta);")});for(var e in d)d.hasOwnProperty(e)&&i[b].prototype[e]===undefined&&(i[b].prototype[e]=d[e])}i[b]=new a(c.join(","),"if (Object.prototype.toString.apply("+c[0]+") === '[object Array]') {"+c.map(function(a,b){return a+"="+c[0]+"["+b+"];"}).reverse().join("")+"}"+"if ("+c.filter(function(a){return a!=="alpha"}).map(function(a){return"isNaN("+a+")"}).join("||")+"){"+'throw new Error("[one.color.'+b+']: Invalid color: ("+'+c.join('+","+')+'+")");}'+c.map(function(a){return a==="hue"?"this._hue=hue<0?hue-Math.floor(hue):hue%1":a==="alpha"?"this._alpha=(isNaN(alpha)||alpha>1)?1:(alpha<0?0:alpha);":"this._"+a+"="+a+"<0?0:("+a+">1?1:"+a+")"}).join(";")+";"),i[b].propertyNames=c;var f=i[b].prototype;["valueOf","hex","css","cssa"].forEach(function(c){f[c]=f[c]||(b==="RGB"?f.hex:new a("return this.rgb()."+c+"();"))}),f.isColor=!0,f.equals=function(a,d){typeof d=="undefined"&&(d=1e-10),a=a[b.toLowerCase()]();for(var e=0;e<c.length;e+=1)if(Math.abs(this["_"+c[e]]-a["_"+c[e]])>d)return!1;return!0},f.toJSON=new a("return ['"+b+"', "+c.map(function(a){return"this._"+a},this).join(", ")+"];");for(var g in d)if(d.hasOwnProperty(g)){var h=g.match(/^from(.*)$/);h?i[h[1].toUpperCase()].prototype[b.toLowerCase()]=d[g]:f[g]=d[g]}f[b.toLowerCase()]=function(){return this},f.toString=new a('return "[one.color.'+b+':"+'+c.map(function(a,b){return'" '+c[b]+'="+this._'+a}).join("+")+'+"]";'),c.forEach(function(b,d){f[b]=new a("value","isDelta","if (typeof value === 'undefined') {return this._"+b+";"+"}"+"if (isDelta) {"+"return new this.constructor("+c.map(function(a,c){return"this._"+a+(b===a?"+value":"")}).join(", ")+");"+"}"+"return new this.constructor("+c.map(function(a,c){return b===a?"value":"this._"+a}).join(", ")+");")}),e.forEach(function(a){j(b,a),j(a,b)}),e.push(b)},i.installColorSpace("RGB",["red","green","blue","alpha"],{hex:function(){var a=(d(255*this._red)*65536+d(255*this._green)*256+d(255*this._blue)).toString(16);return"#"+"00000".substr(0,6-a.length)+a},css:function(){return"rgb("+d(255*this._red)+","+d(255*this._green)+","+d(255*this._blue)+")"},cssa:function(){return"rgba("+d(255*this._red)+","+d(255*this._green)+","+d(255*this._blue)+","+this._alpha+")"}})}(),function(){var a=Math,b=one.color;b.installColorSpace("HSV",["hue","saturation","value","alpha"],{rgb:function(){var c=this._hue,d=this._saturation,e=this._value,f=a.min(5,a.floor(c*6)),g=c*6-f,h=e*(1-d),i=e*(1-g*d),j=e*(1-(1-g)*d),k,l,m;switch(f){case 0:k=e,l=j,m=h;break;case 1:k=i,l=e,m=h;break;case 2:k=h,l=e,m=j;break;case 3:k=h,l=i,m=e;break;case 4:k=j,l=h,m=e;break;case 5:k=e,l=h,m=i}return new b.RGB(k,l,m,this._alpha)},hsl:function(){var a=(2-this._saturation)*this._value,c=this._saturation*this._value,d=a<=1?a:2-a,e;return d<1e-9?e=0:e=c/d,new b.HSL(this._hue,e,a/2,this._alpha)},fromRgb:function(){var c=this._red,d=this._green,e=this._blue,f=a.max(c,d,e),g=a.min(c,d,e),h=f-g,i,j=f===0?0:h/f,k=f;if(h===0)i=0;else switch(f){case c:i=(d-e)/h/6+(d<e?1:0);break;case d:i=(e-c)/h/6+1/3;break;case e:i=(c-d)/h/6+2/3}return new b.HSV(i,j,k,this._alpha)}})}(),one.color.installColorSpace("HSL",["hue","saturation","lightness","alpha"],{hsv:function(){var a=this._lightness*2,b=this._saturation*(a<=1?a:2-a),c;return a+b<1e-9?c=0:c=2*b/(a+b),new one.color.HSV(this._hue,c,(a+b)/2,this._alpha)},rgb:function(){return this.hsv().rgb()},fromRgb:function(){return this.hsv().hsl()}}),one.color.installColorSpace("CMYK",["cyan","magenta","yellow","black","alpha"],{rgb:function(){return new one.color.RGB(1-this._cyan*(1-this._black)-this._black,1-this._magenta*(1-this._black)-this._black,1-this._yellow*(1-this._black)-this._black,this._alpha)},fromRgb:function(){var a=this._red,b=this._green,c=this._blue,d=1-a,e=1-b,f=1-c,g=1;return a||b||c?(g=Math.min(d,Math.min(e,f)),d=(d-g)/(1-g),e=(e-g)/(1-g),f=(f-g)/(1-g)):g=1,new one.color.CMYK(d,e,f,g,this._alpha)}}),one.color.namedColors={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgrey:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",grey:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},typeof module!="undefined"&&(module.exports=one.color);