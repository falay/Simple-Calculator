function calculator() 
{
    var expression = document.getElementById("numb").value;

    var expVector = expression.split(/([^0-9])/g) ;

    var postExp = inOrder2PostOrder( expVector ) ;

    if( postExp.length == 0 )
        document.getElementById("demo").innerHTML += "Invalid expression" ;
    else
        document.getElementById("demo").innerHTML += expression + " = " +  evaluator( postExp ) ;          
}



function Stack()
{
    this.stack = []
    
    this.push = function(data)
    {
        this.stack.push( data ) ;
    }

    this.pop = function()
    {
        this.stack.pop() ;
    }

    this.empty = function()
    {
        return this.stack.length == 0 ;
    }

    this.top = function()
    {
        return this.stack[ this.stack.length-1 ] ;
    }
}



function precendence( operator )
{
    switch( operator )
    {
        case "+":
        case "-":
            return 0 ;
        case "*":
        case "/":
            return 1 ;
        default:
            return -1 ;    
    }
}


function inOrder2PostOrder( expVector )
{
    var opStack = new Stack() ;
    var postOrder = [] ;

    for(var i=0; i<expVector.length; i++)
    {
        switch( expVector[i] )
        {
            case "+":
            case "-":
            case "*":
            case "/":
            {
                while( !opStack.empty() && precendence( opStack.top() ) >= precendence( expVector[i] ) )
                {    
                    postOrder.push( opStack.top() ) ;
                    opStack.pop() ;
                }
                
                opStack.push( expVector[i] ) ;

                break ;
            }   

            case "(":
                opStack.push( "(" ) ;
                break ;

            case ")":
            {
                while( opStack.top() != "(" )
                {    
                    postOrder.push( opStack.top() ) ;
                    opStack.pop() ;
                }
                opStack.pop() ;

                break ;
            }

            default:
            {   
                if( isNaN( expVector[i] ) )
                    return [] ;
                
                else if( expVector[i] != " " && expVector[i] != "" )
                    postOrder.push( expVector[i] ) ;  
            }
        } 
    }
    
    while( !opStack.empty() )
    {    
        postOrder.push( opStack.top() ) ;
        opStack.pop() ;
    }

    return postOrder ;
}


function isOperator( symbol )
{
    switch( symbol )
    {
        case "+":
        case "-":
        case "*":
        case "/":
            return true ;
        default:
            return false ;     
    }
}

function evaluator( postExp )
{
    var evalStack = new Stack() ;

    for(var i=0; i<postExp.length; i++)
    {
        if( isOperator(postExp[i]) )
        {
            var top2 = evalStack.top() ;
            evalStack.pop() ;
            var top1 = evalStack.top() ;     
            evalStack.pop() ;

            var Res ;
            switch( postExp[i] )
            {
                case "+":
                    Res = Number(top1) + Number(top2) ;
                    break ;
                case "-":
                    Res = Number(top1) - Number(top2) ;
                    break ;
                case "*":
                    Res = Number(top1) * Number(top2) ;
                    break ;
                case "/":
                    if( top2 == "0" )
                        return "Error: divided by zero" ;
                    Res = Number(top1) / Number(top2) ;
                    break ;    
                default:
                    return "Invalid" ;   
            }
            evalStack.push( Res ) ;
         }   
         else
            evalStack.push( Number(postExp[i]) ) ;        
    }

    return evalStack.top().toString() ;
}

