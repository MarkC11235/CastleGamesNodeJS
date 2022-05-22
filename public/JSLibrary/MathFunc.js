class func{
    constructor(equation){
        this.equation = equation;
    }
    eval(x){
        var sum = 0;
        for(var i = 0 ; i < this.equation.length; i++){
            if(this.equation[i].includes("x")){
                sum += parseFloat(this.equation[i].substring(0,this.equation[i].indexOf("x"))) * Math.pow(x,parseFloat(this.equation[i].substring(this.equation[i].indexOf("x")+1)));
            }
            else if(this.equation[i].includes("sin()")){
                sum += sin(x);
            }
            else if(this.equation[i].includes("cos()")){
                sum += cos(x);
            }
            else if(this.equation[i].includes("tan()")){
                sum += tan(x);
            }
            else
            {
                sum += parseFloat(this.equation[i]);
            }
        }
        return sum;
    }
}

function isPrime(n)
{
    var prime = true;

    for(var i = 2; i <= Math.sqrt(n); i++)
    {
        if(n%i == 0)
        {
            prime = false;
            break;
        }
    }

    return prime;
}

function factorial(n)
{
    if(n == 0)
        return 1;

    var ans = 1;
    for(var i = 2; i <= n; i++)
        ans*=i;

    return ans;
}

function sin(n)
{
    var ans = 0;
    var coeff = 1;

    for(var i = 1; i < 100; i+=2)
    {
        ans += coeff*(Math.pow(n,i)/factorial(i));
        coeff = -coeff;
    }

    return ans;
}

function cos(n)
{
    var ans = 0;
    var coeff = 1;

    for(var i = 0; i < 200; i+=2)
    {
        ans += coeff*(Math.pow(n,i)/factorial(i));
        coeff = -coeff;
    }

    return ans;
}

function tan(n)
{
    var s = sin(n);
    var c = cos(n);
    if(c > .00001 || c < -.00001)
        return s/c;
    else
        return Infinity;
}

function csc(n)
{
    return 1/sin(n);
}

function sec(n)
{
    return 1/cos(n);
}

function cot(n)
{
    return 1/tan(n);
}

function e()
{
    var ans = 0;

    for(var i = 0; i < 18; i++)
    {
        ans += 1/factorial(i);
    }

    return ans;
}

function fibonacci(n)
{
    if(n == 0)
        return 0;
    else if(n == 1)
        return 1;
    else
        return fibonacci(n-1) + fibonacci(n-2);
}

function triangularNum(n)
{
    return n*(n+1)/2;
}

function pentagonalNum(n)
{
    return n*(3*n-1)/2;
}

function hexagonalNum(n)
{
    return n*(2*n-1);
}

function heptagonalNum(n)
{
    return n*(5*n-3)/2;
}

function octagonalNum(n)
{
    return n*(3*n-2);
}

function isTriangular(n)
{
    var ans = false;

    for(var i = 1; i < n; i++)
    {
        if(triangularNum(i) == n)
        {
            ans = true;
            break;
        }
    }

    return ans;
}

