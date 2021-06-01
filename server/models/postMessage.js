const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    type: String,
    name: String,
    adoptionStatus: String,
    height: String,
    image: String,
    weight: String,
    color: String,
    bio: String,
    hypoallergenic: String,
    dieteryRestrictions: String,
    breedOfAnimal: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const PostMessage = mongoose.model('PostMessage', postSchema);

module.exports = PostMessage;