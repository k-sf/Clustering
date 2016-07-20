function k_means(mas,numclas,metod){
	console.log("Зашло в k_mean");
	var clas = numclas;
	var temp = [];
	var oldcentor = [];
	var newcentor = [];
	var clases = [];
	var bool;
	var q=0;
	newcentor = getcentor(mas,clas);

	do{
		oldcentor = newcentor;
		console.log("qwerty oldcentor="+oldcentor+" newcentor="+ newcentor);
		temp = getD(mas,clas,oldcentor,metod);
		console.log("getD  newcentor="+ newcentor+"temp="+temp);
		clases = CreateClast(mas,temp,clas);
		console.log("CreateClast newcentor="+ newcentor+"clases"+clases);
		newcentor = SerchCentor(clases);
		console.log("SerchCentor newcentor="+ newcentor);
		bool = compare(oldcentor,newcentor);
		console.log("bool oldcentor="+oldcentor+"newcentor="+ newcentor+"bool"+bool);
		console.log(q);
		q++;
		if(q>30){
			break;
		}
		//plotgraf(clases,newcentor,temp);
		//window.setTimeout(plotgraf(clases,newcentor,temp),1000);
	}while(!bool);
	plotgraf(clases,newcentor,temp);

}
function plotgraf(clases,newcentor,temp){
	var options = {
		series: {
			lines: { show: false },
			points: { show: true, radius:4}
				},
		yaxis: {tickSize: 1 , max: 15, min: 0},
		xaxis: {tickSize: 1 , max: 20, min: 0}
	};
	var all_data = [];
	var plotdata = {
		label: "Данные 1",
		color: 0,
		constructor: function(data){
			this.data=data;
		}
	};
	var i;
	var j;
	var k;
	var l;
	var temp1;
	var temp2 = [];//масив максимальных радиусов
	var temp3;

	for(i=0;i<clases.length;i++){
		temp1 = Object.create(plotdata);
		temp1.label = "Кластер"+i;
		temp1.color = i;
		temp1.constructor(clases[i]);
		delete temp1.constructor;
		all_data.push(temp1);
		
		temp3 = 0;
		for(k=0;k<temp.length;k++){
			if(temp[k][1]==i){
				temp3 = Math.max(temp3,temp[k][0]);
			}
		}
		temp2.push(temp3);
	}
console.log(temp);
	for(j=0;j<newcentor.length;j++){
		temp1 = Object.create(plotdata);
		temp1.label = "Центр кластера"+j;
		temp1.color = j+newcentor.length;
		temp1.constructor([newcentor[j]]);
		delete temp1.constructor;
		all_data.push(temp1);
	}
	console.log(all_data);
	$.plot($("#graf"), all_data,options);
}

function compare(oldcentor,newcentor){
	var i;
	var j;
	var k;
	var temp = [];
	var bool=true;
	var count;
	for(i=0;i<newcentor.length;i++){
		count = newcentor[i].length;
		for(j=0;j<count;j++){
			if(newcentor[i][j]===oldcentor[i][j]){
				temp.push(true);
			}
			else{
				temp.push(false);
			}
		}
	}
	for(k=0;k<temp.length;k++){
		bool = bool&&temp[k];
	}
	return bool;
}
function show(m){
	var i;
	var j;
	var count;
	for(i=0;i<m.length;i++){
		count = m[i].length;
		for(j=0;j<count;j++){
			console.log(m[i][j]);
		}
	}
}
function SerchCentor(clases){
	var i;
	var j;
	var count;
	var sumx;
	var sumy;
	var x;
	var y;
	var newcentor= [];
	for(i=0;i<clases.length;i++){
		sumx = 0;
		sumy = 0;
		count = clases[i].length;
		console.log("count="+count+"sumx sumy"+sumx+sumy);
		for(j = 0;j<count;j++){
			console.log("=============================Alarm=============");
			console.log("sumx="+sumx+"sumy="+sumy+"clasesX="+clases[i][j][0]+"typeof="+typeof(clases[i][j][0])+"clasesY="+clases[i][j][1]+"typeof="+typeof(clases[i][j][1]));
			sumx+=Number(clases[i][j][0]);
			sumy+=Number(clases[i][j][1]);
			console.log("sumx="+sumx+"sumy="+sumy+"clasesX="+clases[i][j][0]+"clasesY="+clases[i][j][1]);
			console.log("=============================Alarm=============");
		}
		console.log("sumx"+sumx+"sumy"+sumy);
		x = sumx/count;
		y = sumy/count;
		console.log("x="+x+"y="+y);
		newcentor.push([x,y]);
	}
	return newcentor;
}
function CreateClast(mas,temp,clas){
	var i;
	var j;
	var a=0;
	var clases =[];
	var temp1;
	console.log("---------------Function CreateClast --------");
	for(j=0;j<clas;j++){
		temp1 =[];
		console.log("temp"+temp);
		console.log(temp);
		for(i=0;i<mas.length;i++){
			if(temp[i][1]===j){
				temp1.push(mas[i]);
				console.log("Include temp1"+temp1);
			}
		}
		console.log("temp1"+temp1);
		clases.push(temp1);
		console.log(clases);
	}
	return clases;
}
function getD(mas,clas,centor, metod){
	var a;
	var temp;
	var temp1=[];
	for(i=0;i<mas.length;i++){
		a=[100,0];
		for(j=0;j<clas;j++){
			if(metod==1){
				temp = Math.sqrt(Math.pow((mas[i][0]-centor[j][0]),2)+Math.pow((mas[i][1]-centor[j][1]),2));
			}
			else {
				temp = Math.min(Math.abs((mas[i][0]-centor[j][0]),2),Math.abs((mas[i][1]-centor[j][1]),2));
			}
			if(temp<a[0]){
				a[0]=temp;
				a[1] = j;
			}
		}
		temp1.push(a);
	}
	return temp1;
}
function getcentor(mas,clas){
	var i = 0;
	var rand;
	var newcentor = [];
	var masrand = ["330","110","200"];
	for(i=0;i<clas;i++){
		do{
			rand = (getRandomArbitary(0,mas.length-1)).toFixed();
			console.log(rand);
			console.log("Output from while  indexof ="+(masrand.indexOf(String(rand))!==-1)+"Number"+(Number.isInteger(rand)));
		}
		while((masrand.indexOf(String(rand)))!==-1||Number.isInteger(rand));
		masrand.push(rand);
		console.log(masrand);
		newcentor[i]=mas[rand];
	}
	console.log("newcentor");
	console.log(newcentor);
	return newcentor;
}
function getRandomArbitary(min, max){
		return Math.random() * (max - min) + min;
	}
