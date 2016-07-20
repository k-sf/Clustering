function forel(mas,R, metod){
	var i;
	var k=0;
	var j;
	var mas1 = [];
	var clases = [];
	var centors = [];
	sosedi =[];
	var temp = [];
	for(i=0;i<mas.length;i++){
		mas1[i] = mas[i];
	}
	while(clusterisation_not_finished(mas1.length!==0)){
		console.log("first while");
		current_object = get_random_object(mas1);
		console.log("current_object="+current_object);
		neighbour_objects = get_neighbour_objects(mas1, current_object,metod,R);
		console.log("neighbour_objects="+neighbour_objects);
		center_object = center_of_objects(neighbour_objects);
		console.log("center_object="+center_object); 
		while(center_object[0]!=current_object[0]&&center_object[1]!=current_object[1]){
			console.log("second while");
			console.log("current_object="+current_object+"center_object="+center_object);
			current_object = center_object; 
			neighbour_objects = get_neighbour_objects(mas1, current_object,metod,R); 
			console.log("neighbour_objects="+neighbour_objects);
			center_object = center_of_objects(neighbour_objects); 
			console.log("center_object="+center_object);
			if(k>3){
				break;
			}
			k++;
		}

		console.log("MAssiV1=");
		console.log(mas1);

		sosedi = get_neighbour_objects(mas1, current_object,metod,R); 
		console.log("sosedi=");
		console.log(sosedi);

		clases.push(sosedi);

		console.log("clases=");
		console.log(clases);

		centors.push(center_object);

		console.log("center_object=");
		console.log(center_object);
		mas1 = delete_objects(mas1, neighbour_objects);
		console.log("Massiv after delete");
		console.log(mas1);
	}
	console.log("classes");
	console.log(clases);
	console.log("centors");
	console.log(centors);
	plotgraf(clases,centors,temp);
}
function clusterisation_not_finished(mas1){
	if(mas1!=[]){
		return true;
	}
	else{
		return false;
	}
}
function get_random_object(mas1){
	var rand;
	if(mas1.length>1){
		rand = getRandomArbitary(0,mas1.length-1).toFixed();
		return mas1[rand];
	}
	else {
		return mas1[0];
	}
}
function get_neighbour_objects(mas1, object, metod,R){
	var i;
	var temp = [];
	var d;
	for(i=0;i<mas1.length;i++){
		if(metod==1){
			d = Math.sqrt(Math.pow((mas1[i][0]-object[0]),2)+Math.pow((mas1[i][1]-object[1]),2));
		}
		else {
			d = Math.min(Math.abs((mas1[i][0]-object[0]),2),Math.abs((mas1[i][1]-object[1]),2));
		}
		if(d<=R){
			temp.push(mas1[i]);
		}
	}
	return temp;
}
function center_of_objects(neighbour_objects){
	var i;
	var sumx = 0;
	var sumy = 0;
	var x;
	var y;
	var centor;
	for(i=0;i<neighbour_objects.length;i++){
		sumx+=Number(neighbour_objects[i][0]);
		sumy+=Number(neighbour_objects[i][1]);
	}
	x = sumx/neighbour_objects.length;
	y = sumy/neighbour_objects.length;
	centor = [x,y];
	return centor;
}
function delete_objects(mas1, neighbour_objects){
	var i;
	var j=0;
	var k =1;
	var tempmas = [];
	var tempmas2 = [];
	var bool;
	//console.log(mas1);
	//console.log(neighbour_objects);
	while(neighbour_objects.length!==0){
		//console.log("delete_objects Зашли в while " +k+++"раз");
		tempmas = delete_object(mas1, neighbour_objects);
		//console.log("delete_objects функция delete_object прошла");
		mas1 = tempmas[0];
		neighbour_objects = tempmas[1];
	}
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	// while(neighbour_objects.length!==0){
	// 	console.log("Ввощли в while");
	// 	for(i=0;i<length;i++){
	// 		console.log("Ввощли в первый for");
	// 		if(mas1[i][0]!==neighbour_objects[0][0]||mas1[i][1]!==neighbour_objects[0][1]){
	// 			console.log("нашли элемент");
	// 			if(j!==0){
	// 				for(k=0;k<j;k++){
	// 					console.log("2 for");
	// 					if(mas1[i][0]==tempmas[k][0]&&mas1[i][1]==tempmas[k][1]){
	// 						bool = bool&&false;
	// 						break;
	// 					}
	// 				}
	// 				if(bool!=false){
	// 					console.log("записали элемент"+mas1[i]+"в temp");
	// 					tempmas.push(mas1[i]);
	// 				}
	// 			}
	// 			else{
	// 				console.log("записали элемент"+mas1[i]+"в temp");
	// 				tempmas.push(mas1[i]);
	// 				break;
	// 			}
	// 			neighbour_objects.shift();
	// 			break;
	// 		}
	// 	}
	// 	j++;
	// }
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// for(i=0;i<neighbour_objects.length;i++){
	// 	for(j=0;j<length;j++){
	// 		if(mas1[j][0]==neighbour_objects[i][0]&&mas1[j][1]==neighbour_objects[i][1]){
	// 			tempmas.push(mas1[i]);
	// 			console.log("del");
	// 		}
	// 	}
	// }
	console.log(mas1);
	return mas1;
}
function delete_object(mas1, neighbour_objects){
	var i;
	var temp = [];
	var length = mas1.length;
	for(i=0;i<length;i++){
		//console.log("delete_object Ввощли в for");
		if(mas1[i][0]==neighbour_objects[0][0]&&mas1[i][1]==neighbour_objects[0][1]){
			//console.log("delete_object нашли совпадающий");
			tempmas = mas1.slice(0,i).concat(mas1.slice(i+1,mas1.length));
			neighbour_objects.shift();
			temp.push(tempmas);
			temp.push(neighbour_objects);
			break;
		}
	}
	return temp;
}
