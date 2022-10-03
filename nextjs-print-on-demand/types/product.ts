interface IProductImages {
    front: string,
    back?: string,
    left?: string,
    right?: string,
    front_mask: string,
    back_mask?: string,
    left_mask?: string,
    right_mask?: string
}

interface IDrawableAreaDetails {
    xPos: number,
    yPos: number,
    xSize: number,
    ySize: number
}

export interface IDrawableArea {
    front: IDrawableAreaDetails,
    back?: IDrawableAreaDetails,
    left?: IDrawableAreaDetails,
    right?: IDrawableAreaDetails
}

export interface IProduct {
    id: number,
    name: string,
    price: number,
    image: string,
    brand: string,
    material: string,
    description: string[],
    sizes: {[key: string]: string},
    colors: {[key: string]: IProductImages},
    blankPriceRows: string[],
    drawableArea: IDrawableArea
}