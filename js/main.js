var  list = [
  {"desc":"rice", "amount": "1", "value":"5.40"},  
  {"desc":"beer", "amount": "12", "value":"1.99"},  
  {"desc":"meat", "amount": "1", "value":"15.00"},  
];

function getTotal(list){
    var total = 0;

    for(var key in list){
        total += list[key].value * list[key].amount;
    }

    document.getElementById("totalValue").innerHTML = formatValue(total);
}

function setList(list){
    
    var table='<thead><tr><th scope="col">Description</th><th scope="col">Amount</th><th scope="col">Value</th><th scope="col">Action</th></tr></thead><tbody>';

    for(var key in list){
        table+='<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ formatAmount(list[key].amount) +'</td><td>'+formatValue(list[key].value) +'</td><td><button onclick="setUpdate('+key+');" class="btn btn-warning">Edit</button><button onclick="deleteData('+key+');" class="btn btn-danger">Delete</button></td></tr>';
    }

    table += '</tbody>';

    document.getElementById('list-table').innerHTML = table;
    getTotal(list);
    saveListStorage(list);
}

function formatDesc(desc){

    var str=desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);

    return str;
}

function formatAmount(amount){
    //apenas retornar inteiro
    return parseInt(amount);

}


function formatValue(value){

    var str = parseFloat(value).toFixed(2) + "";
    str = str.replace(".", ","); // substitui ponto por vírgula
    str = "$" + str;

    return str;
}

function addData(){

    if(!validation()){
        return;
    } 
    
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({"desc":desc, "amount":amount, "value":value });
    
    setList(list);
}

function setUpdate(id){
    var obj = list[id];

    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;

    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btn-add").style.display = "none";

    document.getElementById("inputIdUpdate").innerHTML = '<input type="hidden" id="idUpdate" value="'+id+'">';
}    

function resetForm(){
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";

    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btn-add").style.display = "inline-block";

    document.getElementById("inputIdUpdate").innerHTML = "";
    document.getElementById("errors").style.display = "none";
}

function updateData(){

    if(!validation()){
        return;
    }   
        var id =  document.getElementById("idUpdate").value;
    
        var desc = document.getElementById("desc").value;
        var amount = document.getElementById("amount").value;
        var value = document.getElementById("value").value;

        list[id] = {"desc":desc, "amount": amount, "value":value};

        resetForm();
        setList(list);
}

function deleteData(id){

    if(confirm("Delete this item?")){
        if(id === list.length - 1){ //exclui o ultimo
            list.pop();
        }else if(id === 0){ // exclui o primeiro
            list.shift();
        }else{

            var arrIni = list.slice(0, id); // cria um array com o 1 da lista até o id selecionado
            var arrEnd = list.slice(id + 1); // pega do index até o final da lista 

            list = arrIni.concat(arrEnd);
        }

        setList(list);
    }
}

function validation(){

    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value; 
    var value = document.getElementById("value").value;
    document.getElementById("errors").style.display = "none";
    var errors = "";

    if(desc === ""){
        
        errors +='<p>Fill out description!</p>';
    }
    if(amount === ""){

        errors +='<p>Fill out amount!</p>';
    }else if(amount != parseInt(amount)){

        errors +='<p>Fill out a valid amount!</p>';
    }
    if(value === ""){

        errors +='<p>Fill out value!</p>';
    }else if(value != parseFloat(value)){

        errors +='<p>Fill out a valid value!</p>';
    }

    if(errors != ""){
        document.getElementById("errors").style.display = "inline-block";
        document.getElementById("errors").innerHTML = "<h3>Error: </h3>" + errors;
        return 0; // se existe erros
    }else{
        return 1; //se não existir erros
    }
}

function deleteList(){

    if(confirm("Delete this list?")){
        
        list = [];
        setList();
    }
}

function saveListStorage(list){

    var jsonStr = JSON.stringify(list);

    localStorage.setItem("list", jsonStr);
}

function initListStorage(){
    var testList = localStorage.getItem("list");

    if(testList){
        list =  JSON.parse(testList);
    }

    setList(list);
}
initListStorage();