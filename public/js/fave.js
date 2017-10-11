$(document).ready(function() {
  // Our new todos will go inside the todoContainer
  var $todoContainer = $(".myFavorites");
  // Adding event listeners for deleting, editing, and adding todos
  $(document).on("click", ".glyphicon-thumbs-up", getFaves);


  // Our initial todos array
  var faves = [];


  // This function resets the todos displayed with new todos from the database
  function initializeRows() {
    // $todoContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < faves.length; i++) {
      rowsToAdd.push(createNewRow(faves[i]));
    }
    $todoContainer.html(rowsToAdd);
  }

  // This function grabs todos from the database and updates the view
  function getFaves() {
    $.get("/api/faves", function(data) {
      faves = data;
      console.log(faves);
      initializeRows();
    });
  }

  // This function constructs a todo-item row
  function createNewRow(fave) {
    var $newInputRow = $(
      [
        "<li class='list-group-item todo-item'>",
        "<span>",
        fave.name,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-default'>x</button>",
        "<button class='complete btn btn-default'>✓</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", fave.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("todo", fave);
    if (fave.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  // // This function deletes a todo when the user clicks the delete button
  // function deleteTodo(event) {
  //   event.stopPropagation();
  //   var id = $(this).data("id");
  //   $.ajax({
  //     method: "DELETE",
  //     url: "/api/todos/" + id
  //   }).done(getTodos);
  // }

});
