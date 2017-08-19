//Document Ready

//Create Sortable for workouts
var editableList = Sortable.create(wo_list, {
    sort: 'true',
    scroll: 'true',
    filter: '.js-remove',
    onFilter: function (evt) {
        var el = editableList.closest(evt.item); // get dragged item
        var form = el.parentNode;
        $(el).find('.wo_DELETE')[0].checked = true;
        $("#deleted").append(el);
        },
   onUpdate: function(evt){                                        
       var list = $('#wo_list');                                   
       list.children().each(function(){                                       
           $(this).find('.wo_day').attr("value", $(this).index()); 
       
       });                                                         
   }                                                               
});
//Function for setting the day

//Function for creating a new form
function add_form(appendTo, id, template){
    var table_meta = id + '-TOTAL_FORMS';
    var form_idx = $(table_meta).val();
    var index = form_idx;
    var new_index = appendTo.children().length + 1;
    var wo_temp = `<!--new_wo_form--!>
        <li class="to_sort"><div><table>
            <input type="hidden" name="workout_set-${index}-id" id="id" />
            <input type="hidden" name="workout_set-${index}-routine" value="${routine_id}" id="routine" />
            <th><input type="number" value="${new_index}" name="workout_set-${index}-day" min="0" id="day" /></th>
            <th colspan = "4"><input type="text" name="workout_set-${index}-name" maxlength="100" id="name" /></th>
            <th class="js-remove">X</p>
            <th style="display:none"> <input type="checkbox" name="workout_set-${index}-DELETE" id="DELETE" class="wo_DELETE"/></th>
      </li></table></div>
    `
    appendTo.append(wo_temp);
    $(table_meta).val(parseInt(form_idx) + 1);
}
//Add form event
var wo_location = $('#wo_list');
var wo_id = '#id_workout_set';
var wo_template = `` 
$('#add_form').click(function(){add_form(wo_location,wo_id, wo_template)});
