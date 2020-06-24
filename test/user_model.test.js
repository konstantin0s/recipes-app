var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://konstantin0s:tehnician@cluster0-duzhh.mongodb.net/test-jestest?retryWrites=true&w=majority';

mongoose.connect(mongoDB);

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const User = require("../models/user");

describe('User model test', () => {
    beforeAll(async () => {
        await User.remove({});
    });

    afterEach(async () => {
        await User.remove({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('has a module', () => {
        expect(User).toBeDefined();
    })


    describe('get user',  () => {
        it('gets a user', async () => {
            const user = new User({username: 'lush', password: '12345'});
            await user.save();

            const foundUser = await User.findOne({username: 'lush'});
            const expected = 'lush';
            const actual = foundUser.username;
            expect(actual).toEqual(expected);
        });
    })

        describe('save user ', () => {
            it('saves a user', async () => {
                const user = new User({username: 'lush', password: '12345'});
               const savedUser =  await user.save();
                const expected = 'lush';
                const actual = savedUser.username;
                expect(actual).toEqual(expected);
            });
        });

});
