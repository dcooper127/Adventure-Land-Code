// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!
​
var attack_mode=false
​
setInterval(function(){
​
    //TODO: optimize use_hp_mp... going to go broke chugging potions every .25 seconds
    use_hp_or_mp();
    loot();
​
    if(!attack_mode || character.rip || is_moving(character)) return;
​

    //code to buy potions
    //goes to shop when magic or health pots <5 then buys 200 of each  as needed
	if(item_quantity("mpot0")<5 || item_quantity("hpot0")<5) // item_quantity is 					defined below
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

    var target=get_targeted_monster();
    if(!target)
    {
        target=get_nearest_monster({min_xp:100,max_att:120});
        if(target) change_target(target);
        else
        {
            set_message("No Monsters");
            return;
        }
    }
    
    if(!is_in_range(target))
    {
        move(
            character.x+(target.x-character.x)/2,
            character.y+(target.y-character.y)/2
            );
        // Walk half the distance
    }
    else if(can_attack(target))
    {
        set_message("Attacking");
        if(!target.taunted)
		{
			use_skill("taunt",target);
			//say("TAUNTING");
		}
        attack(target);
    }
​
},1000/4); // Loops every 1/4 seconds.
​
// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround
