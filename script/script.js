$(function () {
	var mas = [
		[1,2],
		[2,1],
		[2,2],
		[1,1],
		[5,6],
		[6,5],
		[6,6],
		[5,5]
		];
	// mas = [
	// 	[1,1],
	// 	[1,7],
	// 	[1,2],
	// 	[1,9],
	// 	];
	var metod;
	showmas(mas);
	var addbut = $("#add");
	var removebut =$("#remove");
	var randbut = $("#randombut");
	var inpNum = $("#input-num-clas");
	var inpR = $("#inputR");
	var radio = $("[name=metod]");
	var meansbut = $("#means");
	var forelbut = $("#forel");

	randbut.click(RandomMas);
	meansbut.click(clast);
	forelbut.click(clast);
	addbut.click(addclick);
	removebut.click(removeclick);
	//k_means();
	function addclick(){
		var mas1;
		var x = $("#inputX").val();
		var y = $("#inputY").val();
		if(x!==''&& y!==''){
			mas1=[x,y];
			mas.push(mas1);
			$("#inputX").val('');
			$("#inputY").val('');
			showmas(mas);
		}
	}
	function removeclick(){
		mas.pop();
		showmas(mas);
	}
	function RandomMas(){
		var i;
		var randx;
		var randy;
		var size = $("#randominp").val();
		if(size!==''){
			mas = getRandomMas(mas,size);
			showmas(mas);
		}
		else{
			alert("Ввидете количестово элементов");
		}
	}
	/////////////////////////////////////////////////////////////////
	function clast(e){
		if(radio[0].checked){
			metod = 1;
		}
		else if(radio[1].checked){
			metod = 2;
		}
		if(e.target.id=="means"){
			numclas = inpNum.val();
			if(numclas!==''){
				$("#input-num-clas").val('');
				k_means(mas,numclas,metod);
			}
			else{
				alert("введите количество кластеров");
			}
		}
		else if(e.target.id=="forel"){
			R = $("#inputR").val();
				if(R!==''){
					$("#inputR").val('');
					forel(mas,R,metod);
				}
				else{
					alert("введите Радиус кластеров");
				}
		}
	}
});
//////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
function showmas(mas){
	var mas1 = false;
	showmas(mas,mas1);
}
//////////////////////////////////////////////////////////
function showmas(mas,mas1){
	var i;
	var j;
	var temp = 'Исходный массив данныйх:<br><br>';
	if(mas1){
		mas.push(mas1);
	}
	for(i = 0;i<mas.length;i++)
	{
		for(j = 0;j<2;j++)
		{
			if(j===0){
				k=i+1;
				temp = temp + k+":  X = "+mas[i][j]+";   ";
			}else if(j===1){
				temp = temp + "Y = "+mas[i][j]+";<br>";
			}
		}
	}
	$("#intext").html(temp);
}
/////////////////////////////////////////////////////////////////////////////////

function checkRepit(mas,randx,randy){
	var i;
	var bool=false;
	for(i=0;i<mas.length;i++){
		if(mas[i][0]==randx&&mas[i][1]==randy){
			bool = true;
			break;
		}
	}
	return bool;
}

function getRandomMas(mas,size){
	$("#randominp").val('');
	var i;
	mas = [];
	mas.push([getRandomArbitary(0,9).toFixed(),getRandomArbitary(0,9).toFixed()]);// первый элементmas
	console.log(mas.length);
	for(i=0;i<(size-1);i++){
		console.log("gfgfdgdf");
		do{
			randx = getRandomArbitary(0,15).toFixed();
			randy = getRandomArbitary(0,15).toFixed();
		}while(checkRepit(mas,randx,randy));
		mas.push([randx,randy]);
	}
	return mas;
}