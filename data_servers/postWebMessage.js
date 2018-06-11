import saveImage from '../utils/save-image';
import sequelize from '../data-model/data-base';

const Message = sequelize.model('fs_message');
const Account = sequelize.model('fs_account');
const User = sequelize.model('fs_user');
const Image = sequelize.model('fs_image');

export default async (req,res)=>{

    const {access_token,content} = req.body;

    //console.log(req.body);

    const account = await Account.findOne({where:{access_token}});
    if(!account){
        return res.json({
            success:false,
            message:'access_token无效',
            code:10003,
        })
    }

    const user = await account.getUser();

    if(!user){
        return res.json({
            success:false,
            message:'未初始化用户信息',
            code:10004,
        })
    }   

    const message =  await Message.create({content});


    await message.setUser(user);
    
    let length = 0;
    for(let v in req.body){
        length++;
    }
    console.log(length);
    

    if(length > 2){

        const imageSavePromises = [];

        for(let i = 0;i<length-2;i++){
            const string = req.body[`image${i}`];
            const array = string.split(',');
            console.log(array[0]);
            
            const buffer =  new Buffer(array[1], 'base64');

            imageSavePromises.push(saveImage(buffer))
        }

        const imageURLs = await Promise.all(imageSavePromises);

        const imagePromises = imageURLs.map((url)=>{
            console.log(url);
            
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