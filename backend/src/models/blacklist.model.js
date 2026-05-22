const monggoose = require("mongoose")
const blacklistTokenSchema = new monggoose.Schema({
    token: {
        type: String,
        required: [true, "token is required"],
        unique: [true, "token already exist"]
    }
},
    {timestamps:true
    })

    const tokenBlacklistModel = monggoose.model("blacklistTokens", blacklistTokenSchema)
    module.exports = tokenBlacklistModel