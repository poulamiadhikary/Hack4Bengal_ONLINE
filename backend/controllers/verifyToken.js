import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res) => {
    const { token } = req.query;
    //console.log(token);

    try {
        if(!token){
            return res.status(404).json({
                success: false,
                message: 'token missing'
            });
        }
    
        const secret = process.env.SECRET;
    
        const isMatched = jwt.verify(token,secret);
        //console.log(isMatched);
    
        if(!isMatched){
            return res.status(400).json({
                success: false,
                message: 'invalid token'
            });
        }
    
        return res.status(200).json({
            success: true,
            message: 'token verified'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}