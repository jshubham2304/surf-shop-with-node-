const faker =  require('faker');
const Post =  require('./models/post');

async function seedPost(){
    await Post.remove({});
    for(const i of new Array(40)){
        const post = {
            title:faker.lorem.word(),
            description:faker.lorem.text(),
            price:faker.phone.phoneNumber(),
            
            author:{
                '_id' : '5bb27cd1f986d278582aa58c',
                'username' : 'ian'
              }
        };
        await Post.create(post);
        
    }
    console.log('40 Record created ');
}
module.exports = seedPost;