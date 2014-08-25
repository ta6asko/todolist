// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require jquery.sortable
//= require jquery-ui

$(document).ready(function() {
  $('.main').on('click','.Add_list', function() {
      $('.new_project').show();
      return false;
  });

  //$('.main').on('click','.edit_task_img', function() {
  //    return false;
  //});

  $('.main').on('click','.edit_task_img', function() {
      $(this).parents(".task").find(".edit_task").show();
      $(this).parents(".task").find(".task_name").hide();
      $(this).parents(".task").find(".task_date").hide();
      return false;
  });
  //$('.main').on('click','.edit_task_img', function() {
  //    return false;
  //});

  $('.main').on('click','.edit_project_img', function() {  
      $(this).parents(".project").find(".edit_project").show();
      $(this).parents(".project").find(".project_name").hide();
      return false; 
  });

  //$('.main').on('click','.edit_project_img', function() { 
  //    return false;
  //});

  $('.main').on('change','.checkbox', function() {
    var path = $(this).parents(".task").find(".delete_task").attr("href");
    var stat = $(this).parents(".task").find(".checkbox").is(":checked");
    $.ajax({
      type: "put",
      url: path,
      data: { "task[status]":stat },
    });
      return false;
   });

    $('.tasks').sortable({
      axis: 'y',
      dropOnEmpty: false,
      cursor: 'crosshair',
      items: 'li',
      opacity: 0.9,
      scroll: true,
      update: function(){
        var path = $(this).parents(".project").find(".tasks").attr("url");
        $.ajax({
          type: 'post',
          data: $(this).parents(".project").find(".tasks").sortable('serialize'),
          dataType: 'script',
          complete: function(request){
             $(this).parents(".project").find(".tasks").effect('highlight');
          },
             url: path})
          }
      });
    // $('.main').on('click','.sorting_task', function() {
    //   var task = $(this).parents(".task");
    //   task.insertBefore(task.prev());
    //   return false;
    // });
    
    $('.main').on('click','.sorting_task', function() {
      var path = $(this).parents(".task").find(".sorting_task").attr("path");
      var task = $(this).parents(".task");
      $.ajax({
        type: "post",
        url: path,
        complete: function(){
          task.insertAfter(task.next()); 
        }
        });
    });
});

