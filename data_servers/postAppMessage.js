import saveImage from '../utils/save-image';
import sequelize from '../data-model/data-base';

const Message = sequelize.model('message');
const Account = sequelize.model('account');
const User = sequelize.model('user');
const Image = sequelize.model('image');

export default async (req,res)=>{

    const {access_token,content} = req.body;

    console.log(req.body);

    const account = await Account.findOne({where:{access_token}});
    if(!account){
        return res.json({
            success:false,
            errorMessage:'access_token无效',
            errorCode:10003,
        })
    }

    const user = await account.getUser();

    if(!user){
        return res.json({
            success:false,
            errorMessage:'未初始化用户信息',
            errorCode:10004,
        })
    }   

    const message =  await Message.create({content});


    await message.setUser(user);
    
    if(req.files){

        const imageSavePromises = req.files.map((file)=>{
            return saveImage(file.buffer);
        });

        const imageURLs = await Promise.all(imageSavePromises);

        const imagePromises = imageURLs.map((url)=>{
            return Image.create({url});
        });

        const images = await Promise.all(imagePromises);
        
        await message.setImages(images);
    }

    const m = await Message.findOne({
        where:{id:message.id},
        include:[
            {
                model:Image,
                attributes:['id','url']
            },
            {
                model:User,
            }
        ],
    });


    return res.json({
        success:true,
        data:m
    });

    
}