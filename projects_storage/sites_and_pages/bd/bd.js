(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.свеча = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgGDjQgIgHgDgLQgGgQAAgcQABgigCgLIgEgVQgDgNAAgbIAAj9QAAgYAJgIQAEgEAHgBQAGgCAFADQAKAEAFAOQACAIAAARIgBDOIABAiIACAaIAEAeQADARAAAMIgBASQAAAKABAHIAGAYQABAMgFALQgGALgKACIgEAAQgHAAgHgGg");
	this.shape.setTransform(4.9,42.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF3300").s().p("AgaBHQgEgFgCgOQgEgZAAgLQgBgUAEgPQAFgOAPgZQAJgOAGgEQAIgFALAEQAKADAEAJQAHAPgPAaIgLATQgFALACAJIAFASQAHAYgPAPQgIAIgKAAQgMAAgGgJg");
	this.shape_1.setTransform(3.7,8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.свеча, new cjs.Rectangle(0,0,8.2,65.9), null);


(lib.Символ2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC66CC").s().p("AjFFMIgGAAIgtgCQgagCgSgHQgPgFgFgKIgFgLIgCgDQAEgUATgWQAHgJAPgOQAGgOARgWIAwg9IAFgGIARgsIAehAIALgZQAJgTAFgPIACgFIASg3IARg3IAKgdIALgZQACgSAHgVQAHgUARglQANgaAPACQAIABAFAKQAEAGADAMQAPBDAkAmIADALIAPAdQAJASAFALQAFAMAGAWIALAhQAGAQAJAQIARAdIAHAKQAvBxBRBgQASAWAHALQALAUgBASQgBASgNAPIgBABIgIAEIgDABQivAFivAAIiNgBgAkbEvIABAAIgBgBIAAABgAkZEfIABAAIAAgBg");
	this.shape.setTransform(32,33.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Символ2, new cjs.Rectangle(0,0,64,66.7), null);


(lib.Символ1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC66CC").s().p("AjFFMIgGAAIgtgCQgagCgSgHQgPgFgFgKIgFgLIgCgDQAEgUATgWQAHgJAPgOQAGgOARgWIAwg9IAFgGIARgsIAehAIALgZQAJgTAFgPIACgFIASg3IARg3IAKgdIALgZQACgSAHgVQAHgUARglQANgaAPACQAIABAFAKQAEAGADAMQAPBDAkAmIADALIAPAdQAJASAFALQAFAMAGAWIALAhQAGAQAJAQIARAdIAHAKQAvBxBRBgQASAWAHALQALAUgBASQgBASgNAPIgBABIgIAEIgDABQivAFivAAIiNgBgAkbEvIABAAIgBgBIAAABgAkZEfIABAAIAAgBg");
	this.shape.setTransform(32,33.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Символ1, new cjs.Rectangle(0,0,64,66.7), null);


(lib.Символ3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.instance = new lib.свеча();
	this.instance.parent = this;
	this.instance.setTransform(30.9,35,1,1,0,0,0,4,32.9);

	this.instance_1 = new lib.свеча();
	this.instance_1.parent = this;
	this.instance_1.setTransform(108.4,32.9,1,1,0,0,0,4,32.9);

	this.instance_2 = new lib.свеча();
	this.instance_2.parent = this;
	this.instance_2.setTransform(95.4,40.7,1,1,0,0,0,4,32.9);

	this.instance_3 = new lib.свеча();
	this.instance_3.parent = this;
	this.instance_3.setTransform(76.2,47,1,1,0,0,0,4,32.9);

	this.instance_4 = new lib.свеча();
	this.instance_4.parent = this;
	this.instance_4.setTransform(57.4,37.3,1,1,0,0,0,4,32.9);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF6666").s().p("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");
	this.shape.setTransform(70.2,103.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Символ3, new cjs.Rectangle(0,0,140.3,166.6), null);


// stage content:
(lib.др1 = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// Слой 20
	this.instance = new lib.свеча();
	this.instance.parent = this;
	this.instance.setTransform(394.3,444,1,1,0,0,0,4,32.9);

	this.instance_1 = new lib.свеча();
	this.instance_1.parent = this;
	this.instance_1.setTransform(471.9,441.9,1,1,0,0,0,4,32.9);

	this.instance_2 = new lib.свеча();
	this.instance_2.parent = this;
	this.instance_2.setTransform(458.9,449.7,1,1,0,0,0,4,32.9);

	this.instance_3 = new lib.свеча();
	this.instance_3.parent = this;
	this.instance_3.setTransform(439.6,456,1,1,0,0,0,4,32.9);

	this.instance_4 = new lib.свеча();
	this.instance_4.parent = this;
	this.instance_4.setTransform(420.9,446.3,1,1,0,0,0,4,32.9);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF6666").s().p("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");
	this.shape.setTransform(433.6,512.9);

	this.instance_5 = new lib.Символ3();
	this.instance_5.parent = this;
	this.instance_5.setTransform(433.7,492.3,1,1,0,0,0,70.2,83.3);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_5}]},50).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(50).to({_off:false},0).wait(1).to({y:485.5},0).wait(1).to({y:478.6},0).wait(1).to({y:471.8},0).wait(1).to({y:465},0).wait(1).to({y:458.1},0).wait(1).to({y:451.3},0).wait(1).to({y:444.5},0).wait(1).to({y:437.7},0).wait(1).to({y:430.8},0).wait(1).to({y:424},0).wait(1).to({y:417.2},0).wait(1).to({y:410.3},0).wait(1).to({y:403.5},0).wait(1).to({y:396.7},0).wait(1).to({y:389.8},0).wait(1).to({y:383},0).wait(1).to({y:376.2},0).wait(1).to({y:369.3},0).wait(1).to({y:362.5},0).wait(1).to({y:355.7},0).wait(1).to({y:348.8},0).wait(1).to({y:342},0).wait(1).to({y:335.2},0).wait(1).to({y:328.4},0).wait(1).to({y:321.5},0).wait(1).to({y:314.7},0).wait(1).to({y:307.9},0).wait(1).to({y:301},0).wait(1).to({y:294.2},0).wait(63));

	// Слой 19
	this.instance_6 = new lib.Символ1();
	this.instance_6.parent = this;
	this.instance_6.setTransform(303,-37.3,1,1,0,0,0,32,33.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1).to({y:-32.9},0).wait(1).to({x:303.1,y:-28.6},0).wait(1).to({y:-24.2},0).wait(1).to({x:303.2,y:-19.9},0).wait(1).to({y:-15.6},0).wait(1).to({x:303.3,y:-11.4},0).wait(1).to({y:-7.1},0).wait(1).to({x:303.4,y:-2.9},0).wait(1).to({y:1.3},0).wait(1).to({x:303.5,y:5.5},0).wait(1).to({y:9.7},0).wait(1).to({x:303.6,y:13.8},0).wait(1).to({y:18},0).wait(1).to({x:303.7,y:22.1},0).wait(1).to({y:26.1},0).wait(1).to({x:303.8,y:30.2},0).wait(1).to({y:34.2},0).wait(1).to({x:303.9,y:38.2},0).wait(1).to({y:42.2},0).wait(1).to({x:304,y:46.2},0).wait(1).to({y:50.2},0).wait(1).to({y:50.4},0).wait(120));

	// Слой 17
	this.instance_7 = new lib.Символ2();
	this.instance_7.parent = this;
	this.instance_7.setTransform(571.1,-37,1,1,0,0,0,32,33.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1).to({y:-33},0).wait(1).to({y:-28.9},0).wait(1).to({y:-24.9},0).wait(1).to({y:-21},0).wait(1).to({y:-17},0).wait(1).to({y:-13},0).wait(1).to({y:-9.1},0).wait(1).to({y:-5.2},0).wait(1).to({y:-1.3},0).wait(1).to({y:2.5},0).wait(1).to({y:6.4},0).wait(1).to({y:10.2},0).wait(1).to({y:14},0).wait(1).to({y:17.8},0).wait(1).to({y:21.6},0).wait(1).to({y:25.3},0).wait(1).to({y:29.1},0).wait(1).to({y:32.8},0).wait(1).to({y:36.4},0).wait(1).to({y:40.1},0).wait(1).to({y:43.8},0).wait(1).to({y:44},0).wait(120));

	// Слой 10
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAQD0QgIgEgGgMQgEgKgCgOIgDgaQgEgYgTg1IgJghQgCgKAAgPIABgZIgBgYQAAgOACgKIAKgjQAIgegBgdQAAgOgFgfQgEgdABgQQABgOAEgHQAHgLALABQAJACAEAMQACAHAAANQAAASAEAkQAEAjAAASQAAAXgGASIgIAYQgDANgBAWQgCArAEAVQACAQAKAbQANAoAEAcQADAaADAHIAGATQACAMgHAHQgFAEgGAAQgEAAgFgCg");
	this.shape_1.setTransform(593.5,305.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(142));

	// Слой 11
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhODbQgGgCgEgFQgGgIgBgOQAAgUAJgQIANgZIAGgbIAJgYIBVjeQAQgqANgRQAMgRAMACQAHABAFAHQADAGAAAHQAAAKgJARIgKARQgIAQgLAaIgYA0QgIAXgEAOIgIAaIgMAXQgGAOgCALIgEAYQgCAGgHALQgIAKgCAGIgCASQgBALgBAGQgCAFgIAKQgHAJgCAGQgCAEAAAIIgBAMQgCAQgJAEIgGACIgFgBg");
	this.shape_2.setTransform(548.7,302.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(142));

	// Слой 12
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAvE2QgHgBgEgHQgEgGgBgIQgBgVANgcQARggAGgQQAEgLAJgjQANgsAhhMQAKgXANgGQgCgXgSgeQgRgZgZgcQgQgRgggeQgUgUgQgMQgQgMghgPQg0gYg9gXQgSgIgFgGQgFgFgBgHQgBgIAEgFQAJgMAaALICEA4QAzAYAWAUQALALAVAXIAWAVQANAMAHAJQAJAMAPAaQAIANATAaQAPAYgEAVQgCALgIANIgRAXQgNATgKAbQgFAOgLAkQgYBOghBLQgIATgLAAIgBAAg");
	this.shape_3.setTransform(613.1,202.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(142));

	// Слой 13
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgTApQgEgGgBgIQAAgLACgIIAEgNIABgRQABgJAHgIQAHgGAIgCQAKACAFAJQAGAIgEAKIgEALQgBAFABAMIgFARQgEAMgDADQgFAFgHAAQgJAAgFgGg");
	this.shape_4.setTransform(566.8,153.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(142));

	// Слой 14
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AlyJIQgUgEgNgWQgKgTgCgaQgEhEAjhYQAuhkAUgyQA4iEAJiQIADhiQABg8AHgnQADgSAKgtQAJgnADgYIAEgwQADgeAEgSQANg5AmgWQAPgJAWgDIAAgBIAdgDQAAAAABABQAAAAABAAQAAAAABAAQAAgBABAAIAMAAIAAABQBCgBAjAFIAgAGIgBgBIAEABIAIACIAKADIAIAFIAFACIACAAQAPAHANAIQAeAUAbAlQARAZAZAuQA/B1AbBSQAUA9APBOQAJAwANBcIAqEhQAEAdAAARQAAAagIATQgIASgSAQQgMALgXAPQgpAbgeAOQgoAUgkAIQgZAFghACQgTABgngBIlRgIQgtgBgUAFIgaAJQgKACgIAAIgIAAgAiSoGQgSASgFAgIgFA7QgCAagIAmIgOBAQgLA5gGB/QgFB3gPA/QgPA/gsBlQg1B4gOArQgWBGALArQACALAGAEQAGADAMgDQAfgIAmgBQAZgCAtABIEvAFIAoAAQAXAAARgDQAigGAogTQAXgLAugbQATgLAKgIQAPgMAHgOQAHgOAAgUQAAgMgDgXIgtk3QgGgxgIgnQgnjXhyi2QgbgsgYgTQgegXgugJQgdgFg3gCQgUAAgPABIgBgBIgDAAIgOAEIgBAAIgBAAIgCAAIgBABIgBAAIgBAAQgBAAAAAAQgBAAAAABQgBAAAAAAQAAABgBAAIgCAAQgBAAgBAAQAAAAgBABQAAAAAAAAQgBAAAAABIAAAAIgBAAQgQAGgKAKgAAukmIAGgRQADgKgBgHIAAgKQABgFADgCQACgCAIgCQACgCADgGQADgHADgCQADgCAGABIArADQADADgFADQgDACgEAAIgdADIgJABQgEACgFAFQgHAGgCAFQgDAGAAAMQgBAIgHAPQgDAIACATQAAASgDAJIgGAAQgEgmAFgRgAiHkDQgCgcAAgUQAAgLADgEQAGgIABgEIABgOQACgGAJgKQAJgLAFgMIAhACQAAAIgLACQgLAAgFACQgEACgGAHQgJALgBAFIgCAOIgHAMQgDAGABATQABAVgDARg");
	this.shape_5.setTransform(571.1,220);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(142));

	// Слой 15
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgkDxQgKgLgPgOIhEgzQgNgJgGgIQgMgQgBgZQgCgwAfgoQAIgLAPgOIBQhSICSiXQAMgMAJgEQAGgCAHACQAHACADAGQAFALgQASIjpDxIgUAXQgMAQgFARQgHAaAMATQAFAHAUAPQAqAeAmAkQALAOADAHQACAHgCAGQgCAHgFADQgDABgDAAQgLAAgQgQg");
	this.shape_6.setTransform(529.6,198.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(142));

	// Слой 16
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FF3333").ss(5,1,1).p("AhDgcQAFADAiAZIAXAPQAkATAlgI");
	this.shape_7.setTransform(568.4,125.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#663300").s().p("ACAAsQgNgGgHgMQgEgIgCgNQgCgOAGgNQAGgLAKgGQALgHANAAQAGAAgBgDQAOABANAJQAMAJAFAOQAGAOgEAOQgEAPgLAKQgLAKgPACIgIABQgLAAgJgGgAirAsQgNgGgHgMQgEgIgCgNQgCgOAGgNQAGgLAKgGQALgHANAAQAGAAgBgDQAOABANAJQAMAJAFAOQAGAOgEAOQgEAPgLAKQgLAKgPACIgIABQgLAAgJgGg");
	this.shape_8.setTransform(565.5,100.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("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");
	this.shape_9.setTransform(562.8,124.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},50).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},65).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},26).wait(1));

	// Слой 2
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AggEKQgEgGgCgTQgGhOAEiQQABgiAEgRIAKgjQARgyAGgeQAJgsgFglQgCgYABgIQADgJAHgEQAHgGAIADQALAEADAWQAKBTgbBQIgMAiQgHAUgDAPQgBALgBAiIgCByQAABAAEAgQADARgCAGQgCAOgLADIgEABQgKAAgHgMg");
	this.shape_10.setTransform(336.9,308);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(142));

	// Слой 3
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AAEEgQgHgFgDgRIgLg9QgGgjgCgWQgEgtACg/IAEhrQAChkgJhUQgBgRABgFQAEgMAKgDQAGgCAGAEQAFADAEAGQAEAJABARQAGBdAAAwQAAAbgDBVQgDBHACArQACAtAHAsIAHAlQAFAWgDAKQgDAIgIAFQgEACgEAAQgEAAgDgBg");
	this.shape_11.setTransform(288.8,304.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(142));

	// Слой 4
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgHAyQgKgDgDgOQgBgFAAgHIABgMQgCgWACgLQABgJAFgHQAGgIAIgBQAHgBAHAFQAHAFABAIQAAAHgFAQQgBAGABASQABAQgFAIQgDAGgGADQgEADgDAAIgEgBg");
	this.shape_12.setTransform(304.7,158.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(142));

	// Слой 5
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AkiCcQgIgBgFgEQgGgFAAgHQgBgNAUgKIAUgLIATgMQAKgHAQgQIAYgYQAJgIAPgJIAYgPIAlgaQAcgUAdgQQAlgVBBgcQAqgRAOgEIAcgIIAdgHIAcgLQARgHAMgCQAUgDAoACQAPgBAHACQANAEACALQABAGgEAFQgEAGgGADQgHADgTAAQgoAAgUAEIgZAIIgYAIIg8ARQgiAJg4AeIhEAkQhKArhCA4IggAcQgTAPgQAJQgPAIgLAAIgBAAg");
	this.shape_13.setTransform(250.8,194.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(142));

	// Слой 6
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AEmC2QgJgBgLgFIg2gZQgsgVgUgOIghgXQgQgLgpgYQglgWgTgOQgOgMgxgvQgmgmgdgPQgTgKgfgJIg0gRQgigMgLgCIgPgBQgJAAgFgCQgIgDgEgGQgFgHACgHQACgLAUgDQARgCAXAGIAnAOIAwANQAdAIARAJQAdANAiAeQATARAkAkQAcAZAoAaIBHAvIA3AgQAVAMBHAiQAOAGAGAHQAEAEABAGQABAHgDAEQgFAIgLAAIgBAAg");
	this.shape_14.setTransform(361.8,192.7);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(142));

	// Слой 7
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AknIDQgggEgTgFQgbgHgUgNQgigXgOguQgNgoAFgvQADggAPg1QAQg8AEgZQAFgZACgmIAEhAQAEgmALg/QAljMBXi+QAOgfAMgQQARgZAWgKQASgIAbgCIAXAAIAVABIAHAAIACAAIAFABIADAAIABAAIABAAIABABIABAAQAUABAUADQAnAFAcAKIAAgBIACABIADABIADACIAGACIAEABIACABIAJAFIACAAIAAABIADADIABAAIABABQAfATAdArQApA5AtBpQA5CFAnB4QBAC/AmDLQAIArAJATQAGAMAPAYQAMAVAAARQABAPgJAOQgIAOgOAJQgVALgtAAQlOgBk8gngAi2n4QgUAKgRAlQh2DxgYEIIgHBVQgFAygJAjIgRA9QgLAkgCAZQgDAiALAdQAMAhAZAQQANAIATAFQANADAWADQFNArFOgBQAeAAAIgNQAHgKgFgNQgDgJgIgIIgCgEIAAAAIgCgEIgBgDIgBAAIgGgOIAAgBIgBgDIgBgDIgBgCIAAgBQgCgEABgEIgCgBIAAgCIgEgMIAAgBIgCgIQAAAAAAAAQgBAAAAAAQAAAAAAgBQAAAAAAAAIgBgCIAAgCQABAAAAgBQAAAAAAAAQAAgBAAAAQAAgBgBAAIAAgBQgujshOjdQgghcguhtQgshmgmg0QgZgigagRQgggWgvgHQgfgFg5AAQglABgNAIgABgjhIABg3QAAgKgDgEIgFgIIgKgPQgFgGgHgHQgcgbgTgGQgLgDgCgFQACgEAFAAQAEAAADACQATAHALAJIAbAXIAIAJIAJAQIAJALQACAFAAAMIABAlQAAAYgCAMIgGABQgDgGAAgMgAg9jiIAAgnQABgdgFgOQgLgdgsgRQgdgMgfgDQgBgDAFgCQAEgCAEAAQAoADATAKQALAGAQAPQAUATAHAQQAFANAAAcIgBAoQAAAOgFAFQgGgFABgOg");
	this.shape_15.setTransform(312.3,221.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(142));

	// Слой 8
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AAyBbQgGgBgGgFQgEgDgEgGIgIgKIgVgUQgVgVgEgdIgDgVQgFgOgMgJIgMgHQgHgEgCgFQgEgJAIgJQAHgIALAAQAPABATATQAQAQADAMQACAGAAAOQABANACAHQAEAIAKAJIATAQQAOAPAEATQAEARgJAHQgDACgEAAIgEAAg");
	this.shape_16.setTransform(334.9,157.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(142));

	// Слой 9
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#FF3333").ss(5,1,1).p("AgjAQQAbgKAsgV");
	this.shape_17.setTransform(309.4,133.9);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#663300").s().p("ACAAsQgNgGgHgMQgEgIgCgNQgCgOAGgNQAGgLAKgGQALgHANAAQAGAAgBgDQAOABANAJQAMAJAFAOQAGAOgEAOQgEAPgLAKQgLAKgPACIgIABQgLAAgJgGgAirAsQgNgGgHgMQgEgIgCgNQgCgOAGgNQAGgLAKgGQALgHANAAQAGAAgBgDQAOABANAJQAMAJAFAOQAGAOgEAOQgEAPgLAKQgLAKgPACIgIABQgLAAgJgGg");
	this.shape_18.setTransform(306.7,104.8);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("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");
	this.shape_19.setTransform(318.5,128.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]},50).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]},65).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]},26).wait(1));

	// Слой 21
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FF3300").s().p("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HQgGgIAHgKQAFgGAMgDIATgBQAPgCAYgLQAFgCACgDQACgDgBgFQgBgVgPgOIgSgLIgSgIQgJgFgDgEQgCgDAAgIQAAgHACgEQACgFAIgDIAMgFQAGgCALgKQAKgKACgGQADgIgDgOQgCgIgDgFQgEgGgLgIIgMgGIgJgBIgZgBQgIAAgGgCIgGgDIAAAGIgEAWIAAAWIgDAUQgBAKAAAWIAACNQAAAQgGAFQgEADgFAAIgCAAgEAwOAAjQgIgCgFgGIgIgNQgFgIgDgEQgFgEgMgHQgNgHgEgFQgFgFgEgKIgIgRQgJgNgCgHQgCgGACgGIABgCQgCgFACgFQAEgHAJACQAEABAIAEIAIgBIAngHQAdgFARAAQAaAAASAKQAJADADAHQADAHgHAHQgFAEgMAAIhggEQBLAtBXARQAYAEgCAMQgBAJgKACQgGACgLgCQhZgShLgrIAEAFIANAKQAPAMARAaQAMARgHAJQgEAEgGAAIgDAAgEgm0gAqQgNgCgDgIQgCgJAJgHQAFgCAMgDQAugIAngYIATgMQAMgHAJgDIAQgDIgRgHQgNgFgGgEIgQgIIgOgDQgJgDgCgHQgBgEADgFQADgEAFgCQAMgEAMAGIAXAMQAIAFAOAFIAXAIIAJADIAAAAQAHgEAFABIACAAQAFAAAFAEQAIAIgDAQIgDAMIgDAMIgBALQAAAGgCAEQgCAFgIAKIgGALQgEAGgIAAQgIABgEgGQgEgIAHgMIAGgJQAEgFABgEIABgKIAAgLIACgDIgRAHIgmAOQgMAFgSALIgdARQghAQgYAAIgJAAg");
	this.shape_20.setTransform(420.4,161.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(142));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(432.7,129.4,827.5,646.3);
// library properties:
lib.properties = {
	width: 852,
	height: 400,
	fps: 60,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: [],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;