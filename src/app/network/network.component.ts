import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';

export const CONN_DIST = 100; // Define missing values
export const MAIN_COLOR = '#c6c7c8'; // Define missing values
export const MAIN_COLOR_RGB = convertHex(MAIN_COLOR, 0.5); // Define missing values
export const SEC_COLOR = '#b4dad7'; // Define missing values
export const BORDER_COLOR = '#b4dad7'; // Define missing values
export const LINE_ALPHA = 100; // Define missing values
export const NUM_BALLS = 100; // Define missing values
export const BALL_RAD = 6; // Define missing values
export const BALL_RAD_MIN = 2; // Define missing values
export const GLOB_ALPHA = 0.5; // Define missing values
export const MOUSE_RAD = 100; // Define missing values
export const FPS = 60; // Define missing values
export const TAU = 2 * Math.PI; // Define missing values
export const SPEED = 0.2;

export function convertHex(hex: string, opacity: number): string {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
}
@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent {
  

  @ViewChild('networkCanvas') networkCanvasRef: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  private requestId: number;
  private balls: Ball[] = [];
  private mouseX = -1e9;
  private mouseY = -1e9;
  // private readonly MAIN_COLOR = '#666';
  // private readonly SEC_COLOR = '#aaee00';
  // private readonly BORDER_COLOR = '#aaee00';
  // private readonly BALL_RAD = 6;
  // private readonly BALL_RAD_MIN = 2;
  // private readonly SPEED = 0.2;
  // private readonly GLOB_ALPHA = 0.5;
  // private readonly MOUSE_RAD = 100;
  // private readonly CONN_DIST = 100;
  @HostListener('window:mousemove', ['$event']) onMouseMove(event) {
     this.mouseX = event.clientX;
     this.mouseY = event.clientY;
  }

  ngAfterViewInit(): void {
    if(window.matchMedia("(max-width: 768px)").matches){
      setTimeout(() => {
        this.initialize();
      }, 500); //Adding this delay to give mobile devices a chance to set the window dimensions
    }
    else{
      this.initialize();
    }
    
  }

  initialize(){
    const canvas = this.networkCanvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.initCanvasSize(canvas);
    this.initBalls(canvas);
    this.startAnimation();

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const canvas = this.networkCanvasRef.nativeElement;
    this.initCanvasSize(canvas);
    cancelAnimationFrame(this.requestId);
    this.startAnimation();
  }

  private initCanvasSize(canvas: HTMLCanvasElement): void {
    this.ctx.canvas.width = canvas.clientWidth;
    this.ctx.canvas.height = canvas.clientHeight;
  }

  private initBalls(canvas: HTMLCanvasElement): void {
    for (let i = 0; i < canvas.width * canvas.height / 10000; i++) {
      this.balls.push(new Ball(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * SPEED * 2 - SPEED,
        Math.random() * SPEED * 2 - SPEED
      ));
    }
  }

  private startAnimation(): void {
    this.requestId = requestAnimationFrame(() => this.loop());
  }

  private loop(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.update();
    this.draw();
    this.requestId = requestAnimationFrame(() => this.loop());
  }

  private update(): void {
    for (const ball of this.balls) {
      ball.update(this.ctx.canvas);
    }
  }

  private draw(): void {
    for (let i = 0; i < this.balls.length; i++) {
      const ball = this.balls[i];
      this.ctx.beginPath();
      for (let j = this.balls.length - 1; j > i; j--) {
        const ball2 = this.balls[j];
        const dist = Math.hypot(ball.x - ball2.x, ball.y - ball2.y);
        if (dist < CONN_DIST) {
          const distM = this.distMouse(ball2);
          this.ctx.strokeStyle = distM > MOUSE_RAD ? MAIN_COLOR : SEC_COLOR;
          this.ctx.globalAlpha = distM > MOUSE_RAD ? GLOB_ALPHA : 1;
          this.ctx.moveTo((0.5 + ball.x) | 0, (0.5 + ball.y) | 0);
          this.ctx.lineTo((0.5 + ball2.x) | 0, (0.5 + ball2.y) | 0);
        }
      }
      this.ctx.stroke();
      ball.draw(this.ctx, this.mouseX, this.mouseY);
    }
  }

  private distMouse(ball: Ball): number {
    return Math.hypot(ball.x - this.mouseX, ball.y - this.mouseY);
  }
}

class Ball {
  x: number;
  y: number;
  // private mouseX = -1e9;
  // private mouseY = -1e9;
  vel: { x: number; y: number };

  constructor(startX: number, startY: number, startVelX: number, startVelY: number) {
    this.x = startX;
    this.y = startY;
    this.vel = { x: startVelX, y: startVelY };
  }

  update(canvas: HTMLCanvasElement): void {
    if (this.x > canvas.width + 50 || this.x < -50) {
      this.vel.x = -this.vel.x;
    }
    if (this.y > canvas.height + 50 || this.y < -50) {
      this.vel.y = -this.vel.y;
    }
    this.x += this.vel.x;
    this.y += this.vel.y;
  }

  draw(ctx: CanvasRenderingContext2D, mouseX, mouseY): void {
    const distM = Math.hypot(this.x - mouseX, this.y - mouseY);
    const radius = distM > MOUSE_RAD ? BALL_RAD_MIN : BALL_RAD * (1 - distM / CONN_DIST);
    ctx.beginPath();
    ctx.fillStyle = distM > MOUSE_RAD ? MAIN_COLOR : SEC_COLOR;
    ctx.globalAlpha = distM > MOUSE_RAD ? GLOB_ALPHA : 1;
    ctx.arc((0.5 + this.x) | 0, (0.5 + this.y) | 0, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.strokeStyle = distM <= MOUSE_RAD ? BORDER_COLOR : MAIN_COLOR;
    ctx.stroke();
  }
}

