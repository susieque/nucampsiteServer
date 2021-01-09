const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

connect.then(() => {

	console.log('Connected correctly to server');

	Campsite.create({
		name: 'React Lake Campground',
		description: 'test',
	})
		.then((campsite) => {
			console.log(campsite);

			return Campsite.findByIdAndUpdate(
				campsite._id,
				{
					$set: { description: 'Updated Test Document' },
				},
				{
					new: true, //returns update document
				}
			);
		})
		.then((campsite) => {
			console.log(campsite);
			//sub documents are stored in the campsite document as an array. array push
			campsite.comments.push({
				rating: 5,
				text: 'What a magnigient view!',
				author: 'Tinus Lorvaldes',
			});
			return campsite.save();
		})
		.then((campsite) => {
			console.log(campsite); //receiving single campsite document
			return Campsite.deleteMany();
		})
		.then(() => {
			return mongoose.connection.close();
		})
		.catch((err) => {
			console.log(err);
			mongoose.connection.close();
		});
});
