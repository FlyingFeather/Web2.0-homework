
$(function() {
	$('th').append('<span class="icon"></span>');
	$('th').click(_click);
})
// 表格排序 
function UpDownsort(haveAscend, oj) {
	var nearTable = oj.closest('table');
	var findAllTr = nearTable.find('tbody').find('tr');
	var classArray = new Array();   // 数组，操作表格内元素
	findAllTr.each(function() {
		classArray.push($(this).attr('class'))
	});
	nearTable.find('tr').removeClass(function() {
		return $(this).attr('class');
	});
	compare(haveAscend, oj);
	var i = 0;
	nearTable.find('tbody').find('tr').each(function() {
		$(this).attr('class', classArray[i++]);
	})
}

// 比较元素值大小
function compare(haveAscend, that) {
	var cmp = that.index()*2+1;
	var nearTable = that.closest('table');
	var findAllTr = nearTable.find('tbody').find('tr');
	var findAllTr_arr = $.makeArray(nearTable.find('tbody').find('tr'));
	if (haveAscend) findAllTr_arr.sort(function(a, b) {
		if (a.childNodes[cmp].textContent.toString() < b.childNodes[cmp].textContent.toString()) return 1;
	});
	else findAllTr_arr.sort(function(a, b) {
		if (a.childNodes[cmp].textContent.toString() > b.childNodes[cmp].textContent.toString()) return 1;
	});
	nearTable.find('tbody').find('tr').remove();
	nearTable.find('tbody').append(findAllTr_arr);
}

// 运用类控制图标
function _click() {
	var haveAscend = $(this).find('.icon').hasClass('ascend');
	$('table').find('.selected').removeClass('selected');
	$('th').find('.icon').removeClass('ascend descend');
	$(this).addClass('selected');
	if (haveAscend) $(this).find('.icon').removeClass('ascend').addClass('descend');
	else $(this).find('.icon').addClass('ascend').removeClass('descend');
	UpDownsort(haveAscend,$(this)); // 排序
}