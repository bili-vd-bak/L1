const t={CHC:["粤","粵","Cantonese","CHC","Yue"],CHS:["简中","GB","GBK","简体中文","中文","中字","簡","简","CHS","Zh-Hans","Zh_Hans","zh_cn","SC","zh"],CHT:["繁中","BIG5","BIG 5","繁","Chinese","CHT","TC"],JPN:["日","Japanese","JP"],ENG:["英","English"]};function e(t,e){const n=new RegExp(e,"gi");return t.match(n)}class n{constructor(t){this.id=t.id,this.isChinese=t.isChinese,this.displayName=t.displayName}toString(){return this.displayName}}const s={CHC:new n({id:"CHC",isChinese:!0,displayName:"粤语"}),CHS:new n({id:"CHS",isChinese:!0,displayName:"简中"}),CHT:new n({id:"CHT",isChinese:!0,displayName:"繁中"}),JPN:new n({id:"JPN",isChinese:!1,displayName:"日语"}),ENG:new n({id:"ENG",isChinese:!1,displayName:"英语"}),ERR:new n({id:"ERR",isChinese:!1,displayName:"未知"})};function r(t,e,n,s=t){return{id:t,size:e,otherNames:[n],displayName:s}}const i=[r("240P",240,"x240"),r("360P",360,"x360"),r("480P",480,"x480"),r("560P",560,"x560"),r("720P",720,"x720"),r("1080P",1080,"x1080"),r("1440P",1440,"x1440","2K"),r("2160P",2160,"x2160","4K")];function o(t){for(const e of i)if(t.match(new RegExp(e.id,"gi"))||e.otherNames.some((e=>t.match(new RegExp(e,"gi")))))return e;return null}function u(t,e){const n=new RegExp(e,"gi");return t.match(n)}const a={value:60};function c(t){return u(t,"@60")||u(t,"1080P60")||u(t,"2160P60")||u(t,"60FPS")||u(t,"60 FPS")?a:null}function h(t,e){return e?{id:t,otherNames:[e]}:{id:t,otherNames:[]}}function l(t,e){const n=new RegExp(e,"gi");return t.match(n)}const g=[h("BDRip"),h("Blu-Ray","BluRay"),h("WebRip"),h("Baha"),h("TVRip")];function p(t){for(const e of g)if(l(t,e.id)||e.otherNames?.some((e=>{l(t,e)})))return e;return null}class d{constructor(t){this.number=t}get raw(){return"0.5"===this.number.toFixed(1)?this.number.toFixed(1):this.number.toString()}get isPartial(){return this.number%1==.5}toString(){return Number.isInteger(this.number)?this.number<10?`0${this.number.toFixed(0)}`:this.number.toFixed(0):this.number.toString()}}class f{constructor(t){this.raw=t}get number(){return null}toString(){return this.raw}}class w{constructor(t){this.raw=t}get Ins(){return Number(this.raw)||0===Number(this.raw)?new d(Number(this.raw)):new f(this.raw)}get isNormal(){return!(!Number(this.raw)&&0!==Number(this.raw))}get isPartial(){return!!this.isNormal&&this.Ins.isPartial}get number(){return this.Ins.number}toString(){return this.Ins.toString()}}class m{get isKnown(){return"Season"!==this.type||this.getIns().isKnown}constructor(t,e){this.type=t,this.ep=e}getIns(){return"Single"===this.type?new b(new w(this.ep.value)):"Range"===this.type?new N(new w(this.ep.start),new w(this.ep.end)):"Combined"===this.type?new C(this.ep.first,this.ep.second):"Season"===this.type?new R(this.ep.rawNumber):new S}get knownSorts(){return this.getIns().knownSorts}toString(){return this.getIns().toString()}}class S{constructor(){this.knownSorts=[]}toString(){return"EpisodeRange(empty)"}}class b{constructor(t){this.value=t}get knownSorts(){return[this.value]}toString(){return`${this.value.toString()}..${this.value.toString()}`}}class N{constructor(t,e){this.start=t,this.end=e}get knownSorts(){if(!this.start.isNormal||!this.end.isNormal)return[this.start,this.end];let t=this.start.number;this.start.isPartial&&(t+=.5);const e=[];for(;t<this.end.number;)e.push(new w(t.toString())),t+=1;return e.push(new w(this.end.number.toString())),e}toString(){return`${this.start.toString()}..${this.end.toString()}`}}class C{constructor(t,e){this.first=t,this.second=e}get knownSorts(){return[...this.first.knownSorts,...this.second.knownSorts]}toString(){return"Single"===this.second.type?`${this.first}+${this.second.getIns().value}`:"Single"===this.first.type?`${this.first.getIns().value}+${this.second}`:`${this.first}+${this.second}`}}class R{constructor(t){this.rawNumber=t,this.isKnown=!1}get numberOrZero(){return-1===this.rawNumber?0:this.rawNumber}get numberOrNull(){return-1===this.rawNumber?null:this.rawNumber}get knownSorts(){return(new S).knownSorts}toString(){return-1!==this.rawNumber?`S${this.rawNumber}`:"S?"}}const y=new RegExp("(?:★?|★(.*)?)([0-9]|[一二三四五六七八九十]{0,4}) ?[月年] ?(?:新番|日剧)★?"),x=/\[(?<v1>.+?)\]|\((?<v2>.+?)\)|\{(?<v3>.+?)\}|【(?<v4>.+?)】|（(?<v5>.+?)）|「(?<v6>.+?)」|『(?<v7>.+?)』/g,v=[/第/,/_?(?:完|END)|\(完\)/i,/[话集話]/,/_?v[0-9]/i,/版/],P=/(?<start>(?:SP)?\d{1,4})\s?(?:-{1,2}|~|～)\s?(?<end>\d{1,4})(?:TV|BDrip|BD)?(?:全(集)?)?(?<extra>\+.+)?/i,E=/(S\d)(?:(\+S\d)|(\+S\w)|(\+\w+))*/i,H={tags:[],subtitleLanguages:[],resolution:{},frameRate:{},mediaOrigin:{},episodeRange:new m("Empty",{})};function $(t,e){const n=new RegExp(e,"gi");return t.match(n)}function I(t,e){return t.startsWith(e)?t.substring(e.length):t}const O=function(n){let r=!1;n.split(" ").some((t=>"Baha"===t.toLowerCase()))&&0===H.subtitleLanguages.length&&H.subtitleLanguages.push(s.CHT);const i=function(n){const r=[];for(const[i,o]of Object.entries(t))for(const t of o){if(r.includes(s.CHC)||"CHC"!==i||e(n,t)&&r.push(s.CHC),!r.includes(s.CHS)&&"CHS"===i){if(e(n,"繁體中文"))break;e(n,t)&&r.push(s.CHS)}r.includes(s.CHT)||"CHT"!==i||e(n,t)&&r.push(s.CHT),r.includes(s.JPN)||"JPN"!==i||e(n,t)&&r.push(s.JPN),r.includes(s.ENG)||"ENG"!==i||e(n,t)&&r.push(s.ENG)}return r}(n);return i.length>0&&(H.subtitleLanguages.push(...i),r=!0),r},B=function(t){return!!o(t)&&(H.resolution=o(t),!0)},k=function(t){return!!c(t)&&(H.frameRate=c(t),!0)},T=function(t){return!!p(t)&&(H.mediaOrigin=p(t),!0)},j=function(t){if($(t,"x264")||$(t,"x265"))return!1;const e=v.reduce(((t,e)=>t.replace(e,"")),t);if(Number(e)||0===Number(e))return H.episodeRange=new m("Single",{value:e}),!0;const n=P.exec(e);if(n){const t=n.groups?.start||"",e=n.groups?.end||"",s=function(t){if(!t)return null;if(Number(t[0])||0===Number(t[0]))return null;const e=t.search(/\d/);return-1===e?null:t.substring(0,e)}(t);if(s&&!e.startsWith(s))return H.episodeRange=new m("Range",{start:t,end:s+e}),!0;if(e.startsWith("0")&&!t.startsWith("0"))return H.episodeRange=new m("Single",{value:e}),!0;const r=n.groups?.extra;return H.episodeRange=r?new m("Combined",{first:new m("Range",{start:t,end:e}),second:new m("Single",{value:I(r.replaceAll("结篇","完结篇"),"+")})}):new m("Range",{start:t,end:e}),!0}const s=E.exec(e);if(s){s[0]=void 0;for(const[t,e]of Object.entries(s))if(e){const n=I(e,"+");n&&"number"==typeof t&&(!n.startsWith("S")&&!n.startsWith("s")||n.startsWith("SP")||n.startsWith("sp")?H.episodeRange=new m("Single",{value:n}):H.episodeRange=new m("Season",{rawNumber:Number(n.substring(1))}))}return!0}return!!($(e,"SP")||$(e,"OVA")||e.includes("小剧场")||e.includes("特别篇")||e.includes("番外篇")||$(e,"OAD")||e.includes("特典"))&&(H.episodeRange=new m("Single",{value:t}),!0)};function G(t){let e=!1;return e=e||O(t)||B(t)||k(t)||j(t)||T(t),e}function W(t){const e=[],n=[];for(const s of function(t){const e=[];let n,s=0;for(;null!==(n=x.exec(t));){s<n.index&&e.push(t.substring(s,n.index)),s=n.index+n[0].length;const r=n.groups,i=r.v1||r.v2||r.v3||r.v4||r.v5||r.v6||r.v7;e.push(i)}return s<t.length&&e.push(t.substring(s)),e.flatMap((t=>t.split("/").join("$").split("\\").join("$").split("|").join("$").split(" ").join("$").split("$"))).filter((t=>""!==t.trim()))}(t)){if(!1==!!s.trim())continue;if(s.match(y)){e.push(s);continue}const t=s.replaceAll("招募","").replaceAll("招新","").trim();n.push(t)}H.tags=e;for(const t of n)G(t);"Empty"===H.episodeRange.type&&n.forEach((t=>{($(t,"BD")||$(t,"Blu-Ray"))&&(H.episodeRange=new m("Season",{rawNumber:-1}))}));const s=function(t){const e=new WeakMap;function n(t){return"object"==typeof t&&t||"function"==typeof t}return function t(s){if(!n(s))return s;if([Date,RegExp].includes(s.constructor))return new s.constructor(s);if("function"==typeof s)return new Function("return "+s.toString())();const r=e.get(s);if(r)return r;if(s instanceof Map){const r=new Map;return e.set(s,r),s.forEach(((e,s)=>{n(e)?r.set(s,t(e)):r.set(s,e)})),r}if(s instanceof Set){const r=new Set;return e.set(s,r),s.forEach((e=>{n(e)?r.add(t(e)):r.add(e)})),r}const i=Reflect.ownKeys(s),o=Object.getOwnPropertyDescriptors(s),u=Object.create(Object.getPrototypeOf(s),o);return e.set(s,u),i.forEach((e=>{const r=s[e];n(r)?u[e]=t(r):u[e]=r})),u}(t)}(H);return H.tags=[],H.subtitleLanguages=[],H.episodeRange=new m("Empty",{}),s}export{W as default};"undefined"!=typeof window&&(window._L1_VERSION_="1.1.2");
