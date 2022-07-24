import { Rectangle as Rect, Circle as Circ } from "pixi.js";

/** Wrapper over PIXI.Rectangle, includes collision, intersection, and side. */
class Rectangle extends Rect {
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    collides(rectangle: Rectangle): boolean {
        return (
            this.x < rectangle.x + rectangle.width &&
            this.x + this.width > rectangle.x &&
            this.y < rectangle.y + rectangle.height &&
            this.y + this.height > rectangle.y
        );
    }

    get top() {
        return this.y;
    }
    set top(top: number) {
        this.y = top;
    }
    get bottom() {
        return this.y + this.height;
    }
    set bottom(bottom: number) {
        this.y = bottom - this.height;
    }
    get left() {
        return this.x;
    }
    set left(left: number) {
        this.x = left;
    }
    get right() {
        return this.x + this.width;
    }
    set right(right: number) {
        this.x = right - this.width;
    }
}

/** Wrapper over PIXI.Circle, includes collision and sides. */
class Circle extends Circ {
    constructor(x: number, y: number, radius: number) {
        super(x, y, radius);
    }

    collides(circle: Circle): boolean {
        return this.radius + circle.radius < Math.sqrt((this.x - super.x) ** 2 + (this.y - super.y) ** 2);
    }

    get top(): number {
        return this.y - this.radius;
    }
    set top(top: number) {
        this.y = top + this.radius;
    }
    get bottom(): number {
        return this.y + this.radius;
    }
    set bottom(bottom: number) {
        this.y = bottom - this.radius;
    }
    get left(): number {
        return this.x - this.radius;
    }
    set left(left: number) {
        this.x = left + this.radius;
    }
    get right(): number {
        return this.x + this.radius;
    }
    set right(right: number) {
        this.x = right - this.radius;
    }
}

export { Rectangle, Circle };
