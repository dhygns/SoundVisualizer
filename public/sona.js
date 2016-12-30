var dom=function(){"use strict";function e(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}function n(n){return"string"===e(n)}function t(e){return!!e&&1===e.nodeType}function r(e){return 9===e.nodeType}function i(e,n){if(e)throw new Error(n)}function a(e,a){return i(!n(e),"arguments must be string type"),a=(n(a)?o(a):a)||document,i(!t(a)&&!r(a),"Second Element must be element node"),a.querySelectorAll(e)}function o(e,n){return a(e,n)[0]}function u(e,t){i(!n(t),"arguments must be string type");var r=e.className.split(" ");return r.indexOf(t)!==-1}function s(e,t){i(!n(t),"arguments must be string type"),u(e,t)||(e.className=e.className+" "+t)}function c(e,n){u(e,n)?e.className=e.className.split(" ")[0]:s(e,n)}function l(e){e=(n(e)?o(e):e)||document,e.style.display="block"}function d(e){e=(n(e)?o(e):e)||document,e.style.display="none"}function q(e){var n=/https:\/\/soundcloud.com\/[0-9a-z-]+\/[0-9a-z-]+/;return n.test(e)}return{info:{author:"sona",version:"1.0.0"},util:{toggle:c,isCorrectSoundCloudURL:q},query:o,show:l,hide:d}}(),sona=function(){"use strict";function e(){c.clearRect(0,0,s.width,s.height),c.beginPath(),c.rect(0,0,s.width,s.height);var e=Math.floor(2*Math.random()),n=c.createLinearGradient(0,0,1500,0);n.addColorStop(0,h[e][0]),n.addColorStop(1,h[e][1]),c.fillStyle=n,c.fill()}function n(){o&&(o.width=window.innerWidth,o.height=window.innerHeight,s.width=window.innerWidth,s.height=window.innerHeight,e())}function t(){var e,n,r=0,i=d.frequencyBinCount,a=new Uint8Array(i),s=o.width/i*2.5;d.getByteFrequencyData(a),u.clearRect(-o.width,-o.height,2*o.width,2*o.height);for(var c=0,l=i;c<l;c++)n=a[c],e=3*n,u.fillStyle="rgba("+(n+200)+", "+(n+200)+","+(n+200)+", 0.4)",u.fillRect(r,o.height-e/2+100,s,e/100),u.fillRect(r,o.height-e/2,s,e/2),u.beginPath(),u.arc(r,o.height-e/2-90,s/3,0,2*Math.PI,!1),u.fill(),r+=s+1;requestAnimationFrame(t)}function r(e){l.setAttribute("src",e)}function i(){clearInterval(f)}function a(e){d=e.analyser,q=e.canvas,o=document.createElement("canvas"),o.className="fgCanvas",u=o.getContext("2d"),q.appendChild(o),l=document.createElement("img"),l.className="imgCanvas",q.appendChild(l),s=document.createElement("canvas"),c=s.getContext("2d"),q.appendChild(s),n(),t(),window.addEventListener("resize",n,!1)}var o,u,s,c,l,d,q,f,h={0:["#00c9de","#fc19ff"],1:["#00DBDE","#FC00FF"]};return{info:{version:"1.0.0",author:"sona"},init:a,drawAlbumImg:r,clearBackEffect:i}}(),sound=function(e){"use strict";function n(r){return this instanceof n?void this._init.apply(this,arguments):(e.initialize({client_id:t}),new n(r))}var t="802c2f1c80c96881ff265799929e8a2c";return n.fn=n.prototype={constructor:n,author:config.author,version:config.version,_init:function(e){var n=new(window.AudioContext||window.webkitAudioContext),t=n.createMediaElementSource(e);this.audio=e,this.analyser=n.createAnalyser(),this.analyser.fftSize=256,this.analyser.connect(n.destination),this.audio.crossOrigin="anonymous",t.connect(this.analyser)},search:function(n,r,i){e.resolve(n).then(function(e){if(e.stream_url){var n=e.stream_url+"?client_id="+t,a=e.artwork_url;r.call(this,n,a)}else i("Playlist is not supported")}).catch(function(e){i(e)})},play:function(e){this.audio.src="data:audio/mpeg;base64,/+MYxAAAAANIAUAAAASEEB/jwOFM/0MM/90b/+RhST//w4NFwOjf///PZu////9lns5GFDv//l9GlUIEEIAAAgIg8Ir/JGq3/+MYxDsLIj5QMYcoAP0dv9HIjUcH//yYSg+CIbkGP//8w0bLVjUP///3Z0x5QCAv/yLjwtGKTEFNRTMuOTeqqqqqqqqqqqqq/+MYxEkNmdJkUYc4AKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",this.audio.setAttribute("src",e),this.audio.play()}},n}(SC);!function(e,n,t){"use strict";function r(){var e=window.navigator.userAgent,n=e.indexOf("MSIE ");if(n>0)return parseInt(e.substring(n+5,e.indexOf(".",n)),10);var t=e.indexOf("Trident/");if(t>0){var r=e.indexOf("rv:");return parseInt(e.substring(r+3,e.indexOf(".",r)),10)}var i=e.indexOf("Edge/");return i>0&&parseInt(e.substring(i+5,e.indexOf(".",i)),10)}function i(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var n=new RegExp("[\\?&]"+e+"=([^&#]*)"),t=n.exec(location.search);return null===t?"":decodeURIComponent(t[1].replace(/\+/g," "))}function a(n){y.search(n,function(n,r){e.show(d),e.hide(q),y.play(n),t.drawAlbumImg(r),setTimeout(p.toggle(h,"ctrgroup--hidden"),3e3)},function(n){403===n.status?e.query(".warnPanel__p").innerHTML="This song is not supported":e.query(".warnPanel__p").innerHTML=n,e.show(q)})}var o=r();o&&o<12&&(e.query(".layer").style.display="table");var u="track",s=e.query(".ctrgroup__player__form"),c=e.query(".ctrgroup__togglebtn"),l=e.query(".ctrgroup__player__form__input"),d=e.query(".visualPanel"),q=e.query(".warnPanel"),f=e.query(".defaultPanel"),h=e.query(".ctrgroup"),g=e.query(".ctrgroup__player__audio"),p=e.util,y=n(g);if(t.init({analyser:y.analyser,canvas:d}),p.toggle(h,"ctrgroup--hidden"),e.hide(d),i(u)){var w=i(u);l.value=w,a(w)}s.addEventListener("submit",function(n){n.preventDefault(),e.hide(f),p.isCorrectSoundCloudURL(l.value)?a(l.value):(e.query(".warnPanel__p").innerHTML="invalid soundcloud url",e.show(q))}),c.addEventListener("click",function(e){e.preventDefault(),p.toggle(h,"ctrgroup--hidden")}),g.addEventListener("ended",function(){e.show(d),t.clearBackEffect()}),window.addEventListener("keydown",function(e){32===e.which&&(g.paused?g.play():g.pause())})}(dom,sound,sona);