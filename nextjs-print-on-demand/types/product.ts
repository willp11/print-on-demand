export interface IProduct {
    id: number,
    name: string,
    price: number,
    image: string,
    brand: string,
    material: string,
    description: string[],
    sizes: {[key: string]: string},
    colors: {[key: string]: string},
}