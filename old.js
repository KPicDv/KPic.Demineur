$('#map').hide();
$('#score').hide();
var joueur1 = "", joueur2 = "", score1, score2;
var nbBombe = 0;
bombe = new Array();
for(var i = 1; i <= 18; i++){
	bombe[i] = new Array();
	for(var j = 1; j <= 35; j++){
		bombe[i][j] = Math.floor(Math.random()*5+1);
		if(bombe[i][j] == 1){
//			$('#tr'+i+'td'+j).css({ 'background': '#3C2BBB' });
			bombe[i][j] = -1;
			nbBombe++;
		}
	}
}
$('#nbBombe').html(nbBombe);
tabVerif = new Array();

score1 = 0;
score2 = 0;

$('#name button').click(function(){
	joueur = 1;
	joueur1 = $('#name #joueur1').val();
	joueur2 = $('#name #joueur2').val();
	$('#name').hide();
	$('#map').show();
	$('#nomJoueur').html(joueur1);
	$('#zone1 .nom').html(joueur1);
	$('#zone2 .nom').html(joueur2);
	$('#score').show();
});

function Essai(y, x){
	if(bombe[y][x] != -2){
		if(bombe[y][x] == -1){
			if(joueur == 1){
				$('#tr'+y+'td'+x).css({ 'background':'#D1D1D1 url("img/flagBleu.png")' });
				score1++;
				$('#zone1 .bombeTrouve').html(score1);
			}else{
				$('#tr'+y+'td'+x).css({ 'background':'#D1D1D1 url("img/flagRouge.png")' });
				score2++;
				$('#zone2 .bombeTrouve').html(score2);
			}
			bombe[y][x] = -2;
			nbBombe--
			$('#nbBombe').html(nbBombe);
			if(nbBombe == 0){
				$('#map').hide();
			}
		}else{
			ControlCase(y, x);
			if(joueur == 1){
				$('#nomJoueur').html(joueur2);
				joueur = 2;
			}else{
				$('#nomJoueur').html(joueur1);
				joueur = 1;
			}
		}
	}
}

function ControlCase(y, x){
	$('#tr'+y+'td'+x).css({ 'background':'#D9D9D9' });
	
	var nbBombe = 0;
	if(tabVerif.indexOf(y+" "+x) == -1){
		if(y > 1){
			if(x > 1){ 
				if(bombe[y-1][x-1] < 0){ nbBombe++; } // 1
			}
			if(bombe[y-1][x] < 0){ nbBombe++; }		// 2
			if(x < 35){
				if(bombe[y-1][x+1] < 0){ nbBombe++; }	// 3
			}
		}
		if(x > 1){ 
			if(bombe[y][x-1] < 0){ nbBombe++; }	// 4
		}
		if(x < 35){ 
			if(bombe[y][x+1] < 0){ nbBombe++; }	// 6
		}
		if(y < 18){
			if(x > 1){ 
				if(bombe[y+1][x-1] < 0){ nbBombe++; }	// 7
			}
			if(bombe[y+1][x] < 0){ nbBombe++; }	// 8
			if(x < 35){
				if(bombe[y+1][x+1] < 0){ nbBombe++; }	// 9
			}
		}
		switch(nbBombe){
			case 1:
				$('#tr'+y+'td'+x).css({ 'color':'blue' });
				break;
			case 2:
				$('#tr'+y+'td'+x).css({ 'color':'green' });
				break;
			case 3:
				$('#tr'+y+'td'+x).css({ 'color':'red' });
				break;
			case 4:
				$('#tr'+y+'td'+x).css({ 'color':'#000080' });
				break;
		}
		
		if(nbBombe == 0){
			Propagation(y, x);
		}else{
			$('#tr'+y+'td'+x).html(nbBombe);
		}
	}
}

function Propagation(y, x){
	tabVerif.push(y+" "+x);
	if(y > 1){
		if(x > 1){ 
			ControlCase(y-1, x-1);
		}
		ControlCase(y-1, x);
		if(x < 35){
			ControlCase(y-1, x+1);
		}
	}
	if(x > 1){ 
		ControlCase(y, x-1);
	}
	if(x < 35){ 
		ControlCase(y, x+1);
	}
	if(y < 18){
		if(x > 1){ 
			ControlCase(y+1, x-1);
		}
		ControlCase(y+1, x);
		if(x < 35){
			ControlCase(y+1, x+1);
		}
	}
}




