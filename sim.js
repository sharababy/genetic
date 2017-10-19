function getInputTable(n){

	var result = [];

    for(y=0; y < Math.pow(2,n); y++){
    
        var combo = [];
    
        for(x=0; x<n; x++){
    
            if((y >> x) & 1)
                combo.push(1);
             else 
                combo.push(0);
    
        }
    
        result.push(combo);
    
    }
    
    return result;

}

var r = getInputTable(3)

console.log(r)