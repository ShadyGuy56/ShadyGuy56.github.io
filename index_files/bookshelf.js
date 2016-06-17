
(function($) {
	$.fn.sorted = function(customOptions) {
		var options = {
				reversed: false,
				by: function(a) {
					return a.text();
				}
		};
		$.extend(options, customOptions);

		$data = $(this);
		arr = $data.get();
		arr.sort(function(a, b) {

			var valA = options.by($(a));
			var valB = options.by($(b));
			if (options.reversed) {
				return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;				
			} else {		
				return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;	
			}
		});
		return $(arr);
	};

})(jQuery);

$(function() {

	var read_button = function(class_names) {
		var r = {
				selected: false,
				type: 0
		};
		for (var i=0; i < class_names.length; i++) {
			if (class_names[i].indexOf('selected-') == 0) {
				r.selected = true;
			}
			if (class_names[i].indexOf('segment-') == 0) {
				r.segment = class_names[i].split('-')[1];
			}
		};
		return r;
	};

	var determine_sort = function($buttons) {
		var $selected = $buttons.parent().filter('[class*="selected-"]');
		return $selected.find('a').attr('data-value');
	};

	var determine_kind = function($buttons) {
		var $selected = $buttons.parent().filter('[class*="selected-"]');
		return $selected.find('a').attr('data-value');
	};

	var $preferences = {
			duration: 800,
			easing: 'easeInOutQuad',
			adjustHeight: 'dynamic'
	};

	var $list = $('#bookShelf');
	var $data = $list.clone();

	var $controls = $('ul#filter ul');

	$controls.each(function(i) {

		var $control = $(this);
		var $buttons = $control.find('a');

		$buttons.bind('click', function(e) {

			var $button = $(this);
			var $button_container = $button.parent();
			var button_properties = read_button($button_container.attr('class').split(' '));      
			var selected = button_properties.selected;
			var button_segment = button_properties.segment;

			if (!selected) {

				$buttons.parent().removeClass('selected-0').removeClass('selected-1').removeClass('selected-2');
				$button_container.addClass('selected-' + button_segment);

				var sorting_type = determine_sort($controls.eq(1).find('a'));
				var sorting_kind = determine_kind($controls.eq(0).find('a'));

				if (sorting_kind == 'all') {
					var $filtered_data = $data.find('li');
				} else {
					var $filtered_data = $data.find('li.' + sorting_kind);
				}
				
				var $filtered_data_copy = $filtered_data
				if (sorting_type == 'size') {
					var $sorted_data = $filtered_data;
				} else {
					document.getElementById('sTypeLearningArea').className = '';
					var $sorted_data = $filtered_data_copy.sorted({
						by: function(v) {
							return $(v).find('strong').text().toLowerCase();
						}
					});
				}

				toggleCatHeads();

				$list.quicksand($sorted_data, $preferences, function() {updateShowHidden();});

			}

			e.preventDefault();
		});

	}); 



	var high_performance = false;
	$preferences.useScaling = false;


	var $listTab = $('#listView');
	var $coverTab = $('#coverView');

	$listTab.live('click', function(e) {
		$preferences.useScaling = false;
		high_performance = false;

	});

	$coverTab.live('click', function(e) {
		$preferences.useScaling = true;
		high_performance = true;
	});



});

$(document).ready(function() { 


	var $preferences = {
			duration: 800,
			easing: 'easeInOutQuad',
			adjustHeight: 'dynamic'
	};

	var $list = $("#bookShelfDiv");
	var learningData = $("#bookShelf");
	var yearData = $("#yearbookShelf");
	var bookType = $('ul#filter-new #filterMenu select#studentTeacherFilter');
	var sortingType =  $('ul#filter-new #filterMenu select#orderBy');

	var $selectFilters = $('ul#filter-new #filterMenu select');
	$selectFilters.change(function(e){
	
		if(bookType.val() == null){
			var bookTypeVal = 'all';
		}else{
			var bookTypeVal = bookType.val();
		}
		var year = $('ul#filter-new #filterMenu select#titleByYear');
		var learningArea =$('ul#filter-new #filterMenu select#titleByLearningArea');
		var yearVal = year.val();
		var learningAreaVal = learningArea.val();	
		var sortingVal = sortingType.val();
		determineVisibility(yearVal, learningAreaVal, sortingVal, bookTypeVal,$preferences, $list,learningData, yearData);
		
	});

	determinePerformance($preferences);

});

function determinePerformance($preferences){
	var high_performance = false;
	$preferences.useScaling = false;


	var $listTab = $('#listView');
	var $coverTab = $('#coverView');

	$listTab.live('click', function(e) {
		$preferences.useScaling = false;
		high_performance = false;

	});

	$coverTab.live('click', function(e) {
		$preferences.useScaling = true;
		high_performance = true;
	});
}


function determineVisibility(yearVal, learningAreaVal, sortingVal, bookTypeVal, $preferences, $list, learningData, yearData){
	if(bookTypeVal == 'all'){

		if (yearVal == 'All Years' && learningAreaVal == 'All Learning Areas' ) {
			var learningDataCopy = learningData;
			var sorted_others_datas = sortLearningData(learningData, yearVal,bookTypeVal,sortingVal);
			var otherDatas = learningDataCopy.find('li[id*="'+"Others"+'"]');
			var filtered_datas = $.merge(sorted_others_datas, otherDatas);
		}else if(yearVal != 'All Years' && learningAreaVal == 'All Learning Areas'){
			showOrHideCatHeadByChildren(yearData,yearVal );
			var yearDataCopy = yearData;
			var year_datas_not_Others = sortLearningData(yearData, yearVal, bookTypeVal, sortingVal);
			var otherYearDatas = yearDataCopy.find('li[id*="'+yearVal+"-"+"Others"+'"]');
			var filtered_datas = $.merge(year_datas_not_Others, otherYearDatas);
		}else if(yearVal == 'All Years' && learningAreaVal != 'All Learning Areas'){
			var filtered_datas = learningData.children('li[id*="'+learningAreaVal+'"]');
		}else if(yearVal != 'All Years' && learningAreaVal != 'All Learning Areas'){
			var filtered_datas  = yearData.children('li[id*="'+yearVal+"-"+learningAreaVal+'"]');
		}

	}else{
		if(yearVal == 'All Years' && learningAreaVal == 'All Learning Areas'){
			toggleCatHeadClass(learningData,yearVal,learningAreaVal, bookTypeVal);
			var learningDataCopy = learningData;
			var not_others_datas =  sortLearningData(learningData, yearVal,bookTypeVal, sortingVal);
			var otherDatas = learningDataCopy.find('li[id*="'+"Others"+'"][class*="'+bookTypeVal+'"]');
			var filtered_datas = $.merge(not_others_datas, otherDatas);
		}else if(yearVal != 'All Years' && learningAreaVal == 'All Learning Areas'){
			toggleCatHeadClass(yearData,yearVal,learningAreaVal, bookTypeVal);
			var yearDataCopy = yearData;
			var year_datas_not_Others = sortLearningData(yearData, yearVal, bookTypeVal, sortingVal);
			var otherYearDatas = yearDataCopy.find('li[id*="'+yearVal+"-"+"Others"+'"][class*="'+bookTypeVal+'"]');
			var filtered_datas = $.merge(year_datas_not_Others, otherYearDatas);
		}else if(yearVal == 'All Years' && learningAreaVal != 'All Learning Areas'){
			toggleCatHeadClass(learningData, yearVal,learningAreaVal, bookTypeVal);
			var filtered_datas = learningData.children('li[id*="'+learningAreaVal+'"][class*="'+bookTypeVal+'"]');
		}else if(yearVal != 'All Years' && learningAreaVal != 'All Learning Areas'){
			toggleCatHeadClass(yearData,yearVal,learningAreaVal,  bookTypeVal);
			var filtered_datas = yearData.children('li[id*="'+yearVal+"-"+learningAreaVal+'"][class*="'+bookTypeVal+'"]');
		}
	}



	if (sortingVal == 'Learning Area') {
		document.getElementById('sTypeLearningArea').className = 'segment-2 selected-2';
		var $sorted_data = filtered_datas;
	} else {
		document.getElementById('sTypeLearningArea').className = '';
		var $sorted_data = filtered_datas.sorted({
			by: function(v) {
				return $(v).find('strong').text().toLowerCase();
			}
		});
	}
	toogleBookshelfVisibility();
	toggleCatHeadsByLearningArea();

	$list.quicksand($sorted_data, $preferences, function() {updateShowHidden();});
	/*document.cookie="SyearFilter=" + yearVal
	document.cookie="SlearningArea=" + learningAreaVal
	document.cookie="SbookType=" + bookTypeVal*/
	createCookie('SyearFilter',yearVal ,30);
	createCookie('SlearningArea',learningAreaVal ,30);
	createCookie('SbookType',bookTypeVal ,30);
	createCookie('sortingType',sortingVal ,30);
	
	
	if ($( "body" ).scrollTop() > 0){
		
		$('html, body').animate({
		    scrollTop: "0px"
		}, 800);	
		
	}
	
	
};



function sortLearningData(not_others_datas, yearVal,bookTypeVal, sortingVal){
	var finalDataList= [];
	if(sortingVal == 'Learning Area'){
		$('ul#filter-new #filterMenu select#titleByLearningArea option').each(function(){
		var learnArea =  $(this).val();
		if(learnArea != 'All Learning Areas' && learnArea != 'Others' ){
			var data = not_others_datas.clone();
			var copyOfData = data;
			if(bookTypeVal == 'all'){
				if(yearVal == 'All Years'){
					var learningAreaHeader = data.find('li[id*="'+learnArea+'"][class*="'+'catHead'+'"]');
					var titleByLearningArea = copyOfData.find('li[id*="'+learnArea+'"]').not('.catHead');
				}else{
					var learningAreaHeader = data.find('li[id*="'+yearVal+"-"+learnArea+'"][class*="'+'catHead'+'"]');
					var titleByLearningArea = copyOfData.find('li[id*="'+yearVal+"-"+learnArea+'"]').not('.catHead');
				}
	
			}else{
				if(yearVal == 'All Years'){
					var learningAreaHeader = data.find('li[id*="'+learnArea+'"][class*="'+'catHead'+'"]');
					var titleByLearningArea = copyOfData.find('li[id*="'+learnArea+'"][class*="'+bookTypeVal+'"]').not('.catHead');
					
				}else{
					var learningAreaHeader = data.find('li[id*="'+yearVal+"-"+learnArea+'"][class*="'+'catHead'+'"]');
					var titleByLearningArea = copyOfData.find('li[id*="'+yearVal+"-"+learnArea+'"][class*="'+bookTypeVal+'"]').not('.catHead');
				}
				
			}
			
			if(titleByLearningArea.size() == 0){
				learningAreaHeader.hide();
			}
			
			if (sortingVal == 'Learning Area') {
				var sorted_data_Title = titleByLearningArea.sorted({
						by: function(v) {
							return $(v).find('strong').text().toLowerCase();
						}
				});
			}
			var mergedData = $.merge(learningAreaHeader, sorted_data_Title);
			finalDataList =  $.merge(finalDataList, mergedData);
				
		}
		
	
		});
	}else{
		if(bookTypeVal == 'all'){
				if(yearVal == 'All Years'){
					var titleByLearningArea = not_others_datas.find('li:not(li[id*="'+"Others"+'"])');
				}else{
					var titleByLearningArea = not_others_datas.find('li[id*="'+yearVal+"-"+'"]').not('li[id*="'+yearVal+"-Others"+'"]');
				}
	
			}else{
				if(yearVal == 'All Years'){
					var titleByLearningArea = not_others_datas.find('li[class*="'+bookTypeVal+'"]:not(li[id*="'+"Others"+'"])');
					
				}else{
					var titleByLearningArea = not_others_datas.find('li[id*="'+yearVal+'"][class*="'+bookTypeVal+'"]').not('li[id*="'+yearVal+"-Others"+'"][class*="'+bookTypeVal+'"]');
				}
				
			}
			finalDataList = titleByLearningArea;
	}
	return finalDataList;
};


function toggleCatHeadsByLearningArea() {
	if (document.getElementById('sTypeLearningArea').className == 'segment-2 selected-2'){
		document.getElementById('col1').className = '';
	}
	else {
		document.getElementById('col1').className = 'nameSort';
	}

};

function toogleBookshelfVisibility(){
	var learningArea =$('ul#filter-new #filterMenu select#titleByLearningArea');
	var year = $('ul#filter-new #filterMenu select#titleByYear');
	if(year.val() != "All Years" &&learningArea.val() == "All Learning Areas"){
		if( document.getElementById('yearbookShelf') != null){
			document.getElementById('yearbookShelf').style.display="block";
		}
		if( document.getElementById('bookShelf') != null){
			document.getElementById('bookShelf').style.display='none';
		}

	}else{
		if( document.getElementById('yearbookShelf') != null){
			document.getElementById('yearbookShelf').style.display="none";
		}
		if( document.getElementById('bookShelf') != null){
			document.getElementById('bookShelf').style.display='block';
		}
	}

};

function toggleCatHeadClass(yearData,yearVal,learningAreaVal,  studentTeacherFilerValue){
	if(yearVal == 'All Years' && learningAreaVal == 'All Learning Areas' ){
		var catheadDatas = yearData.find('li.catHead');
	}else if(yearVal != 'All Years' && learningAreaVal == 'All Learning Areas'){
		var catheadDatas = yearData.find('li[id*="'+yearVal+'"][class*="'+'catHead'+'"]');
	}else if((yearVal == 'All Years' && learningAreaVal != 'All Learning Areas')){
		var catheadDatas = yearData.find('li[id*="'+learningAreaVal+'"][class*="'+'catHead'+'"]');
	}else if(yearVal != 'All Years' && learningAreaVal != 'All Learning Areas'){
		var catheadDatas = yearData.children('li[id*="'+yearVal+'-'+learningAreaVal+'"][class*="'+'catHead'+'"]');
	}

	catheadDatas.each(function(e, value){
		var cathead = $(this);
		var catHeadText = $.trim(cathead.text());

		if(yearVal != 'All Years'){
			var filterData = yearData.children('li[id*="'+yearVal+'-'+catHeadText+'"][class*="'+studentTeacherFilerValue+'"]');
		}else{
			var filterData = yearData.find('li[id*="'+catHeadText+'"][class*="'+studentTeacherFilerValue+'"]');
		}

		if(filterData.size() != 0){
			cathead.addClass(studentTeacherFilerValue);
		}
	});
};


function showOrHideCatHeadByChildren(yearData, yearVal){
	var catheadDatas = yearData.find('li[id*="'+yearVal+'"][class ="'+'catHead'+'"]');
	catheadDatas.each(function(e){
		var cathead = $(this);
		var catHeadText = $.trim(cathead.text());
		var filterData = yearData.children('li[id*="'+yearVal+'-'+catHeadText+'"][class!="'+'catHead'+'"]');
		if(filterData.size() == 0){
			cathead.hide();
		}
	});

}

$(function(){

	$(document).ready(function() {
		
		$("#addTitleDialog").click(function () {
			togglePopup();
			$("#regcode").focus();
		});
		$("#overlay").click(function () {
			togglePopup();
		     $('div.errorWarning').text('');
		});
	});


});



$(function(){
	$(document).ready(function() {
	
		if($(".errorWarning").text() != ""  && $(".errorWarning").text() != null){
                        //Change For Jacplus-394
			//togglePopup();
			//$("#regcode").focus();
                        togglePopupError();
		}	
	

		var $preferences = {
				duration: 0,
				easing: 'easeInOutQuad',
				adjustHeight: 'auto'
		};

		var $list = $("#bookShelfDiv");
		var learningData = $("#bookShelf");
		var yearData = $("#yearbookShelf");
		
		var currentUser = $("#userID").val();
			//currentUser = currentUser.split("(");
			//currentUser = currentUser[1].split(")");
		var lastUser = readCookie('lastUser');
		
		if (currentUser != lastUser) {clearsorting();}
		createCookie('lastUser',currentUser,2);
		
		/*var bookTypeVal = get_sess_cookie("SbookType");
		var yearVal = get_sess_cookie("SyearFilter");
		var learningAreaVal = get_sess_cookie("SlearningArea");*/
		
		var yearVal = readCookie('SyearFilter');
		var learningAreaVal = readCookie('SlearningArea');
		var bookTypeVal = readCookie('SbookType');
		
		if (!bookTypeVal) {bookTypeVal = 'all';}
		if (!yearVal) {yearVal = 'All Years';}
		if (!learningAreaVal) {learningAreaVal = 'All Learning Areas';}
		
		var sortingVal = readCookie("sortingType");
		
		
		
		if(yearVal!= null && learningAreaVal != null && sortingVal!= null && bookTypeVal != null){
			var bookType = $('ul#filter-new #filterMenu select#studentTeacherFilter').val(bookTypeVal);
			var sortingType =  $('ul#filter-new #filterMenu select#orderBy').val(sortingVal);
			var year = $('ul#filter-new #filterMenu select#titleByYear').val(yearVal);
			var learningArea =$('ul#filter-new #filterMenu select#titleByLearningArea').val(learningAreaVal);
			determineVisibility(yearVal, learningAreaVal, sortingVal, bookTypeVal, $preferences, $list,learningData, yearData);
		}else {
			var bookType = $('ul#filter-new #filterMenu select#studentTeacherFilter');
			var sortingType =  $('ul#filter-new #filterMenu select#orderBy');
			var year = $('ul#filter-new #filterMenu select#titleByYear');
			var learningArea =$('ul#filter-new #filterMenu select#titleByLearningArea');
			
			if(bookType.val() == null){
				var bookTypeVal = 'studentbook';
			}else{
				var bookTypeVal = bookType.val();
			}
			determineVisibility(year.val(), learningArea.val(), sortingType.val(), bookTypeVal, $preferences, $list,learningData, yearData);
		}
		determinePerformance($preferences);
		
		$("#products").removeClass('loading');
	});
});




function togglePopup(){
	$("#addtitlepopup").toggle();
    $("#hideContent").show();
    $('#banner2').toggle();
}
function togglePopupError(){
    $("#addtitlepopup").toggle();
    $("#hideContent").hide();
}
function clearsorting(){
			/*document.cookie="SyearFilter=All Years"
			document.cookie="SlearningArea=All Learning Areas";
			document.cookie="SbookType=all";*/
			createCookie('SyearFilter','All Years' ,30);
			createCookie('SlearningArea','All Learning Areas' ,30);
			createCookie('SbookType','all' ,30);
			createCookie('sortingType','Learning Area' ,30);
			eraseCookie('viewMode');
					
}

/* KQA-246 Issue Resolution - Sourav */

function bookshelfRedirect(param)
{
    //document.keyFrm.redirectParam.value = param;
    document.keyFrm.action = param;  
    
    // putting wait functionality for all href with html tag a
    // jacplus-344 start
//    $.blockUI({ css: { 
//            border: 'none', 
//            padding: '15px', 
//            backgroundColor: '#000', 
//            '-webkit-border-radius': '10px', 
//            '-moz-border-radius': '10px', 
//            opacity: .5, 
//            color: '#fff' 
//        } }); 
// 
//      setTimeout($.unblockUI, 30000); 
    $.msg({ 
            fadeIn : 500,
            fadeOut : 200,
            timeOut : 30000 
          })
    // jacplus-344 end
    document.keyFrm.submit();
}



// Keep filter on screen when scrolling

var filterPos  = $('#filter-new').offset().top - 50;

$(window).scroll(function() {
   var scrollTop  = $(window).scrollTop();
    
   if (scrollTop >= filterPos){
    	$('#filter-new').addClass('lock');
   } 
   else {$('#filter-new').removeClass('lock');}
        
});

