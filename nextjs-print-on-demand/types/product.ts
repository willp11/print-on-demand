enum ImageSides {
    Front = 'front',
    Back = 'back',
    Left = 'left',
    Right = 'right',
    FrontMask = 'front_mask',
    BackMask = 'back_mask',
    LeftMask = 'left_mask',
    RightMask = 'right_mask'
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
    colors: {[key: string]: {[key in ImageSides]: string}},
    blankPriceRows: string[]
}