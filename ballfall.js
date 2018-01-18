var canvas = document.querySelector("canvas");
var c = canvas.getContext('2d');
var g = 9.8, e = 0.8;

var ball = 
{
    x : 0,
    y : 0,
    u : 0,
    ux : 0,
    uy : 0,
    vx : 0,
    vy : 0,
    theta : 0,
    draw : function()
            {
                c.beginPath();
                c.arc(this.x, this.y + this.radius, this.radius, 0, Math.PI*2, true);
                c.closePath();
                c.fillStyle = this.color;
                c.fill();
            },


    game : function()
            {
                this.draw();
                this.uy -= g*dt;
                this.y += this.uy*dt;
                this.x += this.ux * dt;
                if (this.y  < 0 && t !== 0) 
                {
                    this.y = 0;
                    this.uy = e * this.uy;
                }

                if(this.x > canvas.width || this.x <= 0)
                {
                    this.ux *= -1;
                }
                
            }
}