import sequelize from '../data-model/data-base';
import saveImage from '../utils/save-image';

const Account = sequelize.model('fs_account');
const User = sequelize.model('fs_user');

export default async (req,res)=>{

    const {access_token,nickname,sign} = req.body;
    const account = await Account.findOne({where:{access_token}});
    if(!account){
        return res.json({
            success:false,
            message:'access_token无效',
            code:10003,
        })
    }

    const user  = await account.getUser();

    if(req.files && req.files.length){
        const image = await saveImage(req.files[0].buffer);
        user.image = image;
    }
    if(nickname){
        user.nickname = nickname;
    }
    if(sign){
        user.sign = sign;
    }

    await user.save();

    res.json({
        success:true,
        data:user,
    });
}