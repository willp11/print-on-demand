export const handleDjangoErrors = (e: any) => {
    let errs: string[] = [];
    let errFields = Object.values(e.response.data);
    errFields.forEach(field=>{
        // @ts-ignore
        field.forEach((err)=>{
            errs.push(err);
        }) // we know it is an array of strings
    })
    return errs;
}