const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAABmmnOVAAAAMFBMVEXk5ueutLfo6uu9wsWrsbS4vcDT1tjIzM6orrLP09SyuLvCx8nY29zM0NLg4uPb3t98/PZeAAADBElEQVR4nO2a23LjIAxAQYAvgM3//+1iu3GbxAGJIJKd4Tx0+pYzAgmQLESn0+l0Op1Op9PpdP4DAECs3vuw/fMZA+FHo6cDrZbQXgSCs1rLX7S0y9pUA1Z1Z3DzGNtFA4SbnhUOjaGRBXh7rbBrmDYO82uFzcKuDRyWpMNG4F4ScFkHqT2zQz4OmwXrioCfEA5SWk6JFaUQQ6H4tgUYzGLsFjOXBQxYh2jB5CAA7yC14wkFLjNOC6YMsQQHplBg0/MGS5qCITnEBGGQwNaIE8OwHoT8/AlFfQfMyfUgMdSXIOXGLjFWXw9KpfqRULUdRCBL1N+ZMJAdpKzskLtZXlI9PWgHx8FU+/joEqfEV+wJctWW9bNDeLqErX+C0SXqV8yCss1wdiiyBUObgJweHLf+r7hZke+YS30HeqXgeXjQ3h08b2IYSS+wwOEQLSivH6a3KOkknXgUBOXGzVAtT1ZkKDRHjbgBM3Jb8HbOUO+wyfN2MjHnmGZvcOdjwdc0+0OuZjVp9CfvvNo2mryAUK+ShLM+PGkMVyMPLVXTARSIwUz3MzCtHfuM4cJjVnaKJlrHv8YNnxlLbj8ahnmefdhmpJ8wgH04e9JaY/tJP49OGWu3vRC3hrVGjcuwthkVg1iH0cTf1Y+DUb1j3RAEq8g+mbYXY9k7FxlFViYRAO/si6HsI5NUDMkCEMZ0BJ4iMilf1SMug5L0B7E2c71VgWBoUfj1sJWOdfCGNui415AVNLaPFMoVjmi8e9mDmb4XnjXcO1sDBHoQmraQ5cEo6mdfM5W+CmkP4AyFH3eAeyMpLiyKLp91tsNf6BevxHczpWiqRf04bJBWpKBpiYLy0Q99/Ii2wDuUdPRxENppbA6xamFfqsSuKRHUtiiZ8RBALgh5Hk20QHwKVvXEuAQxECJ1TIvId7RKRo9U8mMp3tTYyX54FNhXI9/O4d+WG5kLDnW8U4ZNjyFW5iJxkPnapmAOXCKR3hS8JfskWbr5LhJ3aJmMxKLakJSARqQcOp1Op/Pl/AN/FyHc8+TGuQAAAABJRU5ErkJggg==',
    },
},{timestamps:true})

const User = mongoose.model('User',userSchema);

module.exports = User;