import sequelize from '../data-model/data-base';

const Message = sequelize.model('fs_message');
const Account = sequelize.model('fs_account');

export default async (req,res)=>{
    
        const {access_token,messageId} = req.body;

        const account = await Account.findOne({where:{access_token}});

        if(!account){
            return res.json({
                success:false,
                message:'access_token无效',
                code:10003,
            })
        }

        await Message.destroy({where:{id:messageId}});

        return res.json({
            success:true,
        })
}