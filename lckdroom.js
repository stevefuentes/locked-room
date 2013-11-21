
/*         --------------         +/
/*      ### Locked Room ###      */
/*       -==============-        */

  var lastChar;
  var $inputArr = [];
  var currPos = 0;

function outputChar(e)
  {$('.inputWrap.active .inputArea').append((String.fromCharCode(e.which)));}

function print($string, $type){
  switch ($type){
    case 'pre':
      $('.container').append('<pre>' + $string + '</pre>');
      break;
    case 'br':
      $('.container').append($string + '</br>');
      break;
    default:
      $('.container').append($string);
      break;
  }
}
  

function ShowCL(){
  print("  CHANGELOG", 'pre');
  print(" ===========", 'pre');
  print("   v0.01(pa)", 'pre');
  print("     - Main HTML-, CSS- & JavaScript-Structure", 'pre');
  print("     - Input-/Output-Handling", 'pre');
  print("     - Basic Command-System", 'pre');
  print("     - Basic Location-System & -Table", 'pre');
  print("     - Basic Movement-System:  MOVE, GO, WALK, NORTH, EAST, SOUTH, WEST, N, E, S, W", 'pre');
  print("   v0.02(pa)", 'pre');
  print("     - Implemented basic Item- & Object-System", 'pre');
  print("     - Enhanced Command-System:  GET, PICK, PICK UP", 'pre');
  print("     - Implemented Command(line)-History", 'pre');
  print("   v0.03(pa)", 'pre');
  print("     - Basic Help-System", 'pre');
  print("     - Enhanced Command-System:  ADDED Reload/Restart, LOOK", 'pre');
  print("     - Modified Inventory", 'pre');
  print("   v0.04(pa)", 'pre');
  print("     - Recoded and optimized Input-/Output-Handling", 'pre');
  print("     - Implemented MouseWheel-Scrolling", 'pre');
  print("   v0.05(pa)", 'pre');
  print("     - Enhanced Command-System:  ADDED LOOK at object/item, EXAMINE Item", 'pre');
  print("     - Enhanced MOVE/GO/WALK-Variations:  MOVE/GO/WALK TO (cardinal direction) etc.", 'pre');
  print("     - Enhanced LOOK-Variations:  LOOK AT/TO/IN/ON (THE)", 'pre');
  print("   v0.054(pa)", 'pre');
  print("     - Improved output-System:  ADDED printTextLB and print", 'pre');
  print("     - Implemented ChangeLog", 'pre');
  print("   v0.055(pa)", 'pre');
  print("     - (?)", 'pre');
  print("   v0.056(pa)", 'pre');
  print("     - General code-optimization", 'pre');
  print("   v0.06(pa)", 'pre');
  print("     - (?)", 'pre');
}

function fMissing()
  {print('  [FUNCTION NOT AVAILABLE YET!]', 'pre');}

function listInv(){
  if (player.inventory.length){
    string = "<pre>  [Inventory/Backpack/Bag]:  ";
    $.each(player.inventory, function(i, v){
      if (i > 0){
        string += ', ';
      }
      string += v.title ;
    });
  }else{
    string = "<pre>  You don't have any items!";
  }
    print(string);
}

function requestInput(){
  
  if ($('.inputWrap').length){
    $(document).on('keydown', function(e) { 
      if(e.keyCode == 38){
        if (currPos >= 0){
          $('.inputWrap.active input').val($inputArr[currPos]);
          currPos --;
        }
      }else if(e.keyCode == 40){
        if ($inputArr.length > (currPos + 1)){
          $('.inputWrap.active input').val($inputArr[currPos + 1]);
          currPos ++;
        }else{
          $('.inputWrap.active input').val('');
        }
      }else if (e.keyCode == 13){
        if ($inputArr.length < 5){
          $inputArr.push($('.inputWrap.active input').val().toUpperCase());
      }else if (e.keyCode == 192){
        return false;
      }else{
          $inputArr.splice(0,1);
          $inputArr.push($('.inputWrap.active input').val().toUpperCase());
        }
        currPos = $inputArr.length - 1;

        last = ($inputArr.length - 1);
        words = $inputArr[last].split(" ");
        console.log($inputArr);
        analyzeInput(words[0]);
        if (locked_room.debug){
          print('<div>'+$inputArr[last]+'</div>'); 

        }
        createInputArea();
      }
     });
  }else{
    createInputArea();
    requestInput();
  }
}

function analyzeInput(switchvar){
  
  switch(switchvar){
    case 'X': case 'EXIT': case 'Q': case 'QUIT': 
      print('   *** EXITING! ***');
      print('   *** RELOADING! ***');
      location.reload();
      break;
    case 'R': case 'RELOAD': case 'RESTART':
      print('   *** RELOADING! ***');
      location.reload();
      break;
    case 'CHANGELOG': case 'CL':
      ShowCL();
      break;
    case '?': case 'H': case 'HELP':
      
      print(',________________________,');
      print('| HELP / COMMAND-LISTING |');
      print('#========================#');

      print('  HELP / H / ?            ==>  Display Help/Command-Listing', 'pre');
      print('  EXIT / X / QUIT / Q     ==>  Exit/Quit program', 'pre');
      print('  RESTART / RELOAD / R    ==>  Reload(page) & restart', 'pre');
      print(' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', 'pre');
      print('  INV / BAG / I           ==>  List inventory', 'pre');
      print('  MAP / M                 ==>  Look at map', 'pre');
      print(' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', 'pre');
      print('  NORTH / N               ==>  Move north', 'pre');
      print('  EAST / E                ==>  Move east', 'pre');
      print('  SOUTH / S               ==>  Move south', 'pre');
      print('  WEST / W                ==>  Move west', 'pre');
      print('              *** [Alt.]  -->  WALK % / GO % / MOVE %  (% = Cardinal direction)', 'pre');
      print('  LOOK / L                ==>  Look around', 'pre');
      print('  LOOK %                  ==>  Look at object(%) / Examine item(%)', 'pre');
      print('              *** [Alt.]  -->  LOOK ON % / LOOK IN % / LOOK AT % / LOOK AT THE % ETC...(% = object/item)', 'pre');
      print('  GET / PICKUP / PICK UP  ==>  Pickup an item(%)', 'pre');
      print('  EXAMINE % / EX %        ==>  Examine item(%)', 'pre');
      print('  USE %                   ==>  Use item(%) / Use object(%)', 'pre');
      print('</br>');

      break;
    case 'INV': case 'I': case 'BAG':
      listInv();
      break;
    case 'MAP': case 'M':
      print('<pre>  [Map]:  (NOT AVAILABLE)');
      break;
    case 'LOOK': case 'L':
      if (words.length == 1){
        print(player.location.description);
        break; 
      }
      if (words[1] == 'AT' || words[1] == 'ON' || words[1] == 'TO' || words[1] == 'IN'){

        if (words[2] == 'THE'){
          wordind = words.indexOf(switchvar) + 3;
        }else{
          wordind = words.indexOf(switchvar) + 2;
        }
       }else if(words[1] == 'AROUND'){
          print(player.location.description);
          break; 
       }else{
          wordind = words.indexOf(switchvar) + 1;
       }

    if(player.location.objects){
      foundObj = false;
      
        $.each(player.location.objects, function(index,object){
          $.each(objects[index].keywords, function(i,keyword){
            if (keyword.toUpperCase() == words[wordind]){
              print(object.actions.look.description);
              foundObj = true;
              console.log(player);
              return false;         
            }
          });
        });
        if (!foundObj){
          print('There is no ' + words[wordind].toLowerCase() + ' in here.');
        }
    }else{
      print('There is no ' + words[wordind].toLowerCase() + ' in here.');
    }
      break;

    case 'GO': case 'WALK': case 'MOVE':
      analyzeInput(words[1]);
      break;

    case 'N': case 'NORTH':
      if (player.location.n != undefined){
        player.setLocation(locations[player.location.n]);
        print('You went North!');
        print('</br>'+player.location.description);
      }else{
        print('You cant go North!');
      }
      break;
    case 'S': case 'SOUTH':
      if (player.location.s != undefined){
        player.setLocation(locations[player.location.s]);
        print('You went South!');
        print('</br>'+player.location.description);
      }else{
        print('You cant go South!');
      }
      break;
    case 'E': case 'EAST':
      if (player.location.e != undefined){
        player.setLocation(locations[player.location.e]);
        print('You went East!');
        print('</br>'+player.location.description);
      }else{
        print('You cant go East!');
      }
      break;
    case 'W': case 'WEST':
      if (player.location.w != undefined){
        player.setLocation(locations[player.location.w]);
        print('You went West!');
        print('</br>'+player.location.description);
      }else{
        print('You cant go West!');
      }
      break;
    case 'PICK':
      if (words[1] == 'UP'){
        wordind = words.indexOf(switchvar) + 2;
      }
    case 'GET': case 'TAKE': case 'PICKUP':
      wordind = words.indexOf(switchvar) + 1;
      if(player.location.items){
        gotItem = false;
        
        $.each(player.location.items, function(index,item){
          $.each(item.keywords, function(i,keyword){
            if (keyword.toUpperCase() == words[wordind]){
              player.addItem(player.location.items[index]);
              player.location.items.splice(index, 1);
              print('Got the '+ item.title);
              gotItem = true; 
              return false;
            }
          });
        });

        if (!gotItem){
          print('There is no ' + words[wordind].toLowerCase() + ' in here.');
        }
      }else{
        print('There is no ' + words[wordind].toLowerCase() + ' in here.');
      }
      break;
    case 'EXAMINE': case 'EX':
      wordind = words.indexOf(switchvar) + 1;
      if(player.inventory){
        gotItem = false;
        
        $.each(player.inventory, function(index,item){
          $.each(item.keywords, function(i,keyword){
            if (keyword.toUpperCase() == words[wordind]){
              print(item.description);
              if (item.atitle){
                item.title = item.atitle;
              }
              gotItem = true;
              console.log(player);
              return false;         
            }
          });
        });
        if (!gotItem){
          print("You don't have any " + words[wordind].toLowerCase() + ' in your inventory.');
        }
      }else{
        print("You don't have any " + words[wordind].toLowerCase() + ' in your inventory.');
      }
      break;      
    case 'USE':
      fMissing();
      break;
    default:
      break;
  }
}

function createInputArea(){
  
  $('.inputWrap').removeClass('active');
  $('input').attr('disabled', 'diabled');
  print('<div class="inputWrap active">' + player.location.title+ '&nbsp;>&nbsp;&nbsp;<input type="text"/></div>');
  $('.inputWrap.active input').focus();
}

function introduction(){
  print('Welcome stranger...!</br>');
  print("  [i] - (Enter '?', 'HELP' or 'H' to display help/information...!)", 'pre');
  print('','br');
}

game = function(){
  this.engine = {
    addCommand : function(name, data){
      commands[name] = data;
    },
    addKeyword : function(name, command){
      keywords[name] = command;
    },
    commands : {
      move : function (){

      }
    },
    keywords : [
    ] 
  }
  this.player = {
    name : 'Default',
    location : '',
    inventory : [],
    move : function (crd_dir){
      this.engine.commands.move(crd_dir);
    },
    setLocation : function(loc){
      this.location = loc;
    },
    setVar : function(variable, val){
      this[variable] = val;
    },
    addItem : function(item){
      this.inventory.push(item);
    }
  }
  this.addItem = function(name, data){
    this.items[name] = data;
  }

  this.addLocation = function(name, data){
    this.locations[name] = data;
  }
  
  this.addObject = function(name, data){
    this.objects[name] = data;
  }

  this.addAction = function(name, data){
    this.actions[name] = data; 
  }

  this.setDebugMode = function(mode){
    this.debug = mode;
  }

  this.debug = false;
  this.items = {}
  this.objects ={}
  this.locations = {}
  this.actions = {}

}
locked_room = new game();
player = locked_room.player;
items = locked_room.items;
locations = locked_room.locations;
locked_room.addItem('paper',{
  title: 'Paper',
  keywords : ['paper'],
  description : "A piece of paper.  There's nothing written on it."
});
locked_room.addItem('key_lion',{
 title : 'Key',
 keywords : ['key'],
 atitle : 'Ornate Key (Lion)',
 description: "It's a key with a lion's head on it."
});
locked_room.addItem('key_tiger',{
 title : 'Key',
 keywords : ['key'],
 atitle : 'Ornate Key (Tiger)',
 description: "It's a key with a tiger's skull on it."
});     
locked_room.addItem('watch',{
 title: 'Watch',
 keywords : ['watch']
});
locked_room.addItem('candle',{
 title: 'Candle',
 keywords : ['candle']
});
locked_room.addItem('shoe',{
 title: 'Shoe',
 keywords : ['shoe']
});
locked_room.addObject('door',{
  title : 'Door',
  keywords : ["door"],
  keys : [items.key]
});
locked_room.addObject('mirror',{
  title : 'Mirror',
  keywords : ["mirror"],
});
locked_room.addAction('cavein', {
  description : "The floor caved in! You can't go back!"
});
locked_room.addLocation('lobby', {
  title : 'Lobby',
  description: 'You are in a big lobby. There are ways to all four cardinal directions... On the ground is a paper and a key.',
  items : [items.paper, items.key_lion],
  objects : {
    door : {
      actions : {
        look : {
            description : 'There is a door.'},
        use : {
          key_lion : {
            description: "This key doesn't work in this door!"},
          key_tiger : {
            description : "Unlocked the door!",
            uses : 1,
            x_description : "The key broke!"}
        }
      },
      locked : 1   
    },
    mirror: {
      actions : {
        look : {
          description : 'You see your reflection.'}
      }
    }
  },
  n: 'forest',
  e: 'alleyway',
  s: 'alleyway_2',
  w: 'dead_end'
});
locked_room.addLocation('forest', {
  title : 'Forest',
  description: "A thick forest with a big tree in front, if you don't want get lost, better turn around and head back south...",
  n: 'lost',
  s: 'lobby'
});
locked_room.addLocation('alleyway', {
  title: 'Alleyway',
  description: "It's an alleyway with 2 trashcans...  Ways leading west and south.",
  items : [items.watch],
  w: 'lobby',
  s: 'river'
});
locked_room.addLocation('river', {
  title : 'River',
  description: "It's a riverside with paths heading north and west...",
  n: 'alleyway',
  w: 'alleyway_2'
});
locked_room.addLocation('alleyway_2', {
  title: 'Alleyway',
  description: "It's an alleyway with trails on north and east direction...",
  n: 'lobby',
  e: 'river'
});
locked_room.addLocation('dead_end', {
  title: 'Dead end',
  description: 'Just a deadlock, the only way leads back east...',
  e: 'lobby'
});
locked_room.addLocation('lost', {
  title : 'Lost',
  description: "Nothing but trees...",
  s: 'forest',
  e: 'lost',
  n: 'lost',
  w: 'lost'
});



player.setVar('name', 'Steve');
player.setVar('location', locations.lobby);

$(document).ready(function(){
  console.log(locked_room);
  introduction();
  requestInput();
  $(window).click(function(){
    $('.inputWrap.active input').focus();
  });
});