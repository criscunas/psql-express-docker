export default ({
    mongoose,
}) => {
    return {

        createLink: async (request, response) => {
            const { platform , url, caption } = request.body
            const user = request.user

            if (!platform || !url) {
                return response.status(400).json({
                    error: 'Missing required fields.'
                })
            }

            let linkObj = {
                platform: platform ,
                url: url,
                caption: caption ? caption : null
            }


            mongoose.model('user').findOneAndUpdate(
                { _id: user.id },
                { $push: { links: linkObj } },
                { returnDocument: 'after', upsert: true },
            ).then((data) => {
                return response.json({
                    links: data.links,
                });
            })
            .catch((error) => {
                console.log(error);
                return response.json({
                    error: error
                })
            });
        },

        deleteLink: async (request, response) => {
            const user = request.user
            const id = request.params.id

            mongoose.model('user').findOneAndUpdate(
                { _id: user.id },
                { $pull: { links: { _id: id } } },
                { returnDocument: 'after' },
            ).select(['links']).then((data) => {
                return response.json({
                    links: data.links
                })
            }).catch((error) => {
                console.log(error)
                return response.json({
                    error: error
                })
            })
        }
    }
}