        }
        attack(target);
        
    }
​
},250);
​
function item_quantity(name)
{
    for(var i=0;i<42;i++)
    {
        if(character.items[i] && character.items[i].name==name) return character.items[i].q||0;
    }
    return 0;
}
​
//taunt stuff
/*var lasttaunt;
function taunt(target) {
  // Taunt only if target hasn't been taunted and if curse is from cd (cd is 5sec).
  if ((!lasttaunt || new Date() - lasttaunt > 6000) && !target.taunted) {
    lasttaunt = new Date();
    parent.socket.emit("ability", {
      name: "taunt",
      id: target.id
    });
  }
}*/
​
function buy_potions()
{
    //code to buy potions
    if(item_quantity("mpot0")<5 || item_quantity("hpot0")<5) // item_quantity is                    defined below
    {
        smart_move({to:"potions",return:true},function()
                   {    
                        if(item_quantity("mpot0")<5)
                            buy("mpot0",200);
                        if(item_quantity("hpot0")<5)
                            buy("hpot0",200);
                    });
        // {to:"potions"} is ~equal to {"map":"main","x":56,"y":-122}
        // {return:true} brings you back to your original position
        // while the smart_move is happening, is_moving is false
        // therefore the attack routine doesn't execute
        // when the smart_move destination is reached
        // buy("mpot0",10); executes and buys 10 potions
        return;
    }
}
​
function use_hp_or_mpV2()
{
    if(safeties && mssince(last_potion)<min(200,character.ping*3)) return;
    var used=false;
    if(new Date()<parent.next_skill.use_hp) return;
    if(character.mp/character.max_mp<0.2) use('use_mp'),used=true; 
    else if(character.hp/character.max_hp<0.7) use('use_hp'),used=true;
    else if(character.mp/character.max_mp<0.8) use('use_mp'),used=true;
    if(used) last_potion=new Date();
}
