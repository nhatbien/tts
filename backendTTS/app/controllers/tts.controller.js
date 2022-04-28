const config = require("../config/auth.config");
const db = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const TtsModel = require("../models/tts.model");
const TTS = db.tts;


exports.create = (req, res) => {
    const tts = new TtsModel(req.body);
    if (!req.body.text || !req.body.userId) {
        res.status(500).send({ message: "Text or UserId can be not empty" });
        return;
    }
    tts.save((err, tts) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        else {
            res.send({ message: "tts create successfully!" });
            return;
        }
    }
    );
};


exports.findAll = async (req, res) => {
    let data = [];

    try {
        const { userid } = req.query;
        if (userid) {
            data = await TTS.find({ userId: userid });
        } else {
            data = await TTS.find();
        }
    } catch (error) {
        res.status(500).send({ message: error });
        return;
    }

    return res.send(data);
};



exports.delete = async (req, res) => {
    let data ;
    if (!req.body.id) {
        res.status(500).send({ message: "Id Không thể trống" });
        return;
    }
    try {
         data = await TTS.findByIdAndDelete( req.body.id );
        if(!data) {
            res.status(500).send({ message: "Không tìm thấy tts" });
            return;
        }
    } catch (error) {
        res.status(500).send({ message: error });
        return;
    }

    return res.send({ data });


};

