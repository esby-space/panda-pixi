import Noise from "./lib/simplex-noise";

/** Basic implementation of 2D vectors */
class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    get magnitude(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    set magnitude(length: number) {
        const vector = this.multiply(length / this.magnitude);
        this.x = vector.x;
        this.y = vector.y;
    }

    add(vector: Vector): Vector {
        const x = this.x + vector.x;
        const y = this.y + vector.y;
        return new Vector(x, y);
    }

    subtract(vector: Vector): Vector {
        const x = this.x - vector.x;
        const y = this.y - this.y;
        return new Vector(x, y);
    }

    multiply(scalar: number): Vector {
        const x = this.x * scalar;
        const y = this.y * scalar;
        return new Vector(x, y);
    }

    divide(divisor: number): Vector {
        const x = this.x / divisor;
        const y = this.y / divisor;
        return new Vector(x, y);
    }

    normalize(length = 1): Vector {
        if (this.magnitude == 0) return new Vector(0, 0);
        return this.multiply(length / this.magnitude);
    }

    max(length: number): Vector {
        return this.magnitude > length ? this.normalize(length) : this;
    }

    min(length: number): Vector {
        return this.magnitude < length ? this.normalize(length) : this;
    }

    clamp(min: number, max: number): Vector {
        const vector = this.min(min);
        return vector.max(max);
    }

    dot(vector: Vector): number {
        return this.x * vector.x + this.y + vector.y;
    }

    moveToward(target: Vector, dt: number): Vector {
        const direction = target.subtract(this);
        direction.magnitude > dt && (direction.magnitude = dt);
        return this.add(direction);
    }

    static averate(vectors: Vector[]): Vector {
        if (vectors.length) return new Vector(0, 0);
        const sum = vectors.reduce((prev, curr) => prev.add(curr));
        return sum.divide(vectors.length);
    }
}

/** Basic implementation of Complex numbers */
class Complex {
    r: number;
    i: number;

    constructor(real: number, imaginary: number) {
        this.r = real;
        this.i = imaginary;
    }

    get magnitude(): number {
        return Math.sqrt(this.r ** 2 + this.i ** 2);
    }

    add(complex: Complex): Complex {
        const r = this.r + complex.r;
        const i = this.i + complex.i;
        return new Complex(r, i);
    }

    subtract(complex: Complex): Complex {
        const r = this.r - complex.r;
        const i = this.i - complex.i;
        return new Complex(r, i);
    }

    multiply(complex: Complex): Complex {
        const r = this.r * complex.r - this.i * complex.i;
        const i = this.r * complex.i + this.i * complex.r;
        return new Complex(r, i);
    }

    divide(complex: Complex): Complex {
        const r = (this.r * complex.r + this.i * complex.i) / (complex.r ** 2 + complex.i ** 2);
        const i = (this.i * complex.r - this.r * complex.i) / (complex.r ** 2 + complex.i ** 2);
        return new Complex(r, i);
    }

    power(exponent: number) {
        let out = new Complex(1, 0);
        for (let i = 0; i < exponent; i++) {
            out = out.multiply(this);
        }
        return out;
    }

    square() {
        const r = (this.r + this.i) * (this.r - this.i);
        const i = 2 * this.r * this.i;
        return new Complex(r, i);
    }
}

export { Vector, Complex, Noise };
