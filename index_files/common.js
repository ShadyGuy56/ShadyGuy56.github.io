function showHidden(i) {

    if (i == 'off'){
        $('#products').removeClass('showHidden');
        $('#showHidden > input').attr('checked', false);
    }
    else {
        $('#products').toggleClass('showHidden');
    }
	
}

$("label#showHidden > input").click(function(){
    showHidden()
});


function updateShowHidden() {

    var h = $( "#products li.hidden").length;
    var t = 'titles ';
    
    if (h < 1){
        $("label#showHidden").hide();
    }
    else if (h==1){
        $("label#showHidden").show();
        t='title ';
    }
    else {
        $("label#showHidden").show();
    }
    
    $('#showHidden > span').text('Show ' + h + ' hidden ' + t);
    
    $('#products > div').css('height','auto');
	
    jQuery('.studentbook').unbind('click').bind('click', function(){
        bookclick(this);
    });
    jQuery('.teacherbook').unbind('click').bind('click', function(){
        bookclick(this);
    });
    
}



function setCounter(userCount) {
	
    var userCount = userCount + ''
	
    var digits=new Array();
	
    digits[0] = userCount.substring(0, 1);
    digits[1] = userCount.substring(1, 2);
    digits[2] = userCount.substring(2, 3);
    digits[3] = userCount.substring(3, 4);
    digits[4] = userCount.substring(4, 5);
    digits[5] = userCount.substring(5, 6);
    digits[6] = userCount.substring(6, 7);
	
    if (digits[6] != '') {
        $('#counter').addClass('million');
    }
		
    for (var i = 0; i < digits.length; i++){	

        if (i == 3 && digits[6] == '') {
				
            var myElement = document.createElement('span');
            myElement.setAttribute('class', 'comma');
            document.getElementById('usercount').appendChild(myElement);
				
				
        } 
        if (i == 1 && digits[6] != '') {
				
            var myElement = document.createElement('span');
            myElement.setAttribute('class', 'comma');
            document.getElementById('usercount').appendChild(myElement);
				
				
        }
        if (i == 4 && digits[6] != '') {
				
            var myElement = document.createElement('span');
            myElement.setAttribute('class', 'comma');
            document.getElementById('usercount').appendChild(myElement);
				
				
        }
				
        var styleName = 'd' + digits[i];
        var myElement = document.createElement('span');
        myElement.setAttribute('class', styleName);
        document.getElementById('usercount').appendChild(myElement);
				
				
         
    }
	
	
}



//Get session cookie routine
function get_sess_cookie(Name) {
    var search = Name + "="
    var returnvalue = "";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search)
        // if cookie exists
        if (offset != -1) { 
            offset += search.length
            // set index of beginning of value
            end = document.cookie.indexOf(";", offset);
            // set index of end of cookie value
            if (end == -1) end = document.cookie.length;
            returnvalue=unescape(document.cookie.substring(offset, end))
        }
    }
    return returnvalue;
}


function toggleCatHeads() {
    if (document.getElementById('sType').className == 'segment-2 selected-2'){
        document.getElementById('col1').className = ''
    }
    else {
        document.getElementById('col1').className = 'nameSort'
    }
}



function setSkin(){


    // Get the string that follows the "?" in the window's location.
    var skin = "jacplus"
				
    var sGet = window.location.search;
    // Drop the leading "?"

    sGet = sGet.substr(1);

    // Generate a string array of the name value pairs.
    // Each array element will have the form "mw=310"
    var sNVPairs = sGet.split("&");		

    // Now, for each name-value pair, we need to extract
    // the name and value.
    for (var i = 0; i < sNVPairs.length; i++){	
        // So, sNVPairs[i] contains the current element...
        // Split it at the equals sign.
        var sNV = sNVPairs[i].split("=");
        if (sNV[0] == 'prod'){ 
            skin = sNV[1];
        }
	
    }




	
    if (skin == 'atlas'){
		
		
        var a = document.createElement('link');
        a.setAttribute('rel', 'stylesheet');
        a.setAttribute('type', 'text/css');
        a.setAttribute('href', '/CSS/2011/atlas.css');
        document.getElementsByTagName('head')[0].appendChild(a);
		
        $(body).css('background-image','/images/2011/global/bkg-atlas.jpg');
		
        if (document.getElementById('homelink') != null){
            document.getElementById('homelink').href = 'http://www.myworldatlas.com.au'
        }
		
    }
	
    else if (skin == 'studyon'){
		
		
        var a = document.createElement('link');
        a.setAttribute('rel', 'stylesheet');
        a.setAttribute('type', 'text/css');
        a.setAttribute('href', '/CSS/2011/studyon.css');
        document.getElementsByTagName('head')[0].appendChild(a);
		
        $(body).css('background-image','/images/2011/global/bkg-studyon.jpg');
		
        if (document.getElementById('homelink')){
            document.getElementById('homelink').href = 'http://www.studyon.com.au'
        }
		
    }
	
    else if (skin == 'kq'){
		
		
        var a = document.createElement('link');
        a.setAttribute('rel', 'stylesheet');
        a.setAttribute('type', 'text/css');
        a.setAttribute('href', '/CSS/2011/kq.css');
        document.getElementsByTagName('head')[0].appendChild(a);
		
        $(body).css('background-image','/images/2011/global/bkg-kq.jpg');
		
        if (document.getElementById('homelink')){
            document.getElementById('homelink').href = 'http://www.kquest.com.au'
        }
		
    }
	
    else if (skin == 'assesson'){
		
		
        var a = document.createElement('link');
        a.setAttribute('rel', 'stylesheet');
        a.setAttribute('type', 'text/css');
        a.setAttribute('href', '/CSS/2011/assesson.css');
        document.getElementsByTagName('head')[0].appendChild(a);
		
        $(body).css('background-image','/images/2011/global/bkg-assesson.jpg');
		
        if (document.getElementById('homelink')){
            document.getElementById('homelink').href = 'http://www.assesson.com.au'
        }
		
    }


    resizeBkg();
	
}

function resizeBkg(){
	
    if (document.getElementById('pagebkg') != null){
	
        var bkgWidth = document.getElementById('pagebkg').clientWidth;
        var p = document.getElementsByTagName('body');
        for(i=0;i<p.length;i++) {
            if (p[i].clientWidth < 1535){
                bkgleft = (1535 - p[i].clientWidth) / 2;
                document.getElementById('pagebkg').style.marginLeft = '-' + bkgleft + 'px';
                document.getElementById('pagebkg').style.width = '1535px';
            }
            else {
                document.getElementById('pagebkg').style.marginLeft = '0px';
                document.getElementById('pagebkg').style.width = '100%';
            }
        }
    }	
}

window.onresize = function () {
    resizeBkg();
}


/* 
Method for resizing the flash stage at runtime.

setFlashWidth(divid, newW)
divid: id of the div containing the flash movie.
newW: new width for flash movie

*/

function ResizeFlashTitle(newH, divid){
	
    if (divid == null){
        divid = 'header';
    }
	
    if (newH > 100){
		
        newH = parseFloat(newH);
		
        var divPad = (newH - 100) / 2 + 35;
        newH = newH  + divPad ;
        document.getElementById(divid).style.marginTop = "-"+divPad+"px";
        document.getElementById(divid).style.height = newH+"px";		
    }
}




var lighthref = null;

function lightWindow_DoneLoading(){
	
    var sGet = window.location.search;
    // Drop the leading "?"
		
    sGet = sGet.substr(1);
    
    // Generate a string array of the name value pairs.
    // Each array element will have the form "mw=310"
    var sNVPairs = sGet.split("&");
    
    // Now, for each name-value pair, we need to extract
    // the name and value.
    for (var i = 0; i < sNVPairs.length; i++){	
        // So, sNVPairs[i] contains the current element...
        // Split it at the equals sign.
        var sNV = sNVPairs[i].split("=");
        if (sNV[0] == 'vid'){ 
			
            lighthref = '/images/vidplayer.swf?autoPlay=True&width=680&height=382&vidpath=/images/videos/' + sNV[1] + '.flv';
			
			
            $(document).ready(function(){
                $.prettyPhoto.open(lighthref,'','');
            });

			
        }
    }
	
}



function switchBookShelfView (view) {
	
    if (document.getElementById('bookShelfDiv') != null){
        document.getElementById('bookShelfDiv').style.height = 'auto';
		
        if (view == "coverView"){
            document.getElementById('products').className = 'coverView';
            document.getElementById('bookShelfDiv').className = 'coverView';
            if(document.getElementById('bookShelf') != null){
                document.getElementById('bookShelf').className = 'coverView';
            }
            if(document.getElementById('yearbookShelf') != null){
                document.getElementById('yearbookShelf').className = 'coverView';
            }
            document.getElementById('coverView').className = 'active';	
            document.getElementById('listView').className = 'inactive';
            createCookie('viewMode','coverView','30');
        }
        else if (view == "listView"){
            document.getElementById('products').className = 'listView';
            document.getElementById('bookShelfDiv').className = 'listView';
            if(document.getElementById('bookShelf') != null){
                document.getElementById('bookShelf').className = 'listView';
            }
            if(document.getElementById('yearbookShelf') != null){
                document.getElementById('yearbookShelf').className = 'listView';
            }
			
            document.getElementById('listView').className = 'active';	
            document.getElementById('coverView').className = 'inactive';
            createCookie('viewMode','listView','30');
        }
		
        var newHeight = document.getElementById('products').clientHeight; 
        document.getElementById('bookShelfDiv').style.height = newHeight + 'px';
    }
	
    showHidden('off');
	
}




function hidelabel(labelID) {
    document.getElementById(labelID).style.visibility = "hidden";
}

function checklabel(inputID) {
	
    var labelID = inputID + 'label';
	
    if (document.getElementById(inputID).value == ''){
        document.getElementById(labelID).style.visibility = "visible";
    }
}


function checkhomelabel() {
	



    // Create a dummy element for feature detection
    if (!('placeholder' in $('<input>')[0])) {

        document.getElementById("login").className = "noplaceholders";

    }


	
	
}


function positionCenter(targetDIV){ // Position div at center of screen
    var centerDiv = document.getElementById(targetDIV);
	
    divPos = (window.innerHeight / 2) 
    || document.documentElement.clientHeight / 2 
    || document.body.clientHeight / 2;
    divPos = divPos - (centerDiv.clientHeight / 2);
    if (divPos > 0){
        centerDiv.style.marginTop = divPos + 'px';
    } else {
        centerDiv.style.marginTop = '0px';
    }
}


function ShowHideList(barID, tableID){
	
    var titleID = barID.substring(8, barID.length);
    var titleID = document.getElementById("titleBar" + titleID);
    var barID = document.getElementById(barID);
    var tableID = document.getElementById(tableID);
	
    if (tableID.className == 'TableVisible') {
        barID.className = "BarHide";
        tableID.className = "TableHide";
    }
    else {
        barID.className = "BarVisible";
        tableID.className = "TableVisible";
    }

}

function MM_swapImgRestore() { //v3.0
    var i,x,a=document.MM_sr;
    for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
    var d=document;
    if(d.images){
        if(!d.MM_p) d.MM_p=new Array();
        var i,j=d.MM_p.length,a=MM_preloadImages.arguments;
        for(i=0; i<a.length; i++)
            if (a[i].indexOf("#")!=0){
                d.MM_p[j]=new Image;
                d.MM_p[j++].src=a[i];
            }
    }
}

function MM_findObj(n, d) { //v4.01
    var p,i,x;
    if(!d) d=document;
    if((p=n.indexOf("?"))>0&&parent.frames.length) {
        d=parent.frames[n.substring(p+1)].document;
        n=n.substring(0,p);
    }
    if(!(x=d[n])&&d.all) x=d.all[n];
    for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
    for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
    if(!x && d.getElementById) x=d.getElementById(n);
    return x;
}

function MM_swapImage() { //v3.0
    var i,j=0,x,a=MM_swapImage.arguments;
    document.MM_sr=new Array;
    for(i=0;i<(a.length-2);i+=3)
        if ((x=MM_findObj(a[i]))!=null){
            document.MM_sr[j++]=x;
            if(!x.oSrc) x.oSrc=x.src;
            x.src=a[i+2];
        }
}
function MM_openBrWindow(theURL,winName,features) { //v2.0
    window.open(theURL,winName,features);
}
function MM_jumpMenu(targ,selObj,restore){ //v3.0
    eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
    if (restore) selObj.selectedIndex=0;
}
function MM_nbGroup(event, grpName) { //v6.0
    var i,img,nbArr,args=MM_nbGroup.arguments;
    if (event == "init" && args.length > 2) {
        if ((img = MM_findObj(args[2])) != null && !img.MM_init) {
            img.MM_init = true;
            img.MM_up = args[3];
            img.MM_dn = img.src;
            if ((nbArr = document[grpName]) == null) nbArr = document[grpName] = new Array();
            nbArr[nbArr.length] = img;
            for (i=4; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {
                if (!img.MM_up) img.MM_up = img.src;
                img.src = img.MM_dn = args[i+1];
                nbArr[nbArr.length] = img;
            }
        }
    } else if (event == "over") {
        document.MM_nbOver = nbArr = new Array();
        for (i=1; i < args.length-1; i+=3) if ((img = MM_findObj(args[i])) != null) {
            if (!img.MM_up) img.MM_up = img.src;
            img.src = (img.MM_dn && args[i+2]) ? args[i+2] : ((args[i+1])? args[i+1] : img.MM_up);
            nbArr[nbArr.length] = img;
        }
    } else if (event == "out" ) {
        for (i=0; i < document.MM_nbOver.length; i++) {
            img = document.MM_nbOver[i];
            img.src = (img.MM_dn) ? img.MM_dn : img.MM_up;
        }
    } else if (event == "down") {
        nbArr = document[grpName];
        if (nbArr)
            for (i=0; i < nbArr.length; i++) {
                img=nbArr[i];
                img.src = img.MM_up;
                img.MM_dn = 0;
            }
        document[grpName] = nbArr = new Array();
        for (i=2; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {
            if (!img.MM_up) img.MM_up = img.src;
            img.src = img.MM_dn = (args[i+1])? args[i+1] : img.MM_up;
            nbArr[nbArr.length] = img;
        }
    }
}
function P7_swapClass(){ //v1.4 by PVII
    var i,x,tB,j=0,tA=new Array(),arg=P7_swapClass.arguments;
    if(document.getElementsByTagName){
        for(i=4;i<arg.length;i++){
            tB=document.getElementsByTagName(arg[i]);
            for(x=0;x<tB.length;x++){
                tA[j]=tB[x];
                j++;
            }
        }
        for(i=0;i<tA.length;i++){
            if(tA[i].className){
                if(tA[i].id==arg[1]){
                    if(arg[0]==1){
                        tA[i].className=(tA[i].className==arg[3])?arg[2]:arg[3];
                    }else{
                        tA[i].className=arg[2];
                    }
                }else if(arg[0]==1 && arg[1]=='none'){
                    if(tA[i].className==arg[2] || tA[i].className==arg[3]){
                        tA[i].className=(tA[i].className==arg[3])?arg[2]:arg[3];
                    }
                }else if(tA[i].className==arg[2]){
                    tA[i].className=arg[3];
                }
            }
        }
    }
}

function unblur() {
    this.blur();
} 
function blurLinks() {
    if (!document.getElementById) return;
    theLinks = document.getElementsByTagName("A");
    theAreas = document.getElementsByTagName("AREA");
    for(i=0; i<theLinks.length; i++) {
        theLinks[i].onfocus = unblur;
    }
    for(i=0; i<theAreas.length; i++) {
        theAreas[i].onfocus = unblur;
    }
} 
  
  
function MM_setTextOfTextfield(objId,x,newText) { //v9.0
    with (document){
        if (getElementById){
            var obj = getElementById(objId);
        }
        if (obj) obj.value = newText;
        }
}
  
  
  
// IE5.5+ PNG Alpha Fix v2.0 Alpha: Background Tiling Support
// (c) 2008 Angus Turnbull http://www.twinhelix.com

// This is licensed under the GNU LGPL, version 2.1 or later.
// For details, see: http://creativecommons.org/licenses/LGPL/2.1/

var IEPNGFix = window.IEPNGFix || {};

IEPNGFix.tileBG = function(elm, pngSrc, ready) {
    // Params: A reference to a DOM element, the PNG src file pathname, and a
    // hidden "ready-to-run" passed when called back after image preloading.

    var data = this.data[elm.uniqueID],
    elmW = Math.max(elm.clientWidth, elm.scrollWidth),
    elmH = Math.max(elm.clientHeight, elm.scrollHeight),
    bgX = elm.currentStyle.backgroundPositionX,
    bgY = elm.currentStyle.backgroundPositionY,
    bgR = elm.currentStyle.backgroundRepeat;

    // Cache of DIVs created per element, and image preloader/data.
    if (!data.tiles) {
        data.tiles = {
            elm: elm,
            src: '',
            cache: [],
            img: new Image(),
            old: {}
        };
    }
    var tiles = data.tiles,
    pngW = tiles.img.width,
    pngH = tiles.img.height;

    if (pngSrc) {
        if (!ready && pngSrc != tiles.src) {
            // New image? Preload it with a callback to detect dimensions.
            tiles.img.onload = function() {
                this.onload = null;
                IEPNGFix.tileBG(elm, pngSrc, 1);
            };
            return tiles.img.src = pngSrc;
        }
    } else {
        // No image?
        if (tiles.src) ready = 1;
        pngW = pngH = 0;
    }
    tiles.src = pngSrc;

    if (!ready && elmW == tiles.old.w && elmH == tiles.old.h &&
        bgX == tiles.old.x && bgY == tiles.old.y && bgR == tiles.old.r) {
        return;
    }

    // Convert English and percentage positions to pixels.
    var pos = {
        top: '0%',
        left: '0%',
        center: '50%',
        bottom: '100%',
        right: '100%'
    },
    x,
    y,
    pc;
    x = pos[bgX] || bgX;
    y = pos[bgY] || bgY;
    if (pc = x.match(/(\d+)%/)) {
        x = Math.round((elmW - pngW) * (parseInt(pc[1]) / 100));
    }
    if (pc = y.match(/(\d+)%/)) {
        y = Math.round((elmH - pngH) * (parseInt(pc[1]) / 100));
    }
    x = parseInt(x);
    y = parseInt(y);

    // Handle backgroundRepeat.
    var repeatX = {
        'repeat': 1, 
        'repeat-x': 1
    }
    [bgR],
    repeatY = {
        'repeat': 1, 
        'repeat-y': 1
    }
    [bgR];
    if (repeatX) {
        x %= pngW;
        if (x > 0) x -= pngW;
    }
    if (repeatY) {
        y %= pngH;
        if (y > 0) y -= pngH;
    }

    // Go!
    this.hook.enabled = 0;
    if (!({
        relative: 1, 
        absolute: 1
    }
    [elm.currentStyle.position])) {
        elm.style.position = 'relative';
    }
    var count = 0,
    xPos,
    maxX = repeatX ? elmW : x + 0.1,
    yPos,
    maxY = repeatY ? elmH : y + 0.1,
    d,
    s,
    isNew;
    if (pngW && pngH) {
        for (xPos = x; xPos < maxX; xPos += pngW) {
            for (yPos = y; yPos < maxY; yPos += pngH) {
                isNew = 0;
                if (!tiles.cache[count]) {
                    tiles.cache[count] = document.createElement('div');
                    isNew = 1;
                }
                var clipR = (xPos + pngW > elmW ? elmW - xPos : pngW),
                clipB = (yPos + pngH > elmH ? elmH - yPos : pngH);
                d = tiles.cache[count];
                s = d.style;
                s.behavior = 'none';
                s.left = xPos + 'px';
                s.top = yPos + 'px';
                s.width = clipR + 'px';
                s.height = clipB + 'px';
                s.clip = 'rect(' +
                (yPos < 0 ? 0 - yPos : 0) + 'px,' +
                clipR + 'px,' +
                clipB + 'px,' +
                (xPos < 0 ? 0 - xPos : 0) + 'px)';
                s.display = 'block';
                if (isNew) {
                    s.position = 'absolute';
                    s.zIndex = -999;
                    if (elm.firstChild) {
                        elm.insertBefore(d, elm.firstChild);
                    } else {
                        elm.appendChild(d);
                    }
                }
                this.fix(d, pngSrc, 0);
                count++;
            }
        }
    }
    while (count < tiles.cache.length) {
        this.fix(tiles.cache[count], '', 0);
        tiles.cache[count++].style.display = 'none';
    }

    this.hook.enabled = 1;

    // Cache so updates are infrequent.
    tiles.old = {
        w: elmW,
        h: elmH,
        x: bgX,
        y: bgY,
        r: bgR
    };
};


IEPNGFix.update = function() {
    // Update all PNG backgrounds.
    for (var i in IEPNGFix.data) {
        var t = IEPNGFix.data[i].tiles;
        if (t && t.elm && t.src) {
            IEPNGFix.tileBG(t.elm, t.src);
        }
    }
};
IEPNGFix.update.timer = 0;

//window.attachEvent('onresize', function() {
//	clearTimeout(IEPNGFix.update.timer);
//	IEPNGFix.update.timer = setTimeout(IEPNGFix.update, 100);
//});


var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
        || this.searchVersion(navigator.appVersion)
        || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
        for (var i=0;i<data.length;i++)	{
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },
    dataBrowser: [
    {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
    },
    {
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
    },
    {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari"
    },
    {
        prop: window.opera,
        identity: "Opera"
    },
    {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
    },
    {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
    },
    {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    },
    {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
    },
    {		// for newer Netscapes (6+)
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
    },
    {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
    },
    {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
    },
    { 		// for older Netscapes (4-)
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
    }
    ],
    dataOS : [
    {
        string: navigator.platform,
        subString: "Win",
        identity: "Windows"
    },
    {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac"
    },
    {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
    }
    ]

};
BrowserDetect.init();


function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

function toggleRememberMe(box) {
    if ( box.checked ) {
        createCookie("uname",document.getElementById("email").value,14);
        createCookie("upass",document.getElementById("password").value,14);
    }
    else {
        eraseCookie("uname");
        eraseCookie("upass");
    }
}




function fillForm() {
    if ( readCookie("uname") != null ) {
        document.getElementById("email").value = readCookie("uname");

        if ( readCookie("upass") != null ) {
            document.getElementById("password").value = readCookie("upass");
        }

        document.getElementById("rememberBox").checked = true;
    }
}



/*	Old touch code - doesn't work with Windows touch devices
	
function isTouch(){
	var ua=navigator.userAgent.toLowerCase();
	var iphone=ua.match(/iphone/i);
	var ipod=ua.match(/ipod/i);
	var ipad=ua.match(/ipad/i);
	var android=ua.match(/android/i);
	var touch=iphone || ipad || ipod || android;
	return touch;
}
*/ 


function isTouch(){		
    var t = !!('ontouchstart' in window) || !!('msmaxtouchpoints' in window.navigator);
    console.log("Touch device: "+t);
    return t				
}

function setupUserMenu(){	
    if (isTouch()){
        $( "#usermenu li.user" ).click(function() {
            $('#usermenu').toggleClass( "open" );
        });
    }
    else {
        $( "#usermenu" ).hover(function() {
            $('#usermenu').toggleClass( "open" );
        });
    }
    $("#toggleMenu").click(function() {
        $('body').toggleClass("showmenu");
    });
}


$(window).load(function() {
    setupUserMenu();
});
	

	
	
function registerSiteCatalystPostLogin(){
	
    try{
        s.pageName	= "Book Shelf";
        s.channel	= "Book shelf loading";
		
        s.prop8 = jQuery('#schoolID').val();
		
        s.visitorID = jQuery('#userID').val();
        s.prop10 = jQuery('#userID').val();
        s.eVar13="D=c10";
		
		
        var newEvent='event23';		
        var existingEvents = s.events;
				
        if(existingEvents.indexOf(newEvent) === -1) { 
            existingEvents+=','+newEvent;
            s.events = existingEvents;
        }
		
        console.log("from registerSiteCatalystPostLogin : visitorID=" + s.visitorID);
        s.trackExternalLinks=false;
        s.linkTrackEvents=s.events;
		
        s.linkTrackVars='prop8,prop10,eVar13,visitorID,events';
		
        s.tl(true, 'o','Book shelf login');
        var t=setTimeout(function(){
            return false;
        },1000);
		
    }catch(e){
    //console.log(e);
    }
	
}


function bookclick(obj) {
		
    try{
        s.pageName= "My Bookshelf";
        s.prop6= "Bookshelf";
        s.prop7= forDate();
        var jISBN = "";
        jISBN = jQuery(obj).attr("data-id");
        s.prop2 = jISBN.substring(3);
        var productFamily = jQuery("a",obj).attr("data-family");
        s.prop13 = productFamily;
        var bundleUser = jQuery("a",obj).attr("bundle-data");
        s.prop41=bundleUser;
        
                
        var linkTitle = jQuery("a",obj).attr("title");
        s.prop3 = linkTitle;

        try {		
            s.prop25 = jQuery("a",obj).attr("data-kla");
            // need tio send user year level not title year level
            //s.prop24 = ((jQuery("a",obj).attr("data-yearlevel")=="")?"-1":jQuery("a",obj).attr("data-yearlevel"));
            s.prop24 = jQuery('#userYearLevel').val();
        } catch(e){
            log(e, 21);
        }
		
        var timeslice = 25;			
        var now = new Date();
        var curr_hour = now.getHours();
        var curr_min = now.getMinutes();
        var curr_day =now.getDay();
        // jacplus-1157
        if ( (0 < curr_day && curr_day < 6) && (8 < curr_hour && curr_hour < 15) || ( 8 === curr_hour && 30 <= curr_min ) || ( 15 === curr_hour && 30 <= curr_min ) ) {
            timeslice = 1;
        } else {
            timeslice = 2;
        }

        s.prop26 = timeslice;
		
        s.prop27 = s.eVar14; //role of person

        if(jQuery(obj).hasClass('teacherbook')){ // prop12 is set only for teacher edition.
            s.prop12=jISBN.substring(3);
        }
        var eFlag=jQuery("a",obj).attr("data-eguideFlag");
        if(eFlag == "true")
        {
            s.prop18="E_GUIDE";
        }else if(eFlag == "false" && eFlag!=undefined)
        {
            s.prop18="E_BOOK";
        }
		
        var schoolID = $("#schoolID").val();
        s.prop8 = schoolID;
        var userID = $("#userID").val();
        s.prop10 = userID;
        var principalId=$("#principalID").val();
        s.prop23 = principalId;
        s.prop9 = s.getVisitNum();
        var fullFilMentYear=$("#fullFilMentYear").val();
        s.prop32 = fullFilMentYear;
        var newEvent='event23';
        s.eVar9="D=c6";
        s.eVar11="D=c2";
        s.eVar12="D=c8";
        s.eVar13="D=c10";
        s.eVar15="D=c3";
        s.eVar25="D=c13";
		
        var existingEvents = s.events;
        window.console = window.console || (function(){
            var c = {};
            c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function(){};
            return c;
        })();
		
        if(existingEvents.indexOf(newEvent) === -1) { 
            existingEvents+=','+newEvent;
            s.events = existingEvents;
        }
		
        s.trackExternalLinks=false;
        
        if(jQuery(obj).hasClass('teacherbook')){
            if(eFlag!=undefined){
                s.linkTrackVars='prop2,prop3,prop6,prop7,prop8,prop9,prop10,prop12,prop13,prop18,prop23,prop24,prop25,prop26,prop27,prop32,prop41,eVar9,eVar11,eVar12,eVar13,eVar15,eVar25,events';
            }else{
                s.linkTrackVars='prop2,prop3,prop6,prop7,prop8,prop9,prop10,prop12,prop13,prop23,prop24,prop25,prop26,prop27,prop32,prop41,eVar9,eVar11,eVar12,eVar13,eVar15,eVar25,events';  
            }
            
        }else{
            if(eFlag!=undefined){
                s.linkTrackVars='prop2,prop3,prop6,prop7,prop8,prop9,prop10,prop13,prop18,prop23,prop24,prop25,prop26,prop27,prop32,prop41,eVar9,eVar11,eVar12,eVar13,eVar15,eVar25,events';
            }else{
                s.linkTrackVars='prop2,prop3,prop6,prop7,prop8,prop9,prop10,prop13,prop23,prop24,prop25,prop26,prop27,prop32,prop41,eVar9,eVar11,eVar12,eVar13,eVar15,eVar25,events';  
            }
        }
        
        s.linkTrackEvents=s.events;
		
        s.tl(true, 'o','BookShelf ISBN-HITS');
		
        var t=setTimeout(function(){
            return false;
        },1000);
		
    }catch(e){
        log(e, 21);
    }

}

	
	
	
