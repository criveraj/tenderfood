$(document).ready(function() {
  // Our new todos will go inside the todoContainer
  var $todoContainer = $(".myFavorites");
  // Adding event listeners for deleting, editing, and adding todos
  $(document).on("click", ".glyphicon-heart", getFaves);


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
        "<ul class='list-group-item todo-item'><center>",
        "<span><center>",
        fave.name,
        " - ",
        fave.price,
        "<p>",
        fave.address,
        "<p><img src='",
        fave.img,
        "' width='200' href='",
        fave.url,
        "'>",
        "</span>",

        // "<button class='delete btn btn-default'>x</button>",
        "</ul>"
      ].join("")
    );

    // $newInputRow.find("button.delete").data("id", fave.id);

    $newInputRow.data("fave", fave);

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
