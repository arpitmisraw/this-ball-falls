var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var g = 9.8, e = 0.7, dt = 0.16, x_inp, y_inp;



c.translate(0, canvas.height);
c.scale(-1, 1); 
c.rotate(-Math.PI);

var ball = 
{
    x : canvas.width / 2,
    y : canvas.height/2,
    u : 0,
    ux : 0,
    uy : 0,
    vx : 0,
    vy : 0,
    theta : 0,
    color : 'black',
    radius : 70,
    draw : function()
            {
                c.beginPath();
                c.arc(this.x, this.y , this.radius, 0, Math.PI* 2);
                c.closePath();
                c.fillStyle = this.color;
                c.fill();
            },


    game : function()
            {
                clear();
                this.draw();
                this.vy -= g*dt;
                this.y += this.vy * dt;
                this.x += this.vx * dt;
                if (this.y - this.radius < 0) 
                {
                    this.y = this.radius;
                    this.vy *= -e;
                }

                if(this.x + this.radius > canvas.width || this.x - this.radius <= 0)
                {
                    this.vx *= -1;
                }
            },
    
    changeDirection : function()
            {
                if(Math.sqrt(((this.x - x_inp) * (this.x - x_inp)) + ((this.y - y_inp) * (this.y - y_inp))) < this.radius + 50 )
                {
                    if(this.vx * (this.x - x_inp) > 0)
                    {
                        this.vx += (this.x - x_inp)/2;
                    }
                    else
                    {
                        this.vx = (this.x - x_inp)/2;
                    }
                    // if(this.vy * (this.y - y_inp) > 0)
                    // {
                    //     this.vy += (this.y - y_inp)*2;
                    // }
                    // else
                    // {
                    //     this.vy = (this.y - y_inp)*2;
                    // }
                    this.vy = 50;
                    // this.vy = (this.x - x_inp);
                }
                x_inp = 0;
                y_inp = 0;
            }
            
}


canvas.addEventListener("click", function()
{
    x_inp = event.pageX - canvas.offsetLeft;
    y_inp = canvas.height - event.pageY - 12;
    console.log(x_inp, y_inp);
}
);

function clear()
{
    c.fillStyle = 'white';
    c.fillRect(0, 2, canvas.width, canvas.height);
}

function animate()
{
    ball.game();
    ball.changeDirection();
    requestAnimationFrame(animate);
}

animate();
