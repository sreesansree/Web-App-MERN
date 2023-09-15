import  jwt  from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })
}

export const generateadminToken=(res,adminId)=>{
    const token=jwt.sign({adminId},process.env.JWT_SECRET,{
        expiresIn:'2d',
    })

    res.cookie('admintoken',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',
        sameSite:'strict',
        maxAge:2 * 24 * 60 * 60 *1000
    })

}
export default generateToken;