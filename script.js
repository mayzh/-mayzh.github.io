
var board = [
  [0,0,0],
  [0,0,0],
  [0,0,0]
];
var playerTurn = 0;
var turnCount = 0;
var gameEnd = false;

var gameOptions = {
  ready: false,
  players: 2
};

function setPlayers(numPlayers){
  $("table").attr("class", "showtable");
  $("#resetbtn").attr("class", "showresetbtn");
  $("td").addClass("showtd");
  $("#playerbtn").hide();
  $("#computerbtn").hide();
  $("#heading").hide();
  $("#snoop").hide();
  $("#btndivider").hide();
  gameOptions.players = numPlayers;
  gameOptions.ready = true;
}

$(document).ready(function() {
  console.log("script & jquery loaded.");


  $("td").on('click', function(e){

    var tileAddr = (e.target.id).split('');

    if(!checkValidMove(tileAddr)){
      $("td").hide();
      $("#errortxt").show()
      setTimeout(function() {
        $("td").show();
        $("#errortxt").hide();
      }, 650);
      return;
    }

     turnCount += 1;

    if(gameOptions.players === 2){
      twoPlayerPlay(tileAddr);
      checkBoard();
    }else{
      onePlayerPlay(tileAddr);
      checkBoard();
      if(!gameEnd){
        onePlayerPlay(tileAddr);
        checkBoard();
      }
    }
  });

  function checkValidMove(address){
    var thisTile = $("#"+address[0]+address[1]);
    if (thisTile.hasClass("x") || thisTile.hasClass("o")) {
      return false;
    }
    return true;
  }

  function togglePlayer(){
    playerTurn = playerTurn > 0 ? 0 : 1;
  }

  var transposeArr = function(arr){
    var newArr = [];
    for(row in arr){
        var newRow = [];
      for(col in arr[row]){
        newRow.push(arr[col][row]);
      }
      newArr.push(newRow);
    }
    return newArr;
  }

  var twoPlayerPlay = function(address) {
      var thisTile = $("#"+address[0]+address[1]);

      if (playerTurn === 0) {
        thisTile.addClass("o");
        board[address[0]][address[1]] = 1;
        }
      else {
        thisTile.addClass("x");
        board[address[0]][address[1]] = 2;
      }
    }


  var onePlayerPlay = function(address) {
    var thisTile = $("#"+address[0]+address[1]);

    if (playerTurn === 0) {
      thisTile.addClass("o");
      board[address[0]][address[1]] = 1;
    }
    else {
      setTimeout(function() {
        var computerMove = false;
        randTileAddrArr = [];

        if (board[1][1] === 0) {
          randTileAddrArr = [1, 1];
          computerMove = true;
        }




        while(!computerMove){
          var randTileAddr = Math.round((Math.random()*2)) + " " + Math.round((Math.random()*2));
          randTileAddrArr = randTileAddr.split(" ");
          computerMove = checkValidMove(randTileAddrArr);
        }
        randTile = $("#" + randTileAddrArr[0] + randTileAddrArr[1]);
        randTile.addClass("x");
        board[randTileAddrArr[0]][randTileAddrArr[1]] = 2;
      }, 800);
    }
  }


  var checkBoard = function(){
    var tBoard = transposeArr(board);
    for(row in board){
      checkWinner(board[row]);
      checkWinner(tBoard[row]);
    }
    if(!gameEnd){
      togglePlayer();
    }
  };

  var checkWinner = function(arr){
    if(!gameEnd){

      var win = true;
        if ((board[0][0] === board[1][1] && board[0][0] === board[2][2] ||
            board[0][2] === board[1][1] && board[0][2] === board[2][0]) &&
            board[1][1] !== 0) {
        }
        else {
            for (i = 0; i < arr.length; i++) {
              if (arr[i] !== arr[0] || arr[i] === 0) {
              win = false;
              }
          }
        }

      if (!win && turnCount === 9) {
        $("td").hide();
        $("#winnerpic").addClass("draw");
        $("#drawtxt").attr("class", "drawtext");
        gameEnd = true;
      }
      if(win){
        ifWin();
        gameEnd = true;
      }
    }
  }


  var ifWin = function() {
    $("td").hide();

    if (playerTurn === 1) {
      $("#winnerpic").addClass("xwin");
      $("#winnertxt").attr("class", "wintext");
    } else {
      $("#winnerpic").addClass("owin");
      $("#winnertxt").attr("class", "wintext");
    }
  };
});
