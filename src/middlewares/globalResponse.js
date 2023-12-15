
export const globalResponse = (err, req, res, next)=>{
    if(err){
        return res.status(500).json({
            msg: "catch error",
            errorMsg: err.message,
            errorLocation: err.stack
        })
    }
}