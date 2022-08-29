function addspace(noOfSpaces){
    var space = ""
    for(var count = 0; count < noOfSpaces; count++){
        space = space + "  ";
    }
    return space;
}

function extractToken(text, index, key, value){
    var token = "";
    var idx = -1;
    if(value.hasBrace){
        var braceCount = -1;
        for(var currIdx = index; currIdx < text.length; currIdx ++){
            var curr = text[currIdx];
            if(curr == '('){
                if(braceCount == -1){
                    braceCount = 1;
                }else{
                    braceCount = braceCount + 1;
                }
            }
            if(curr == ')'){
                braceCount = braceCount - 1;
                if(braceCount == 0){
                    token = text.substring(index, currIdx + 1);
                    idx = currIdx + 1;
                    break;
                }
            }
        }
    }else{
        token = text.substring(index, index + key.length + 1);
        idx = index + key.length + 1;
    }
    return {token:token, idx:idx};
}

function format(text){
    
    const setter = {hasBrace: true, currentIndent:0, nextIndent:0};
    const withBrace = {hasBrace: true, currentIndent:0, nextIndent:1};
    const withoutBrace = {hasBrace: false, currentIndent:-1, nextIndent:1};
    const ending = {hasBrace: false, currentIndent:-1, nextIndent:0};
    debugger;
    var keywords = new Map();
    keywords.set("set", setter);
    keywords.set("foreach", withBrace);
    keywords.set("if", withBrace);
    keywords.set("elseif", withBrace);
    keywords.set("else", withoutBrace);
    keywords.set("end", ending);
    
    var currIndent = 0;
    var newText = "";
    for(var index = 0; index < text.length; index++){
        if(text.charAt(index) == '#' && index < text.length - 1){
            for(const [key, value] of keywords){
                if(text.startsWith(key, index + 1)){
                    var result = extractToken(text, index, key, value);
                    currIndent = currIndent + value.currentIndent;
                    
                    newText = newText + "\n" + addspace(currIndent) + result.token;
                    index = result.idx - 1;
                    currIndent = currIndent + value.nextIndent;
                    newText = newText + "\n" + addspace(currIndent);
                    break;
                }
            }
        }else{
            newText = newText + text.charAt(index);
        }
    }
    console.log("\n\n\n\n-----\n" + newText);
    return newText;
}

function foo(){
    alert("helloo");
}

function formatText(){
    var inputText = document.getElementById("inputBox").value;
    var output = format(inputText);
    var outputTextArea = document.getElementById("outputBox");
    outputTextArea.value = output;
   
}