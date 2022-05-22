window.addEventListener("keydown",(event) => {
    var code = event.keyCode;
    event.preventDefault();
    if(code == 87 || code == 38)
    {
        Up();
    }
    if(code == 83 || code == 40)
    {
        Down();
    }
    if(code == 65 || code == 37)
    {
        Left();
    }
    if(code == 68 || code == 39)
    {
        Right();
    }
})

var grid = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
    ];
var score = 0;
var scoreText = document.getElementById("Score");

var table = [];
var tableColors = [];

    //origin is top left
    //only three posible checks between blocks in a line
    
    //get image var x = 0; document.getElementById(x).src = "Blank.png";
    
    var canvas = document.getElementById("GameScreen");
    var ctx = canvas.getContext("2d");

    function Restart()
    {
        localStorage.clear();
        Start();
        //alert("restart");
    }
    
    function Start()
    {
        for(var x = 0; x < 16; x++){
            table.push(document.getElementById(x));
            tableColors.push(document.getElementById(x).parentElement);
        }
        if(localStorage.getItem("grid")!=null)
        {       
            var stringGrid = localStorage.getItem("grid");
            //alert(stringGrid);
            pregrid = stringGrid.split(",");
            for(var x = 0 ; x<4;x++)
            {
                for(var y =0;y<4;y++)
                {
                    grid[x][y]=parseInt(pregrid[x*4+y]);
                }
            }
            //alert(grid);
            
            score = parseInt(localStorage.getItem("score"));
        }
        else
        {
            
            grid = [
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
                ];
            score = 0;
            
            SpawnBlocks();
            SpawnBlocks();
            
            
        }
        
        Draw();
    }

    function Save()
    {
        
        var gridSaved = "";
        for(var x =0;x<16;x++)
        {
            gridSaved += grid[Math.floor(x/4)][x%4]+",";
        }
        
        localStorage.setItem("grid",gridSaved);
        
        localStorage.setItem("score",score);
    }

    function SpawnBlocks()
    {
        var row = Math.floor(Math.random()*4);
        var col = Math.floor(Math.random()*4);
        if(grid[row][col]!=0)
        {
            SpawnBlocks();
        }
        else
        {
            switch(Math.floor(Math.random()*10))
            {
                case 0:
                    grid[row][col] = 4;
                    break;
                default:
                    grid[row][col] = 2;
                    break;
            } 
        }
        Save();
    }
    
    function Draw()
    {
        for(var row = 0;row<4;row++)
        {
            for(var col = 0;col<4;col++)
            {
                if(grid[row][col] == 0)
                {
                    table[row*4+col].innerHTML = "";
                    tableColors[row*4+col].style.backgroundColor = "grey";
                }
                else
                {
                    table[row*4+col].innerHTML = grid[row][col];
                    switch(grid[row][col])
                    {
                        case 2:
                            tableColors[row*4+col].style.backgroundColor = "turquoise";
                            break;
                        case 4:
                            tableColors[row*4+col].style.backgroundColor = "mediumturquoise";
                            break;
                        case 8:
                            tableColors[row*4+col].style.backgroundColor = "steelblue";
                            break;
                        case 16:
                            tableColors[row*4+col].style.backgroundColor = "darkslateblue";
                            break;
                        case 32:
                            tableColors[row*4+col].style.backgroundColor = "indigo";
                            break;
                        case 64:
                            tableColors[row*4+col].style.backgroundColor = "rebeccapurple";
                            break;
                        case 128:
                            tableColors[row*4+col].style.backgroundColor = "purple";
                            break;
                        case 256:
                            tableColors[row*4+col].style.backgroundColor = "maroon";
                            break;
                        case 512:
                            tableColors[row*4+col].style.backgroundColor = "firebrick";
                            break;
                        case 1024:
                            tableColors[row*4+col].style.backgroundColor = "red";
                            break;
                        case 2048:
                            tableColors[row*4+col].style.backgroundColor = "deeppink";
                            break;
                        case 4096:
                            tableColors[row*4+col].style.backgroundColor = "magenta";
                            break;
                        case 8192:
                            tableColors[row*4+col].style.backgroundColor = "violet";
                            break;
                        case 16384:
                            tableColors[row*4+col].style.backgroundColor = "orchid";
                            break;
                    }
                }
            }
        }
        scoreText.innerHTML = "Score : "+score;
    }

    function Left()
    {
         //make copy of old grid to see if the grid has changed
         var oldgrid = [[,,,],[,,,],[,,,],[,,,]];
         var same = true;
         for(var x =0;x<4;x++)
         {
             for(var y=0;y<4;y++)
             {
                 oldgrid[x][y]=grid[x][y];
             }
         }

        for(var x = 0; x < 4; x++)
        {
            var gridrow = [grid[x][0],grid[x][1],grid[x][2],grid[x][3]];
            gridrow = handleRow(gridrow);
            grid[x][0] = gridrow[0];
            grid[x][1] = gridrow[1];
            grid[x][2] = gridrow[2];
            grid[x][3] = gridrow[3];
        }

         //check to see if array has changed or not and if it has spawn a new block and update the screen
        for(var x =0;x<4;x++)
        {
            for(var y=0;y<4;y++)
            {
                if(oldgrid[x][y]!=grid[x][y])
                    same=false;
            }
        }
        
        if(same==false)
        {
            SpawnBlocks();
            Draw();
        }
    }
    function Right()
    {
         //make copy of old grid to see if the grid has changed
         var oldgrid = [[,,,],[,,,],[,,,],[,,,]];
         var same = true;
         for(var x =0;x<4;x++)
         {
             for(var y=0;y<4;y++)
             {
                 oldgrid[x][y]=grid[x][y];
             }
         }

        for(var x = 0; x < 4; x++)
        {
            var gridrow = [grid[x][3],grid[x][2],grid[x][1],grid[x][0]];
            gridrow = handleRow(gridrow);
            grid[x][3] = gridrow[0];
            grid[x][2] = gridrow[1];
            grid[x][1] = gridrow[2];
            grid[x][0] = gridrow[3];
        }

        //check to see if array has changed or not and if it has spawn a new block and update the screen
        for(var x =0;x<4;x++)
        {
            for(var y=0;y<4;y++)
            {
                if(oldgrid[x][y]!=grid[x][y])
                    same=false;
            }
        }
        
        if(same==false)
        {
            SpawnBlocks();
            Draw();
        }
    }
    function Up()
    {    
         //make copy of old grid to see if the grid has changed
         var oldgrid = [[,,,],[,,,],[,,,],[,,,]];
         var same = true;
         for(var x =0;x<4;x++)
         {
             for(var y=0;y<4;y++)
             {
                 oldgrid[x][y]=grid[x][y];
             }
         }

        for(var x = 0; x < 4; x++)
        {
            var gridrow = [grid[0][x],grid[1][x],grid[2][x],grid[3][x]];
            gridrow = handleRow(gridrow);
            grid[0][x] = gridrow[0];
            grid[1][x] = gridrow[1];
            grid[2][x] = gridrow[2];
            grid[3][x] = gridrow[3];
        }

        //check to see if array has changed or not and if it has spawn a new block and update the screen
        for(var x =0;x<4;x++)
        {
            for(var y=0;y<4;y++)
            {
                if(oldgrid[x][y]!=grid[x][y])
                    same=false;
            }
        }
        
        if(same==false)
        {
            SpawnBlocks();
            Draw();
        }
    }
    function Down()
    {
        //make copy of old grid to see if the grid has changed
        var oldgrid = [[,,,],[,,,],[,,,],[,,,]];
        var same = true;
        for(var x =0;x<4;x++)
        {
            for(var y=0;y<4;y++)
            {
                oldgrid[x][y]=grid[x][y];
            }
        }

        //shift row
        for(var x = 0; x < 4; x++)
        {
            var gridrow = [grid[3][x],grid[2][x],grid[1][x],grid[0][x]];
            gridrow = handleRow(gridrow);
            grid[3][x] = gridrow[0];
            grid[2][x] = gridrow[1];
            grid[1][x] = gridrow[2];
            grid[0][x] = gridrow[3];
        }

        //check to see if array has changed or not and if it has spawn a new block and update the screen
        for(var x =0;x<4;x++)
        {
            for(var y=0;y<4;y++)
            {
                if(oldgrid[x][y]!=grid[x][y])
                    same=false;
            }
        }
        
        if(same==false)
        {
            SpawnBlocks();
            Draw();
        }
    }

    function handleRow(gridrow)
    {
        var newrow = [];

        for(var x = 0; x < 4; x++)
        {
            if(gridrow[x]!=0)
            {
                newrow.push(gridrow[x]);
            }
        }

        for(var x = 0; x < newrow.length - 1; x++)
        {
            if(newrow[x]==newrow[x+1] && newrow[x]!=0)
            {
                newrow[x]*=2;
                newrow[x+1]=0;
                score+=newrow[x];
            }
        }

        for(var x = 0; x < 4; x++)
        {
            if(newrow[x]==0)
            {
                newrow.splice(x,1);
            }
        }

        for(var x = newrow.length; x < 4; x++)
        {
            newrow.push(0);
        }

        //alert(newrow);

        return newrow;
    }